 const db = require('./database');
 const usersTableQuery = `CREATE TABLE IF NOT EXISTS users(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(8) NOT NULL,
  last_name VARCHAR(8) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(250) NOT NULL)`

 const todosTableQuery = `CREATE TABLE IF NOT EXISTS todos (
     id BIGSERIAL NOT NULL PRIMARY KEY, 
     title VARCHAR(10) NOT NULL, 
     description VARCHAR(15),
     date DATE NOT NULL,
     users_id BIGINT REFERENCES users(id))`
  
     async function createTables(){

 try {
    await db.query(usersTableQuery)  
    await db.query(todosTableQuery)
   console.log('table created')  
  } catch (error) {
   console.log('error occurred', error)  
 }

 }

 createTables();


