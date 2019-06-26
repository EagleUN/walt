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
export async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		//headers: {'Content-Type': 'Application/json' },
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
export async function protectedGeneralRequest(userId, url, data, context, info) {
	console.log(`context is: ${JSON.stringify(context)}`);
	console.log(`context.state is: ${JSON.stringify(context.state)}`);
	console.log(`info is: ${JSON.stringify(info)}`);
	const sessionToken = context.state.token;
	console.log(`token is: ${JSON.stringify(token)}`);
	try {
		await generalRequest(`http://${vanellopeUrl}:${vanellopePort}/log/user`);
		// check if status == 401
		// or check if response["msg"] matches 'You are currently logged-in as *' (?)
		console.log(`Response is ${JSON.stringify(response)}`)
		if ( response.status === 401 ) {
			return await generalRequest(url, data);
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
