# Todo Challenge (Node, MongoDB, Express, Role Based Access)
TodoList challenge in Node, Express, MongoDB <br>
The TodoListAPI is organized around REST

The TodoListAPI uses JWT tokens to authenticate requests. 

## Stack Used:
Node.js <br>
MongoDB <br>
Express.js <br>
JWT Tokens <br>
Jest <br>

## Tools used:
VS Code .rest client <br>
Postman <br>

## Access Control

Access Control List has been created by creating an admin who has access to every route of Users, Todos, SubTasks. <br>
Users without valid access token cannot view their Todos,SubTasks, User Information. <br>

Admin can make GET, PUT, DELETE requests to todos of each user. <br>
Admin can make GET, PUT, DELETE requests to sub todos of todos for each user <br>
Admin can view all the Users, Todos, Subtodos of the entire application <br>

## Design Challenges:

If I were to redo the project, with more time on my hands, I would create better logic for:

1-Sending an email when registering as an Admin to make the API more secure
2-Use third party libraries to generate email campaign to verify user
3-Use two factor authentication for verification
4-Models could be modelled better with one to many relationships without updating their Id's each time 
5-Instead of providing a todoId each time for creating a subtodo, automate that function

## Instructions on how to run the project:

1-Clone the project from the github repository

1-On your terminal, run npm install to download all the project dependencies.

2-Run npm start to start the server at the port specified in the .env file

3-The .env file contains the MONGODB_URI, TEST_MONGODB_URI, SECRET, and a TEST_SECRET reference.

4-These references will be used to authorize access to a database(Test and Production) and validate JWT tokens. 

5-To create the first user, in the requests folder, there is a file by the name of create_user.rest. Alternatively you could use curl or postman to make the requests. Create a User by providing a name, username, email, password making sure username is not less than 5 characters. Username, email and password are mandatory. The email field determines whether a user is an Admin or User. Please proceed with the following steps.
## endpoint:POST http://localhost:3001/api/users/signup
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/create_user/create_user.png)
<br>

![1](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/create_user/response_create_user.png)


6-Proceed to the endpoint to login. Once logged in, you will be provided with an access token that will validate all your API Endpoint requests. Store the token in a safe place since you will require it to access all your application data. In addition, you can store your userId, that is generated as id from the request to check your user details.
## endpoint: POST http://localhost:3001/api/users/login
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/login_user/login_user.png)
<br>

![1](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/login_user/login_response.png)


7-To get the user's active todos, subtodos and the user details, proceed to the endpoint and provide the user's id generated from the previous request:
Make sure you provide the bearer token and request's content-type in the format:
## endpoint: GET http://localhost:3001/api/users/:id
Content-Type: application/json <br>
Bearer: XXXXXXXXXXXX <br>
<br>
![](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_user/.png)
![](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_user/.png)

## If in Postman, you can set the token once and make subsequent requests by providing the saved token
![3](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_user/edit_collection.png)
![4](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_user/add_content_type.png)

## Request:
![3](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_user/get_user_request.png)
![4](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_user/get_user_response.png)

## CRUD Operations

1-Next we start doing CRUD operations.

2-Please providee the title, description and completed status of the todo. In case you donot specifiy the completed status, it will be set to false.

## endpoint: POST http://localhost:3001/api/todos/

![3](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/post_todo/post_todo.png)
![4](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/post_todo/post_todo_response.png)

3-Get the details of the todo that you just posted. This endpoint is accessibly if you provide the todoId in the request as parameters. 
## endpoint: GET http://localhost:3001/api/todos/:id

4-Edit a todo you created with an updated title, description, completed status. In case completed status is not set, it will be set to false

![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_todo/get_todo.png)

## endpoint: PUT http://localhost:3001/api/todos/:id

![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/edit_todo/edit_todo.png)
![1](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/edit_todo/edit_todo_response.png)


5-Change a todo's completed status to True
## endpoint: PUT http://localhost:3001/api/todos/:id/completed
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/edit_status/edit_todo_status.png)
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/edit_status/edit_status_response.png)

6-Delete a todo

## endpoint: DELETE http://localhost:3001/api/todos/:id
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/delete_todo/delete_todo.png)


## SubTodos
## Note in this example, we have deleted the todo we created, therefore it is advised to create two todos so once you have deleted one you still have another to create subtodos for.

## TodoId: 5e36ebcbe5e76abab8bd41c8
## Just like in users, it is better to take note of your userId, for subtodos, it is better to note down your todoId since it will be used to create subtodos.


## endpoint: POST http://localhost:3001/api/subtodos/

1- The endpoint requires the title, description, completed and todoId as body properties. Title, Description, TodoId are mandatory

![3](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/post_subtodo/post_subtodo.png)
![4](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/post_subtodo/post_subtodo_response.png)

2-Get the details of the sub-todo that you just posted. This endpoint is accessibly if you provide the todoId in the request as parameters. 
## endpoint: GET http://localhost:3001/api/subtodos/:id

4-Edit a todo you created with an updated title, description, completed status. In case completed status is not set, it will be set to false

![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_subtodo/get_subtodo.png)
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/get_subtodo/subtodo_response.png)

## endpoint: PUT http://localhost:3001/api/subtodos/:id

![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/edit_subtodo/edit_subtodo.png)
![1](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/edit_subtodo/edit_subtodo_response.png)


5-Change a todo's completed status to True
## endpoint: PUT http://localhost:3001/api/subtodos/:id/completed
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/edit_subtodo_status/edit_subtodo_status.png)
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/edit_subtodo_status/edit_subtodo_status_response.png)

6-Delete a todo

## endpoint: DELETE http://localhost:3001/api/todos/:id
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/delete_subtodo/delete_subtodo.png)

## Admin Endpoints:

## endpoint: http://localhost:3001/api/users/admin

## Not accessibly to non-admin users.
![0](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/admin_role_access/admin_role_request.png)
![1](https://github.com/shehryarbajwa/todo_challenge/blob/master/postman_requests_screenshots/admin_role_access/admin_role_response.png)


## Admin has access to the following endpoints of users

GET http://localhost:3001/api/users/:id <br>
GET http://localhost:3001/api/todos/:id <br>
PUT http://localhost:3001/api/todos/:id <br>
PUT http://localhost:3001/api/todos/:id/completed <br>
DELETE http://localhost:3001/api/todos/:id <br>

GET http://localhost:3001/api/subtodos/:id <br>
PUT http://localhost:3001/api/subtodos/:id <br>
PUT http://localhost:3001/api/subtodos/:id/completed <br>
DELETE http://localhost:3001/api/subtodos/:id <br>

Admin.postman collection has all test suites for admin testing. <br> If you generate a new login for admin, edit the collection and change the authorization(admin) token in Postman and then run the collection suite






