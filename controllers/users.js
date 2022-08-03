const bcrypt = require('bcrypt');
const db = require('../database')

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

module.exports = addUser;