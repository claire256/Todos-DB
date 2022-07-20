const db = require('./database')
const addTodo = (req,res) =>{
    const todo = req.body;
    const insertQuery = `insert into todos ( title, description, date)
                     values($1, $2, $3) RETURNING *`
      const values = [todo.title, todo.description, todo.date]
      
      db.query(insertQuery , values, (err , result)=>{

      if(err){
          return res.status(400).send({
              status: 'fail',
              data: err.message
          })
      }
      else{
          return res.status(200).send({
             status: 'successful',
             data: result.rows[0]
          })    
        
      }

      })               

}
module.exports = addTodo;
