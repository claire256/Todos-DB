const db = require('../database');
const { getTokenData } = require('../utils');

const addTodo = (req,res) =>{
    const todo = req.body;
    const tokenData = getTokenData(req)
    const insertQuery = `insert into todos ( title, description, date, users_id)
                     values($1, $2, $3, $4) RETURNING *`
      const values = [todo.title, todo.description, todo.date, tokenData.id]
      
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
    
    const tokenData = getTokenData(req);
    values = [tokenData.id]
    db.query(`select * from todos where users_id = $1`, values, (err, result)=>{
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

const tokenData = getTokenData(req)
const values = [req.params.id, tokenData.id]

    db.query(`select * from todos where id=$1 and users_id=$2`, values, (err, result)=>{
   
        if(err) {
            return  res.status(400).send({
                status: 'fail',
                data: err.message
            })
            
        }
        if(result.rows.length<1){
            console.log('rrrrrrrrr', result.rows)
            return res.status(200).send({
                status: 'Not Found'
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
    const tokenData = getTokenData(req);
    const todo = req.body;
    const values = [todo.title, todo.description, todo.date, req.params.id, tokenData.id]

    const editQuery = `update todos set
     title = $1, 
     description = $2, 
     date = $3
     where id = $4 and users_id = $5 RETURNING *`

      db.query(editQuery, values, (err, result)=> {
        console.log('hhhhhh', result.rows)
        if(err){
        return res.status(400).send({
             status: 'edit failed',
             data: err.message
          })
         }

         else{
             return res.status(200).send({
                 status: 'edit successful',
                 data: result.rows
             })
         }
        })
    }

const deleteTodo = (req, res) => {
    const tokenData = getTokenData(req) 
    const values = [req.params.id, tokenData.id]

    db.query(`delete from todos where id = $1 and users_id = $2`, values, (err, result)=> {
      
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