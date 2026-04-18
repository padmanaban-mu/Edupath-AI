const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'modules');

const curriculum = [
  {
    moduleId: 'module1',
    name: 'Introduction to NumPy',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Create Array',
        description: 'Import Numpy as np and write a function create_array() that returns a 1D NumPy array containing the integers from 1 to 5.',
        input: '',
        expected_output: '[1 2 3 4 5]',
        hidden_test_cases: "Verify the object's type is strictly numpy.ndarray."
      },
      {
        id: 'q2',
        title: 'Intermediate: Check Attributes',
        description: 'Write a function check_attributes(arr) that takes an array and returns a tuple containing its shape, dimensions (ndim), and data type (dtype).',
        input: 'np.array([1, 2, 3, 4, 5])',
        expected_output: "((5,), 1, dtype('int64'))",
        hidden_test_cases: 'Test with 3D arrays to ensure dimensions calculate correctly.'
      },
      {
        id: 'q3',
        title: 'Advanced: Memory Size',
        description: 'Write a function memory_size(arr) that returns the total memory consumed by the elements of a NumPy array in bytes (using size and itemsize).',
        input: 'np.array([1, 2, 3, 4, 5], dtype=np.int64)',
        expected_output: '40',
        hidden_test_cases: 'Test with forced smaller dtypes (e.g., np.int8) to ensure accurate byte measurement.'
      }
    ]
  },
  {
    moduleId: 'module2',
    name: 'Array Creation',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Make Zeros',
        description: 'Write a function make_zeros(shape_tuple) that uses np.zeros() to generate an array of zeros with the requested shape.',
        input: '(2, 2)',
        expected_output: '[[0. 0.]\n [0. 0.]]',
        hidden_test_cases: 'Try passing a 3D shape (2,3,4).'
      },
      {
        id: 'q2',
        title: 'Intermediate: Custom Range',
        description: 'Write a function custom_range(start, end, step) that uses np.arange() to create an array, and converts its dtype to float32. Return the array.',
        input: '0, 5, 2',
        expected_output: '[0. 2. 4.]',
        hidden_test_cases: 'Check negative steps and verify floating-point dtype explicitly.'
      },
      {
        id: 'q3',
        title: 'Advanced: Linspace Grid',
        description: 'Write a function linspace_grid() that uses np.linspace() to generate exactly 50 evenly spaced samples between 0 and 10, inclusive of 10. Return the array.',
        input: '',
        expected_output: 'Array of 50 samples starting at 0.0 ending at 10.0.',
        hidden_test_cases: 'Ensure arr[0] == 0 and arr[-1] == 10. Verify len(arr) == 50.'
      }
    ]
  },
  {
    moduleId: 'module3',
    name: 'Indexing & Slicing',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Get Element',
        description: 'Write a function get_element(arr, row, col) that returns the element situated at (row, col) in a 2D NumPy array.',
        input: 'arr, 1, 2',
        expected_output: 'The exact scalar value at the specified coordinate.',
        hidden_test_cases: 'Requesting out-of-bounds indices (should error naturally or be handled).'
      },
      {
        id: 'q2',
        title: 'Intermediate: Slice Middle',
        description: 'Write a function slice_middle(arr) that takes a 1D array of length 10 and returns the middle 4 elements (indices 3 through 6 inclusive).',
        input: 'np.arange(10)',
        expected_output: 'Subset array of size 4.',
        hidden_test_cases: 'Passed array of size different than 10 to check edge-case robustness.'
      },
      {
        id: 'q3',
        title: 'Advanced: Boolean Indexing',
        description: 'Write a function boolean_indexing(arr) that takes a 2D matrix of integers. Return a 1D array of all elements that are strictly greater than 10 and divisible by 2.',
        input: '2D array',
        expected_output: 'Filtered 1D array containing elements like 12, 14, 20.',
        hidden_test_cases: 'Arrays where no numbers match the criteria (returns empty).'
      }
    ]
  },
  {
    moduleId: 'module4',
    name: 'Reshaping & Transposing',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Flatten Array',
        description: 'Write a function flatten_array(arr) that takes any multidimensional NumPy array and uses arr.flatten() to safely return a 1D copy of it.',
        input: 'Multidimensional array',
        expected_output: '1D flat array.',
        hidden_test_cases: 'Test with 4D matrices.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Reshape to Matrix',
        description: 'Write a function reshape_to_matrix(arr) that takes a 1D array of 12 elements and reshapes it into a 3x4 2D matrix using .reshape().',
        input: '1D array of 12 elements',
        expected_output: '3 rows, 4 columns matrix.',
        hidden_test_cases: 'Arrays that are not length 12 to check for ValueError.'
      },
      {
        id: 'q3',
        title: 'Advanced: Swap Axes Demo',
        description: 'Write a function swap_axes_demo(arr) that takes a 3D array of shape (2,3,4) and uses np.transpose() or arr.transpose() to change its shape to (4,2,3).',
        input: '3D array of shape (2,3,4)',
        expected_output: 'The transposed 3D matrix.',
        hidden_test_cases: 'Ensure memory structure references (views vs copies) are correct by modifying an element and checking the relative matrix shift.'
      }
    ]
  },
  {
    moduleId: 'module5',
    name: 'Numerical Operations',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Add Arrays',
        description: 'Write a function add_arrays(a, b) that performs element-wise addition on two NumPy arrays of the same shape without using loops.',
        input: 'Two arrays of the same shape',
        expected_output: 'Element-wise sum matrix.',
        hidden_test_cases: 'Arrays with negative and decimal floats.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Broadcast Multiply',
        description: 'Write a function broadcast_multiply(arr, scalar) that multiplies every element in arr by the scalar value using broadcasting.',
        input: 'arr, scalar',
        expected_output: 'The updated array.',
        hidden_test_cases: 'Ensure no Python loops (for x in arr) were utilized.'
      },
      {
        id: 'q3',
        title: 'Advanced: Vectorized Math',
        description: 'Write a function vectorized_math(arr) that takes an array and computes the formula: y = (x**2) + (2*x) - 5 efficiently using NumPy operations natively.',
        input: 'Array',
        expected_output: 'Processed computation output.',
        hidden_test_cases: 'Verify computational speed/efficiency holds over an array of size 1,000,000.'
      }
    ]
  },
  {
    moduleId: 'module6',
    name: 'Statistical Functions',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Array Mean',
        description: 'Write a function array_mean(arr) that returns the mean (average) of all elements in a given NumPy array.',
        input: 'Array',
        expected_output: 'A scalar float value representing the mean.',
        hidden_test_cases: 'Try with an empty array [] (expected warning/NaN).'
      },
      {
        id: 'q2',
        title: 'Intermediate: Column Max',
        description: 'Write a function column_max(arr) that takes a 2D matrix and returns a 1D array containing the maximum values evaluated across columns (using axis=0).',
        input: '2D Matrix',
        expected_output: 'Returns the highest value encountered in each column.',
        hidden_test_cases: 'Test with distinct row maxes vs column maxes.'
      },
      {
        id: 'q3',
        title: 'Advanced: Standardize Data',
        description: "Write a function standardize_data(arr) that takes a 1D array and standardizes it (Z-score normalization) by subtracting the mean and dividing by the standard deviation. Use NumPy's mean() and std().",
        input: '1D array',
        expected_output: 'Normalized array mathematically averaging to 0 with standard deviation 1.',
        hidden_test_cases: 'All identical elements (to test divide by zero on 0 std-dev).'
      }
    ]
  },
  {
    moduleId: 'module7',
    name: 'Random Number Generation',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Generate Random Matrix',
        description: 'Write a function generate_random_matrix() that uses np.random.rand() to create and return a 3x3 matrix of random floats between 0 and 1.',
        input: '',
        expected_output: '3x3 array of random floats.',
        hidden_test_cases: 'Ensure shape is exactly (3,3) and elements are strictly 0.0 <= x < 1.0.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Seeded Random',
        description: 'Write a function seeded_random() that specifically sets the NumPy random seed to 42, then generates and returns a 1D array of 5 integers between 10 and 50 using np.random.randint().',
        input: '',
        expected_output: 'Expected fixed array because of the seed state.',
        hidden_test_cases: 'Test execution twice to verify perfectly identical array outputs.'
      },
      {
        id: 'q3',
        title: 'Advanced: Shuffle Rows',
        description: 'Write a function shuffle_rows(arr) that creates a copy of a 2D array, uses np.random.shuffle() to shuffle its rows intrinsically, and returns the shuffled copy without altering the row contents themselves.',
        input: '2D array',
        expected_output: 'Visually mixed row orderings.',
        hidden_test_cases: "Ensure columns didn't detach or distort relative to their rows."
      }
    ]
  },
  {
    moduleId: 'module8',
    name: 'Linear Algebra',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Dot Product',
        description: 'Write a function dot_product(a, b) that computes and returns the dot product of two 1D NumPy arrays using np.dot().',
        input: 'Two 1D arrays',
        expected_output: 'A scalar result.',
        hidden_test_cases: 'Orthogonal arrays that should yield exactly 0.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Matrix Multiplication',
        description: 'Write a function matrix_multiplication(A, B) that performs true matrix multiplication on two 2D matrices using the @ operator or np.matmul().',
        input: 'Two 2D matrices',
        expected_output: 'Resulting matrix product.',
        hidden_test_cases: 'Shape compatibility checks (e.g., passing a 2x3 and 3x4 matrix).'
      },
      {
        id: 'q3',
        title: 'Advanced: Inverse Matrix',
        description: 'Write a function inverse_matrix(A) that takes a 2x2 square matrix and returns its inverse using np.linalg.inv().',
        input: '2x2 square matrix',
        expected_output: 'The inverse square matrix.',
        hidden_test_cases: 'A singular matrix (determinant of 0) to ensure properly trapped LinAlgError.'
      }
    ]
  },
  {
    moduleId: 'module9',
    name: 'Final Mock Assessment',
    questions: [
      {
        id: 'q1',
        title: 'Mock Test: Data Extraction',
        description: 'Write a function `mock_extract(arr)` that takes a 2D array, extracts the 2nd column, and computes the mean of those values.',
        input: '2D Matrix',
        expected_output: 'Scalar float mean value.',
        hidden_test_cases: 'Test with negative and floating-point matrices.'
      },
      {
        id: 'q2',
        title: 'Mock Test: Reshape & Broadcast',
        description: 'Write a function `mock_transform(arr)` that takes a 1D array of 9 elements, reshapes it to 3x3, and multiplies the entire matrix by a scalar of 5.',
        input: '1D array (len 9)',
        expected_output: '3x3 matrix multiplied by 5.',
        hidden_test_cases: 'Test with arrays containing zeroes to check broadcasting accuracy.'
      },
      {
        id: 'q3',
        title: 'Mock Test: Linear Statistics',
        description: 'Write a function `mock_stats(A, B)` that computes the dot product of two 1D arrays, and then calculates the standard deviation of the resulting scalar (which is always 0.0, but proves pipeline understanding).',
        input: 'Two 1D arrays',
        expected_output: '0.0',
        hidden_test_cases: 'Verify `np.std()` handles the scalar conversion cleanly.'
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

console.log('Successfully generated 24 questions across 8 NumPy modules.');