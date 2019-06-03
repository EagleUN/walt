import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

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

export default resolvers;
