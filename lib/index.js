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

const commonTypeDef = `
type Post {
    id: String!
    createdAt: String!
    idCreator: String!
    content: String!
}
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


type OtherUser {
    id: String!
    name: String!
    lastName: String!
    followsMe: Boolean!
    iFollow: Boolean!
}

type OtherUserList {
    count: Int
    otherUsers: [OtherUser!]!
}
`;

const anaQueries = `
    following(userId: String!): UserIdList!
    followers(userId: String!): UserIdList!
    follows(followerId: String!, followingId: String!) : FollowsBoolean!
    userList(userId: String!): OtherUserList!
`;

const anaMutations = `
    createFollow(followerId: String!, followingId: String!): Follow!
    deleteFollow(followerId: String!, followingId: String!): Follow!
`;

const feedTypeDef = `
`;

const feedQueries = `
    homeFeedForUser(id: String!): [Post]!
    profileFeedForUser(id: String!): [Post]!
`;

const mulanTypeDef = `
type Share {
    userId: String!
    postId: String!
    sharedAt: String!
},
input ShareInput{
    userId: String!
    postId: String!
}
`;

const mulanQueries = `
    sharesByUser(userId: String!): [Share]!
`;

const mulanMutations = `
    createShare(share: ShareInput!): Share
    deleteShare(share: ShareInput!): Share
`;

const notificationTypeDef = `
type ID {
    oid: String!
}

type Notification {
    id: ID!
    notificated_user: String!
    follower: String!
    date: String!
    type: String!
    post_id: String
}
input NotificationInput {
    notificated_user: String
    follower: String!
    post_id: String
}`;

const notificationQueries = `
    allNotifications: [Notification]!
    NotificationByUser(user: String!): [Notification]!
`;

const notificationMutations = `
    createShareNotification(notification: NotificationInput!): Notification!
    createFollowNotification(notification: NotificationInput!): Notification!
`;

const postsTypeDef = `
input PostUpdate {
    newContent: String!
}
input PostInput {
    idCreator: String!
    content: String!
}`;

const postsQueries = `
    postById(id: String!): Post!
    postsByCreatorId(id: String!): [Post]!
`;

const postsMutations = `
    createPost(post: PostInput!): Post!
    deletePost(id: String!): Post!
    updatePost(id: String!, newContent: PostUpdate!): Post!
`;

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

input IdUser{
    id: String!
}

input loginUser{
    email: String!
    password: String!
}`;

const vanellopeQueries = `
    allUsers: userList!
    userById(id: IdUser!): User!
    userByEmail(email: EmailUser!): User!
`;

const vanellopeMutations = `
    createUser(user: NewUser!): User!
    updateUser(user: updateUser!): User!
    deleteUser(id: IdUser!): String
    createNewUserSession(userSession: loginUser!): User!
    deleteUserSession: String
`;

const jazminTypeDef = `
type MusicList {
    name: String!
    url: String!
}
`;

const jazminQueries = `
    getMusicList(email: String!): MusicList!    
`;

const url        = process.env.EAGLEUN_URL ? process.env.EAGLEUN_URL : '127.0.0.1';
const port       = process.env.ANA_PORT    ? process.env.ANA_PORT    : '9090';
const entryPoint = process.env.ANA_ENTRY   ? process.env.ANA_ENTRY   : 'ana';

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
			generalRequest(`${URL}/users/${followerId}/following/${followingId}`, 'GET'),
		userList: (_, { userId } ) =>
			generalRequest(`${URL}/users/${userId}/userList`, 'GET')
	},
	Mutation: {
		createFollow: (_, { followerId, followingId }) =>
			generalRequest(`${URL}/users/${followerId}/following/`, 'POST', { followingId } ),
		deleteFollow: (_, { followerId, followingId }) =>
			generalRequest(`${URL}/users/${followerId}/following/${followingId}`, 'DELETE')
	}
};

const url$1 = process.env.EAGLEUN_URL;
const port$1 = process.env.MOANA_PORT;
const entryPoint$1 = process.env.MOANA_ENTRY;

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		homeFeedForUser: (_, { id }) =>
			generalRequest(`${URL$1}/home/${id}`, 'GET'),
		profileFeedForUser: (_, { id }) =>
			generalRequest(`${URL$1}/profile/${id}`, 'GET')
	}
};

const url$2 = process.env.EAGLEUN_URL;
const port$2 = process.env.MERIDA_PORT;
const entryPoint$2 = process.env.MERIDA_ENTRY;

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
	Query: {
		postById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),
		postsByCreatorId: (_, { id }) =>
			generalRequest(`${URL$2}/creator/${id}`, 'GET')
	},
	Mutation: {
		createPost: (_, { post }) =>
			generalRequest(`${URL$2}`, 'POST', post),
		updatePost: (_, { id, newContent }) =>
			generalRequest(`${URL$2}/${id}`, 'PUT', newContent),
		deletePost: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'DELETE')
	}
};

const url$3 = process.env.EAGLEUN_URL;
const port$3 = process.env.MULAN_PORT;
const entryPoint$3 = process.env.MULAN_ENTRY;

const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const resolvers$3 = {
	Query: {
		sharesByUser: (_, { userId }) =>
			generalRequest(`${URL$3}/get/${userId}`, 'GET'),
	},
	Mutation: {
		createShare: (_, { share }) =>
			generalRequest(`${URL$3}/create/${share.userId}/${share.postId}`, 'POST'),
		deleteShare: (_, { share }) =>
			generalRequest(`${URL$3}/delete/${share.userId}/${share.postId}`, 'DELETE')
	}
};

const url$4 = process.env.EAGLEUN_URL;
const port$4 = process.env.VANELLOPE_PORT;
const entryPoint$4 = '';

const URL$4 = `http://${url$4}:${port$4}/${entryPoint$4}`;

const resolvers$4 = {
	Query: {
		allUsers: (_) =>
			generalRequest(`${URL$4}signup/users`, 'GET'),
		userById: (_, { id }) =>
			generalRequest(`${URL$4}signup/user_id`, 'GET', id),
		userByEmail: (_, { email }) =>
			generalRequest(`${URL$4}signup/user_email`, 'GET', email),
		//tokenUser: (_) =>
		//	generalRequest(`${URL}log/user`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL$4}signup/user/create`, 'POST', user),
		updateUser: (_, { user }) =>
			generalRequest(`${URL$4}signup/user`, 'PATCH', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL$4}signup/user`, 'DELETE', id),
		createNewUserSession: (_, { userSession }) =>
			generalRequest(`${URL$4}log/user/in`, 'POST', userSession),
		deleteUserSession: (_) =>
			generalRequest(`${URL$4}log/user/out`, 'DELETE')
	}
};

const url$5 = process.env.EAGLEUN_URL;
const port$5 = process.env.RAPUNZEL_PORT;

const URL$5 = `http://${url$5}:${port$5}`;

const resolvers$5 = {
	Query: {
		allNotifications: (_) =>
			generalRequest(`${URL$5}/notifications`, 'GET'),
		NotificationByUser: (_, { user }) =>
			generalRequest(`${URL$5}/notifications/${user}`, 'GET'),
	},
	Mutation: {
		createShareNotification: (_, { notification }) =>
			generalRequest(`${URL$5}/posts/${notification.post_id}/shares/${notification.follower}`, 'POST'),
		createFollowNotification: (_, { notification }) =>
			generalRequest(`${URL$5}/users/${notification.notificated_user}/followers/${notification.follower}`, 'POST' )
	}
};

const url$6 = process.env.EAGLEUN_URL || 'localhost';
const port$6 = process.env.JAZMIN_PORT || '3006';
const entryPoint$6 = process.env.JAZMIN_ENTRY || 'soapservice';

const URL$6 = `http://${url$6}:${port$6}/${entryPoint$6}`;
const resolvers$6 = {
	Query: {
		getMusicList: (_, { email }) =>
			generalRequest(`${URL$6}/musicList/${email}`, 'GET')		
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commonTypeDef,
		anaTypeDef,
		feedTypeDef,
		mulanTypeDef,
		postsTypeDef,
		vanellopeTypeDef,
		notificationTypeDef,
		jazminTypeDef
	],
	[
		anaQueries,
		feedQueries,
		mulanQueries,
		postsQueries,
		vanellopeQueries,
		notificationQueries,
		jazminQueries
	],
	[
		anaMutations,
		mulanMutations,
		postsMutations,
		vanellopeMutations,
		notificationMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers$1,
		resolvers,
		resolvers$2,
		resolvers$3,
		resolvers$4,
		resolvers$5,
		resolvers$6
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
