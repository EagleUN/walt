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

const feedTypeDef = `
type Post {
    id: String!
    createdAt: String!
    idCreator: String!
    content: String!
}`;

const feedQueries = `
    homeFeedForUser(id: String!): [Post]!
    profileFeedForUser(id: String!): [Post]!
`;

const anaTypeDef = `
type Follow {
    followerId: String!
    followingId: String!
}

type UserIdList {
    userIds: [String!]!
    count: Int!
}

type FollowsBoolean {
    follows: Boolean!
}
`;

const anaQueries = `
    following(userId: String!): UserIdList!
    followers(userId: String!): UserIdList!
    follows(followerId: String!, followingId: String!) : FollowsBoolean!
`;

const anaMutations = `
    createFollow(followerId: String!, followingId: String!): Follow!
    deleteFollow(followerId: String!, followingId: String!): Follow!
`;

const url        = process.env.ANA_URL   ? process.env.ANA_URL   : '127.0.0.1';
const port       = process.env.ANA_PORT  ? process.env.ANA_PORT  : '9090';
const entryPoint = process.env.ANA_ENTRY ? process.env.ANA_ENTRY : 'ana';

const URL = `http://${url}:${port}/${entryPoint}`;

console.log(`ANA URL: ${url}`);
console.log(`ANA PORT: ${port}`);
console.log(`ANA EntryPoint: ${entryPoint}`);

const resolvers = {
	Query: {
		followers: (_, { userId }) =>
			generalRequest(`${URL}/users/${userId}/followers`, 'GET'),
        following: (_, { userId }) =>
			generalRequest(`${URL}/users/${userId}/following`, 'GET'),
		follows: (_, {followerId, followingId } ) =>
			generalRequest(`${URL}/users/${followerId}/following/${followingId}`, 'GET')
	},
	Mutation: {
		createFollow: (_, { followerId, followingId }) =>
			generalRequest(`${URL}/users/${followerId}/following/`, 'POST', { followingId } ),
		deleteFollow: (_, { followerId, followingId }) =>
			generalRequest(`${URL}/users/${followerId}/following/${followingId}`, 'DELETE')
	}
};

const url$1 = 'localhost';
const port$1 = '3000';
const entryPoint$1 = 'feeds';

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		homeFeedForUser: (_, { id }) =>
			generalRequest(`${URL$1}/home/${id}`, 'GET'),
		profileFeedForUser: (_, { id }) =>
			generalRequest(`${URL$1}/profile/${id}`, 'GET')
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		anaTypeDef,
		feedTypeDef
	],
	[
		anaQueries,
		feedQueries
	],
	[
		anaMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers$1,
		resolvers
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

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
