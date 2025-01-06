const inquirer = require('inquirer');
const queries = require('./queries'); // assuming your query functions are in a separate file

const startApp = async () => {
    const answers = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ],
    });

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
            await queries.updateEmployeeRole();
            break;
        case 'Quit':
            console.log('Goodbye!');
            process.exit();
    }

    // After completing the selected action, prompt the user again.
    startApp();
};

startApp();
