-- Drop the database if it exists
DROP DATABASE IF EXISTS Employee;

-- Create the database
CREATE DATABASE Employee;

-- Switch to the Employee database
USE Employee;

-- Create the department table
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create the Role table
CREATE TABLE Role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Create the Employees table
CREATE TABLE Employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
    manager_id INT UNSIGNED,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES Employees(id) ON DELETE SET NULL
);

-- Insert department data
INSERT INTO department
(name)
VALUES
('Operations'),
('Analystics'),
('Marketing'),
('Executive');

-- Insert Role data
INSERT INTO Role
(title, salary, department_id)
VALUES
('General Manager', 11000000, 1),
('Coach', 4000000, 1),
('Team Lead Analyst', 15000000, 2),
('Team Analyst', 8000000, 2),
('Media Manager', 7000000, 3),
('Media Specialist', 3000000, 3),
('CEO', 45000000, 4),
('CEO Assistant', 25000000, 4);

-- Insert employee data
INSERT INTO Employees
(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Stockton', 1, NULL),
('Karl', 'Malone', 2, 1),
('Michael', 'Jordan', 3, NULL),
('Steve', 'Kerr', 4, 3),
('Shawn', 'Kemp', 5, NULL),
('Gary', 'Peyton', 6, 5),
('Magic', 'Johnson', 7, NULL),
('Larry', 'Bird', 8, 7);
