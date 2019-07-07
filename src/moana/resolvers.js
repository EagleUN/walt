import { generalRequest, protectedGeneralRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		homeFeedForUserHack: (_, { id }) =>
			generalRequest( `${URL}/home/${id}`, 'GET'),
		profileFeedForHack: (_, { id }) =>
			generalRequest(`${URL}/profile/${id}`, 'GET'),

		homeFeedForUser: (_, { id }, context, info) =>
			protectedGeneralRequest( id, `${URL}/home/${id}`, 'GET', context, info ),
		profileFeedForUser: (_, { id }, context, info) =>
			protectedGeneralRequest( id, `${URL}/profile/${id}`, 'GET', context, info)
	}
};

export default resolvers;
