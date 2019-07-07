import { protectedGetRequest, generalRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		profileFeedForUser: (_, { id }) =>
			generalRequest( `${URL}/profile/${id}`, 'GET'),
		homeFeedForUser: (_, { id }, context) =>
			protectedGetRequest( id, `${URL}/home/${id}`, 'GET', context ),
	}
};

export default resolvers;
