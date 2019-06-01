export const notificationTypeDef = `
type ID {
    oid: String!
}

type Notification {
    id: ID!
    notificated_user: String!
    follower: String!
    date: String!
    type: String!
    post_id: String
}
input NotificationInput {
    notificated_user: String!
    follower: String!
    post_id: String
}`;

export const notificationQueries = `
    allNotifications: [Notification]!
    NotificationByUser(user: String!): [Notification]!
`;

export const notificationMutations = `
    createShareNotification(notification: NotificationInput!): Notification!
    createFollowNotification(notification: NotificationInput!): Notification!
`;
