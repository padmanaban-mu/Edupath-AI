const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'modules');

const curriculum = [
  {
    moduleId: 'module1',
    name: 'Introduction to SQL & Databases',
    questions: [
      {
        id: 'q1',
        title: 'Select All Columns',
        description: 'Write a SQL query to SELECT all columns (*) from a table named `Employees`.',
        input: 'Table: Employees',
        expected_output: 'All records and columns from the Employees table.'
      },
      {
        id: 'q2',
        title: 'Specific Column Selection',
        description: 'Write a query to retrieve only the `first_name` and `email` columns from the `Users` table.',
        input: 'Table: Users',
        expected_output: 'A result set with exactly 2 columns.'
      },
      {
        id: 'q3',
        title: 'String Concatenation',
        description: 'Using the `Products` table, write a single query that returns a custom column via concatenation, formatting output as "Product: [name] costs $ [price]", aliasing it as `Product Details`.',
        input: 'Table: Products (name, price)',
        expected_output: 'A single column `Product Details` with formatted strings.'
      }
    ]
  },
  {
    moduleId: 'module2',
    name: 'Basic SELECT & Filtering',
    questions: [
      {
        id: 'q1',
        title: 'Filter by Exact Match',
        description: "Write a query to select all employees from the `Employees` table where `department` = 'Sales'.",
        input: 'Table: Employees (department)',
        expected_output: 'Only sales department employees.'
      },
      {
        id: 'q2',
        title: 'Multiple Conditions (AND/BETWEEN)',
        description: "Select all products from `Inventory` where the string `status` is 'In Stock' AND `price` is between 50 and 150.",
        input: 'Table: Inventory (status, price)',
        expected_output: 'Relevant filtered products matching both conditions.'
      },
      {
        id: 'q3',
        title: 'Wildcards and Logical OR',
        description: "Write a query on the `Customers` table to find all users whose email ends with '@gmail.com' using the LIKE operator, OR their `status` is marked as 'VIP'.",
        input: 'Table: Customers (email, status)',
        expected_output: 'Matching rows based on wildcard search and logical OR.'
      }
    ]
  },
  {
    moduleId: 'module3',
    name: 'Aggregates & Grouping',
    questions: [
      {
        id: 'q1',
        title: 'Count Total Records',
        description: 'Count the total number of orders in the `Orders` table using the `COUNT()` function and alias it as `Total Orders`.',
        input: 'Table: Orders',
        expected_output: 'A single row/column with the count.'
      },
      {
        id: 'q2',
        title: 'Average Grouped by Column',
        description: 'Write a query to find the `AVG(salary)` grouped by `department` from the `Employees` table.',
        input: 'Table: Employees (department, salary)',
        expected_output: 'Two columns: `department` and `avg_salary`.'
      },
      {
        id: 'q3',
        title: 'HAVING Clause',
        description: 'Group `Sales` records by `region`. Calculate the `SUM(revenue)` and only return regions (using HAVING) where the total revenue exceeds 10,000.',
        input: 'Table: Sales (region, revenue)',
        expected_output: 'Regions where aggregate sum strictly > 10,000.'
      }
    ]
  },
  {
    moduleId: 'module4',
    name: 'SQL JOINS',
    questions: [
      {
        id: 'q1',
        title: 'INNER JOIN',
        description: "Perform an INNER JOIN between `Customers` and `Orders` on `customer_id`. Select the customer's `name` and the `order_date`.",
        input: 'Tables: Customers(id, name), Orders(customer_id, order_date)',
        expected_output: 'Matching records across both tables.'
      },
      {
        id: 'q2',
        title: 'LEFT JOIN & Self-Joins',
        description: 'Write a LEFT JOIN taking all `Employees` and their possible Manager details. Select employee `name` and manager `name`.',
        input: 'Table: Employees (id, name, manager_id)',
        expected_output: 'All employees; if no manager, manager name is NULL.'
      },
      {
        id: 'q3',
        title: 'FULL OUTER JOIN',
        description: 'Perform a FULL OUTER JOIN (or UNION equivalent) between `Students` and `Courses` on `course_id`. Help identify students without courses and courses without students.',
        input: 'Tables: Students(id, name, course_id), Courses(id, title)',
        expected_output: 'Complete set including NULL matches on both sides.'
      }
    ]
  },
  {
    moduleId: 'module5',
    name: 'Subqueries & CTEs',
    questions: [
      {
        id: 'q1',
        title: 'Basic WHERE Subquery',
        description: 'Use a basic subquery in the WHERE clause to find employees in the `Staff` table whose salary is strictly greater than the average salary of all staff.',
        input: 'Table: Staff (salary)',
        expected_output: 'Staff earning above the calculated average.'
      },
      {
        id: 'q2',
        title: 'Derived Tables (FROM Subquery)',
        description: 'Take the `Sales` table, calculate total sales per `employee_id` in the subquery, and then filter the outer query for totals > 500.',
        input: 'Table: Sales (employee_id, amount)',
        expected_output: 'Specific employees exceeding quota.'
      },
      {
        id: 'q3',
        title: 'Common Table Expressions (CTE)',
        description: 'Write a query using a CTE `WITH Regional_Sales AS (...)` to first calculate total sales per region, then select the max total sales from that CTE.',
        input: 'Table: Sales (region, amount)',
        expected_output: 'The single highest regional sales figure.'
      }
    ]
  },
  {
    moduleId: 'module6',
    name: 'Data Manipulation (DML)',
    questions: [
      {
        id: 'q1',
        title: 'INSERT Data',
        description: "Write an INSERT INTO statement to add a new record to the `Books` table: 'The Hobbit', `author`='J.R.R Tolkien', `year`=1937.",
        input: 'Table: Books (title, author, year)',
        expected_output: '1 row inserted successful state.'
      },
      {
        id: 'q2',
        title: 'UPDATE Records',
        description: "Write an UPDATE statement that sets `status` = 'Shipped' in the `Orders` table for all orders where `order_date` is before '2023-01-01'.",
        input: 'Table: Orders (status, order_date)',
        expected_output: 'Successfully updated historical orders.'
      },
      {
        id: 'q3',
        title: 'DELETE with Conditions',
        description: "Write a DELETE statement to remove data from the `Sessions` table but ONLY for records where `last_active` < '2022-01-01' AND `is_bot` = True.",
        input: 'Table: Sessions (last_active, is_bot)',
        expected_output: 'Specific deletion of matched rows only.'
      }
    ]
  },
  {
    moduleId: 'module7',
    name: 'Table Creation & Structure (DDL)',
    questions: [
      {
        id: 'q1',
        title: 'CREATE TABLE Basics',
        description: 'Write a CREATE TABLE statement for `Users` with three columns: `id` (INT), `username` (VARCHAR(50)), and `created_at` (DATE).',
        input: 'Schema Requirements: id, username, created_at',
        expected_output: 'Valid schema creation.'
      },
      {
        id: 'q2',
        title: 'Constraints (PK & NOT NULL)',
        description: 'Write a CREATE TABLE script for `Products` that includes a PRIMARY KEY on `id`, and a NOT NULL constraint on `price`.',
        input: 'Schema Requirements: id (PK), price (NOT NULL)',
        expected_output: 'Schema enforcement of constraints.'
      },
      {
        id: 'q3',
        title: 'ALTER TABLE & Foreign Keys',
        description: 'Use ALTER TABLE on an existing `Employees` table. Add a new column `phone_number` of type VARCHAR(15), and add a FOREIGN KEY constraint linking `department_id` to the `Departments (id)` table.',
        input: 'Tables: Employees, Departments',
        expected_output: 'DB structure altered safely.'
      }
    ]
  },
  {
    moduleId: 'module8',
    name: 'Advanced SQL Concepts',
    questions: [
      {
        id: 'q1',
        title: 'CASE WHEN Statements',
        description: "Write a query utilizing CASE WHEN. In the `Students` table, return `name` and a new column `Grade Type`: 'Pass' if `score` >= 50, else 'Fail'.",
        input: 'Table: Students (name, score)',
        expected_output: 'Data categorized logically by row.'
      },
      {
        id: 'q2',
        title: 'Window Functions (RANK)',
        description: 'Write a window function query using `RANK() OVER (ORDER BY score DESC)`. Return all students and their respective rank based on score.',
        input: 'Table: Students (name, score)',
        expected_output: 'Rank sequence appended.'
      },
      {
        id: 'q3',
        title: 'String Extraction & Aggregation',
        description: "Using the string/regex commands available, extract the domain names from the `email` column in the `Leads` table (e.g. from 'user@yahoo.com' extract 'yahoo.com'). Group by those domains and order by count descending.",
        input: 'Table: Leads (email)',
        expected_output: 'A frequency list of email domains.'
      }
    ]
  },
  {
    moduleId: 'mock-test',
    name: 'Final Mock Assessment',
    questions: [
      {
        id: 'q1',
        title: 'Mock Test: Joins & Aggregates',
        description: "Write a query to JOIN `Orders` and `Customers`. Find the total sum of `order_amount` grouped by customer `name`, but only include customers who have placed more than 2 orders.",
        input: 'Tables: Orders(customer_id, order_amount), Customers(id, name)',
        expected_output: 'Customer names with their aggregate order sum.'
      },
      {
        id: 'q2',
        title: 'Mock Test: Complex DML',
        description: "Write an UPDATE statement to increase the `salary` by 10% in the `Employees` table, but ONLY for those whose `department_id` belongs to a department named 'Engineering' (use a subquery).",
        input: 'Tables: Employees(salary, department_id), Departments(id, name)',
        expected_output: 'Engineers receive a 10% salary bump.'
      },
      {
        id: 'q3',
        title: 'Mock Test: Advanced Analytics',
        description: 'Write a query utilizing a CTE to find the average `score` per `class_id`. Then, join this CTE back to the `Students` table to select students whose individual score is higher than their class average.',
        input: 'Table: Students (id, name, score, class_id)',
        expected_output: 'Students outperforming their class average.'
      }
    ]
  }
];

if (!fs.existsSync(modulesDir)) {
  fs.mkdirSync(modulesDir, { recursive: true });
}

curriculum.forEach(mod => {
  const modPath = path.join(modulesDir, mod.moduleId);
  if (!fs.existsSync(modPath)) {
    fs.mkdirSync(modPath, { recursive: true });
  }
  
  mod.questions.forEach(q => {
    const qPath = path.join(modPath, `${q.id}.json`);
    const content = {
      title: q.title,
      description: q.description,
      input: q.input,
      expected_output: q.expected_output
    };
    fs.writeFileSync(qPath, JSON.stringify(content, null, 2));
  });
});

console.log('Successfully generated 27 SQL questions across 8 modules and 1 Mock Test.');