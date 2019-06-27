export const jazminTypeDef = `
type MusicList {
    name: String!
    url: String!
}
`;

export const jazminQueries = `
    getMusicList(id: String!): MusicList!    
`;