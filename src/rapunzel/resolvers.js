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
			generalRequest(`${URL}/posts/${notification.post_id}/shares/${notification.follower}`, 'POST'),
		createFollowNotification: (_, { notification }) =>
			generalRequest(`${URL}/users/${notification.notificated_user}/followers/${notification.follower}`, 'POST' ),
		addToken:(_,{token}) =>
			generalRequest(`${URL}/users/${token.user_id}/tokens/${token.token}`,'POST')
	}
};

export default resolvers;
