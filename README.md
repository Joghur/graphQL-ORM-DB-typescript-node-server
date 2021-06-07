# graphQL-ORM-postgreSQL/MySQL-typescript-node-server

Server exposing database table values through a graphQL interface.
It contains two database tables, **user** and **role** with an **many-to-many** relation between them.


Client for this server  - [graphQL-javascript-react-client](https://github.com/Joghur/graphQL-javascript-react-client)

Technology used:
 * **graphQL**: apollo server
 * **Database**: postgreSQL and MySQL
 * **Environment**: node.js
 * **Language**: Typescript
 * **ORM**: TypeORM

---

## Installation

  **index.ts:** if you use the same type of database on different servers, change logic in this line in main function:

	const _type = __prod__ ? 'mysql' : 'postgres';

  **.env:** - in this case two different types of databases

	GENERIC_GRAPHQL_DATABASE_URL_DEVELOPMENT=postgresql://postgres:postgres@localhost:5432/<db_development>
	GENERIC_GRAPHQL_DATABASE_URL_PRODUCTION=mysql://<user>:<password>@localhost:3306/<db_production>
	CORS_ORIGIN=https://www.example.com

**/src/config/devPages.js:**

	const devPages: any[] = [];
	devPages.push([
		'http://localhost:3000',
		'http://localhost:4000',
		undefined,
		<other pages>,
	]);
	export default devPages;

---

## Start server
Either:

 - in src/index.ts set **synchronize** to true, if you want your database to change during dev time
 - and uncomment cleanDB() and/or fillDB() if you want a fresh/filled database
 - Dev -> **yarn watch** and **yarn dev**
 - or Dev -> **yarn start2**

  or

 - remember to set **synchronize** to false in src/index.ts, if you want your database to persist
 - Production -> **yarn build** and then **yarn start**

If everything went well see [http://localhost:4002/genericgraphql](http://localhost:4002/genericgraphql)

**Port** and **endpoint** can be changed in "src/constants.ts"

---

TODO:
 - <s>createUser doesn't include Roles when creating new user</s>.
