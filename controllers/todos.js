const db = require('../database')

const addTodo = (req,res) =>{
    const todo = req.body;
    const insertQuery = `insert into todos ( title, description, date)
                     values($1, $2, $3) RETURNING *`
      const values = [todo.title, todo.description, todo.date]
      
      db.query(insertQuery , values, (err , result)=>{

        if(todo.title.trim().length<1){
        
            return res.status(201).send({
                status: 'fill title'
                 
            })
         }
         
         if(todo.description.trim().length<1){
            
            return res.status(201).send({
                status: 'fill description'
            })
         }
         
         if(todo.date.trim().length<1){
            
            return res.status(201).send({
                status:'fill date'
            })
         }
     
      if(err){
          return res.status(400).send({
              status: 'fail',
              data: err.message
          })
      }
      else{
          return res.status(200).send({
             status: 'successful',
             data: result.rows
          })    
        
      }

      })               
}

const getAllTodos = (req, res)=>{
    db.query(`select * from todos`, (err, result)=>{
      if(err) {
        return  res.status(400).send({
            status: 'fail',
            data: err.message
        })
    }

    else {
        return res.status(200).send({
           status: 'successful',
            data: result.rows
        })
    }
    })

}

const getTodo = (req,res)=> {
    
const values = [req.params.id]

    db.query(`select * from todos where id = $1`, values, (err, result)=>{
        if(err) {
            return  res.status(400).send({
                status: 'fail',
                data: err.message
            })
        }
    
        else {
            return res.status(200).send({
               status: 'successful',
                data: result.rows
            })
        }
        
    })
}

const editTodo = (req, res)=> {
    const todo = req.body;
                     
     const values = [todo.title, todo.description, todo.date]

    const editQuery = `update todos set
     title = $1, 
     description = $2, 
     date = $3
     where id = '${req.params.id}' `

      db.query(editQuery, values, (err, result)=> {
          if(err){
        return res.status(400).send({
             status: 'edit failed',
             data: err.message
          })
         }

         else{
             return res.status(200).send({
                 status: 'edit successful'
             })
         }
        })
    }

const deleteTodo = (req, res) => {
     
    const values = [req.params.id]

    db.query(`delete from todos where id = $1`, values, (err, result)=> {
      
    if(err) {
    return  res.status(400).send({
        status: 'fail',
        data: err.message
    })
   }

   else {
    return res.status(200).send({
       status: 'successful',
        data: result.rows
    })
   }

  })

}
    

module.exports = {
    addTodo,
    getAllTodos,
    getTodo,
    editTodo,
    deleteTodo
}