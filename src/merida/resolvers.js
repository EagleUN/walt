import { generalRequest, protectedGeneralRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		postById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		postsByCreatorId: (_, { id }) =>
			generalRequest(`${URL}/creator/${id}`, 'GET')
	},
	Mutation: {
		createPostHack: (_, { post }) =>
			generalRequest(`${URL}`, 'POST', post),
		createPost: (_, { post }, context) =>
			protectedGeneralRequest(post.idCreator, `${URL}`, 'POST', post, context),
		updatePost: (_, { id, newContent }) =>
			generalRequest(`${URL}/${id}`, 'PUT', newContent),
		deletePost: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
