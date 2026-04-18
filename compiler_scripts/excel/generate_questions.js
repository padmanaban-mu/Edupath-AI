const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'modules');

const curriculum = [
  {
    moduleId: 'module1',
    name: 'Getting Started with Excel',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Current Date',
        description: 'Write a standard Excel formula that returns the current system date and will automatically update when the workbook is opened.',
        input: 'None',
        expected_output: '=TODAY()',
        hidden_test_cases: 'Verify the formula returns a valid serial date and updates dynamically.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Simple Arithmetic',
        description: 'Write a formula to add the values of cell A1 and cell B1 together without using a named function.',
        input: 'A1=10, B1=15',
        expected_output: '=A1+B1',
        hidden_test_cases: 'Check with negative inputs to ensure the arithmetic operator is utilized correctly.'
      },
      {
        id: 'q3',
        title: 'Advanced: Absolute Reference',
        description: 'Write a formula that multiplies the value in cell C1 by the value in cell D1, ensuring that if the formula is dragged down, the reference to D1 never changes.',
        input: 'C1=5, D1=20',
        expected_output: '=C1*$D$1',
        hidden_test_cases: 'Test formula copying mechanics to ensure absolute row and column anchors ($) are present.'
      }
    ]
  },
  {
    moduleId: 'module2',
    name: 'Essential Formulas & Functions',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Sum Range',
        description: 'Write a formula using the SUM function to add all numerical values in the range from A1 to A10.',
        input: 'Range A1:A10 containing various integers',
        expected_output: '=SUM(A1:A10)',
        hidden_test_cases: 'Include empty cells and text strings in the range to verify the SUM function ignores non-numeric data.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Average Calculation',
        description: 'Write a formula to calculate the arithmetic mean of the values located in the range B1 through B20.',
        input: 'Range B1:B20 containing floats and integers',
        expected_output: '=AVERAGE(B1:B20)',
        hidden_test_cases: 'Test with a range containing a 0 to ensure it is factored into the mean calculation correctly.'
      },
      {
        id: 'q3',
        title: 'Advanced: Maximum Value',
        description: 'Write a formula that identifies and returns the highest numerical value within the dataset spanning from cell C1 to C100.',
        input: 'Range C1:C100',
        expected_output: '=MAX(C1:C100)',
        hidden_test_cases: 'Test with entirely negative numbers to ensure the function returns the correct relative maximum.'
      }
    ]
  },
  {
    moduleId: 'module3',
    name: 'Logical Functions (IF, AND, OR)',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Simple IF Statement',
        description: 'Write an IF function that checks if the value in cell A1 is greater than 10. If it is, return "Yes", otherwise return "No".',
        input: 'A1=15',
        expected_output: '=IF(A1>10, "Yes", "No")',
        hidden_test_cases: 'Test with A1 exactly equal to 10 to ensure it correctly returns "No".'
      },
      {
        id: 'q2',
        title: 'Intermediate: IF with AND Logic',
        description: 'Write a formula that returns "Valid" if cell A1 is greater than 5 AND cell B1 is less than 10. Otherwise, return "Invalid".',
        input: 'A1=8, B1=4',
        expected_output: '=IF(AND(A1>5, B1<10), "Valid", "Invalid")',
        hidden_test_cases: 'Test conditional bounds where only one of the two parameters is true.'
      },
      {
        id: 'q3',
        title: 'Advanced: Nested IF Function',
        description: 'Write a nested IF formula for cell A1: If value > 90 return "A", if value > 80 return "B", otherwise return "C".',
        input: 'A1=85',
        expected_output: '=IF(A1>90, "A", IF(A1>80, "B", "C"))',
        hidden_test_cases: 'Test with bounds exactly on 90 and 80 to verify strict greater-than logic.'
      }
    ]
  },
  {
    moduleId: 'module4',
    name: 'Lookup Functions (VLOOKUP, XLOOKUP)',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Exact VLOOKUP',
        description: 'Write a VLOOKUP formula to find the exact match of the value in cell D2 within the range A2:B10, and return the corresponding value from the 2nd column.',
        input: 'Lookup value in D2, Data array A2:B10',
        expected_output: '=VLOOKUP(D2, A2:B10, 2, FALSE)',
        hidden_test_cases: 'Verify the use of FALSE or 0 for the range_lookup parameter to enforce strict exact matching.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Horizontal Lookup',
        description: 'Write an HLOOKUP formula to search for the value in A1 across the top row of the range A5:E10, returning the value in the 3rd row of the match.',
        input: 'Lookup value in A1, Data array A5:E10',
        expected_output: '=HLOOKUP(A1, A5:E10, 3, FALSE)',
        hidden_test_cases: 'Verify accurate row index numeric assignment and exact match targeting.'
      },
      {
        id: 'q3',
        title: 'Advanced: Flexible XLOOKUP',
        description: 'Write an XLOOKUP formula to search for the value in F2 within the lookup array A2:A100, and return the result from C2:C100. If no match is found, return the text "Not Found".',
        input: 'Lookup value F2, Arrays A2:A100 & C2:C100',
        expected_output: '=XLOOKUP(F2, A2:A100, C2:C100, "Not Found")',
        hidden_test_cases: 'Input a non-existent value to test the internal error-handling string parameter.'
      }
    ]
  },
  {
    moduleId: 'module5',
    name: 'Data Cleaning & Formatting',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Remove Extra Spaces',
        description: 'Write a formula using the TRIM function to remove all leading, trailing, and excessive internal spaces from the text in cell A2.',
        input: 'A2="  Excel   Data   "',
        expected_output: '=TRIM(A2)',
        hidden_test_cases: 'Test with a string containing only spaces.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Proper Case',
        description: 'Write a formula to convert the text string in cell B2 so that the first letter of each word is capitalized and all other letters are lowercase.',
        input: 'B2="jOhN dOe"',
        expected_output: '=PROPER(B2)',
        hidden_test_cases: 'Test with numeric and punctuation characters interspersed within the text string.'
      },
      {
        id: 'q3',
        title: 'Advanced: Dynamic Text Join',
        description: 'Write a formula using TEXTJOIN to combine the values in range A2:A5, separated by a comma and a space (", "), ensuring that any empty cells in the range are ignored.',
        input: 'Range A2:A5 with A3 being blank',
        expected_output: '=TEXTJOIN(", ", TRUE, A2:A5)',
        hidden_test_cases: 'Verify the boolean `TRUE` parameter correctly filters out multiple consecutive blank cells without printing extra commas.'
      }
    ]
  },
  {
    moduleId: 'module6',
    name: 'Pivot Tables & Charts',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Retrieve Pivot Data',
        description: 'Write a GETPIVOTDATA formula to extract the "Sales" data field from a Pivot Table that originates at cell $A$3.',
        input: 'Pivot Table referenced at $A$3',
        expected_output: '=GETPIVOTDATA("Sales", $A$3)',
        hidden_test_cases: 'Ensure the formula triggers correctly without hardcoding structural item references.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Count Blank Cells',
        description: 'Write a formula to count the total number of empty cells within the range D2:D50 before integrating the data into a Pivot Table.',
        input: 'Range D2:D50',
        expected_output: '=COUNTBLANK(D2:D50)',
        hidden_test_cases: 'Verify that cells containing formula-driven empty strings ("") are counted alongside truly blank cells.'
      },
      {
        id: 'q3',
        title: 'Advanced: Multi-Condition Counting',
        description: 'Write a COUNTIFS formula to count the number of rows where the region in A2:A100 is "East" AND the corresponding sales value in B2:B100 is greater than 100.',
        input: 'Ranges A2:A100 and B2:B100',
        expected_output: '=COUNTIFS(A2:A100, "East", B2:B100, ">100")',
        hidden_test_cases: 'Test criteria ranges using wildcards to verify exact string literal matching on "East".'
      }
    ]
  },
  {
    moduleId: 'module7',
    name: 'Advanced Data Analysis',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Array Product Summation',
        description: 'Write a SUMPRODUCT formula to multiply corresponding elements in ranges A2:A10 and B2:B10, and then return the sum of those products.',
        input: 'Two parallel arrays (A2:A10, B2:B10)',
        expected_output: '=SUMPRODUCT(A2:A10, B2:B10)',
        hidden_test_cases: 'Introduce text values into the arrays to verify array multiplication error handling.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Two-Way Lookup via INDEX MATCH',
        description: 'Write a combined INDEX and MATCH formula to return the value from range B2:B10 where the value in range A2:A10 matches the exact value in cell E2.',
        input: 'E2 lookup value, Return Array B2:B10, Lookup Array A2:A10',
        expected_output: '=INDEX(B2:B10, MATCH(E2, A2:A10, 0))',
        hidden_test_cases: 'Ensure the MATCH match_type parameter is explicitly set to 0 for exact matches.'
      },
      {
        id: 'q3',
        title: 'Advanced: Error Trapping Pipeline',
        description: 'Write a formula that attempts a standard VLOOKUP for cell A1 in columns B:C (returning column 2, exact match). If an error occurs (like #N/A), output the custom string "Missing".',
        input: 'Lookup value A1',
        expected_output: '=IFERROR(VLOOKUP(A1, B:C, 2, FALSE), "Missing")',
        hidden_test_cases: 'Trigger a #DIV/0! error within the VLOOKUP array to verify IFERROR catches calculation errors alongside missing reference errors.'
      }
    ]
  },
  {
    moduleId: 'module8',
    name: 'Macros & VBA',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Standard Subroutine',
        description: 'Write a basic VBA Sub procedure named `HelloWorld` that triggers a Message Box displaying the text "Hello".',
        input: 'VBA Module',
        expected_output: 'Sub HelloWorld()\nMsgBox "Hello"\nEnd Sub',
        hidden_test_cases: 'Verify VBA syntax compiler accepts the string without prompt variable requirements.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Range Manipulation',
        description: 'Write a single line of VBA code to clear both the contents and formatting of the specific range A1:B10.',
        input: 'Active Sheet Range',
        expected_output: 'Range("A1:B10").Clear',
        hidden_test_cases: 'Ensure `.Clear` is used over `.ClearContents` to guarantee formatting is also wiped.'
      },
      {
        id: 'q3',
        title: 'Advanced: User Defined Function (UDF)',
        description: 'Write a custom VBA Function named `MultiplyByTwo` that takes a single variable `val` as an argument and returns that value multiplied by 2.',
        input: 'Numeric Input',
        expected_output: 'Function MultiplyByTwo(val)\nMultiplyByTwo = val * 2\nEnd Function',
        hidden_test_cases: 'Test with floating-point integers to ensure implicit variant types handle decimals correctly.'
      }
    ]
  },
  {
    moduleId: 'module9',
    name: 'Final Mock Assessment',
    questions: [
      {
        id: 'q1',
        title: 'Mock Test: Data Extraction Pipeline',
        description: 'Write a nested formula utilizing TRIM, PROPER, and XLOOKUP to clean the lookup value in A1 before searching for it in B:B and returning C:C.',
        input: 'Messy text string in A1',
        expected_output: '=XLOOKUP(PROPER(TRIM(A1)), B:B, C:C)',
        hidden_test_cases: 'Test execution order to ensure text is fully sanitized before the XLOOKUP comparison begins.'
      },
      {
        id: 'q2',
        title: 'Mock Test: Advanced Conditionals',
        description: 'Write a formula combining IF, OR, and ISBLANK to return "Pending" if EITHER cell A1 is blank OR cell B1 is blank. Otherwise, return "Complete".',
        input: 'Cells A1 and B1',
        expected_output: '=IF(OR(ISBLANK(A1), ISBLANK(B1)), "Pending", "Complete")',
        hidden_test_cases: 'Evaluate against cells containing formulas that output empty strings vs. naturally empty cells.'
      },
      {
        id: 'q3',
        title: 'Mock Test: Analytical Metrics',
        description: 'Write a formula using the AVERAGEIFS function to average the values in C1:C100 where A1:A100 equals "Active" AND B1:B100 is greater than or equal to 50.',
        input: 'Ranges A1:A100, B1:B100, C1:C100',
        expected_output: '=AVERAGEIFS(C1:C100, A1:A100, "Active", B1:B100, ">=50")',
        hidden_test_cases: 'Ensure logical operators in the criteria are properly encapsulated within quotation marks.'
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
      expected_output: q.expected_output,
      hidden_test_cases: q.hidden_test_cases
    };
    fs.writeFileSync(qPath, JSON.stringify(content, null, 2));
  });
});

console.log('Successfully generated 27 questions across 9 Excel modules.');