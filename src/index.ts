import 'reflect-metadata';
import 'dotenv-safe/config';
import { __prod__, PORT } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
// import session from 'express-session';
import cors from 'cors';
import { createConnection } from 'typeorm';
import path from 'path';
import { User, Role } from './entities';
import { UserResolver, RoleResolver } from './resolvers';
import { corsOptionsDelegate } from './config/corsConfig';
// import helmet from 'helmet';
import { fillDB } from './utils/fillDB';
import { cleanDB } from './utils/fillDB';

const main = async () => {
	// set environment variable NODE_ENV to production on production server.
	// otherwise Dev database is used
	// and in this case mysql on production and postgreSQL on development server
	const _type = __prod__ ? 'mysql' : 'postgres';
	const _url = __prod__
		? process.env.DATABASE_URL_PRODUCTION
		: process.env.DATABASE_URL_DEVELOPMENT;

	const conn = await createConnection({
		type: _type,
		url: _url,
		logging: !__prod__,
		synchronize: true, // not using __prod__ here. Change to false when not developing.
		migrations: [path.join(__dirname, './src/migrations/*')],
		entities: [User, Role],
	});

	// if emptying DB is needed uncomment below line
	await cleanDB();

	await conn.runMigrations();

	// filling db with fake data then uncomment below line
	fillDB();

	const app = express();

	// app.use(helmet());
	app.use(cors(corsOptionsDelegate));

	// initializing apollo server. Add objects beside reg & res to be able to access them in resolvers - @Ctx
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, RoleResolver],
			validate: false,
		}),
		context: async ({ req, res }) => {
			return {
				req,
				res,
			};
		},
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(PORT),
		() => {
			console.log(`server started on localhost:${PORT}`);
		};
};

main().catch((err) => {
	console.error('-----------error', err);
});
