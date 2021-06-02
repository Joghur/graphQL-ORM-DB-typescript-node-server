import devPages from './devPages';

// CORS setup
let whitelist: string[] = [];
if (process.env.CORS_ORIGIN) {
	whitelist.push(process.env.CORS_ORIGIN);
}
// adding dev pages if server is not set to production
if (process.env.NODE_ENV !== 'production') {
	whitelist = [...whitelist, ...devPages];
}

export const corsOptions = {
	origin: function (origin: any, callback: any) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

export const corsOptionsDelegate = function (req: any, callback: any) {
	let corsOptions;
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};
