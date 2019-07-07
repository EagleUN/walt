import { generalRequest, protectedGeneralRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		profileFeedForUser: (_, { id }, context, info) =>
			protectedGeneralRequest( id, `${URL}/profile/${id}`, 'GET', context, info),
		homeFeedForUser: (_, { id }) =>
			protectedGeneralRequest( id, `${URL}/home/${id}`, 'GET'),
	}
};

export default resolvers;
