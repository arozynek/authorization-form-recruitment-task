import ballerina/http;


@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:4200"]
    }
}


service /crossOriginService on new http:Listener(9090) {
    
    


    resource function get users() returns User[] {
        return users.toArray();
    }
    resource function get users/[int id]() returns User|http:NotFound {
        User? user = users[id];
        if user is () {
            return http:NOT_FOUND;
        }
        return user;
    }
    resource function post users(@http:Payload UserLogin user) returns User {
        User newUser = {
        id: users.nextKey(),
        email: user.email,
        password: user.password
        };

        users.add(newUser);
        return newUser;
    }
    resource function post users/resetPassword(@http:Payload Email email) returns http:Accepted|http:BadRequest {
        int emailLength = users.filter(user => user.email == email.email).length();
        if (emailLength > 0) { 
            return http:ACCEPTED;
        } else {
            return http:BAD_REQUEST;
        }
    }
    resource function post auth/login(@http:Payload UserLogin userBody) returns http:Ok|http:Unauthorized {
        foreach User user in users {
            if (user.email == userBody.email && user.password == userBody.password) {
                return http:OK;
            } 
        }
                return http:UNAUTHORIZED;
    }
}

type User record {
    readonly int id;
    string email;
    string password;
};
type Email record {
    string email;
};
type UserLogin record {
    string email;
    string password;
};

table<User> key(id) users = table [
    {id: 1, email: "user1@example.com", password: "password1"},
    {id: 2, email: "user2@example.com", password: "password2"},
    {id: 3, email: "user3@example.com", password: "password3"}
];