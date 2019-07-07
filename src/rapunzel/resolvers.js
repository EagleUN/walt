import { protectedGeneralRequest } from '../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		// NotificationByUser: (_, { user }) =>
		// 	protectedGeneralRequest(user, `${URL}/notifications/${user}`, 'GET'),
	},
	Mutation: {
		createShareNotification: (_, { notification }) =>
			protectedGeneralRequest(notification.follower, `${URL}/posts/${notification.post_id}/shares/${notification.follower}`, 'POST'),
		createFollowNotification: (_, { notification }) =>
			protectedGeneralRequest(notification.follower, `${URL}/users/${notification.notificated_user}/followers/${notification.follower}`, 'POST' ),
		addToken:(_,{token}) =>
			protectedGeneralRequest(token.user_id, `${URL}/users/${token.user_id}/tokens/${token.token}`,'POST')
	}
};

export default resolvers;
