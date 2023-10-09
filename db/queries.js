const Pool = require('pg').Pool()
const pool = new Pool({
    user  : 'postgres',
    host  : 'localhost',
    database: 'film',
    password: 'postgres',
    port: 5432,
})

const getUsers = (request, response) =>{
pool.query('SELECT * FROM public.actor', (error, result) =>{
if (error) {
    throw error;
    }
    response.status(200).json(results.rows)
})
}