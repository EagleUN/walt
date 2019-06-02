import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		sharesByUser: (_, { userId }) =>
			generalRequest(`${URL}/get/${userId}`, 'GET'),
	},
	Mutation: {
		createShare: (_, { share }) =>
			generalRequest(`${URL}/create/${share.userId}/${share.postId}`, 'POST'),
		deleteShare: (_, { share }) =>
			generalRequest(`${URL}/delete/${share.userId}/${share.postId}`, 'DELETE')
	}
};

export default resolvers;
