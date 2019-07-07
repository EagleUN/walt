export const feedTypeDef = `
`;

export const feedQueries = `
    homeFeedForUser(id: String!): [Post]!
    profileFeedForUser(id: String!): [Post]!
    
    homeFeedForUserHack(id: String!): [Post]!
    profileFeedForUserHack(id: String!): [Post]!
`;
