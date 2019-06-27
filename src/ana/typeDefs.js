export const anaTypeDef = `
type Follow {
    followerId: String!
    followingId: String!
}

type UserIdList {
    userIds: [String!]!
    count: Int!
}

type FollowsBoolean {
    follows: Boolean!
}


type OtherUser {
    id: String!
    name: String!
    lastName: String!
    followsMe: Boolean!
    iFollow: Boolean!
}

type OtherUserList {
    count: Int
    otherUsers: [OtherUser!]!
}
`;

export const anaQueries = `
    following(userId: String!): UserIdList!
    followers(userId: String!): UserIdList!
    follows(followerId: String!, followingId: String!) : FollowsBoolean!
    userList(userId: String!): OtherUserList!
`;

export const anaMutations = `
    createFollow(followerId: String!, followingId: String!): Follow!
    deleteFollow(followerId: String!, followingId: String!): Follow!
`;
