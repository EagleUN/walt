import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(URL, 'GET'),
		userByEmail: (_, { email }) =>
			generalRequest(`${URL}`, 'GET', email),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}`, 'POST', user),
		updateUser: (_, { user }) =>
			generalRequest(`${URL}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}`, 'DELETE'),
		createNewUserSession: (_, { userSession }) =>
			generalRequest(`${URL}`, 'POST', userSession),
		deleteUserSession: (_) =>
			generalRequest(URL, 'DELETE')
	}
};

export default resolvers;
