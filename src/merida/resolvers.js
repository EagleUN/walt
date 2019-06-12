import { generalRequest } from '../utilities';

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
		createPost: (_, { post }) =>
			generalRequest(`${URL}`, 'POST', post),
		updatePost: (_, { id, newContent }) =>
			generalRequest(`${URL}/${id}`, 'PUT', newContent),
		deletePost: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
