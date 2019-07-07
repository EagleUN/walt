import { protectedGeneralRequest, generalRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		profileFeedForUser: (_, { id }, context) =>
			generalRequest( `${URL}/profile/${id}`, 'GET'),
		homeFeedForUser: (_, { id }, context) =>
			protectedGeneralRequest( id, `${URL}/home/${id}`, 'GET', null, context ),
	}
};

export default resolvers;
