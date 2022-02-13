const inquirer = require("inquirer");
const mysql = require("mysql2");
// const db = require('./db');

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
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select an option",
        name: "choice",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee",
          "Remove Employee",
          "View all Employees By Department",
          "Add Department",
          "View All Departments",
          "Remove Department",
          "View All Employees By Role",
          "Add Role",
          "Remove Role",
        ],
      },
    ])
    .then((result) => {
      switch (result.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Employees By Role":
          viewAllEmployeesByRoles();
          break;
        case "View all Employees By Department":
          viewAllEmployeesByDepartments();
          break;
        case "Update Employee":
          updateEmployee();
          break;
        case "Add Employee":
          addEmployee();
          break;
        default:
          init();
          break;
      }
    });
}

// view all employees
function viewAllEmployees() {
  connection.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
// view all employee's by role
function viewAllEmployeesByRoles() {
  connection.query(
    `SELECT title, id, salary, department_id FROM role`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}
// view all employees by department
function viewAllEmployeesByDepartments() {
  connection.query(`SELECT id, name FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

// update employee
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Employee ID",
        name: "id",
      },
      {
        type: "number",
        message: "New Role ID",
        name: "role",
      },
    ])
    .then((result) => {
      connection.query(
        `UPDATE employee SET role_id=? WHERE id=?;`,
        [result.role, result.id],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "First Name",
        name: "first_name",
      },
      {
        type: "input",
        message: "Last Name",
        name: "last_name",
      },
      {
        type: "number",
        message: "id number",
        name: "id",
      },
      {
        type: "number",
        message: "manager id number",
        name: "manager_id",
      },
    ])
    .then((input) => {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
        [input.first_name, input.last_name, input.id, input.manager_id],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}
