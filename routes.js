const Todo = require('./controllers');
const db = require('./database');
const router = (app) => {
    app.post('/todos', Todo.addTodo);
    app.get('/todos', Todo.getAllTodos);
    
}


module.exports = router;