 const {Pool} = require('pg');

 const db = new Pool({
     host: 'localhost',
     user: 'claire',
     port: 5432,
     database: 'mytodos',
     password: '12345'
 })

 db.connect(err=>{
    if(err) {
       console.error('connection error', err)
    }
    else{
        console.log('connected')
    }
 })


module.exports = db