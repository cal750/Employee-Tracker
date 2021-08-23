USE employees_DB;

INSERT INTO department (id, depname)
VALUES (1, "Store Leaders");

INSERT INTO department (id, depname)
VALUES (2, "Fresh Convenience");

INSERT INTO department (id, depname)
VALUES (3, "Grocery");

INSERT INTO department (id, depname)
VALUES (4, "invoice");

INSERT INTO department (id, depname)
VALUES (5, "Customer Experience");

INSERT INTO role (id, jobname, salary, department_id)
VALUES (1, "Store Manager", 120000, 1);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (2, "Assistant Store Manager", 100000, 1);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (3, "Store Officer", 90000, 4);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (4, "Fresh Convenience Manager", 70000, 2);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (5, "Fresh Convenience Worker", 50000, 2);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (6, "Grocery Manager", 80000, 3);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (7, "Grocery Worker", 55000, 3);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (8, "Invoice Worker", 60000, 4);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (9, "Customer Experience Manager", 75000, 5);

INSERT INTO role (id, jobname, salary, department_id)
VALUES (10, "Customer Experience Worker", 50000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Cotton", "Mather", 10, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Deodat", "Lawson", 10, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Edward", "Bishop", 9, 13);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Giles", "Corey", 8, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "James", "Bayley", 3, 12);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "James", "Russel", 7, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "John", "Hathorne", 7, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "John", "Proctor", 6, 13);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Alice", "Young", 5, 11);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Samuel", "Paris", 5, 11);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Ann", "Sears", 4, 13);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (12, "Sarah", "Goode", 2, 13);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (13, "Jonathan", "Corwin", 1, 12);