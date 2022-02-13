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
        case "Add Role":
          addRole();
          break;
        case "Remove Role":
          deleteRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Remove Department":
          deleteDepartment();
          break;
        default:
          init();
          break;
      }
    });
}

function viewAllEmployees() {
  connection.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

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

function viewAllEmployeesByDepartments() {
  connection.query(`SELECT id, name FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

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

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Role Title",
        name: "name",
      },
      {
        type: "input",
        message: "Salary",
        name: "salary",
      },
      {
        type: "input",
        message: "Department ID",
        name: "department_id",
      },
    ])
    .then((input) => {
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`,
        [input.name, input.salary, input.department_id],
        (err, res) => {
          if (err) throw err;
          init();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Department Name",
        name: "name",
      },
    ])
    .then((input) => {
      connection.query(
        `INSERT INTO department (name) VALUES (?);`,
        [input.name],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function deleteEmployee() {
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
    ])
    .then((input) => {
      connection.query(
        `DELETE FROM employee WHERE first_name=? AND last_name=?;`,
        [input.first_name, input.last_name],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function deleteDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Department Name",
        name: "name",
      },
    ])
    .then((input) => {
      connection.query(
        `DELETE FROM department WHERE name=?;`,
        [input.name],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function deleteRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Role Title",
        name: "title",
      },
    ])
    .then((input) => {
      connection.query(
        "DELETE FROM role WHERE title= ?;",
        [input.title],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}
