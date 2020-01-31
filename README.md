# todo_challenge
TodoList challenge in Node, Express, MongoDB

Instructions on how to run the project:

1-On your terminal, run npm install --save-dev to download all the project dependencies.

2-Run npm start to start the server at the port specified in the .env file


3-To create the first user, in the requests folder, there is a file by the name of create_user.rest. Alternatively you could use curl or postman to make the requests. Please proceed with the following steps:

4-Create a User by providing a name, username, email, password making sure username is not less than 5 characters. All the fields are mandatory. The email field determines whether a user is an Admin or User.

endpoint: http://localhost:3001/api/users/signup

5-Access Control List has been created by creating an admin who has access to every route of Users, Todos, SubTasks. Users without valid access token cannot view their Todos,SubTasks, User Information.

6-Admin is registered by using the email address ending in 

Things to note: Admin Role Access-Sign up with     @commercebear.com
example: steve@commercebear.com
         eric@commercebear.com


7-Once you have created your User account, proceed to request called login.

Things to note:     endpoint: http://localhost:3001/api/login

8-Once logged in, you will be provided an access token and a userId. 
Please save them or note them down since it will be requested on every endpoint you access.
In case you forget, head back to the http://localhost:3001/api/login so you can generate an access token and find your userId.

9-You have the option of seeing all your todos and sub-todos after logging in. Initially they will be empty. If however, you want to check it out, make a note of your userId and navigate to the following endpoint

endpoint:           http://localhost:3001/api/users/


10-Next we start doing CRUD operations.

11-Navigate to the requests file in the todo_requests folder. And click create_todo.rest file. Alternatively, you can use curl to access the endpoint. Please donot forget to use your access token generated earlier to add to your request Authorization with bearer preceeeding it. 
Please providee the title, description and completed status of the todo. In case you donot specifiy the completed status, it will be set to false.

endpoint:           http://localhost:3001/api/todos/
                    POST request
                    Access Token required

Sample request:
POST http://localhost:3001/api/todos
Content-Type: application/json
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E


{
	"title":"Remove morning snow",
    "description":"At 9.15 am",
    "completed": false
}

12-To test out the application better, it is recommended to create two todo tasks. Again following the same procedure.

13- To see an individual todo task, navigate to the endpoint, and provide your todoId.
Sample request:
GET http://localhost:3001/api/todos/5e33d6e0432f676a43ea0ff9
Content-Type: application/json
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb2JzIiwiaWQiOiI1ZTMzY2VmMmYwNTVkNDY1MDExMmI5YjAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTU4MDQ2MDUzMiwiZXhwIjoxNTgwNDgyMTMyfQ.uGelhn_IZaXfFEw4spBfFOY-4t4LA-1004SV_eg_72E

endpoint:                   http://localhost:3001/api/todos/5e33d6e0432f676a43ea0ff9



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




