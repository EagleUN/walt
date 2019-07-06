import { generalRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		homeFeedForUserHack: (_, { id }) =>
			generalRequest(`${URL}/home/${id}`, 'GET'),
		homeFeedForUser: (_, { id }, context, info) =>
			protectedGeneralRequest( id, `${URL}/home/${id}`, 'GET', context, info ),
		profileFeedForUser: (_, { id }) =>
			generalRequest(`${URL}/profile/${id}`, 'GET')
	}
};

export default resolvers;
