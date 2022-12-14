const jwt = require('jsonwebtoken');

const getTokenData = (req) =>{ 
    const token = req.headers.authorization;
    console.log('token', token)
    const newToken = token.replace("Bearer ", "");
    const result = jwt.verify(newToken, process.env.SECRET_KEY);

    return result
}

const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).send({
            login: false,
            messsage: 'Missing authorization token'
        })
    }
    const newToken = token.replace("Bearer ", "");
  
    const verify = jwt.verify(newToken, process.env.SECRET_KEY);
    
    if(verify.id){
    
          next();
   }
   else{
       return res.json.status(401).send({
           login: false,
           data: 'fail'
       })
   }
}

module.exports = {
    getTokenData,
    verifyToken
}