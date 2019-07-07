import { generalRequest, protectedGeneralRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		homeFeedForUser: (_, { id }, context, info) =>
			protectedGeneralRequest( id, `${URL}/home/${id}`, 'GET', context, info ),
		profileFeedForUser: (_, { id }, context, info) =>
			protectedGeneralRequest( id, `${URL}/profile/${id}`, 'GET', context, info),

		homeFeedForUserHack: (_, { id }) =>
			generalRequest( `${URL}/home/${id}`, 'GET'),
		profileFeedForUserHack: (_, { id }) =>
			generalRequest(`${URL}/profile/${id}`, 'GET')
	}
};

export default resolvers;
