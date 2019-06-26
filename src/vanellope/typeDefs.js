export const vanellopeTypeDef = `
type User {
    id: String!
    name: String!
    last_name: String!
    username: String!
    email: String!
    last_login: String
}

input NewUser {
    name: String!
    last_name: String!
    username: String!
    email: String!
    password: String!
    password_confirmation: String!
}

type userList {
    total: Int!
    list: [User]!
}

input updateUser {
    id: String!
    name: String!
    last_name: String!
    username: String!
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
    jwt: String!
    id: String!
}

type CheckUserSession{
    id: String!
    email: String!
}

input loginUser{
    email: String!
    password: String!
}`;

export const vanellopeQueries = `
    allUsers: userList!
    userById(id: IdUser!): User!
    userByEmail(email: EmailUser!): User!
    userSess: CheckUserSession!
`;

export const vanellopeMutations = `
    createUser(user: NewUser!): User!
    updateUser(user: updateUser!): String
    deleteUser(id: IdUser!): String
    createNewUserSession(user: loginUser!): UserSession!
    editUserSession(user: updateUser!): User
`;