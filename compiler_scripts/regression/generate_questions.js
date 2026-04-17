const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'modules');

const curriculum = [
  {
    moduleId: 'module1',
    name: 'Introduction to Simple Linear Regression',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Predict Y',
        description: 'Write a function predict_y(x, m, c) that takes a NumPy array of independent variables x, a slope m, and an intercept c, and returns a NumPy array of predicted values.',
        input: 'x = np.array([1, 2, 3]), m = 2, c = 1',
        expected_output: '[3 5 7]',
        hidden_test_cases: 'Test with an array of negative x values. Test with m = 0 to ensure it returns an array of constants equal to c.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Calculate Slope',
        description: 'Write a function calculate_slope(x, y) that takes two NumPy arrays and calculates the slope of the line of best fit.',
        input: 'x = np.array([1, 2, 3]), y = np.array([2, 4, 5])',
        expected_output: '1.5',
        hidden_test_cases: 'Test with perfectly correlated negative values. Test with arrays of length 2 (minimum required points).'
      },
      {
        id: 'q3',
        title: 'Advanced: Simple Linear Regression',
        description: 'Write a function simple_linear_regression(x, y) that calculates both the slope and intercept from scratch and returns them as a tuple (slope, intercept).',
        input: 'x = np.array([1, 2, 3]), y = np.array([2, 4, 5])',
        expected_output: '(1.5, 0.6666666666666666)',
        hidden_test_cases: 'Test with flat horizontal data where y is constant. Test with arrays containing floating-point noise.'
      }
    ]
  },
  {
    moduleId: 'module2',
    name: 'Multiple Linear Regression',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Matrix Predict',
        description: 'Write a function matrix_predict(X, weights) that takes a 2D feature matrix X and a weight vector weights (where the first element is the bias/intercept) and returns the dot product predictions.',
        input: 'X = np.array([[1, 2], [1, 3]]), weights = np.array([0.5, 1.5])',
        expected_output: '[3.5 5. ]',
        hidden_test_cases: 'Test with a matrix of 10 features and 100 rows. Test with zero weights.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Compute MSE',
        description: 'Write a function compute_mse(y_true, y_pred) that calculates the Mean Squared Error between actual values and predicted values using NumPy operations.',
        input: 'y_true = np.array([3, -0.5, 2, 7]), y_pred = np.array([2.5, 0.0, 2, 8])',
        expected_output: '0.375',
        hidden_test_cases: 'Test where y_true and y_pred are completely identical (should return 0.0). Test with arrays containing large scale numbers.'
      },
      {
        id: 'q3',
        title: 'Advanced: Normal Equation',
        description: 'Write a function normal_equation(X, y) that implements the closed-form solution for Ordinary Least Squares (OLS) to find the optimal weights.',
        input: 'X = np.array([[1, 1], [1, 2], [1, 3]]), y = np.array([1, 2, 2])',
        expected_output: '[0.66666667 0.5       ]',
        hidden_test_cases: 'Test with collinear features (should raise a LinAlgError or be handled via pseudo-inverse). Test with a highly dimensional dataset.'
      }
    ]
  },
  {
    moduleId: 'module3',
    name: 'Polynomial Regression',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Create Polynomial Features',
        description: 'Write a function create_poly_features(x) that takes a 1D NumPy array x and returns a 2D array where the first column is x and the second column is x squared.',
        input: 'x = np.array([2, 3, 4])',
        expected_output: '[[ 2  4]\n [ 3  9]\n [ 4 16]]',
        hidden_test_cases: 'Test with negative values to ensure squares become positive. Test with decimal fractions.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Fit Polynomial Degree 2',
        description: 'Write a function fit_poly_degree2(x, y) that uses np.polyfit() to fit a 2nd-degree polynomial to the data and returns the coefficients.',
        input: 'x = np.array([0, 1, 2]), y = np.array([1, 3, 7])',
        expected_output: '[1. 1. 1.]',
        hidden_test_cases: 'Test with data that forms a perfect straight line (leading coefficient should be approx 0). Test with inverted parabola data.'
      },
      {
        id: 'q3',
        title: 'Advanced: Polynomial Predict',
        description: 'Write a function poly_predict(x, coeffs) that takes an array of values x and an array of polynomial coefficients (from highest degree to lowest) and returns the predicted y values using np.polyval().',
        input: 'x = np.array([3, 4]), coeffs = np.array([1, 1, 1])',
        expected_output: '[13 21]',
        hidden_test_cases: 'Test with a 5th-degree polynomial coefficient array. Test with an empty array of x values.'
      }
    ]
  },
  {
    moduleId: 'module4',
    name: 'Regularization (Ridge & Lasso)',
    questions: [
      {
        id: 'q1',
        title: 'Basic: L2 Penalty Calculation',
        description: 'Write a function l2_penalty(weights, alpha) that calculates the Ridge (L2) penalty term. Exclude the bias term (assumed to be weights[0]) from the penalty.',
        input: 'weights = np.array([1.0, 2.0, -3.0]), alpha = 0.5',
        expected_output: '6.5',
        hidden_test_cases: 'Test with alpha = 0 (should return 0). Test with all weights being zero except the bias.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Ridge Closed Form',
        description: 'Write a function ridge_closed_form(X, y, alpha) that computes the weights for Ridge regression using the modified normal equation. Make sure the bias term is not regularized in the identity matrix.',
        input: 'X = np.array([[1, 1], [1, 2]]), y = np.array([1, 2]), alpha = 1.0',
        expected_output: '[0.83333333 0.66666667]',
        hidden_test_cases: 'Test with extremely high alpha (weights should shrink towards zero). Test with matrices where X transpose X is singular (the alpha should make it invertible).'
      },
      {
        id: 'q3',
        title: 'Advanced: L1 Gradient Step',
        description: 'Write a function l1_gradient_step(weight, alpha, learning_rate) that performs a single update step for a weight subject to an L1 (Lasso) penalty using the subgradient.',
        input: 'weight = 2.5, alpha = 1.0, learning_rate = 0.1',
        expected_output: '2.4',
        hidden_test_cases: 'Test with negative weights. Test where the update crosses zero (soft thresholding edge cases).'
      }
    ]
  },
  {
    moduleId: 'module5',
    name: 'Model Evaluation & Metrics',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Calculate MAE',
        description: 'Write a function calculate_mae(y_true, y_pred) that returns the Mean Absolute Error using NumPy.',
        input: 'y_true = np.array([3, -0.5, 2, 7]), y_pred = np.array([2.5, 0.0, 2, 8])',
        expected_output: '0.5',
        hidden_test_cases: 'All predictions perfectly match the true values. Extreme outliers causing massive absolute errors.'
      },
      {
        id: 'q2',
        title: 'Intermediate: R-Squared Score',
        description: 'Write a function r_squared(y_true, y_pred) that calculates the R-squared score comparing predicted values to the mean of true values.',
        input: 'y_true = np.array([1, 2, 3]), y_pred = np.array([1.1, 1.9, 3.2])',
        expected_output: '0.97',
        hidden_test_cases: 'Test with a model that performs worse than the mean (negative R-squared). Test with perfect predictions (R-squared = 1.0).'
      },
      {
        id: 'q3',
        title: 'Advanced: Adjusted R-Squared',
        description: 'Write a function adjusted_r_squared(r2, n, p) that calculates the Adjusted R-squared given the original R-squared value, the number of samples n, and the number of predictors p.',
        input: 'r2 = 0.9, n = 100, p = 5',
        expected_output: '0.8946808510638297',
        hidden_test_cases: 'Test where p is very close to n (drastic penalty). Test where R-squared = 1.0 (Adjusted R-squared should also be 1.0).'
      }
    ]
  },
  {
    moduleId: 'module6',
    name: 'Data Preprocessing for Regression',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Standardize Features',
        description: 'Write a function standardize_features(X) that takes a 2D array and normalizes each column to have a mean of 0 and a standard deviation of 1 using Z-score normalization.',
        input: 'X = np.array([[1, 2], [3, 4], [5, 6]])',
        expected_output: '[[-1.22474487 -1.22474487]\n [ 0.          0.        ]\n [ 1.22474487  1.22474487]]',
        hidden_test_cases: 'Test with columns that have a standard deviation of 0 (handle division by zero). Test with negative arrays.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Min-Max Scale',
        description: 'Write a function min_max_scale(x) that scales a 1D array to a strictly 0 to 1 range based on its minimum and maximum values.',
        input: 'x = np.array([-1, 0, 1])',
        expected_output: '[0.  0.5 1. ]',
        hidden_test_cases: 'Test where all values in the array are identical. Test with large floating-point precision arrays.'
      },
      {
        id: 'q3',
        title: 'Advanced: One-Hot Encode',
        description: 'Write a function one_hot_encode(categories) that takes a 1D integer array of categorical labels (e.g., 0, 1, 2) and returns a 2D binary matrix representing the one-hot encoded format.',
        input: 'categories = np.array([0, 2, 1, 0])',
        expected_output: '[[1 0 0]\n [0 0 1]\n [0 1 0]\n [1 0 0]]',
        hidden_test_cases: 'Test with arrays missing a sequential integer (e.g., only 0s and 2s present). Test with a single category throughout the array.'
      }
    ]
  },
  {
    moduleId: 'module7',
    name: 'Cross-Validation & Splitting',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Train-Test Split Indices',
        description: 'Write a function train_test_split_indices(n_samples, test_size) that takes the total number of samples and a test size percentage, and returns two arrays of indices for training and testing (without shuffling).',
        input: 'n_samples = 10, test_size = 0.2',
        expected_output: '(array([0, 1, 2, 3, 4, 5, 6, 7]), array([8, 9]))',
        hidden_test_cases: 'Test with odd total sample sizes where the split results in a float index. Test with test_size = 0.0.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Shuffle and Split',
        description: 'Write a function shuffle_and_split(X, y, test_size) that jointly shuffles the feature matrix X and target vector y, then splits them according to test_size. Return X_train, X_test, y_train, y_test.',
        input: 'X = np.array([[1], [2], [3], [4]]), y = np.array([10, 20, 30, 40]), test_size = 0.5',
        expected_output: 'Randomized arrays maintaining aligned indices between X and y components.',
        hidden_test_cases: 'Verify that X and y mappings remain perfectly aligned after shuffling. Test with multidimensional y targets.'
      },
      {
        id: 'q3',
        title: 'Advanced: K-Fold Indices',
        description: 'Write a function k_fold_indices(n_samples, k) that generates the start and end indices for k consecutive folds. It should return a list of tuples containing (train_indices, test_indices) for each fold.',
        input: 'n_samples = 6, k = 3',
        expected_output: '[(array([2, 3, 4, 5]), array([0, 1])), (array([0, 1, 4, 5]), array([2, 3])), (array([0, 1, 2, 3]), array([4, 5]))]',
        hidden_test_cases: 'Test where n_samples is not perfectly divisible by k (handle uneven fold sizes). Test where k = n_samples (Leave-One-Out Cross-Validation behavior).'
      }
    ]
  },
  {
    moduleId: 'module8',
    name: 'Logistic Regression (Classification Extension)',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Sigmoid Function',
        description: 'Write a function sigmoid(z) that computes the sigmoid activation function.',
        input: 'z = np.array([0, 2, -2])',
        expected_output: '[0.5        0.88079708 0.11920292]',
        hidden_test_cases: 'Test with massive positive and negative values to check for overflow handling. Test with single scalar input instead of an array.'
      },
      {
        id: 'q2',
        title: 'Intermediate: Binary Cross Entropy',
        description: 'Write a function binary_cross_entropy(y_true, y_pred) that calculates the Log Loss for a set of probability predictions.',
        input: 'y_true = np.array([1, 0, 1]), y_pred = np.array([0.9, 0.1, 0.8])',
        expected_output: '0.14462152754328741',
        hidden_test_cases: 'Test with predictions being exactly 0 or 1 (handle np.log(0) mathematically by adding a tiny epsilon). Test with completely incorrect predictions.'
      },
      {
        id: 'q3',
        title: 'Advanced: Logistic Gradient Descent',
        description: 'Write a function logistic_gradient_descent(X, y, weights, learning_rate, iterations) that updates weights for logistic regression using gradient descent. Return the final weights.',
        input: 'X = np.array([[1, 0.5], [1, 2.5]]), y = np.array([0, 1]), weights = np.array([0.0, 0.0]), learning_rate = 0.1, iterations = 1',
        expected_output: '[-0.05 -0.05]',
        hidden_test_cases: 'Test over 1000 iterations to check convergence behavior. Ensure the gradient calculation correctly leverages the sigmoid delta.'
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

console.log('Successfully generated 24 questions across 8 Regression modules.');