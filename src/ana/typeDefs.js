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
`;

export const anaQueries = `
    following(userId: String!): UserIdList!
    followers(userId: String!): UserIdList!
    follows(followerId: String!, followingId: String!) : FollowsBoolean!
`;

export const anaMutations = `
    createFollow(followerId: String!, followingId: String!): Follow!
    deleteFollow(followerId: String!, followingId: String!): Follow!
`;
