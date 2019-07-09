export const postsTypeDef = `
input PostUpdate {
    newContent: String!
}
input PostInput {
    idCreator: String!
    content: String!
}`;

export const postsQueries = `
    postById(id: String!): Post!
    postsByCreatorId(id: String!): [Post]!
`;

export const postsMutations = `
    createPostHack(post: PostInput!): Post!
    createPost(post: PostInput!): Post!
    deletePost(id: String!): Post!
    updatePost(id: String!, newContent: PostUpdate!): Post!
`;
