import { protectedGeneralRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		postById: (_, { id }, context) =>
			protectedGeneralRequest(id, `${URL}/${id}`, 'GET', context),
		postsByCreatorId: (_, { id }, context) =>
			protectedGeneralRequest(id, `${URL}/creator/${id}`, 'GET', context)
	},
	Mutation: {
		createPost: (_, { post }, context) =>
			protectedGeneralRequest(post.idCreator, `${URL}`, 'POST', context, post),
		updatePost: (_, { id, newContent }, context) =>
			protectedGeneralRequest(id, `${URL}/${id}`, 'PUT', context, newContent),
		deletePost: (_, { id }, context) =>
			protectedGeneralRequest(id, `${URL}/${id}`, 'DELETE', context)
	}
};

export default resolvers;
