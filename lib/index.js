'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	console.log(body);
	console.log(url);
	const parameters = {
		method,
		uri: encodeURI(url),
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


/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */


/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const vanellopeTypeDef = `
type User {
    id: String!
    name: String!
    last_name: String!
    email: String!
}

input NewUser {
    name: String!
    last_name: String!
    email: String!
    password: String!
    password_confirmation: String!
}

type userList {
    total: Int!
    list: [User]!
}

input updateUser {
    name: String!
    last_name: String!
    email: String!
    password: String!
    password_confirmation: String!
    current_password: String!
}

input EmailUser{
    email: String!
}

input loginUser{
    email: String!
    password: String!
}`;

const vanellopeQueries = `
    allUsers: userList!
    userByEmail(email: EmailUser!): User!
    #tokenUser: String
`;

const vanellopeMutations = `
    createUser(user: NewUser!): User!
    updateUser(user: updateUser!): User!
    deleteUser(id: String!): String
    createNewUserSession(userSession: loginUser!): User!
    deleteUserSession: String
`;

const url = "localhost";
const port = "3000";
const entryPoint = '';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			generalRequest(`${URL}signup/users`, 'GET'),
		userByEmail: (_, { email }) =>
			generalRequest(`${URL}signup/user`, 'GET', email),
		//tokenUser: (_) =>
		//	generalRequest(`${URL}log/user`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}signup/user/create`, 'POST', user),
		updateUser: (_, { user }) =>
			generalRequest(`${URL}signup/user`, 'PATCH', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}signup/user`, 'DELETE', id),
		createNewUserSession: (_, { userSession }) =>
			generalRequest(`${URL}log/user/in`, 'POST', userSession),
		deleteUserSession: (_) =>
			generalRequest(`${URL}log/user/out`, 'DELETE')
	}
};

/*
import {
	meridaMutations,
	meridaQueries,
	meridaTypeDef
} from './merida/typeDefs';

import meridaResolvers from './merida/resolvers';

import {
	moanaMutations,
	moanaQueries,
	moanaTypeDef
} from './moana/typeDefs';

import moanaResolvers from './moana/resolvers';

import {
	anaMutations,
	anaQueries,
	anaTypeDef
} from './ana/typeDefs';

import anaResolvers from './ana/resolvers';

import {
	rapunzelMutations,
	rapunzelQueries,
	rapunzelTypeDef
} from './rapunzel/typeDefs';

import rapunzelResolvers from './rapunzel/resolvers';

import {
	mulanMutations,
	mulanQueries,
	mulanTypeDef
} from './mulan/typeDefs';

import mulanResolvers from './mulan/resolvers';
*/
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		vanellopeTypeDef
		/*meridaTypeDef
		moanaTypeDef
		anaTypeDef
		rapunzelTypeDef
		mulanTypeDef*/
	],
	[
		vanellopeQueries
		/*meridaQueries
		moanaQueries
		anaQueries
		rapunzelQueries
		mulanQueries*/
	],
	[
		vanellopeMutations
		/*meridaMutations
		moanaMutations
		anaMutations
		rapunzelMutations
		mulanMutations*/
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers
		/*meridaResolvers
		moanaResolvers
		anaResolvers
		rapunzelResolvers
		mulanResolvers*/
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = 7000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
