import request from 'request-promise-native';
import { formatError } from 'graphql';
import { url as vanellopeUrl, port as vanellopePort } from './vanellope/server';
/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
export async function generalRequest(url, method, body, fullResponse, authToken) {
	console.log(`generalRequset, method=${method}`);
	console.log(`generalRequset, body`);
	console.log({ body });
	console.log(`generalRequset, url=${url}`);

	const parameters = {
		method,
		uri: encodeURI(url),
		headers: {'Authorization': `Bearer ${authToken}` },
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
export function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
export function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
export function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

export function formatErr(error) {
	const data = formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

/**
 * Checks with Vanellope if the sessionToken is valid for the user with id userId.
 * If the token is valid, then generalRequest(url, data) is called.
 * @param {string} userId 
 * @param {string} sessionToken 
 * @param {string} url 
 * @param {object} data
 */
export async function protectedGeneralRequest(userId, url, method, data, context) {
	const sessionToken = context.token;
	console.log(`token is: ${JSON.stringify(sessionToken)}`);
	console.log(`userId is: ${userId}`);
	try {
		const vanellopeResponse = await generalRequest(`http://${vanellopeUrl}:${vanellopePort}/log/user`, 'GET', undefined, undefined, sessionToken);
		if (vanellopeResponse.id === userId ) {
			console.log("auth OK!");
			const response = await generalRequest(url, method, data);
			return response;
		}
	}
	catch(err) {
		console.log("Error in request to authenticate to Vanellope")
		return err; 
	}
	return {
		code: 401, // Not authorized
		id : "Authentication error",
		description : `Session token ${sessionToken} for user ${userId} is not valid`
	};
}

/**
 * Checks with Vanellope if the sessionToken is valid for the user with id userId.
 * If the token is valid, then generalRequest(url, data) is called.
 * @param {string} userId 
 * @param {string} sessionToken 
 */
export async function protectedGetRequest(userId, url, context) {
	console.log('PROTECTED GET REQUEST');
	const sessionToken = context.token;
	console.log(`token is: ${JSON.stringify(sessionToken)}`);
	console.log(`userId is: ${JSON.stringify(sessionToken)}`);
	try {
		const vanellopeResponse = await generalRequest(`http://${vanellopeUrl}:${vanellopePort}/log/user`, 'GET', undefined, undefined, sessionToken);
		console.log("--------------- VANELLOPE RESPONSE ---------------------");
		console.log({ vanellopeResponse });
		if (vanellopeResponse.id === userId ) {
			console.log("auth OK!");
			const response = await generalRequest(url, 'GET');
			return response;
		}
	}
	catch(err) {
		console.log("Error in request to authenticate to Vanellope")
		return err; 
	}
	return {
		code: 401, // Not authorized
		id : "Authentication error",
		description : `Session token ${sessionToken} for user ${userId} is not valid`
	};
}

