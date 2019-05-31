import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		allNotifications: (_) =>
			getRequest(`${URL}/notifications`, 'GET'),
		NotificationByUser: (_, { user }) =>
			generalRequest(`${URL}/notification/${user}`, 'GET'),
	},
	Mutation: {
		createNotification: (_, { notification }) =>
			generalRequest(`${URL}/users/${notification.notificated_user}/posts/${notification.post_id}/shares/${notifications.follower}`, 'POST')
	}
};

export default resolvers;
