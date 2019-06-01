import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		allNotifications: (_) =>
			generalRequest(`${URL}/notifications`, 'GET'),
		NotificationByUser: (_, { user }) =>
			generalRequest(`${URL}/notifications/${user}`, 'GET'),
	},
	Mutation: {
		createShareNotification: (_, { notification }) =>
			generalRequest(`${URL}/users/${notification.notificated_user}/posts/${notification.post_id}/shares/${notification.follower}`, 'POST'),
		createFollowNotification: (_, { notification }) =>
			generalRequest(`${URL}/users/${notification.notificated_user}/followers/${notification.follower}`, 'POST' )
	}
};

export default resolvers;
