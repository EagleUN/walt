export const vanellopeTypeDef = `
type User {
    id: String!
    name: String!
    last_name: String!
    email: String!
}

input NewUser {
    name: String!
    last_name: String!
    email: String!
    password: String!
    password_confirmation: String!
}

type userList {
    total: Int!
    list: [User]!
}

input updateUser {
    name: String!
    last_name: String!
    email: String!
    password: String!
    password_confirmation: String!
    current_password: String!
}

input EmailUser{
    email: String!
}

input IdUser{
    id: String!
}

type UserSession{
    id: String!
    session: Boolean!
}

input loginUser{
    email: String!
    password: String!
}`;


export const vanellopeQueries = `
    allUsers: userList!
    userById(id: IdUser!): User!
    userByEmail(email: EmailUser!): User!
    userSess(user: loginUser!): UserSession!
`;

export const vanellopeMutations = `
    createUser(user: NewUser!): User!
    updateUser(user: updateUser!): User!
    deleteUser(id: IdUser!): String
    createNewUserSession(user: loginUser!): UserSession!
    deleteUserSession: String
`;
