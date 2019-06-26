export const jazminTypeDef = `
type MusicList {
    name: String!
    url: String!
}
`;

export const jazminQueries = `
    getMusicList(email: String!): MusicList!    
`;
