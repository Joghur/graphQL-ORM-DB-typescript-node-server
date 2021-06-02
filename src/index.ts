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
// import { corsOptions } from './config/corsConfig';
import { corsOptionsDelegate } from './config/corsConfig';
// import helmet from 'helmet';
// import { fillDB } from './utils/fillDB';
// import { cleanDB } from './utils/fillDB';

const main = async () => {
	const _type = __prod__ ? 'mysql' : 'postgres';
	const _url = __prod__
		? process.env.DATABASE_URL_PRODUCTION
		: process.env.DATABASE_URL_DEVELOPMENT;

	console.log('_type', _type);

	const conn = await createConnection({
		type: _type,
		url: _url,
		logging: !__prod__,
		synchronize: true, // not using __prod__ here. Change to false when not developing.
		migrations: [path.join(__dirname, './src/migrations/*')],
		entities: [User, Role],
	});

	// await cleanDB();
	await conn.runMigrations();

	// filling db with fakedate
	// fillDB();

	const app = express();

	// app.use(helmet());
	app.use(cors(corsOptionsDelegate));

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
