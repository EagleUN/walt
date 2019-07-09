export const feedTypeDef = `
`;

export const feedQueries = `
    homeFeedForUserHack(id: String!): [Post]!
    profileFeedForUserHack(id: String!): [Post]!

    homeFeedForUser(id: String!): [Post]!
    profileFeedForUser(id: String!): [Post]!
`;
