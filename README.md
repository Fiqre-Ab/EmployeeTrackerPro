# EmployeeTrackerPro

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Demo Video](#demo-video)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)
- [License](#license)

## Description

EmployeeTrackerPro is a command-line application built with Node.js, Inquirer, and MySQL. It allows you to manage a company's employee database by providing options to view and update departments, roles, and employees.

## User Story

As a business owner, I want to be able to view and manage the departments, roles, and employees in my company so that I can organize and plan my business.

## Acceptance Criteria

The application must satisfy the following acceptance criteria:

- Display options to view all departments, roles, and employees.
- Allow adding new departments, roles, and employees to the database.
- Allow updating an employee's role.
- Display a formatted table showing department names and IDs when viewing all departments.
- Display a formatted table showing role titles, role IDs, department names, and salaries when viewing all roles.
- Display a formatted table showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers when viewing all employees.

## Demo Video

Watch a demonstration of the application's functionality in [this demo video](#your-video-link-here). You can also find the video link in the README.

## Getting Started

To get started with the EmployeeTrackerPro application, follow these steps:

1. Clone the repository to your local machine.

git clone https://github.com/Fiqre-Ab/EmployeeTrackerPro
Navigate to the project directory.
cd EmployeeTrackerPro
Install the required dependencies using npm.
npm install

Update the MySQL database credentials in the application code.

Open the connection.js file and update the host, port, user, password, and database values to match your MySQL server configuration.
Run the application.

node index.js


## Usage
Follow the on-screen prompts to interact with the application. You can select options to view departments, roles, and employees, add new entries, and update employee roles.

Database Schema
The application uses a MySQL database with the following schema:

department table:

id (INT PRIMARY KEY)
name (VARCHAR(30))
role table:

id (INT PRIMARY KEY)
title (VARCHAR(30))
salary (DECIMAL)
department_id (INT, FOREIGN KEY)
employee table:

id (INT PRIMARY KEY)
first_name (VARCHAR(30))
last_name (VARCHAR(30))
role_id (INT, FOREIGN KEY)
manager_id (INT, FOREIGN KEY, can be NULL)
Technologies Used
The EmployeeTrackerPro application uses the following technologies:

Node.js
Inquirer
MySQL
MySQL2 package
Contributors
This project was developed by [Your Name] as an assignment for a coding bootcamp.

## License
This project is licensed under the MIT License - see the LICENSE file for details.