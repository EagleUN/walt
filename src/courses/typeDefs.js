export const postsTypeDef = `
type Post {
    id: String!
    createdAt: String!
    idCreator: String!
    content: String!
}
input PostUpdate {
    newContent: String!
}
input PostInput {
    idCreator: String!
    content: String!
}`;

export const postsQueries = `
    postById(id: String!): Post!
`;

export const postsMutations = `
    createPost(post: PostInput!): Post!
    deletePost(id: String!): Post!
    updatePost(id: String!, newContent: PostUpdate!): Post!
`;
