import {protectedGeneralRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		homeFeedForUser: (_, { id }, context) =>
			protectedGeneralRequest(id, `${URL}/home/${id}`, 'GET', context ),
		profileFeedForUser: (_, { id }) =>
			protectedGeneralRequest(id, `${URL}/profile/${id}`, 'GET')
	}
};

export default resolvers;
