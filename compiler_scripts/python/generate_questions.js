const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'modules');

const curriculum = [
  {
    moduleId: 'module1',
    name: 'Introduction to Python',
    questions: [
      {
        id: 'q1',
        title: 'Hello Python World',
        description: 'Write a Python script that prints the exact phrase "Hello, Python World!".',
        input: '',
        expected_output: 'Hello, Python World!'
      },
      {
        id: 'q2',
        title: 'Welcome User',
        description: 'Write a script that takes a user\'s name via `input()` and prints "Welcome to Python, [Name]!".',
        input: 'Alice',
        expected_output: 'Welcome to Python, Alice!'
      },
      {
        id: 'q3',
        title: 'Star Grid',
        description: 'Write a script that prints a formatted 3x3 grid of asterisks (`*`) using a single `print` statement and newline characters `\\n`.',
        input: '3',
        expected_output: '***\n***\n***'
      }
    ]
  },
  {
    moduleId: 'module2',
    name: 'Variables and Data Types',
    questions: [
      {
        id: 'q1',
        title: 'Variable Types',
        description: 'Create three variables: an integer `a`, a float `b`, and a string `c`. Assign them the values 10, 20.5, and "Code". Print their types using `type()`.',
        input: '',
        expected_output: "<class 'int'>\n<class 'float'>\n<class 'str'>"
      },
      {
        id: 'q2',
        title: 'Swap Values',
        description: 'Write a function `swap_values(x, y)` that takes two variables, swaps their values without using a temporary third variable, and returns them as a tuple `(x, y)`. Case: x=10, y=20.',
        input: '',
        expected_output: '(20, 10)'
      },
      {
        id: 'q3',
        title: 'Type Caster',
        description: 'Write a function `type_caster(val)` that takes a string representing a number, converts it to a float, multiplies it by 2, converts the result back to an integer, and returns it. Input: "15.7"',
        input: '',
        expected_output: '31'
      }
    ]
  },
  {
    moduleId: 'module3',
    name: 'Python Operators',
    questions: [
      {
        id: 'q1',
        title: 'Math Operations',
        description: 'Write a function `math_ops(a, b)` that returns a tuple containing the sum, difference, product, and float division of `a` and `b`. Case: a=10, b=5.',
        input: '',
        expected_output: '(15, 5, 50, 2.0)'
      },
      {
        id: 'q2',
        title: 'Even and Positive',
        description: 'Write a function `is_even_and_positive(num)` that returns `True` if a number is even and strictly positive, and `False` otherwise. Case: 4.',
        input: '',
        expected_output: 'True'
      },
      {
        id: 'q3',
        title: 'Bitwise Swap',
        description: 'Write a function `bitwise_swap(a, b)` that swaps two integers using bitwise XOR (`^`) and returns the swapped tuple `(a, b)`. Case: a=10, b=5.',
        input: '',
        expected_output: '(5, 10)'
      }
    ]
  },
  {
    moduleId: 'module4',
    name: 'Conditional Statements',
    questions: [
      {
        id: 'q1',
        title: 'Temperature Check',
        description: 'Write a function `check_temperature(temp)` that returns "Hot" if temp > 30, "Warm" if temp >= 15, and "Cold" otherwise. Case: 20.',
        input: '',
        expected_output: 'Warm'
      },
      {
        id: 'q2',
        title: 'Leap Year',
        description: 'Write a function `leap_year(year)` that returns `True` if it\'s a leap year and `False` otherwise. Case: 2024.',
        input: '',
        expected_output: 'True'
      },
      {
        id: 'q3',
        title: 'Grade Calculator',
        description: 'Write a function `grade_calculator(score)` that returns \'A\' (>=90), \'B\' (>=80), \'C\' (>=70), \'D\' (>=60), or \'F\' (<60). Handle invalid scores (>100 or <0) by returning "Invalid". Case: 95.',
        input: '',
        expected_output: 'A'
      }
    ]
  },
  {
    moduleId: 'module5',
    name: 'Loops – while loop',
    questions: [
      {
        id: 'q1',
        title: 'Countdown',
        description: 'Write a function `count_down(n)` that prints numbers from `n` down to 1, followed by "Blastoff!". Case: n=3.',
        input: '',
        expected_output: '3\n2\n1\nBlastoff!'
      },
      {
        id: 'q2',
        title: 'Sum of Digits',
        description: 'Write a function `sum_digits(n)` that returns the sum of its digits using a while loop. Case: 123.',
        input: '',
        expected_output: '6'
      },
      {
        id: 'q3',
        title: 'Collatz Conjecture',
        description: 'Write a function `collatz_conjecture(n)` that returns the number of steps to reach 1 using the Collatz sequence. Case: n=3.',
        input: '',
        expected_output: '7'
      }
    ]
  },
  {
    moduleId: 'module6',
    name: 'Loops – for loop',
    questions: [
      {
        id: 'q1',
        title: 'Sum List',
        description: 'Write a function `sum_list(lst)` that uses a `for` loop to return the sum of all elements in a list. Case: [1, 2, 3, 4, 5].',
        input: '',
        expected_output: '15'
      },
      {
        id: 'q2',
        title: 'Multiplication Table',
        description: 'Write a function `multiplication_table(n)` that prints the multiplication table of `n` from 1 to 10 in the format `n x i = result`. Case: n=5.',
        input: '',
        expected_output: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50'
      },
      {
        id: 'q3',
        title: 'Pyramid Pattern',
        description: 'Write a function `pyramid_pattern(n)` that prints a pyramid of asterisks of height `n`. For n=3, output 1, 3, 5 asterisks.',
        input: '',
        expected_output: '*\n***\n*****'
      }
    ]
  },
  {
    moduleId: 'module7',
    name: 'Data Structures (Lists & Tuples)',
    questions: [
      {
        id: 'q1',
        title: 'Remove Duplicates',
        description: 'Write a function `remove_duplicates(lst)` that returns a sorted list of unique elements. Case: [3, 1, 2, 1, 3].',
        input: '',
        expected_output: '[1, 2, 3]'
      },
      {
        id: 'q2',
        title: 'Tuple Stats',
        description: 'Write a function `tuple_stats(tup)` that returns a tuple containing `(min, max, length, sum)`. Case: (1, 2, 3, 4).',
        input: '',
        expected_output: '(1, 4, 4, 10)'
      },
      {
        id: 'q3',
        title: 'Matrix Transpose',
        description: 'Write a function `matrix_transpose(matrix)` that returns the transpose of a 2D list. Case: [[1, 2], [3, 4]].',
        input: '',
        expected_output: '[[1, 3], [2, 4]]'
      }
    ]
  },
  {
    moduleId: 'module8',
    name: 'Advanced Data Structures',
    questions: [
      {
        id: 'q1',
        title: 'Dictionary Lookup',
        description: 'Write a function `dict_lookup(d, key)` that returns the value for `key` or "Not Found". Case: {"a": 5}, key="a".',
        input: '',
        expected_output: '5'
      },
      {
        id: 'q2',
        title: 'Word Frequency',
        description: 'Write a function `word_frequency(text)` that returns a dictionary of word counts. Case: "apple pie apple".',
        input: '',
        expected_output: "{'apple': 2, 'pie': 1}"
      },
      {
        id: 'q3',
        title: 'Find Common Elements',
        description: 'Write a function `find_common_elements(l1, l2, l3)` that returns a sorted list of elements in all three lists. Case: [1,2,3], [2,3,4], [3,4,5].',
        input: '',
        expected_output: '[3]'
      }
    ]
  },
  {
    moduleId: 'module9',
    name: 'Methods and Functions',
    questions: [
      {
        id: 'q1',
        title: 'Greet Function',
        description: 'Write a function `greet(name, greeting="Hello")` that returns "{greeting}, {name}!". Case: "John".',
        input: '',
        expected_output: 'Hello, John!'
      },
      {
        id: 'q2',
        title: 'Factorial',
        description: 'Write a recursive function `factorial(n)` that returns the factorial of `n`. Case: n=5.',
        input: '',
        expected_output: '120'
      },
      {
        id: 'q3',
        title: 'Apply Operation',
        description: 'Write a higher-order function `apply_operation(lst, func)` that applies `func` to every element in `lst`. Case: [1,2,3], lambda x: x**2.',
        input: '',
        expected_output: '[1, 4, 9]'
      }
    ]
  },
  {
    moduleId: 'module10',
    name: 'File Handling',
    questions: [
      {
        id: 'q1',
        title: 'Write to File',
        description: 'Write a function `write_to_file(filename, text)` that writes text to a file. Return "Success".',
        input: '',
        expected_output: 'Success'
      },
      {
        id: 'q2',
        title: 'Count Lines',
        description: 'Write a function `read_and_count_lines(filename)` that returns the number of lines in a file. Case: file with 5 lines.',
        input: '',
        expected_output: '5'
      },
      {
        id: 'q3',
        title: 'Append Log',
        description: 'Write a function `append_log(filename, message)` that appends a message. Return "Appended".',
        input: '',
        expected_output: 'Appended'
      }
    ]
  },
  {
    moduleId: 'module11',
    name: 'Exception Handling',
    questions: [
      {
        id: 'q1',
        title: 'Safe Divide',
        description: 'Write a function `safe_divide(a, b)` that catches `ZeroDivisionError` and returns "Cannot divide by zero".',
        input: '',
        expected_output: 'Cannot divide by zero'
      },
      {
        id: 'q2',
        title: 'Parse Integer',
        description: 'Write `parse_integer(s)` that returns the integer or -1 on `ValueError`. Print "Execution Complete" in finally block. Case: "abc".',
        input: '',
        expected_output: 'Execution Complete\n-1'
      },
      {
        id: 'q3',
        title: 'Custom Exception',
        description: 'Raise `NegativeValueError` if n < 0 in `calculate_square_root(n)`. Return math.sqrt(n) otherwise. Case: n=4.',
        input: '',
        expected_output: '2.0'
      }
    ]
  },
  {
    moduleId: 'module12',
    name: 'OOP Concepts',
    questions: [
      {
        id: 'q1',
        title: 'Car Class',
        description: 'Create a `Car` class with `display_info()` returning "Make: [make], Model: [model]". Case: Toyota Corolla.',
        input: '',
        expected_output: 'Make: Toyota, Model: Corolla'
      },
      {
        id: 'q2',
        title: 'Electric Car',
        description: 'Extend `Car` to `ElectricCar` with `battery_size`. Override `display_info()`. Case: Tesla Model S, 100kWh.',
        input: '',
        expected_output: 'Make: Tesla, Model: Model S, Battery: 100kWh'
      },
      {
        id: 'q3',
        title: 'Bank Account',
        description: 'Implement `BankAccount` with private `__balance`. Provide `deposit()` and `get_balance()`. Case: Deposit 100.',
        input: '',
        expected_output: '100'
      }
    ]
  },
  {
    moduleId: 'mock-test',
    name: 'Final Mock Assessment',
    questions: [
      {
        id: 'q1',
        title: 'Mock Test: Core Logic',
        description: 'Write a script that takes a list of integers `[5, 2, 9, 1]`, removes the smallest number, and prints the sum of the rest.',
        input: '',
        expected_output: '16'
      },
      {
        id: 'q2',
        title: 'Mock Test: Functions & Strings',
        description: 'Write a function `format_title(text)` that takes a string, converts it to title case, and replaces spaces with hyphens. Print the result for "hello python world".',
        input: '',
        expected_output: 'Hello-Python-World'
      },
      {
        id: 'q3',
        title: 'Mock Test: Data Structures',
        description: 'Create a dictionary with keys "A" and "B" mapping to 10 and 20. Add a key "C" with value 30, then print the total sum of all values.',
        input: '',
        expected_output: '60'
      }
    ]
  }
];
if (!fs.existsSync(modulesDir)) {
  fs.mkdirSync(modulesDir);
}

curriculum.forEach(mod => {
  const modPath = path.join(modulesDir, mod.moduleId);
  if (!fs.existsSync(modPath)) {
    fs.mkdirSync(modPath);
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

console.log('Successfully generated 36 questions across 12 modules.');
