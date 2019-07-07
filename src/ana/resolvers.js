import { protectedGeneralRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

console.log(`THIS IS SPARTA!!!`);

const resolvers = {
	Query: {
		followers: (_, { userId }, context) =>
			protectedGeneralRequest(userId, `${URL}/users/${userId}/followers`, 'GET', context),
    following: (_, { userId }, context) =>
			protectedGeneralRequest(userId, `${URL}/users/${userId}/following`, 'GET', context),
		follows: (_, {followerId, followingId }, context ) =>
			protectedGeneralRequest(userId, `${URL}/users/${followerId}/following/${followingId}`, 'GET', context),
		userList: (_, { userId }, context ) =>
			protectedGeneralRequest(userId, `${URL}/users/${userId}/userList`, 'GET', context)
	},
	Mutation: {
		createFollow: (_, { followerId, followingId }, context) =>
			protectedGeneralRequest(followerId, `${URL}/users/${followerId}/following/`, 'POST', context, { followingId } ),
		deleteFollow: (_, { followerId, followingId }, context) =>
			protectedGeneralRequest(followerId, `${URL}/users/${followerId}/following/${followingId}`, 'DELETE', context)
	}
};

export default resolvers;
