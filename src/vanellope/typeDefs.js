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

input updateUser {
    name: String!
    last_name: String!
    email: String!
    password: String!
    password_confirmation: String!
    current_password: String!
}

input loginUser{
    email: String!
    password: String!
}`;

export const vanellopeQueries = `
    allUsers: [User]!
    UserByEmail(email: String!): User!
    tokenUser: String
`;

export const vanellopeMutations = `
    createUser(user: NewUser!): User!
    updateUser(user: updateUser!): User!
    deleteUser(id: String!): String
    createNewUserSession(userSession: loginUser!): User!
    deleteUserSession: String
`;
