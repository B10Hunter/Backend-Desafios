const typeDefs = `#graphql

    type Productos{
        _id: ID
        name: String
        price: Float
        src: String
        
    }

    type User {
        _Id: ID
        first_name: String
        last_name: String
        email: String
        password: String
    }

    type Query {
        helloWord: String
        getProds: [Productos]
        getUsers: [User]
    }

    type Mutation {
        registerUser(first_name: String, last_name: String, email: String, password: String): User
    }

`;
export default typeDefs;