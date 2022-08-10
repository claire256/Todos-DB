
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');

const addUser = async (req, res)=>{
    const user = req.body;
    const insertQuery = `insert into users(first_name, last_name, email, password)
               values($1, $2, $3, $4) RETURNING *`
    let hashedPassword = null
    if(user.first_name.trim().length < 1){
        return res.status(400).send({
             status: 'fill first name'
         })

     }
     if(user.last_name.trim().length < 1){
      return res.status(400).send({
          status: 'fill last name'
      })
     }
    if(user.email.trim().length < 1){
      return res.status(400).send({
          status: 'fill email'
      })
     }
     if(user.password.trim().length < 1){
      return res.status(400).send({
          status: 'fill password'
      })
    }

    try {
        const hashed = await bcrypt.hash(user.password, 10)
       hashedPassword = hashed

    } catch (err) {
        return res.status(400).send({
            status: 'failed hashing',
            data: err.message
         }) 
    }

    try {
        const values = [user.first_name, user.last_name, user.email, hashedPassword]

        const result =  await db.query(insertQuery, values)
        delete result.rows[0].password
        console.log(result.rows)
        return res.status(200).send({
            status: 'Added user successfully',
            data: result.rows[0]
        })
    } catch (err) {
        return res.status(400).send({
            status: 'Fail to add user',
            data: err.message
         })
    }

    // db.query(insertQuery, values, (err, result) =>{
       
    //    if(err){
       
    //     }
    //    else{
    //      return res.status(200).send({
    //            status: 'Added user successfully',
    //            data: result.rows
    //        })
    //    }
    
    // })  
}
const loginUser = async (req, res)=>{
    
    const email = req.body.email;
    const password = req.body.password; 

       try{

      const selectUser = `select * from users where email = $1`
      const result = await db.query(selectUser, [email])
        
      console.log('jkl....', result)

      const hashedPassword = result.rows[0].password       
         console.log('rrrrrrrrrrrr', result.rows)
      const comparedPassword = await bcrypt.compare(password, hashedPassword) 
         console.log('ccccccccccccc', comparedPassword)
      
         if(comparedPassword == true) { 
        const id = result.rows[0].id
        console.log('pppppp',process.env.SECRET_KEY)
        const accessToken = jwt.sign({id}, process.env.SECRET_KEY) 
        
            return  res.status(200).send({
                first_name: result.rows[0].first_name,
                accessToken: accessToken
            })
       }
       else{
        return res.status(401).send({
            status: 'failed',
            data:  'Wrong password or email'
        })
       }
     }
       catch(err){
           console.log('eroooooo', err.message)
           return res.status(400).send({
               status: 'failed',
               data: 'authetication failed'
           })
       }
    //    const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET)
    //          res.json({accessToken: accessToken})

}  

function authenticateToken(req, res, next){
    
}

module.exports = {
    addUser,
    loginUser
} 