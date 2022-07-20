const Todo = require('./controllers')
const router = (app) => {
    app.post('/todos', Todo);
}

module.exports = router;