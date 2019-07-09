import { protectedGeneralRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		sharesByUser: (_, { userId }) =>
			protectedGeneralRequest(userId, `${URL}/get/${userId}`, 'GET'),
	},
	Mutation: {
		createShare: (_, { share }) =>
			protectedGeneralRequest(share.userId, `${URL}/create/${share.userId}/${share.postId}`, 'POST'),
		deleteShare: (_, { share }) =>
			protectedGeneralRequest(share.userId, `${URL}/delete/${share.userId}/${share.postId}`, 'DELETE')
	}
};

export default resolvers;
