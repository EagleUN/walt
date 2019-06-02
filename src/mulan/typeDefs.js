export const mulanTypeDef = `
type Share {
    userId: String!
    postId: String!
    sharedAt: String!
},
input ShareInput{
    userId: String!
    postId: String!
}
`;

export const mulanQueries = `
    sharesByUser(userId: String!): [Share]!
`;

export const mulanMutations = `
    createShare(share: ShareInput!): Share
    deleteShare(share: ShareInput!): Share
`;
