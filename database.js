const {client} = require('pg')

const client = new client({
    host: 'localhost',
    user: 'postgres',
    port: '3000',
    database: 'mytodos'
})

module.exports = client