import { protectedGetRequest, generalRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		profileFeedForUser: (_, { id }, context) => { return protectedGetRequest(id, `${URL}/profile/${id}`, context); },
		homeFeedForUser: (_, { id }, context) => { return protectedGetRequest(id, `${URL}/home/${id}`, context); },
	}
};

export default resolvers;
