const jwt = require('jsonwebtoken');

const getTokenData = (req) =>{ 
    const token = req.headers.authorization;

    const newToken = token.replace("Bearer ", "");
    const result = jwt.verify(newToken, process.env.SECRET_KEY);
    console.log('fffffff', result)
    return result
}

const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization;
    const newToken = token.replace("Bearer ", "");
    console.log('jjjjjj', newToken)
  
    const verify = jwt.verify(newToken, process.env.SECRET_KEY);
    console.log('vvvvv', verify);
    if(verify.id){
    
          next();
   }
   else{
       return res.json({
           login: false,
           data: 'fail'
       })
   }
}

module.exports = {
    getTokenData,
    verifyToken
}