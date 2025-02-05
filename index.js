const inquirer = require('inquirer');
const queries = require('./queries'); // Import the functions from queries.js

const startApp = async () => {
    const answers = await inquirer.prompt([{
        type: 'list', 
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments', // <-- Added View all departments
            'View all roles', // <-- Added View all roles
            'View all employees', // <-- Added View all employees
            'Add a department', // <-- Added Add a department
            'Add a role', // <-- Added Add a role
            'Add an employee', // <-- Added Add an employee
            'Update an employee role', // <-- Added Update an employee role
            'Remove an employee', // <-- Added Remove an employee
            'Update a department', // <-- Added Update a department
            'Remove a department',  // <-- Added Remove a department
            'Remove a role',        // <-- Added Remove a role
            'View total utilized budget by department', // <-- Added viewTotalBudgetByDepartment
            'Quit'
        ],
    }]);

    switch (answers.action) {
        case 'View all departments':
            await queries.viewDepartments();
            break;
        case 'View all roles':
            await queries.viewRoles();
            break;
        case 'View all employees':
            await queries.viewEmployees();
            break;
        case 'Add a department':
            await queries.addDepartment();
            break;
        case 'Add a role':
            await queries.addRole();
            break;
        case 'Add an employee':
            await queries.addEmployee();
            break;
        case 'Update an employee role':
            await queries.updateEmployeeInfo();
            break;
        case 'Remove an employee':
            await queries.removeEmployee();
            break;
        case 'Update a department':
            await queries.updateDepartment();
            break;
        case 'Remove a department':  // <-- Added option to remove a department
            await queries.removeDepartment();
            break;
        case 'Remove a role':        // <-- Added option to remove a role
            await queries.removeRole();
            break;
        case 'Quit':
            console.log('Goodbye!');
            process.exit();
            case 'View total utilized budget by department': // <-- Ensure the case is here
            await queries.viewTotalBudgetByDepartment();
            break;
        case 'Quit':
            console.log('Goodbye!');
            process.exit();
    }

    startApp(); // Recursively call the function to prompt again
};

startApp();
