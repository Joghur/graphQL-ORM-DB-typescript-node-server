# iq96_server

Server for iq96-client

#### needed config files

  **index.ts:** if you use two different types of databases on different servers, change logic in this line in main function:

	const _type = __prod__ ? 'mysql' : 'postgres';

  **.env:** - in this case two different types of databases

	DATABASE_URL_DEVELOPMENT=postgresql://postgres:postgres@localhost:5432/<db_development>
	DATABASE_URL_PRODUCTION=mysql://<user>:<password>@localhost:3306/<db_production>
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

**serviceAccountKey.json:** from firebase account

	{
	"type": "service_account",
	"project_id": "<project_id>",
	"private_key_id": "<private_key_id>",
	"private_key": "-----BEGIN PRIVATE KEY-----<key>-----END PRIVATE KEY-----\n",
	"client_email": "<client_email>",
	"client_id": "<client_id>",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
  	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "<client_x509_cert_url>"
	}

## Start server
Either:

 - **yarn watch** and **yarn dev**
  or
 - **yarn build** and then **yarn start**

TODO:
 - createUser doesn't include Roles when creating new user.
 - Error catching when Creating and updating user.
