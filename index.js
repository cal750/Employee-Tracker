// adding in required constants
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const promisemysql = require("promise-mysql");
const { Action } = require("rxjs/internal/scheduler/Action");
const { ADDRGETNETWORKPARAMS } = require("dns");

//setting up the connection port and mysql settings
const connection = {
    host: "localhost",
    port: 3001,
    user: "root",
    password: "password",
    database: "employee_DB"
}

//extend connection to mysql
const connect = mysql.createConnection(connection);

//Start up connection
connect.connect((err) => {
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
            "Add Role",
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
                addRole();
                break;

            case "View Budget":
                viewBud();
                break;
        }
    });
}

// starting code to pull and push the repository
// View all employees 
function viewAllEmp(){

    // Query to view all employees
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

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
    promisemysql.createConnection(connectionProperties
    ).then((conn) => {

        return conn.query('SELECT name FROM department');
    }).then(function(value){
        deptQuery = value;
        for (i=0; i < value.length; i++){
            deptArr.push(value[i].name);
            
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
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;
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

function viewMan(){

    let roleArr = [];

    promisemysql.createConnection(connectionProperties)
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


            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if(err) return err;

                console.log("\n");
                console.table(res);
                menu();
            });
        });
    });
}

