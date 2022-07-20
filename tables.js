 const db = require('./database');

 const todosTableQuery = `CREATE TABLE IF NOT EXISTS todos (
     id BIGSERIAL NOT NULL PRIMARY KEY, 
     title VARCHAR(10) NOT NULL, 
     description VARCHAR(15),
     date DATE NOT NULL)`
  async function createTables(){

 try {
   const res = await db.query(todosTableQuery)  
   console.log('table created')  
  } catch (error) {
   console.log('error occurred', error)  
 }

 }

 createTables();


