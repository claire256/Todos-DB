const Todo = require('./controllers/todos');
const User = require('./controllers/users')
const db = require('./database');
const {verifyToken} = require('./utils');
const router = (app) => {
    
    app.post('/todos', verifyToken, Todo.addTodo);
    app.get('/todos', verifyToken, Todo.getAllTodos);
    app.get('/todos/:id', verifyToken, Todo.getTodo);
    app.put('/todos/:id', verifyToken, Todo.editTodo );
    app.delete('/todos/:id', verifyToken, Todo.deleteTodo);
    app.post('/signup', User.addUser);
    app.post('/login', User.loginUser);
    app.get('/users/:id', verifyToken, User.getUser)
        
}

module.exports = router;