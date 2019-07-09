import { generalRequest } from '../utilities';

import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const resolvers = {
	Query: {
		getMusicList: (_, { id }) =>
			generalRequest(`${URL}/musicList/${id}`, 'GET')		
	}
};

export default resolvers;