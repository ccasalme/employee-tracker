const { Client } = require('pg');
const client = new Client({
    host: 'localhost', // placeholder for your host
    user: 'username', // placeholder for your username
    database: 'employee_tracker', // placeholder for your database name
    password: 'password', //placeholder for your password
    port: 5432, //default port for PostgresSQL
});

client.connect();

const viewDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
};
