import { generalRequest, protectedGeneralRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		profileFeedForUser: (_, { id }) =>
			protectedGeneralRequest( id, `${URL}/profile/${id}`, 'GET'),
		homeFeedForUser: (_, { id }, context, info) =>
			protectedGeneralRequest( id, `${URL}/home/${id}`, 'GET', context, info ),
	}
};

export default resolvers;
