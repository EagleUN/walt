import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			generalRequest(`${URL}signup/users`, 'GET'),
		userById: (_, { id }) =>
			generalRequest(`${URL}signup/user_id`, 'GET', id),
		userByEmail: (_, { email }) =>
			generalRequest(`${URL}signup/user_email`, 'GET', email),
		userSess: (_, { user }) =>
			generalRequest(`${URL}log/user`, 'GET', user),
		//tokenUser: (_) =>
		//	generalRequest(`${URL}log/user`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}signup/user/create`, 'POST', user),
		updateUser: (_, { user }) =>
			generalRequest(`${URL}signup/user`, 'PATCH', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}signup/user`, 'DELETE', id),
		createNewUserSession: (_, { user }) =>
			generalRequest(`${URL}log/user/in`, 'POST', user),
		deleteUserSession: (_) =>
			generalRequest(`${URL}log/user/out`, 'DELETE')
	}
};

export default resolvers;
