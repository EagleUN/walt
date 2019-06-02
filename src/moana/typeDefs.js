export const feedTypeDef = `
type Post {
    id: String!
    createdAt: String!
    idCreator: String!
    content: String!
}`;

export const feedQueries = `
    homeFeedForUser(id: String!): [Post]!
    profileFeedForUser(id: String!): [Post]!
`;
