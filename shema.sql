--- creating database for the application to retrieve data from ---
CREATE DATABASE employees_DB;
USE employees_DB;

--- employees---
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    depname VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

--- jobs ---
CREATE TABLE job (
    id INT NOT NULL AUTO_INCREMENT,
    jobname VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

--- employees ---
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);