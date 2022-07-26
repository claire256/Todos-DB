const Todo = require('./controllers');
const db = require('./database');
const router = (app) => {
    
    app.post('/todos', Todo.addTodo);
    app.get('/todos', Todo.getAllTodos);
    app.get('/todos/:id', Todo.getTodo);
    app.put('/todos/:id', Todo.editTodo )
    app.delete('/todos/:id', Todo.deleteTodo)
    
}


module.exports = router;