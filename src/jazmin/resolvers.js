import { generalRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const resolvers = {
	Query: {
		getMusicList: (_, { email }) =>
			generalRequest(`${URL}/musicList/${email}`, 'GET')		
	}
};

export default resolvers;
