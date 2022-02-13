use employees_db;

INSERT INTO
    department (name)
VALUES
    ('Retail'),
    ('Engineering'),
INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Cashier', 10000, 1),
    ('Maintenance', 20000, 1),
    ('Web Developer', 45000, 2),
INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Hank', 'Hill', 1, NULL),
    ('Ceri', 'Trammell', 3, NULL),
    ('Marty', 'McFly', 2, 1)