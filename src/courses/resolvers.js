import { generalRequest, getRequest } from '../utilities';

const URL = `http://localhost:3000/posts/`;

const resolvers = {
	Query: {
		postById: (_, { id }) =>
			generalRequest(`${URL}/find/${id}`, 'GET'),
	},
	Mutation: {
		createPost: (_, { post }) =>
			generalRequest(`${URL}`, 'POST', post),
		updatePost: (_, { id, newContent }) =>
			generalRequest(`${URL}/update/${id}`, 'PUT', newContent),
		deletePost: (_, { id }) =>
			generalRequest(`${URL}/delete/${id}`, 'DELETE')
	}
};

export default resolvers;
