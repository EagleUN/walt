import { generalRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		homeFeedForUser: (_, { id }) =>
			generalRequest(`${URL}/home/${id}`, 'GET'),
		profileFeedForUser: (_, { id }) =>
			generalRequest(`${URL}/profile/${id}`, 'GET')
	}
};

export default resolvers;
