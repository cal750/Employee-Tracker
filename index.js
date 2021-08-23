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
            "View Departments",
            "view Managers",
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

            case "View Departments":
                viewDep();
                break;

            case "View Managers":
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