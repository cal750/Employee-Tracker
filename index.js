// adding in required constants
const mysql = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");
const promisemysql = require("promise-mysql2");

//setting up the connection port and mysql settings
const connectionPort = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "avacado000",
    database: "employees_DB"
}

//extend connection to mysql
const connection = mysql.createConnection(connectionPort);

//Start up connection
connection.connect((err) => {
    if (err) throw err;

    //Starts the software with a nice cheery gesture
    console.log("Welcome to your company!");
    menu();
});

//function to render the menu for choosing your option

function menu(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "Search by Department",
            "Search by Job Title",
            "Add Employee",
            "Add Department",
            "Add Job Title",
            "View Budget",
        ]
    })
    .then((answer) => {
        //looked up the switch function, not really sure how it works
        switch (answer.action) {
            case "View all Employees":
                viewAllEmp();
                break;

            case "Search by Department":
                viewDep();
                break;

            case "Search by Job Title":
                viewMan();
                break;

            case "Add Employee":
                addEmp();
                break;

            case "Add Department":
                addDep();
                break;

            case "Add Role":
                addJob();
                break;

            case "View Budget":
                viewBudget();
                break;
        }
    });
}

// starting code to pull and push the repository
// View all employees 
function viewAllEmp(){

    // Query to view all employees
    let query = "e.id, e.first_name, e.last_name, role.title, department.depname AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";
    

    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("\n");

        console.table(res);

        menu();
    });
}

function viewDep(){

    // Set global array to store department names
    let deptArr = [];

    // Create new connection using promise-sql
    promisemysql.createConnection(connectionPort
    ).then((conn) => {

        return conn.query('SELECT depname FROM department');
    }).then(function(value){
        deptQuery = value;
        for (i=0; i < value.length; i++){
            deptArr.push(value[i].depname);
            
        }
    }).then(() => {

        // Prompt user to select department from array of departments
        inquirer.prompt({
            name: "department",
            type: "list",
            message: "Which department would you like to search?",
            choices: deptArr
        })    
        .then((answer) => {

            // Query all employees depending on selected department
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.depname AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.depname = '${answer.department}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if(err) return err;
                
                console.log("\n");
                console.table(res);

                // Back to main menu
                menu();
            });
        });
    });
}

// basically the same code again

function viewMan(){

    let roleArr = [];

    promisemysql.createConnection(connectionPort)
    .then((conn) => {
        return conn.query('SELECT title FROM role');
    }).then(function(roles){

        for (i=0; i < roles.length; i++){
            roleArr.push(roles[i].title);
        }
    }).then(() => {

        // Prompt user to select a role
        inquirer.prompt({
            name: "role",
            type: "list",
            message: "Which role would you like to search?",
            choices: roleArr
        })    
        .then((answer) => {


            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.depname AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if(err) return err;

                console.log("\n");
                console.table(res);
                menu();
            });
        });
    });
}

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

// Add employee
function addEmp(){

    // Create two global array to hold 
    let roleArr = [];
    let managerArr = [];

    // Create connection using promise-sql
    promisemysql.createConnection(connectionPort
    ).then((conn) => {
        return Promise.all([
            conn.query('SELECT id, title FROM role ORDER BY title ASC'), 
            conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
        ]);
    }).then(([roles, managers]) => {
        for (i=0; i < roles.length; i++){
            roleArr.push(roles[i].title);
        }
        for (i=0; i < managers.length; i++){
            managerArr.push(managers[i].Employee);
        }

        return Promise.all([roles, managers]);
    }).then(([roles, managers]) => {

        inquirer.prompt([
            {
                // Prompt user of their first name
                name: "firstName",
                type: "input",
                message: "First name: ",
                validate: function(input){
                    if (input === ""){
                        console.log("**NAME REQUIRED**");
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            },
            {
                // Prompt user of their last name
                name: "lastName",
                type: "input",
                message: "Lastname name: ",
                // Validate field is not blank
                validate: function(input){
                    if (input === ""){
                        console.log("**NAME REQUIRED**");
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            },
            {
                // Prompt user of their role
                name: "role",
                type: "list",
                message: "What is their role?",
                choices: roleArr
            },{
                // Prompt user for manager
                name: "manager",
                type: "list",
                message: "Who is their manager?",
                choices: managerArr
            }]).then((answer) => {

                // Set variable for IDs
                let roleID;
                // Default Manager value as null
                let managerID = null;

                // Get ID of role selected
                for (i=0; i < roles.length; i++){
                    if (answer.role == roles[i].title){
                        roleID = roles[i].id;
                    }
                }

                // get ID of manager selected
                for (i=0; i < managers.length; i++){
                    if (answer.manager == managers[i].Employee){
                        managerID = managers[i].id;
                    }
                }

                // Add employee
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
                    if(err) return err;

                    // Confirm employee has been added
                    console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);
                    menu();
                });
            });
    });
}

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

// Add Department
function addDep(){

    inquirer.prompt({

            // Prompt user for name of department
            name: "deptName",
            type: "input",
            message: "Department Name: "
        }).then((answer) => {
                
            // add department to the table
            connection.query(`INSERT INTO department (depname)VALUES ("${answer.deptName}");`, (err, res) => {
                if(err) return err;
                console.log("\n DEPARTMENT ADDED...\n ");
                menu();
            });

        });
}

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

// Add Role
function addJob(){

    // Create array of departments
    let departmentArr = [];

    // Create connection using promise-sql
    promisemysql.createConnection(connectionPort)
    .then((conn) => {

        // Query all departments
        return conn.query('SELECT id, name FROM department ORDER BY name ASC');

    }).then((departments) => {
        
        // Place all departments in array
        for (i=0; i < departments.length; i++){
            departmentArr.push(departments[i].depname);
        }

        return departments;
    }).then((departments) => {
        
        inquirer.prompt([
            {
                // Prompt user role title
                name: "roleTitle",
                type: "input",
                message: "Role title: "
            },
            {
                // Prompt user for salary
                name: "salary",
                type: "number",
                message: "Salary: "
            },
            {   
                // Prompt user to select department role is under
                name: "dept",
                type: "list",
                message: "Department: ",
                choices: departmentArr
            }]).then((answer) => {

                // Set department ID variable
                let deptID;

                // get id of department selected
                for (i=0; i < departments.length; i++){
                    if (answer.dept == departments[i].depname){
                        deptID = departments[i].id;
                    }
                }

                // Added role to role table
                connection.query(`INSERT INTO role (title, salary, department_id)
                VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
                    if(err) return err;
                    console.log(`\n ROLE ${answer.roleTitle} ADDED...\n`);
                    menu();
                });

            });

    });
    
}

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

function viewBudget(){

    promisemysql.createConnection(connectionPort)
    .then((conn) => {
        return  Promise.all([

            conn.query("SELECT department.depname AS department, role.salary FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY department ASC"),
            conn.query('SELECT depname FROM department ORDER BY depname ASC')
        ]);
    }).then(([deptSalaies, departments]) => {
        
        let deptBudgetArr =[];
        let department;

        for (d=0; d < departments.length; d++){
            let departmentBudget = 0;

            // add all salaries together
            for (i=0; i < deptSalaies.length; i++){
                if (departments[d].depname == deptSalaies[i].department){
                    departmentBudget += deptSalaies[i].salary;
                }
            }

            // create new property with budgets
            department = {
                Department: departments[d].depname,
                Budget: departmentBudget
            }
            deptBudgetArr.push(department);
        }
        console.log("\n");

        console.table(deptBudgetArr);

        menu();
    });
}

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//