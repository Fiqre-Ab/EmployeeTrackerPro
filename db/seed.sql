-- Insert department data
INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

-- Insert Role data
INSERT INTO role (title, department_id, salary)
VALUES ('Sales Lead', 1, 10000),
       ('Sales Person', 1, 8000),
       ('Lead Engineering', 2, 20000),
       ('Software Engineering', 1, 14000),
       ('Account Manager', 2, 16000),
       ('Legal Team Lead', 3, 29000),
       ('Lawyer', 3, 19000);

-- Insert employee data
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES
  ('ghrmay', 'birhane', 4, 1),        -- No manager (NULL)
  ('Yenatal', 'erimias', 1, 3),          -- Manager with ID 3
  ('James', 'bond', 2, 4),
  ('Harry', 'Potter', 3, 4),
  ('Beyonce', 'mike', 4, 1),            -- Manager with ID 1
  ('David', 'herisen', 5, 3),
  ('Lilwayne', 'bigline', 6, 1);