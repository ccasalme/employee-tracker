# Employee Tracker
  
## Description
The Employee Tracker is a command-line application designed to help business owners manage and organize their company's departments, roles, and employees. The application provides an interactive interface for viewing and updating employee data, including employee roles, managers, departments, and salaries

## Features
- Application allows users to **view** departments, employees, all roles, and the total utilized budget of a department (i.e. the combined salaries of all employees in a department)

### View Departments Example

<img width="443" alt="Screenshot 2025-01-06 at 8 20 16 PM" src="https://github.com/user-attachments/assets/21abad75-f946-443d-a75e-eecf3f27d2e3" />

### View Roles Example

<img width="483" alt="Screenshot 2025-01-06 at 8 20 33 PM" src="https://github.com/user-attachments/assets/a537af4d-c4d1-4dfd-80cd-d6f65b7a63ab" />

### View Employees Example

<img width="825" alt="Screenshot 2025-01-06 at 8 20 47 PM" src="https://github.com/user-attachments/assets/0433a8e3-27e7-45cd-b1aa-6507d8789485" />

### View Total Utilized Budget of a Department Example

<img width="695" alt="Screenshot 2025-01-06 at 8 21 19 PM" src="https://github.com/user-attachments/assets/d2d95fd2-82d9-45b3-8dca-c1454b2589ee" />


- Application allows users to **update** departments, employees, and roles
  
- **Any updates on the salaries** will automatically update the **the total utilized budget of a department**
  
- Application also allows users to **remove** employees, roles, and department (if there are employees in the department, the employees and roles MUST be removed first or else the application will throw an error)

### Remove Employee Example

<img width="792" alt="Screenshot 2025-01-06 at 8 27 53 PM" src="https://github.com/user-attachments/assets/04c62e29-4ebd-49e0-942d-8e2becc1d4ba" />


## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  
## Installation
To run this application, ensure Node.js is installed on your computer. If not, download it from (https://nodejs.org/en).

You will also need postgres. Please see: (https://www.postgresql.org/)

### Note
Make sure you have installed the dependencies such as:
- Npm package (e.g. npm install inquirer pg)
- Have PostgreSQL installed

### You Can
1. Clone the repository, fork, or download as ZIP
2. Navigate to the project directory
3. Install the dependencies such NPM and the node-postgres

  
## Usage
Once the application is set up, you can run the Employee Tracker by executing the following command: node index.js and the user will be presented with prompts

### Note
Before you fill out the prompts, it is best that you already have all the information you need. E.g. employee information, department, salary, roles, etc. Although this application will allow you to update and remove, it's a much smoother process if you already have all the information you need.

### Prompts Example

<img width="523" alt="Screenshot 2025-01-06 at 8 19 21 PM" src="https://github.com/user-attachments/assets/daa96c6b-90bb-470f-a3a2-263b2e95eaa9" />


### The application will present you with a menu of options to interact with, including:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
- View employees by manager
- View employees by department
- Delete departments, roles, and employees
- View total utilized budget by department
- Quit

You can navigate the application by selecting the appropriate options based on your needs. You can also select **Quit** to exit out of the application

### Quit Example

<img width="477" alt="Screenshot 2025-01-06 at 8 31 19 PM" src="https://github.com/user-attachments/assets/17eaddb0-84ef-4e44-81fa-10e716d18ed4" />


## Contributing

### My References
- [NPM Package:] (https://www.npmjs.com/)
  
- [Professional README Guide:] (https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide)

- [Video Submission Guide:] (https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide)

- [What is node.js YouTube tutorial:] (https://www.youtube.com/watch?v=TlB_eWDSMt4) (if you are new to node.js and would like a quick lesson of what it is)

- [Working with folders in Node.js] (https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs)

- [Download NodeJS here:] (https://nodejs.org/en)

- [SQL - Postgre SQL] (https://www.postgresql.org/)

  
## Tests
  
YouTube Link can be found here: [Employee Tracker YouTube Video] (https://youtu.be/GRe4Ads3QpA)

  
## License
This project is licensed under the MIT License. See the LICENSE file for more details.
      
