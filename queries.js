require('dotenv').config();
const { Client } = require('pg');
const inquirer = require('inquirer');

const client = new Client({
    host: process.env.DB_HOST,           // Using environment variable for host
    user: process.env.DB_USER,           // Using environment variable for user
    database: process.env.DB_NAME,       // Using environment variable for database name
    password: process.env.DB_PASSWORD,   // Using environment variable for password
    port: process.env.DB_PORT,           // Using environment variable for port
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

// Update Employee Information (Role, Manager, First Name, Last Name, Salary)
const updateEmployeeInfo = async () => {
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

    // Fetch all employees to display as manager options
    const managers = await client.query('SELECT * FROM employee');
    const managerChoices = managers.rows.map(manager => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
    }));

    // Prompt the user for the employee to update, new role, new manager, new first name, new last name, and salary
    const { employeeId, newRoleId, newManagerId, newFirstName, newLastName, newSalary } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to update:',
            choices: employeeChoices
        },
        {
            type: 'input',
            name: 'newFirstName',
            message: 'Enter the employee\'s new first name:',
        },
        {
            type: 'input',
            name: 'newLastName',
            message: 'Enter the employee\'s new last name:',
        },
        {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the new role for the employee:',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'newManagerId',
            message: 'Select the new manager for the employee (or choose "No manager"):',
            choices: [
                ...managerChoices,
                { name: 'No manager', value: null }
            ]
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'Enter the new salary for the employee:',
            validate: input => {
                if (isNaN(input) || input <= 0) {
                    return 'Please enter a valid salary amount.';
                }
                return true;
            }
        }
    ]);

    // Update the employee’s role, manager, first name, last name, and salary in the database
    await client.query(
        `UPDATE employee 
         SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 
         WHERE id = $5`,
        [newFirstName, newLastName, newRoleId, newManagerId, employeeId]
    );

    // Now update the salary in the role table
    await client.query(
        `UPDATE role
         SET salary = $1
         WHERE id = $2`,
        [newSalary, newRoleId]
    );

    console.log('Employee information and salary updated!');
};

// Update Department
const updateDepartment = async () => {
    // Fetch all departments
    const departments = await client.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(department => ({
        name: department.name,
        value: department.id
    }));

    // Prompt the user to select a department and provide a new name
    const { departmentId, newDepartmentName } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to update:',
            choices: departmentChoices
        },
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'Enter the new name for the department:'
        }
    ]);

    // Update the department in the database
    await client.query('UPDATE department SET name = $1 WHERE id = $2', [newDepartmentName, departmentId]);
    console.log(`Department updated to '${newDepartmentName}'!`);
};

// Remove an Employee
const removeEmployee = async () => {
    const employees = await client.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to remove:',
            choices: employeeChoices
        }
    ]);

    // Remove the employee from the database
    await client.query('DELETE FROM employee WHERE id = $1', [employeeId]);

    console.log('Employee removed!');
};

// Remove a Department
const removeDepartment = async () => {
    const departments = await client.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(department => ({
        name: department.name,
        value: department.id
    }));

    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to remove:',
            choices: departmentChoices
        }
    ]);

    // Remove employees associated with the department's roles (set their role_id to NULL)
    await client.query('UPDATE employee SET role_id = NULL WHERE role_id IN (SELECT id FROM role WHERE department_id = $1)', [departmentId]);
    // OR, if you want to delete employees, uncomment the line below
    // await client.query('DELETE FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = $1)', [departmentId]);

    // Remove roles associated with the department
    await client.query('DELETE FROM role WHERE department_id = $1', [departmentId]);

    // Now remove the department itself
    await client.query('DELETE FROM department WHERE id = $1', [departmentId]);

    console.log('Department removed!');
};


// Remove a Role
const removeRole = async () => {
    const roles = await client.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const { roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'Select a role to remove:',
            choices: roleChoices
        }
    ]);

    // Remove the role from the database
    await client.query('DELETE FROM role WHERE id = $1', [roleId]);

    console.log('Role removed!');
};

// Export the functions for use in index.js
module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeInfo,
    updateDepartment,
    removeEmployee,
    removeDepartment,  // Export the new removeDepartment function
    removeRole         // Export the new removeRole function
};

