const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  init();
});

function init() {
  inquirer.prompt([
    {
      type: "list",
      message: "Select an option",
      name: "choice",
      choices: [
        "View All Employees",
        "View all Employees By Department",
        "View All Employees By Role",
        "Update Employee",
        "Add Employee",
        "Remove Employee",
        "View All Departments",
        "Add Department",
        "Remove Department",
        "Add Role",
        "Remove Role",
      ],
    },
  ]);
}
