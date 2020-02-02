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

Access Control List has been created by creating an admin who has access to every route of Users, Todos, SubTasks. Users without valid access token cannot view their Todos,SubTasks, User Information.

Admin can make GET, PUT, DELETE requests to todos of each user.
Admin can make GET, PUT, DELETE requests to sub todos of todos for each user
Admin can view all the Users, Todos, Subtodos of the entire application

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



14-In case you forgot your Todo's id, navigate to the get_user Route and provide your access token and userId to be able to access your todos.

SAMPLE REQUEST
GET http://localhost:3001/api/users/5e33cef2f055d4650112b9b0
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E
endpoint: http://localhost:3001/api/users/5e33cef2f055d4650112b9b0


15- Lets assume we made a mistake and want to delete one of our todos. Make a note of the request you made.
Sample request:
DELETE http://localhost:3001/api/todos/5e33d6e0432f676a43ea0ff9
Authorization: bearer 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E


16-Lets say we completed our morning todo and want to update its status from completed = false to true
Make sure there is /completed after you input the id of the todo

Sample Request:
PUT         http://localhost:3001/api/todos/5e33d5db432f676a43ea0ff8/completed
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E
endpoint: http://localhost:3001/api/todos/5e33d5db432f676a43ea0ff8/completed

17- Next, lets update our todo to change the title and description
Sample Request: 
PUT         http://localhost:3001/api/todos/5e33d5db432f676a43ea0ff8
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E
endpoint:       http://localhost:3001/api/todos/{id}


18-Next lets create a subTask.

Here due to being time constrained, the User has to provide the todoId that needs to have the subTasks. A better and more improved design decision would have been to fetch this from the schema automatically by nesting a schema within a schema and fetching ids that way. Additionally, you could use JS or React's set Id on the front-end and pass it automatically to the backend

Sample Request: 
POST         http://localhost:3001/api/subtasks
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E
endpoint:       http://localhost:3001/api/subtasks

Sample Body:
{
	"title":"Turn Brewing Machine On",
    "description":"At 8.45 am",
    "completed": false,
    "todoId":"5e33d6e0432f676a43ea0ff9"
}

19-Next Lets try to change the completed status of this subTask.

Sample Request: 
PUT         http://localhost:3001/api/subtasks/5e33e3da6328707c31b9f13a/completed
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E
endpoint:       http://localhost:3001/api/subtasks/5e33e3da6328707c31b9f13a

Sample Body:
{
    "completed": true
}


20-Next lets update a subTask

Sample Request:
PUT         http://localhost:3001/api/subtasks/5e33e3da6328707c31b9f13a
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E
{
	"title": "Do meditation before heading for office",
    "description": "Headspace at 8.15 am",
    "completed": false
}

21-Next we can delete a specific subTasks
Sample Request: 
DELETE         http://localhost:3001/api/subtasks/5e33e3da6328707c31b9f13a
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E
endpoint:       http://localhost:3001/api/subtasks/5e33e3da6328707c31b9f13a

21-Finally our last subTask endpoint to view a specific subTask
GET http://localhost:3001/api/subtasks/5e33e3da6328707c31b9f13a
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E



22-Admins have special rights in the system. They can view all available users, todos, and SubTasks
In addition, admins can make changes CRUD to these endpoints.

Admin Routes are all endpoints and one additional endpoint to view all userData.
These are secure and user is not allowed to access this endpoint.

GET http://localhost:3001/api/users/admin
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E


Please Note that 

username: sjobs
password: steve123

is a dummy account that you can use for testing. In case, the token expires, please login again and get a new token. If that happens the above mentioned tokens will not work as a new one will be gennerated.




