const Todo = require('./controllers/todos');
const User = require('./controllers/users')
const db = require('./database');
const router = (app) => {
    
    app.post('/todos', Todo.addTodo);
    app.get('/todos', Todo.getAllTodos);
    app.get('/todos/:id', Todo.getTodo);
    app.put('/todos/:id', Todo.editTodo );
    app.delete('/todos/:id', Todo.deleteTodo);
    app.post('/signup', User.addUser);
    app.post('/login', User.loginUser)
    
}

module.exports = router;