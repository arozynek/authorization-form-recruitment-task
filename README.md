The task consists of two stages:

1. API preparation

2. Preparing a component in Angular based on a mock-up

## API

1. The API should be prepared in the Ballerina language (Ballerina Home).

2. The API should provide 5 methods

* GET /users - retrieves a list of all users

* GET /users/<id> - retrieves a single user with a specific ID

* POST /users - the request body should contain a new User object that will be added to the list of users

* POST /users/resetPassword - in the body request we pass the email of the user for whom we want to reset the password. If the user with the given email address is on the list, we return the response code Accepted (202). If the user is not on the list, we return the Bad Request code (400).

* POST /auth/login - we provide email and password in the body request. If the combination matches a user from the list, we return the response code Ok (200). In case of invalid combination, we return the response code Unauthorized (401)

3. The user list should be kept in memory. There is no need to use any databases or other sources.


## Frontend:

Angular application with the ability to log in, register and reset password.

### Login form - main view:

![Login](assets/login.png)

### Registration form with password visibility change and errors:

![Registration](assets/register.png)

![Visible password](assets/unhided-error.png)

![Errors](assets/error-hided.png)

