const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Todo = require("../models/todo");
const Subtasks = require("../models/subtodos");
const { initialTodos,
    subTasksinDb,
    todosinDB,
    initalUsers,
    usersInDb,
    userIdinDb } = require("./test_helper");
const api = supertest(app);

async function emptyDatabase(){
    await User.remove({});
    await Todo.remove({});
    await Subtasks.remove({});
}

describe('Tests for todoapp', () => {
    let token = '';
    let adminToken = '';
    beforeAll(async () => {
        await emptyDatabase();

        await api.post('/api/users/signup')
        .send({username: 'test123', name :'test', email: 'test', password: 'test123'});

        await api.post('/api/users/signup')
        .send({username: 'test234', name: 'Admin', email: 'test@commercebear.com', password: 'test123'})
        
        const res1 = await api.post('/api/login')
        .send({username: 'test234', password: 'test123'})


        const res = await api.post('/api/login')
        .send({username: 'test123', password: 'test123'});

        token = 'bearer '+ res.body.token;
        adminToken = 'bearer ' + res1.body.token;

    })
    let todoId = ''
    it("get a 400 response when the title or description is missing from the request", async () => {
        const todoWithoutTitle = {
          description: "Task --4"
        };
    
        await api
          .post("/api/todos")
          .set('Authorization', token)
          .send(todoWithoutTitle)
          .expect(400);
      });
    

    it('should access admin credentials', async () => {
        const res = await api.get('/api/users/admin')
        .set('Authorization', adminToken)
        .send()
    
    const allUsers = await usersInDb()
    expect(res.body.length).toBe(allUsers.length)
    })
    it("fails with statuscode 400 if malformatted string/todo doesnt exist", async () => {
        const nonExistingId = "123aabbcc";
    
        await api.get(`/api/todos/${nonExistingId}`)
        .set('Authorization', token)
        expect(400);
      });

     it('should add a todo', async () => {
        const res = await api.post('/api/todos')
                 .set('Authorization',token)
                 .send({
                     title: 'Test2',
                     description: 'Description',
                     completed: false,
                   })
 
      expect(res.body.title).toBe('Test2');
      expect(res.body.description).toBe('Description');
      expect(res.body.completed).toBe(false);
     })

    it('should update a todo', async () => {

        const completedUpdate = {
            title: "Task --1 Update",
            description: "Print wont work in JS",
            completed: false
          };
        
        const todos = await todosinDB()
        const todoId = todos.map(todo => todo.id)
        
        const updatedTodo = await api
        .put(`/api/todos/${todoId[0]}`)
        .set('Authorization', token)
        .send(completedUpdate);

        const todoAtEnd = await todosinDB()
        const title = todoAtEnd.map(todo => todo.title)

        expect(title).toContain(completedUpdate.title)
    })

    it('update a todos completed status', async () => {
        const response = await api
        .put('/api/todos/5e342a504b67decf27d0d9f1')
        .set('Authorization', token)
        .send({complete: false})

    console.log(response.body)
    })

    it('returns a specific todo', async () => {
        const response = await api
        .get('/api/todos/5e342a504b67decf27d0d9f1')
        .set('Authorization', token)
        .send()
       
        console.log(response.body)
    })
    
    it("should mark as complete a todo", async () => {
        const todos = await todosinDB()
        const todoId = todos.map(todo => todo.id)

        console.log(todoId)

        const completedUpdate = { completed: true };
        const updatedTodo = await api
          .put(`/api/todos/${todoId[0]}/completed`)
          .set('Authorization', token)
          .send(completedUpdate)
          .expect(200);
    });

    it("deleting a todo works accurately", async () => {
        const todos = await todosinDB()
        const todoToDelete = todos.map(todo => todo.id)
        const deletedTodo = await api
        .delete(`/api/todos/${todoToDelete[0]}`)
        .set('Authorization', token)
        .expect(204)
        
        const newTodos = await todosinDB()
        const contents = newTodos.map(todo => todo.title)
        
        expect(contents).not.toContain(deletedTodo.title)
    })

})

afterAll(() => {
    mongoose.connection.close();
});