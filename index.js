const inquirer = require('inquirer');
const queries = require('./queries');

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
        ],
    });

    switch (answers.action) {
        case 'View all departments':
            await queries.viewDepartments();
            break;
        // Add cases for other actions
    }
};

startApp();
