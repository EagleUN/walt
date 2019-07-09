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
    content: String
    follower_name: String!
}
type UserTokens{
    user_id: String!
    tokens: [String!]!
}

input NotificationInput {
    notificated_user: String
    follower: String!
    post_id: String
}

input UserTokensInput{
    user_id: String!
    token: String!
}`;

export const notificationQueries = `
    allNotifications: [Notification]!
    NotificationByUser(user: String!): [Notification]!
`;

export const notificationMutations = `
    createShareNotification(notification: NotificationInput!): Notification!
    createFollowNotification(notification: NotificationInput!): Notification!
    addToken(token: UserTokensInput!): UserTokens!
`;
