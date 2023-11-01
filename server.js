
const mysql = require('mysql2');
const inquirer = require('inquirer');
const table= require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ssss',
  database: 'Employee',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
  startApp();
});

function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Exit':
          db.end();
          break;
      }
    });
}


function viewAllEmployees() {
  const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department, m.first_name AS manager_first_name, m.last_name AS manager_last_name
    FROM Employees e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN Employees m ON e.manager_id = m.id
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error while fetching employee data: ' + err);
      return;
    }
    console.log('\nVIEW ALL EMPLOYEES\n');
    console.table(result);
    startApp();
  });
}


function viewAllRoles() {
  const query = `SELECT r.id, r.title, r.salary, d.name AS department
    FROM Role r
    LEFT JOIN department d ON r.department_id = d.id`;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error while fetching role data: ' + err);
      return;
    }
    console.log('\nVIEW ALL ROLES\n');
    console.table(result);
    startApp();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      message: 'Enter the name of the department:',
      name: 'departmentName',
    })
    .then((answers) => {
      const department = {
        name: answers.departmentName,
      };
      db.query('INSERT INTO department SET ?', department, (err) => {
        if (err) {
          console.error('Error adding department: ' + err);
        } else {
          console.log(`Department "${answers.departmentName}" added successfully.`);
        }
        startApp();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "Enter the role's title:",
        name: 'roleTitle',
      },
      {
        type: 'input',
        message: "Enter the role's salary:",
        name: 'roleSalary',
      },
      {
        type: 'input',
        message: "Enter the department ID for this role:",
        name: 'departmentId',
      },
    ])
    .then((answers) => {
      const role = {
        title: answers.roleTitle,
        salary: answers.roleSalary,
        department_id: answers.departmentId,
      };
      db.query('INSERT INTO Role SET ?', role, (err) => {
        if (err) {
          console.error('Error adding role: ' + err);
        } else {
          console.log(`Role "${answers.roleTitle}" added successfully.`);
        }
        startApp();
      });
    });
}
function addEmployee() {
  // First, let's prompt for the employee's first name and last name.
  inquirer
    .prompt([
      {
        type: 'input',
        message: "Enter the employee's first name:",
        name: 'employeeFirstName',
      },
      {
        type: 'input',
        message: "Enter the employee's last name:",
        name: 'employeeLastName',
      },
    ])
    .then((nameAnswers) => {
      // Prompt for the employee's role.
      db.query('SELECT id, title FROM role', async (err, roles) => {
        if (err) {
          console.error('Error while fetching role data: ' + err);
          startApp();
          return;
        }

        const roleChoices = roles.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        inquirer
          .prompt([
            {
              type: 'list',
              message: 'Select the employee role:',
              name: 'employeeRoleId',
              choices: roleChoices,
            },
          ])
          .then((roleAnswers) => {
            console.log('Selected role ID:', roleAnswers.employeeRoleId); // Add this line to check the selected role ID

            // Prompt for the employee's manager, if applicable.
            db.query('SELECT id, first_name, last_name FROM Employees', async (err, employees) => {
              if (err) {
                console.error('Error while fetching employee data: ' + err);
                startApp();
                return;
              }

              const managerChoices = employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              }));
              managerChoices.push({ name: 'None', value: null });

              inquirer
                .prompt([
                  {
                    type: 'list',
                    message: "Select the employee's manager (if applicable):",
                    name: 'employeeManagerId',
                    choices: managerChoices,
                  },
                ])
                .then((managerAnswers) => {
                  console.log('Selected manager ID:', managerAnswers.employeeManagerId); // Add this line to check the selected manager ID

                  const employee = {
                    first_name: nameAnswers.employeeFirstName,
                    last_name: nameAnswers.employeeLastName,
                    role_id: roleAnswers.employeeRoleId,
                    manager_id: managerAnswers.employeeManagerId,
                  };

                  db.query('INSERT INTO Employees SET ?', employee, (err) => {
                    if (err) {
                      console.error('Error adding employee: ' + err);
                    } else {
                      console.log(
                        `Employee "${nameAnswers.employeeFirstName} ${nameAnswers.employeeLastName}" added successfully.`
                      );
                    }
                    startApp();
                  });
                });
            });
          });
      });
    });
}



function updateEmployeeRole() {
  // First, let's fetch a list of employees so the user can select one to update.
  db.query('SELECT id, first_name, last_name FROM Employees', (err, employees) => {
    if (err) {
      console.error('Error while fetching employee data: ' + err);
      startApp();
      return;
    }

    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    inquirer
      .prompt([
        {
          type: 'list',
          message: 'Select the employee to update:',
          name: 'employeeId',
          choices: employeeChoices,
        },
        {
          type: 'input',
          message: "Enter the employee's new role ID:",
          name: 'newRoleId',
        },
      ])
      .then((answers) => {
        const { employeeId, newRoleId } = answers;

        // Now, update the employee's role in the database.
        db.query(
          'UPDATE Employees SET role_id = ? WHERE id = ?',
          [newRoleId, employeeId],
          (err) => {
            if (err) {
              console.error('Error updating employee role: ' + err);
            } else {
              console.log('Employee role updated successfully.');
            }
            startApp();
          }
        );
      });
  });
}


function viewAllDepartments() {
  const query = 'SELECT * FROM department';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error while fetching department data: ' + err);
      return;
    }
    console.log('\nVIEW ALL DEPARTMENTS\n');
    console.table(result);
    startApp();
  });
}
