import { generalRequest, protectedGetRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		homeFeedForUserHack: (_, { id }) =>
			generalRequest(`${URL}/home/${id}`, 'GET'),
		profileFeedForUserHack: (_, { id }) =>
			generalRequest(`${URL}/profile/${id}`, 'GET'),

		homeFeedForUser: (_, { id }, context) =>
			protectedGetRequest(id, `${URL}/home/${id}`, context),
		profileFeedForUser: (_, { id }, context) =>
			protectedGetRequest(id, `${URL}/profile/${id}`, context)
	}
};

export default resolvers;
