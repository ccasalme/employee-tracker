const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    user: 'username',  // Replace with actual username
    database: 'employee_tracker',  // Replace with actual database name
    password: 'password',  // Replace with actual password
    port: 5432,  // Default port
});

client.connect();

// View All Departments
const viewDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);  // Display in a table format
};

// View All Roles
const viewRoles = async () => {
    const res = await client.query(`
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
};

// View All Employees
const viewEmployees = async () => {
    const res = await client.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, 
        department.name AS department, role.salary, manager.first_name AS manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    console.table(res.rows);
};

// Add a Department
const addDepartment = async () => {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:'
    });

    await client.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
    console.log(`Department '${departmentName}' added!`);
};

// Add a Role
const addRole = async () => {
    const departments = await client.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(department => ({
        name: department.name,
        value: department.id
    }));

    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Choose a department for the role:',
            choices: departmentChoices
        }
    ]);

    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
        [title, salary, departmentId]);
    console.log(`Role '${title}' added!`);
};

// Add an Employee
const addEmployee = async () => {
    const roles = await client.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employees = await client.query('SELECT * FROM employee');
    const managerChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Choose a role for the employee:',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Choose a manager for the employee (or skip):',
            choices: [
                ...managerChoices,
                { name: 'No manager', value: null }
            ]
        }
    ]);

    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [firstName, lastName, roleId, managerId]);
    console.log(`Employee '${firstName} ${lastName}' added!`);
};

// Update an Employee Role
const updateEmployeeRole = async () => {
    const employees = await client.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const roles = await client.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const { employeeId, newRoleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the new role for the employee:',
            choices: roleChoices
        }
    ]);

    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    console.log('Employee role updated!');
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
