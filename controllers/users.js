
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');
const validator = require('email-validator');
const { getTokenData } = require('../utils');


const addUser = async (req, res)=>{
    const user = req.body;
    const insertQuery = `insert into users(first_name, last_name, email, password)
               values($1, $2, $3, $4) RETURNING *`
    let hashedPassword = null
    if(user.first_name && user.first_name.trim().length < 1){
        return res.status(400).send({
             message: 'fill first name'
         })
     }
     if(user.last_name && user.last_name.trim().length < 1){
      return res.status(400).send({
          message: 'fill last name'
      })
     }
    if(user.email && user.email.trim().length < 1){
      return res.status(400).send({
          message: 'fill email'
      })
     }
     if(user.password && user.password.trim().length < 1){
      return res.status(400).send({
          message: 'fill password'
      })
    }
    const email = req.body.email;
    
    const isValidEmail = validator.validate(email);
    if(!isValidEmail){
        return res.status(400).send({
            Message: 'Email invalid'
            
        })
     }
    try {
        const hashed = await bcrypt.hash(user.password, 10)
        hashedPassword = hashed

    } catch (err) {
        return res.status(400).send({
            message: 'failed hashing',
            data: err.message
         }) 
    }
    try {
        const values = [user.first_name, user.last_name, user.email, hashedPassword]

        const result =  await db.query(insertQuery, values)
        delete result.rows[0].password
        console.log('uuu', result.rows[0])
        return res.status(200).send({
            message: 'Added user successfully',
            data: result.rows[0]
        })
    } catch (err) {
        return res.status(400).send({
            message: 'Failed to add user',
            data: err.message
         })
    }
}

const loginUser = async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password; 

    if(email && email.trim().length<1) {
        return res.status(200).send({
              message: 'fill email'
        
        })
    } 
    if(password && password.trim().length<1) {
        return res.status(200).send({
               message: 'fill password'
        })
    }
    try{

      const selectUser = `select * from users where email = $1`
      const result = await db.query(selectUser, [email])
        
      const hashedPassword = result.rows[0].password       

      const comparedPassword = await bcrypt.compare(password, hashedPassword) 
      
         if(comparedPassword == true) { 
        const id = result.rows[0].id
        
        const accessToken = jwt.sign({id}, process.env.SECRET_KEY) 
        
            return  res.status(200).send({
                first_name: result.rows[0].first_name,
                accessToken: accessToken
            })
       }
       else{
        return res.status(401).send({
            message: 'Not Authorised',
            data:  'Wrong password or email'
        })
       }
     }
       catch(err){
           return res.status(400).send({
               message: 'authetication failed',
               data: err.message
           })
       }

} 

const getUser = (req,res)=>{
 const values =[req.params.id] 
 
 db.query(`select * from users where id=$1`, values, (err, result)=>{
     if(err){
         return res.status(400).send({
             message : 'fail',
             data: err.message
         })
   }
    if(result.rows.length<1){
        return res.status(200).send({
            message : 'Not found'
        })
    }
    else{
        delete result.rows[0].password
        return res.status(200).send({
            message: 'Successful',
            data: result.rows[0]
        })
    }
 })
}
const editUser = (req,res)=>{
   const user = req.body
   const values =[user.first_name, user.last_name, req.params.id]
   const editQuery = `update users set
   first_name =$1, last_name = $2 where id = $3 RETURNING *`
   
   db.query(editQuery, values, (err, result)=>{
   if(err){
       return res.status(401).send({
           message: 'Not Authorised',
           data: err.message
       })
   }
   else{
       return res.status(200).send({
           message: 'edit successful',
           data: result.rows[0]
       })
   }
})
}

module.exports = {
    addUser,
    loginUser,
    getUser,
    editUser
    
} 