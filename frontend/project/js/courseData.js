// ============================================================
// FILE: courseData.js
// EduPath AI — Central Single Source of Truth (v2.0)
// Used by: roadmap.html, chatbot.html, all compiler pages
// ============================================================

// ─────────────────────────────────────────────
// SECTION 1: ROADMAP DATA (used by roadmap.html & chatbot.html)
// ─────────────────────────────────────────────

window.roadmapData = {
    dataAnalyst: {
        nonProgramming: [
            {
                id: "df",
                title: "Data Fundamentals",
                level: 1,
                prereq: [],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/9953/9953334.png",
                color: "#3b82f6",
                keyTopics: ["Data Types", "Database Intro", "Data Cleaning basics"]
            },
            {
                id: "stats",
                title: "Statistics",
                level: 2,
                prereq: ["df"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
                color: "#8b5cf6",
                keyTopics: ["Descriptive Stats", "Hypothesis Testing", "Probability Distributions"]
            },
            {
                id: "excel",
                title: "Excel Analytics",
                level: 2,
                prereq: ["df"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/732/732220.png",
                color: "#10b981",
                keyTopics: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Conditional Formatting"]
            },
            {
                id: "eda",
                title: "Exploratory DA (EDA)",
                level: 5,
                prereq: ["stats", "pandas"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/4245/4245351.png",
                color: "#f59e0b",
                keyTopics: ["Handling Missing Data", "Outlier Detection", "Correlation Matrices"]
            },
            {
                id: "bi",
                title: "BI Tools (PBI/Tableau)",
                level: 5,
                prereq: ["excel", "eda"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/5956/5956597.png",
                color: "#ec4899",
                keyTopics: ["DAX Queries", "Dashboard Design", "Data Connections"]
            }
        ],
        programming: [
            {
                id: "sql_a",
                title: "SQL Basics and Advanced",
                level: 3,
                prereq: ["df"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/4492/4492311.png",
                color: "#2563eb",
                keyTopics: ["JOINS", "Subqueries", "Window Functions"]
            },
            {
                id: "py_b",
                title: "Python Basics",
                level: 4,
                prereq: ["df"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
                color: "#f59e0b",
                keyTopics: ["Loops & Functions", "OOPs Concepts", "Lists & Dictionaries"]
            },
            {
                id: "numpy",
                title: "NumPy Arrays",
                level: 4,
                prereq: [],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/9135/9135965.png",
                color: "#ef4444",
                keyTopics: ["Array Slicing", "Broadcasting", "Matrix Operations"]
            },
            {
                id: "pandas",
                title: "Pandas DataFrames",
                level: 4,
                prereq: ["numpy"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/4862/4862036.png",
                color: "#10b981",
                keyTopics: ["DataFrames", "Groupby & Aggregation", "Merging Data"]
            },
            {
                id: "viz_py",
                title: "Python Viz",
                level: 5,
                prereq: [],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png",
                color: "#6366f1",
                keyTopics: ["Matplotlib Pyplot", "Seaborn Styling", "Interactive Plots"]
            },
            {
                id: "reg",
                title: "Regression Models",
                level: 6,
                prereq: ["stats", "py_b"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/2103/2103507.png",
                color: "#ef4444",
                keyTopics: ["Linear Regression", "Logistic Regression", "Model Evaluation"]
            }
        ],
        levels: [
            { lv: 1, name: "Data Foundations",    icon: "fa-database" },
            { lv: 2, name: "Statistical Analysis", icon: "fa-chart-line" },
            { lv: 3, name: "Database & SQL",       icon: "fa-server" },
            { lv: 4, name: "Python Engineering",   icon: "fa-brands fa-python" },
            { lv: 5, name: "Visual Analytics",     icon: "fa-pie-chart" },
            { lv: 6, name: "Advanced Modeling",    icon: "fa-brain" }
        ]
    },

    aiml: {
        nonProgramming: [
            {
                id: "math_la",
                title: "Linear Algebra",
                level: 1,
                prereq: [],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/3721/3721619.png",
                color: "#3b82f6",
                keyTopics: ["Vectors", "Matrices", "Eigenvalues"]
            },
            {
                id: "calc_mv",
                title: "Multivariable Calculus",
                level: 1,
                prereq: ["math_la"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
                color: "#8b5cf6",
                keyTopics: ["Partial Derivatives", "Gradients", "Chain Rule"]
            },
            {
                id: "prob_inf",
                title: "Probability & Inference",
                level: 2,
                prereq: ["math_la"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/1611/1611179.png",
                color: "#10b981",
                keyTopics: ["Bayes Theorem", "Random Variables", "Distributions"]
            },
            {
                id: "opt_algo",
                title: "Optimization Theory",
                level: 3,
                prereq: ["calc_mv"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/2540/2540832.png",
                color: "#f59e0b",
                keyTopics: ["Gradient Descent", "Convex Optimization", "Loss Functions"]
            },
            {
                id: "ethics_ai",
                title: "AI Ethics & Bias",
                level: 6,
                prereq: [],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/1162/1162456.png",
                color: "#ec4899",
                keyTopics: ["Algorithmic Bias", "Data Privacy", "Explainable AI"]
            }
        ],
        programming: [
            {
                id: "skl_ml",
                title: "Scikit-Learn ML",
                level: 3,
                prereq: ["math_la"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/2103/2103507.png",
                color: "#2563eb",
                keyTopics: ["Classification", "Clustering", "Cross Validation"]
            },
            {
                id: "dl_nn",
                title: "Neural Networks",
                level: 4,
                prereq: ["skl_ml"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/2103/2103831.png",
                color: "#f59e0b",
                keyTopics: ["Backpropagation", "Activation Functions", "Epochs"]
            },
            {
                id: "tf_torch",
                title: "PyTorch/TF",
                level: 4,
                prereq: ["dl_nn"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
                color: "#ef4444",
                keyTopics: ["Tensors", "Building Models", "Training Loops"]
            },
            {
                id: "nlp_proc",
                title: "NLP & Transformers",
                level: 5,
                prereq: ["dl_nn"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png",
                color: "#10b981",
                keyTopics: ["Tokenization", "Word Embeddings", "Attention Mechanism"]
            },
            {
                id: "cv_vision",
                title: "Computer Vision",
                level: 5,
                prereq: ["dl_nn"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/2892/2892305.png",
                color: "#6366f1",
                keyTopics: ["CNNs", "Image Preprocessing", "Object Detection"]
            },
            {
                id: "mlo_ops",
                title: "MLOps Deployment",
                level: 6,
                prereq: ["tf_torch"],
                progress: 0,
                img: "https://cdn-icons-png.flaticon.com/512/9135/9135965.png",
                color: "#ef4444",
                keyTopics: ["Docker", "Model Monitoring", "API Endpoints"]
            }
        ],
        levels: [
            { lv: 1, name: "Math Foundations",   icon: "fa-square-root-variable" },
            { lv: 2, name: "Statistical Theory",  icon: "fa-chart-area" },
            { lv: 3, name: "Classical ML",        icon: "fa-microchip" },
            { lv: 4, name: "Deep Learning",       icon: "fa-network-wired" },
            { lv: 5, name: "Applied AI",          icon: "fa-eye" },
            { lv: 6, name: "Ethics & Ops",        icon: "fa-gears" }
        ]
    }
};


// ─────────────────────────────────────────────
// SECTION 2: FULL COURSE CURRICULUM DATA
// Used by: chatbot /api/chat (system prompt), compiler pages
// ─────────────────────────────────────────────

window.courseData = {

    // ── 1. NUMPY ──────────────────────────────
    numpy: {
        id: "numpy",
        title: "NumPy Arrays",
        domain: ["dataAnalyst"],
        compilerPage: "comp_numpy.html",
        description: "Master numerical computing in Python using NumPy — the foundation for all data science and ML workflows.",
        modules: [
            {
                moduleId: "module1",
                name: "Introduction to NumPy",
                topics: ["What is NumPy", "ndarray object", "Array attributes: shape, ndim, dtype", "Memory layout"],
                questions: [
                    { id: "q1", title: "Basic: Create Array", description: "Import Numpy as np and write a function create_array() that returns a 1D NumPy array containing the integers from 1 to 5.", input: "", expected_output: "[1 2 3 4 5]" },
                    { id: "q2", title: "Intermediate: Check Attributes", description: "Write a function check_attributes(arr) that takes an array and returns a tuple containing its shape, dimensions (ndim), and data type (dtype).", input: "np.array([1, 2, 3, 4, 5])", expected_output: "((5,), 1, dtype('int64'))" },
                    { id: "q3", title: "Advanced: Memory Size", description: "Write a function memory_size(arr) that returns the total memory consumed by the elements of a NumPy array in bytes (using size and itemsize).", input: "np.array([1, 2, 3, 4, 5], dtype=np.int64)", expected_output: "40" }
                ]
            },
            {
                moduleId: "module2",
                name: "Array Creation",
                topics: ["np.zeros()", "np.ones()", "np.arange()", "np.linspace()", "np.eye()"],
                questions: [
                    { id: "q1", title: "Basic: Make Zeros", description: "Write a function make_zeros(shape_tuple) that uses np.zeros() to generate an array of zeros with the requested shape.", input: "(2, 2)", expected_output: "[[0. 0.]\n [0. 0.]]" },
                    { id: "q2", title: "Intermediate: Custom Range", description: "Write a function custom_range(start, end, step) that uses np.arange() to create an array, and converts its dtype to float32.", input: "0, 5, 2", expected_output: "[0. 2. 4.]" },
                    { id: "q3", title: "Advanced: Linspace Grid", description: "Write a function linspace_grid() that uses np.linspace() to generate exactly 50 evenly spaced samples between 0 and 10, inclusive of 10.", input: "", expected_output: "Array of 50 samples starting at 0.0 ending at 10.0." }
                ]
            },
            {
                moduleId: "module3",
                name: "Indexing & Slicing",
                topics: ["1D/2D indexing", "Slicing syntax", "Boolean indexing", "Fancy indexing"],
                questions: [
                    { id: "q1", title: "Basic: Get Element", description: "Write a function get_element(arr, row, col) that returns the element situated at (row, col) in a 2D NumPy array.", input: "arr, 1, 2", expected_output: "The exact scalar value at the specified coordinate." },
                    { id: "q2", title: "Intermediate: Slice Middle", description: "Write a function slice_middle(arr) that takes a 1D array of length 10 and returns the middle 4 elements (indices 3 through 6 inclusive).", input: "np.arange(10)", expected_output: "Subset array of size 4." },
                    { id: "q3", title: "Advanced: Boolean Indexing", description: "Write a function boolean_indexing(arr) that takes a 2D matrix of integers. Return a 1D array of all elements that are strictly greater than 10 and divisible by 2.", input: "2D array", expected_output: "Filtered 1D array containing elements like 12, 14, 20." }
                ]
            },
            {
                moduleId: "module4",
                name: "Reshaping & Transposing",
                topics: ["arr.flatten()", "arr.reshape()", "np.transpose()", "arr.T", "Views vs Copies"],
                questions: [
                    { id: "q1", title: "Basic: Flatten Array", description: "Write a function flatten_array(arr) that takes any multidimensional NumPy array and uses arr.flatten() to safely return a 1D copy of it.", input: "Multidimensional array", expected_output: "1D flat array." },
                    { id: "q2", title: "Intermediate: Reshape to Matrix", description: "Write a function reshape_to_matrix(arr) that takes a 1D array of 12 elements and reshapes it into a 3x4 2D matrix.", input: "1D array of 12 elements", expected_output: "3 rows, 4 columns matrix." },
                    { id: "q3", title: "Advanced: Swap Axes Demo", description: "Write a function swap_axes_demo(arr) that takes a 3D array of shape (2,3,4) and uses np.transpose() to change its shape to (4,2,3).", input: "3D array of shape (2,3,4)", expected_output: "The transposed 3D matrix." }
                ]
            },
            {
                moduleId: "module5",
                name: "Numerical Operations",
                topics: ["Element-wise arithmetic", "Broadcasting rules", "Vectorized functions", "np.sqrt(), np.exp()"],
                questions: [
                    { id: "q1", title: "Basic: Add Arrays", description: "Write a function add_arrays(a, b) that performs element-wise addition on two NumPy arrays of the same shape without using loops.", input: "Two arrays of the same shape", expected_output: "Element-wise sum matrix." },
                    { id: "q2", title: "Intermediate: Broadcast Multiply", description: "Write a function broadcast_multiply(arr, scalar) that multiplies every element in arr by the scalar value using broadcasting.", input: "arr, scalar", expected_output: "The updated array." },
                    { id: "q3", title: "Advanced: Vectorized Math", description: "Write a function vectorized_math(arr) that takes an array and computes the formula: y = (x**2) + (2*x) - 5 efficiently using NumPy operations.", input: "Array", expected_output: "Processed computation output." }
                ]
            },
            {
                moduleId: "module6",
                name: "Statistical Functions",
                topics: ["np.mean()", "np.median()", "np.std()", "np.max() / np.min()", "axis parameter"],
                questions: [
                    { id: "q1", title: "Basic: Array Mean", description: "Write a function array_mean(arr) that returns the mean (average) of all elements in a given NumPy array.", input: "Array", expected_output: "A scalar float value representing the mean." },
                    { id: "q2", title: "Intermediate: Column Max", description: "Write a function column_max(arr) that takes a 2D matrix and returns a 1D array containing the maximum values evaluated across columns (using axis=0).", input: "2D Matrix", expected_output: "Returns the highest value encountered in each column." },
                    { id: "q3", title: "Advanced: Standardize Data", description: "Write a function standardize_data(arr) that takes a 1D array and standardizes it (Z-score normalization) by subtracting the mean and dividing by the standard deviation.", input: "1D array", expected_output: "Normalized array mathematically averaging to 0 with standard deviation 1." }
                ]
            },
            {
                moduleId: "module7",
                name: "Random Number Generation",
                topics: ["np.random.rand()", "np.random.randint()", "np.random.seed()", "np.random.shuffle()"],
                questions: [
                    { id: "q1", title: "Basic: Generate Random Matrix", description: "Write a function generate_random_matrix() that uses np.random.rand() to create and return a 3x3 matrix of random floats between 0 and 1.", input: "", expected_output: "3x3 array of random floats." },
                    { id: "q2", title: "Intermediate: Seeded Random", description: "Write a function seeded_random() that sets the NumPy random seed to 42, then generates a 1D array of 5 integers between 10 and 50 using np.random.randint().", input: "", expected_output: "Expected fixed array because of the seed state." },
                    { id: "q3", title: "Advanced: Shuffle Rows", description: "Write a function shuffle_rows(arr) that creates a copy of a 2D array, uses np.random.shuffle() to shuffle its rows, and returns the shuffled copy.", input: "2D array", expected_output: "Visually mixed row orderings." }
                ]
            },
            {
                moduleId: "module8",
                name: "Linear Algebra",
                topics: ["np.dot()", "np.matmul() / @", "np.linalg.inv()", "np.linalg.det()", "Eigenvalues"],
                questions: [
                    { id: "q1", title: "Basic: Dot Product", description: "Write a function dot_product(a, b) that computes and returns the dot product of two 1D NumPy arrays using np.dot().", input: "Two 1D arrays", expected_output: "A scalar result." },
                    { id: "q2", title: "Intermediate: Matrix Multiplication", description: "Write a function matrix_multiplication(A, B) that performs true matrix multiplication on two 2D matrices using the @ operator or np.matmul().", input: "Two 2D matrices", expected_output: "Resulting matrix product." },
                    { id: "q3", title: "Advanced: Inverse Matrix", description: "Write a function inverse_matrix(A) that takes a 2x2 square matrix and returns its inverse using np.linalg.inv().", input: "2x2 square matrix", expected_output: "The inverse square matrix." }
                ]
            },
            {
                moduleId: "module9",
                name: "Final Mock Assessment",
                topics: ["End-to-end NumPy pipeline", "Combined concepts"],
                questions: [
                    { id: "q1", title: "Mock Test: Data Extraction", description: "Write a function mock_extract(arr) that takes a 2D array, extracts the 2nd column, and computes the mean of those values.", input: "2D Matrix", expected_output: "Scalar float mean value." },
                    { id: "q2", title: "Mock Test: Reshape & Broadcast", description: "Write a function mock_transform(arr) that takes a 1D array of 9 elements, reshapes it to 3x3, and multiplies the entire matrix by a scalar of 5.", input: "1D array (len 9)", expected_output: "3x3 matrix multiplied by 5." },
                    { id: "q3", title: "Mock Test: Linear Statistics", description: "Write a function mock_stats(A, B) that computes the dot product of two 1D arrays, and then calculates the standard deviation of the resulting scalar.", input: "Two 1D arrays", expected_output: "0.0" }
                ]
            }
        ]
    },

    // ── 2. PYTHON BASICS ──────────────────────
    python: {
        id: "py_b",
        title: "Python Basics",
        domain: ["dataAnalyst"],
        compilerPage: "python_compiler.html",
        description: "Build a strong Python programming foundation — the essential language for all data and AI workflows.",
        modules: [
            { moduleId: "module1",  name: "Introduction to Python",   topics: ["print()", "input()", "Comments", "Basic syntax"], questions: [{ id:"q1", title:"Hello Python World", description:"Write a Python script that prints the exact phrase 'Hello, Python World!'.", input:"", expected_output:"Hello, Python World!" }, { id:"q2", title:"Welcome User", description:"Write a script that takes a user's name via input() and prints 'Welcome to Python, [Name]!'.", input:"Alice", expected_output:"Welcome to Python, Alice!" }, { id:"q3", title:"Star Grid", description:"Write a script that prints a formatted 3x3 grid of asterisks using a single print statement and newline characters.", input:"3", expected_output:"***\n***\n***" }] },
            { moduleId: "module2",  name: "Variables and Data Types",  topics: ["int, float, str, bool", "type()", "Type casting", "Variable assignment"], questions: [{ id:"q1", title:"Variable Types", description:"Create three variables: an integer a, a float b, and a string c. Assign them 10, 20.5, and 'Code'. Print their types using type().", input:"", expected_output:"<class 'int'>\n<class 'float'>\n<class 'str'>" }, { id:"q2", title:"Swap Values", description:"Write a function swap_values(x, y) that swaps two variables without a temp variable and returns them as a tuple.", input:"", expected_output:"(20, 10)" }, { id:"q3", title:"Type Caster", description:"Write a function type_caster(val) that converts a string to float, multiplies by 2, converts to int, and returns it. Input: '15.7'", input:"", expected_output:"31" }] },
            { moduleId: "module3",  name: "Operators & Expressions",   topics: ["Arithmetic operators", "Comparison operators", "Logical operators", "Operator precedence"], questions: [{ id:"q1", title:"Basic Ops", description:"Write a function basic_ops(a, b) that returns a tuple of (a+b, a-b, a*b).", input:"10, 3", expected_output:"(13, 7, 30)" }, { id:"q2", title:"Floor Division", description:"Write a function floor_div(a, b) returning the floor division and modulo of a by b as a tuple.", input:"17, 5", expected_output:"(3, 2)" }, { id:"q3", title:"Power Chain", description:"Write a function power_chain(base, exp) returning base raised to exp without using ** directly — use math.pow().", input:"2, 10", expected_output:"1024.0" }] },
            { moduleId: "module4",  name: "Strings",                   topics: ["String methods", "f-strings", "Slicing strings", "String formatting"], questions: [{ id:"q1", title:"Reverse String", description:"Write a function reverse_string(s) that returns the reversed version of s using slicing.", input:"'hello'", expected_output:"'olleh'" }, { id:"q2", title:"Count Vowels", description:"Write a function count_vowels(s) that counts and returns the number of vowels in the string (case-insensitive).", input:"'Education'", expected_output:"5" }, { id:"q3", title:"Title Formatter", description:"Write a function format_title(text) that converts a string to title case and replaces spaces with hyphens.", input:"'hello python world'", expected_output:"'Hello-Python-World'" }] },
            { moduleId: "module5",  name: "Lists & Tuples",            topics: ["List methods", "List comprehensions", "Tuple unpacking", "Nested lists"], questions: [{ id:"q1", title:"Filter Evens", description:"Write a function filter_evens(lst) that returns a new list with only even numbers using a list comprehension.", input:"[1,2,3,4,5,6]", expected_output:"[2, 4, 6]" }, { id:"q2", title:"Flatten List", description:"Write a function flatten(nested) that flattens one level of a nested list.", input:"[[1,2],[3,4],[5]]", expected_output:"[1, 2, 3, 4, 5]" }, { id:"q3", title:"Tuple Stats", description:"Write a function tuple_stats(t) that returns (min, max, sum) of a tuple.", input:"(3, 1, 4, 1, 5, 9)", expected_output:"(1, 9, 23)" }] },
            { moduleId: "module6",  name: "Dictionaries & Sets",       topics: ["dict methods", "set operations", "Nested dicts", "Dictionary comprehension"], questions: [{ id:"q1", title:"Word Counter", description:"Write a function word_count(sentence) that returns a dictionary mapping each word to its count.", input:"'the cat sat on the mat'", expected_output:"{'the': 2, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}" }, { id:"q2", title:"Set Intersection", description:"Write a function common_elements(a, b) that returns a sorted list of elements common to both lists.", input:"[1,2,3,4], [3,4,5,6]", expected_output:"[3, 4]" }, { id:"q3", title:"Dict Merge", description:"Write a function merge_dicts(d1, d2) that merges two dicts. If both have the same key, sum their values.", input:"{'a':1,'b':2}, {'b':3,'c':4}", expected_output:"{'a': 1, 'b': 5, 'c': 4}" }] },
            { moduleId: "module7",  name: "Functions",                  topics: ["def keyword", "Arguments & kwargs", "Return values", "Lambda functions", "Recursion"], questions: [{ id:"q1", title:"Factorial", description:"Write a recursive function factorial(n) that returns n!.", input:"5", expected_output:"120" }, { id:"q2", title:"Default Args", description:"Write a function greet(name, greeting='Hello') that returns f'{greeting}, {name}!'.", input:"'Alice'", expected_output:"'Hello, Alice!'" }, { id:"q3", title:"Lambda Sort", description:"Write a function sort_by_second(pairs) that sorts a list of tuples by their second element using a lambda.", input:"[(1,3),(2,1),(3,2)]", expected_output:"[(2, 1), (3, 2), (1, 3)]" }] },
            { moduleId: "module8",  name: "Loops & Conditionals",      topics: ["for/while loops", "if/elif/else", "break/continue", "enumerate & zip"], questions: [{ id:"q1", title:"FizzBuzz", description:"Write a function fizzbuzz(n) that returns a list of FizzBuzz outputs for numbers 1 to n.", input:"15", expected_output:"['1','2','Fizz','4','Buzz',...,'FizzBuzz']" }, { id:"q2", title:"While Counter", description:"Write a function countdown(n) that uses a while loop to return a list counting from n down to 1.", input:"5", expected_output:"[5, 4, 3, 2, 1]" }, { id:"q3", title:"Paired Enumerate", description:"Write a function labeled_pairs(lst) using enumerate to return a list of 'Index N: value' strings.", input:"['a','b','c']", expected_output:"['Index 0: a', 'Index 1: b', 'Index 2: c']" }] },
            { moduleId: "module9",  name: "File I/O",                   topics: ["open(), read(), write()", "Context manager (with)", "CSV reading", "Exception handling in I/O"], questions: [{ id:"q1", title:"Write File", description:"Write a function write_file(filename, content) that writes content to a file and closes it.", input:"'out.txt', 'Hello'", expected_output:"File created with 'Hello'." }, { id:"q2", title:"Read Lines", description:"Write a function read_lines(filename) that reads a file and returns its lines as a list of stripped strings.", input:"'data.txt'", expected_output:"['line1', 'line2', 'line3']" }, { id:"q3", title:"Line Counter", description:"Write a function count_lines(filename) that returns the total number of non-empty lines in a file.", input:"'data.txt'", expected_output:"Integer count of non-empty lines." }] },
            { moduleId: "module10", name: "Error & Exception Handling", topics: ["try/except/finally", "Raising exceptions", "Custom exceptions", "AssertionError"], questions: [{ id:"q1", title:"Safe Divide", description:"Write a function safe_divide(a, b) that returns a/b but catches ZeroDivisionError and returns None.", input:"10, 0", expected_output:"None" }, { id:"q2", title:"Type Guard", description:"Write a function type_guard(val) that raises TypeError with message 'Must be int' if val is not an integer.", input:"'hello'", expected_output:"TypeError: Must be int" }, { id:"q3", title:"Custom Exception", description:"Raise NegativeValueError if n < 0 in calculate_square_root(n). Return math.sqrt(n) otherwise.", input:"4", expected_output:"2.0" }] },
            { moduleId: "module11", name: "Modules & Libraries",       topics: ["import", "from...import", "math, random, datetime", "pip basics"], questions: [{ id:"q1", title:"Math Module", description:"Write a function circle_area(r) using math.pi to return the area of a circle.", input:"5", expected_output:"78.53981633974483" }, { id:"q2", title:"Random Choice", description:"Write a function pick_random(lst) that returns a random element from a list using random.choice().", input:"[1,2,3,4,5]", expected_output:"A random element from the list." }, { id:"q3", title:"Date Diff", description:"Write a function days_until(target_date_str) that returns the number of days from today until the target date string 'YYYY-MM-DD'.", input:"'2025-12-31'", expected_output:"Integer days remaining." }] },
            { moduleId: "module12", name: "OOP Concepts",              topics: ["Classes & objects", "Inheritance", "Encapsulation", "__init__", "Method overriding"], questions: [{ id:"q1", title:"Car Class", description:"Create a Car class with display_info() returning 'Make: [make], Model: [model]'. Case: Toyota Corolla.", input:"", expected_output:"Make: Toyota, Model: Corolla" }, { id:"q2", title:"Electric Car", description:"Extend Car to ElectricCar with battery_size. Override display_info(). Case: Tesla Model S, 100kWh.", input:"", expected_output:"Make: Tesla, Model: Model S, Battery: 100kWh" }, { id:"q3", title:"Bank Account", description:"Implement BankAccount with private __balance. Provide deposit() and get_balance(). Case: Deposit 100.", input:"", expected_output:"100" }] },
            { moduleId: "mock-test", name: "Final Mock Assessment",    topics: ["Combined Python skills"], questions: [{ id:"q1", title:"Mock Test: Core Logic", description:"Write a script that takes a list [5, 2, 9, 1], removes the smallest number, and prints the sum of the rest.", input:"", expected_output:"16" }, { id:"q2", title:"Mock Test: Functions & Strings", description:"Write a function format_title(text) converting to title case and replacing spaces with hyphens.", input:"'hello python world'", expected_output:"Hello-Python-World" }, { id:"q3", title:"Mock Test: Data Structures", description:"Create a dict with 'A':10, 'B':20. Add 'C':30. Print the total sum.", input:"", expected_output:"60" }] }
        ]
    },

    // ── 3. PANDAS ─────────────────────────────
    pandas: {
        id: "pandas",
        title: "Pandas DataFrames",
        domain: ["dataAnalyst"],
        compilerPage: "pandas_compiler.html",
        description: "Learn Pandas — the essential Python library for data manipulation, analysis, and cleaning.",
        modules: [
            { moduleId: "module1",  name: "Introduction to Pandas",       topics: ["What is Pandas", "Series vs DataFrame", "Installing Pandas", "Core data structures"] },
            { moduleId: "module2",  name: "DataFrames Basics",            topics: ["Creating DataFrames", "DataFrame attributes: shape, columns, dtypes", "Setting custom index"], questions: [{ id:"q1", title:"Basic: Create DataFrame from Dictionary", description:"Import pandas as pd and write a function create_df() that creates and returns a Pandas DataFrame from a given dictionary of lists.", input:"{'Name': ['Alice', 'Bob'], 'Age': [25, 30]}", expected_output:"   Name  Age\n0  Alice   25\n1    Bob   30" }, { id:"q2", title:"Intermediate: DataFrame Attributes", description:"Write a function df_info(df) that returns a tuple containing the shape of the DataFrame and a list of its column names.", input:"DataFrame with 5 rows and 3 columns", expected_output:"((5, 3), ['A', 'B', 'C'])" }, { id:"q3", title:"Advanced: Set Custom Index", description:"Write a function set_custom_index(df, col_name) that sets the specified column as the index without dropping it.", input:"df, 'ID'", expected_output:"DataFrame indexed by the 'ID' column." }] },
            { moduleId: "module3",  name: "Reading Data (CSV, Excel)",    topics: ["pd.read_csv()", "pd.read_excel()", "Parsing specific columns", "Parsing dates on load"], questions: [{ id:"q1", title:"Basic: Read CSV", description:"Write a function load_csv(filepath) that uses pd.read_csv() to load a CSV file into a DataFrame and returns it.", input:"'data.csv'", expected_output:"DataFrame containing the CSV data." }, { id:"q2", title:"Intermediate: Read Specific Columns", description:"Write a function load_specific_cols(filepath, cols_list) that reads only the specified columns from a CSV.", input:"'data.csv', ['Name', 'Salary']", expected_output:"DataFrame with only 'Name' and 'Salary' columns." }, { id:"q3", title:"Advanced: Handle Dates on Load", description:"Write a function load_with_dates(filepath, date_col) that reads a CSV and parses the specified column as datetime objects.", input:"'sales.csv', 'Date'", expected_output:"DataFrame where 'Date' column is dtype datetime64[ns]." }] },
            { moduleId: "module4",  name: "Selection and Indexing",       topics: ["Column selection", "loc vs iloc", "Conditional filtering", "Boolean masks"], questions: [{ id:"q1", title:"Basic: Select Single Column", description:"Write a function get_column(df, col_name) that returns a Pandas Series for that column.", input:"df, 'Price'", expected_output:"Series containing Price data." }, { id:"q2", title:"Intermediate: Conditional Filtering", description:"Write a function filter_high_sales(df, threshold) that returns rows where 'Sales' column is strictly greater than the threshold.", input:"df, 1000", expected_output:"Filtered DataFrame." }, { id:"q3", title:"Advanced: iloc Matrix Slicing", description:"Write a function slice_matrix(df) that uses .iloc to return the first 3 rows and last 2 columns.", input:"DataFrame (5x5)", expected_output:"DataFrame (3x2)" }] },
            { moduleId: "module5",  name: "Numerical Operations & Mapping", topics: ["Column arithmetic", ".apply()", ".map()", "Lambda on columns"], questions: [{ id:"q1", title:"Basic: Column Arithmetic", description:"Write a function calculate_profit(df) that creates a 'Profit' column by subtracting 'Cost' from 'Revenue'.", input:"DataFrame with 'Revenue' and 'Cost'", expected_output:"DataFrame with new 'Profit' column." }, { id:"q2", title:"Intermediate: Apply Function", description:"Write a function categorize_age(df) that uses .apply() to create 'AgeGroup': 'Adult' if Age >= 18, else 'Minor'.", input:"DataFrame with 'Age' column", expected_output:"DataFrame with 'AgeGroup' column." }, { id:"q3", title:"Advanced: Dictionary Mapping", description:"Write a function map_status(df) using .map() to replace 'Status_Code' values: {1:'Pending', 2:'Approved', 3:'Rejected'}.", input:"DataFrame with 'Status_Code' [1, 2, 1, 3]", expected_output:"Column values converted to string representations." }] },
            { moduleId: "module6",  name: "Handling Missing Data",        topics: ["df.isnull()", "dropna()", "fillna()", "Imputation strategies"], questions: [{ id:"q1", title:"Basic: Identify Missing Values", description:"Write a function count_missing(df) that returns a Series with count of NaN values per column.", input:"DataFrame with missing values", expected_output:"Series with column names as index and integer counts." }, { id:"q2", title:"Intermediate: Drop NaNs", description:"Write a function clean_rows(df) that drops any row containing at least one missing value.", input:"DataFrame", expected_output:"Cleaned DataFrame." }, { id:"q3", title:"Advanced: Fill NaNs with Mean", description:"Write a function impute_missing(df, col_name) that fills NaNs in specified numeric column with the mean.", input:"df, 'Score'", expected_output:"DataFrame with 'Score' NaNs replaced by mean." }] },
            { moduleId: "module7",  name: "GroupBy & Aggregations",       topics: ["df.groupby()", ".agg()", "Multiple aggregations", ".filter() on groups"], questions: [{ id:"q1", title:"Basic: Simple GroupBy", description:"Write a function average_salary_by_dept(df) that groups by 'Department' and returns mean 'Salary'.", input:"DataFrame with 'Department' and 'Salary'", expected_output:"Series indexed by Department with mean Salary." }, { id:"q2", title:"Intermediate: Multiple Aggregations", description:"Write a function sales_stats(df) that groups by 'Region' and returns sum and mean of 'Sales'.", input:"DataFrame with 'Region' and 'Sales'", expected_output:"DataFrame with MultiIndex columns." }, { id:"q3", title:"Advanced: Custom GroupBy Filter", description:"Write a function filter_large_groups(df, min_size) that excludes categories with fewer than min_size entries.", input:"df, 5", expected_output:"Filtered DataFrame from large categories only." }] },
            { moduleId: "module8",  name: "Concatenation & Merging",      topics: ["pd.concat()", "pd.merge()", "INNER/LEFT/RIGHT joins", "Handling overlapping columns"], questions: [{ id:"q1", title:"Basic: Vertical Concatenation", description:"Write a function stack_dataframes(df1, df2) using pd.concat() to append df2 below df1, ignoring indices.", input:"Two DataFrames with identical columns", expected_output:"Single stacked DataFrame with fresh index." }, { id:"q2", title:"Intermediate: Inner Join", description:"Write a function merge_users(users_df, orders_df) that performs an inner merge on 'User_ID'.", input:"Two DataFrames sharing 'User_ID'", expected_output:"Merged DataFrame with only matched users." }, { id:"q3", title:"Advanced: Left Join with Fill", description:"Write a function left_join_fill(df_left, df_right) that performs a left merge on 'Prod_ID', filling NaNs in 'Price' with 0.", input:"df_left, df_right", expected_output:"Left merged DataFrame with no NaNs in 'Price'." }] },
            { moduleId: "module9",  name: "Time Series Data",             topics: ["pd.to_datetime()", "DatetimeIndex", ".resample()", "Rolling windows"], questions: [{ id:"q1", title:"Basic: Convert to Datetime", description:"Write a function parse_dates(df, col_name) that converts a string column to Pandas datetime objects.", input:"df, 'Date_String'", expected_output:"DataFrame with datetime64 column dtype." }, { id:"q2", title:"Intermediate: Set Datetime Index", description:"Write a function set_time_index(df, col_name) that sets a datetime column as index and sorts chronologically.", input:"df, 'Timestamp'", expected_output:"Time-indexed, sorted DataFrame." }, { id:"q3", title:"Advanced: Resampling Data", description:"Write a function monthly_revenue(df) that resamples a daily DatetimeIndex DataFrame to monthly totals.", input:"Daily indexed DataFrame with 'Revenue'", expected_output:"Monthly indexed DataFrame with summed revenue." }] },
            { moduleId: "module10", name: "Multi-indexing",               topics: ["pd.MultiIndex", ".set_index()", ".loc on MultiIndex", ".reset_index()"], questions: [{ id:"q1", title:"Basic: Create MultiIndex", description:"Write a function create_multi_index(df) that sets both 'Year' and 'Quarter' as a hierarchical MultiIndex.", input:"DataFrame with 'Year' and 'Quarter' columns", expected_output:"MultiIndexed DataFrame." }, { id:"q2", title:"Intermediate: Select from MultiIndex", description:"Write a function get_year_data(df, year) using .loc to extract all data for a specific year.", input:"df, 2023", expected_output:"DataFrame containing only 2023 data." }, { id:"q3", title:"Advanced: Cross-section Query", description:"Write a function quarterly_cross(df, quarter) that uses .xs() to extract a specific quarter across all years.", input:"df, 'Q1'", expected_output:"Cross-sectioned DataFrame for Q1." }] },
            { moduleId: "mock-test", name: "Final Mock Assessment",       topics: ["End-to-end Pandas pipeline"], questions: [{ id:"q1", title:"Mock Test: Clean & Aggregate", description:"Write a function mock_pipeline(df) that drops NaN rows, groups by 'Category', and returns the sum of 'Revenue'.", input:"Dirty DataFrame with 'Category' and 'Revenue'", expected_output:"Aggregated Series." }, { id:"q2", title:"Mock Test: Merge & Filter", description:"Write a function mock_merge(df1, df2) that inner joins on 'ID' and returns rows where 'Score' > 50.", input:"Two DataFrames sharing 'ID'", expected_output:"Filtered merged DataFrame." }, { id:"q3", title:"Mock Test: Datetime Resample", description:"Write a function mock_resample(df) that sets 'Date' as index and returns weekly average of 'Value'.", input:"DataFrame with 'Date' and 'Value'", expected_output:"Weekly resampled DataFrame." }] }
        ]
    },

    // ── 4. REGRESSION ─────────────────────────
    regression: {
        id: "reg",
        title: "Regression Models",
        domain: ["dataAnalyst"],
        compilerPage: "regression_compiler.html",
        description: "Master Linear and Logistic Regression — building predictive models from scratch using NumPy.",
        modules: [
            { moduleId: "module1", name: "Introduction to Regression",         topics: ["What is Regression", "Supervised vs Unsupervised", "Use cases", "Types of regression"] },
            { moduleId: "module2", name: "Simple Linear Regression",           topics: ["Equation: y = mx + b", "Slope and intercept", "Ordinary Least Squares (OLS)", "Fitting a line"], questions: [{ id:"q1", title:"Basic: Compute Slope", description:"Write a function compute_slope(x, y) that calculates the slope m of a simple linear regression line from 1D arrays x and y.", input:"x=np.array([1,2,3,4]), y=np.array([2,4,5,4])", expected_output:"0.7" }, { id:"q2", title:"Intermediate: Predict Values", description:"Write a function predict(x, slope, intercept) that computes predicted y-values using y_hat = slope * x + intercept.", input:"x=np.array([1,2,3]), slope=2.0, intercept=1.0", expected_output:"[3. 5. 7.]" }, { id:"q3", title:"Advanced: Fit Linear Regression", description:"Write a function fit_linear_regression(x, y) that computes and returns the slope and intercept using the analytical OLS formula.", input:"x=np.array([1,2,3,4]), y=np.array([2,4,5,4])", expected_output:"(0.7, 2.0)" }] },
            { moduleId: "module3", name: "Multiple Linear Regression",         topics: ["Matrix form: y = Xβ", "Normal Equation", "Feature matrix construction", "Bias term"], questions: [{ id:"q1", title:"Basic: Add Bias Column", description:"Write a function add_bias(X) that prepends a column of ones to a 2D feature matrix X.", input:"X=np.array([[1,2],[3,4],[5,6]])", expected_output:"[[1 1 2]\n [1 3 4]\n [1 5 6]]" }, { id:"q2", title:"Intermediate: Normal Equation", description:"Write a function normal_equation(X, y) that computes weights using the normal equation: w = (X^T X)^{-1} X^T y.", input:"X, y arrays", expected_output:"Weight vector." }, { id:"q3", title:"Advanced: Multi-Feature Predictions", description:"Write a function multi_predict(X, weights) that computes predicted values by taking the dot product of X and the weight vector.", input:"X matrix, weights vector", expected_output:"Predicted y array." }] },
            { moduleId: "module4", name: "Cost Functions & Gradient Descent",  topics: ["Mean Squared Error (MSE)", "Gradient computation", "Learning rate", "Gradient Descent loop"], questions: [{ id:"q1", title:"Basic: Mean Squared Error", description:"Write a function mean_squared_error(y_true, y_pred) that computes the MSE between two arrays.", input:"y_true=np.array([3,4,5]), y_pred=np.array([2.5,4,5])", expected_output:"0.08333333333333333" }, { id:"q2", title:"Intermediate: Gradient Step", description:"Write a function gradient_step(X, y, weights, lr) that computes one gradient descent update step and returns the updated weights.", input:"X, y, weights=np.zeros(2), lr=0.01", expected_output:"Updated weight array after one step." }, { id:"q3", title:"Advanced: Full GD Training Loop", description:"Write a function train_gradient_descent(X, y, lr, epochs) that trains for the given epochs and returns final weights and a loss history list.", input:"X, y, lr=0.01, epochs=100", expected_output:"(final_weights, [loss_epoch1, ..., loss_epochN])" }] },
            { moduleId: "module5", name: "Model Evaluation Metrics",           topics: ["MSE, RMSE, MAE", "R-squared (R²)", "Adjusted R²", "Residual analysis"], questions: [{ id:"q1", title:"Basic: Root Mean Squared Error", description:"Write a function rmse(y_true, y_pred) that returns the square root of the mean squared error.", input:"y_true=np.array([1,2,3]), y_pred=np.array([1.1,1.9,3.1])", expected_output:"0.1" }, { id:"q2", title:"Intermediate: R-Squared Score", description:"Write a function r_squared(y_true, y_pred) that calculates the coefficient of determination R².", input:"y_true, y_pred arrays", expected_output:"Float between 0 and 1." }, { id:"q3", title:"Advanced: Adjusted R-Squared", description:"Write a function adjusted_r_squared(r2, n, p) that computes the Adjusted R² penalizing for the number of predictors.", input:"r2=0.9, n=100, p=5", expected_output:"0.8946808510638297" }] },
            { moduleId: "module6", name: "Data Preprocessing for Regression",  topics: ["Z-score standardization", "Min-Max scaling", "One-Hot encoding", "Train-test split"], questions: [{ id:"q1", title:"Basic: Standardize Features", description:"Write a function standardize_features(X) that normalizes each column to mean=0, std=1.", input:"X=np.array([[1,2],[3,4],[5,6]])", expected_output:"[[-1.22 -1.22]\n [ 0.    0.  ]\n [ 1.22  1.22]]" }, { id:"q2", title:"Intermediate: Min-Max Scale", description:"Write a function min_max_scale(x) that scales a 1D array to 0-1 range.", input:"x=np.array([-1, 0, 1])", expected_output:"[0.  0.5 1. ]" }, { id:"q3", title:"Advanced: One-Hot Encode", description:"Write a function one_hot_encode(categories) that returns a 2D binary matrix for categorical labels.", input:"categories=np.array([0,2,1,0])", expected_output:"[[1 0 0]\n [0 0 1]\n [0 1 0]\n [1 0 0]]" }] },
            { moduleId: "module7", name: "Cross-Validation & Splitting",       topics: ["Train-test split", "K-Fold cross-validation", "Shuffle and split", "Bias-variance tradeoff"], questions: [{ id:"q1", title:"Basic: Train-Test Split Indices", description:"Write a function train_test_split_indices(n_samples, test_size) returning training and testing index arrays.", input:"n_samples=10, test_size=0.2", expected_output:"(array([0,1,2,3,4,5,6,7]), array([8,9]))" }, { id:"q2", title:"Intermediate: Shuffle and Split", description:"Write a function shuffle_and_split(X, y, test_size) that jointly shuffles and splits data.", input:"X, y arrays, test_size=0.5", expected_output:"X_train, X_test, y_train, y_test" }, { id:"q3", title:"Advanced: K-Fold Indices", description:"Write a function k_fold_indices(n_samples, k) that generates (train_indices, test_indices) for each fold.", input:"n_samples=6, k=3", expected_output:"List of 3 tuples with train/test indices." }] },
            { moduleId: "module8", name: "Logistic Regression (Classification)", topics: ["Sigmoid function", "Binary Cross Entropy loss", "Logistic Gradient Descent", "Decision boundary"], questions: [{ id:"q1", title:"Basic: Sigmoid Function", description:"Write a function sigmoid(z) that computes the sigmoid activation function.", input:"z=np.array([0, 2, -2])", expected_output:"[0.5        0.88079708 0.11920292]" }, { id:"q2", title:"Intermediate: Binary Cross Entropy", description:"Write a function binary_cross_entropy(y_true, y_pred) that calculates the Log Loss.", input:"y_true=np.array([1,0,1]), y_pred=np.array([0.9,0.1,0.8])", expected_output:"0.14462152754328741" }, { id:"q3", title:"Advanced: Logistic Gradient Descent", description:"Write a function logistic_gradient_descent(X, y, weights, learning_rate, iterations) returning final weights.", input:"X, y, weights=np.array([0.0,0.0]), lr=0.1, iterations=1", expected_output:"[-0.05 -0.05]" }] },
            { moduleId: "module9", name: "Final Mock Assessment",              topics: ["End-to-end regression pipeline"], questions: [{ id:"q1", title:"Mock Test: Regression Pipeline", description:"Write a function mock_predict(X, weights) that computes predicted values via dot product.", input:"X=np.array([[1,2],[1,3]]), weights=np.array([0.5,1.5])", expected_output:"[3.5 5. ]" }, { id:"q2", title:"Mock Test: Error Metric", description:"Write a function mock_mse(y_true, y_pred) that calculates Mean Squared Error.", input:"y_true=np.array([1,2]), y_pred=np.array([1.5,1.5])", expected_output:"0.25" }, { id:"q3", title:"Mock Test: Preprocessing", description:"Write a function mock_standardize(x) normalizing a 1D array to mean=0, std=1.", input:"x=np.array([10,20,30])", expected_output:"[-1.22474487  0.          1.22474487]" }] }
        ]
    },

    // ── 5. SQL ────────────────────────────────
    sql: {
        id: "sql_a",
        title: "SQL Basics and Advanced",
        domain: ["dataAnalyst"],
        compilerPage: "sql.html",
        description: "Learn SQL from scratch — querying, joining, aggregating, and managing relational databases.",
        modules: [
            { moduleId: "module1", name: "Introduction to SQL & Databases",   topics: ["What is SQL", "Relational databases", "SELECT * FROM", "Column aliasing", "String concatenation"], questions: [{ id:"q1", title:"Select All Columns", description:"Write a SQL query to SELECT all columns from a table named Employees.", input:"Table: Employees", expected_output:"All records and columns from the Employees table." }, { id:"q2", title:"Specific Column Selection", description:"Write a query to retrieve only first_name and email from the Users table.", input:"Table: Users", expected_output:"A result set with exactly 2 columns." }, { id:"q3", title:"String Concatenation", description:"Using the Products table, return a custom column formatted as 'Product: [name] costs $ [price]', aliased as 'Product Details'.", input:"Table: Products (name, price)", expected_output:"A single column 'Product Details' with formatted strings." }] },
            { moduleId: "module2", name: "Basic SELECT & Filtering",          topics: ["WHERE clause", "AND / OR / NOT", "BETWEEN", "LIKE and wildcards", "IN operator"], questions: [{ id:"q1", title:"Filter by Exact Match", description:"Write a query to select all employees where department = 'Sales'.", input:"Table: Employees (department)", expected_output:"Only sales department employees." }, { id:"q2", title:"Multiple Conditions (AND/BETWEEN)", description:"Select all products where status is 'In Stock' AND price is between 50 and 150.", input:"Table: Inventory (status, price)", expected_output:"Filtered products matching both conditions." }, { id:"q3", title:"Wildcards and Logical OR", description:"Find all customers whose email ends with '@gmail.com' OR status is 'VIP'.", input:"Table: Customers (email, status)", expected_output:"Matching rows based on wildcard and OR logic." }] },
            { moduleId: "module3", name: "Aggregates & Grouping",             topics: ["COUNT()", "SUM()", "AVG()", "MIN() / MAX()", "GROUP BY", "HAVING"], questions: [{ id:"q1", title:"Count Total Records", description:"Count the total number of orders in the Orders table, aliased as 'Total Orders'.", input:"Table: Orders", expected_output:"A single row/column with the count." }, { id:"q2", title:"Average Grouped by Column", description:"Find the AVG(salary) grouped by department from the Employees table.", input:"Table: Employees (department, salary)", expected_output:"Two columns: department and avg_salary." }, { id:"q3", title:"HAVING Clause", description:"Group Sales by region. Return only regions where total SUM(revenue) exceeds 10,000.", input:"Table: Sales (region, revenue)", expected_output:"Regions where aggregate sum > 10,000." }] },
            { moduleId: "module4", name: "SQL JOINS",                         topics: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "Self JOIN"], questions: [{ id:"q1", title:"INNER JOIN", description:"Perform an INNER JOIN between Customers and Orders on customer_id. Select customer name and order_date.", input:"Tables: Customers(id, name), Orders(customer_id, order_date)", expected_output:"Matching records across both tables." }, { id:"q2", title:"LEFT JOIN & Self-Joins", description:"Write a LEFT JOIN showing all Employees and their possible Manager name.", input:"Table: Employees (id, name, manager_id)", expected_output:"All employees; if no manager, manager name is NULL." }, { id:"q3", title:"FULL OUTER JOIN", description:"FULL OUTER JOIN between Students and Courses on course_id. Identify students without courses and courses without students.", input:"Tables: Students(id, name, course_id), Courses(id, title)", expected_output:"Complete set including NULL matches on both sides." }] },
            { moduleId: "module5", name: "Subqueries & CTEs",                 topics: ["WHERE subquery", "FROM subquery (Derived Tables)", "WITH clause (CTE)", "Correlated subqueries"], questions: [{ id:"q1", title:"Basic WHERE Subquery", description:"Find employees in Staff whose salary is greater than the average salary using a subquery.", input:"Table: Staff (salary)", expected_output:"Staff earning above the calculated average." }, { id:"q2", title:"Derived Tables (FROM Subquery)", description:"Calculate total sales per employee_id in a subquery, then filter for totals > 500.", input:"Table: Sales (employee_id, amount)", expected_output:"Employees exceeding quota." }, { id:"q3", title:"Common Table Expressions (CTE)", description:"Use a CTE WITH Regional_Sales to first calculate total sales per region, then select the max total.", input:"Table: Sales (region, amount)", expected_output:"The single highest regional sales figure." }] },
            { moduleId: "module6", name: "Data Manipulation (DML)",           topics: ["INSERT INTO", "UPDATE SET", "DELETE WHERE", "TRUNCATE"], questions: [{ id:"q1", title:"INSERT Data", description:"Write INSERT INTO to add 'The Hobbit' by J.R.R Tolkien, year 1937 to the Books table.", input:"Table: Books (title, author, year)", expected_output:"1 row inserted." }, { id:"q2", title:"UPDATE Records", description:"Write UPDATE to set status = 'Shipped' for orders before '2023-01-01'.", input:"Table: Orders (status, order_date)", expected_output:"Historical orders updated." }, { id:"q3", title:"DELETE with Conditions", description:"DELETE from Sessions where last_active < '2022-01-01' AND is_bot = True.", input:"Table: Sessions (last_active, is_bot)", expected_output:"Specific deletion of matched rows only." }] },
            { moduleId: "module7", name: "Table Creation & Structure (DDL)",  topics: ["CREATE TABLE", "PRIMARY KEY", "NOT NULL", "FOREIGN KEY", "ALTER TABLE"], questions: [{ id:"q1", title:"CREATE TABLE Basics", description:"Write CREATE TABLE for Users with id (INT), username (VARCHAR(50)), created_at (DATE).", input:"Schema: id, username, created_at", expected_output:"Valid schema creation." }, { id:"q2", title:"Constraints (PK & NOT NULL)", description:"Write CREATE TABLE for Products with PRIMARY KEY on id and NOT NULL on price.", input:"Schema: id (PK), price (NOT NULL)", expected_output:"Schema with enforced constraints." }, { id:"q3", title:"ALTER TABLE & Foreign Keys", description:"ALTER Employees to add phone_number VARCHAR(15) and FOREIGN KEY linking department_id to Departments(id).", input:"Tables: Employees, Departments", expected_output:"Database structure altered safely." }] },
            { moduleId: "module8", name: "Window Functions",                  topics: ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "PARTITION BY", "OVER()"], questions: [{ id:"q1", title:"Basic: ROW_NUMBER", description:"Write a query assigning a row number to each employee ordered by salary descending.", input:"Table: Employees (name, salary)", expected_output:"Employees with sequential row numbers." }, { id:"q2", title:"Intermediate: RANK by Department", description:"Write a query ranking employees by salary within each department using RANK() OVER(PARTITION BY...).", input:"Table: Employees (name, dept, salary)", expected_output:"Ranked employees per department." }, { id:"q3", title:"Advanced: Domain Extraction", description:"Write a query extracting the domain from email addresses in the Leads table.", input:"Table: Leads (email)", expected_output:"A frequency list of email domains." }] },
            { moduleId: "mock-test", name: "Final Mock Assessment",           topics: ["Combined SQL skills"], questions: [{ id:"q1", title:"Mock Test: Joins & Aggregates", description:"JOIN Orders and Customers. Find total order_amount per customer name, only for customers with more than 2 orders.", input:"Tables: Orders(customer_id, order_amount), Customers(id, name)", expected_output:"Customer names with aggregate order sum." }, { id:"q2", title:"Mock Test: Complex DML", description:"UPDATE salary by 10% for employees whose department_id belongs to a department named 'Engineering' (use a subquery).", input:"Tables: Employees, Departments", expected_output:"Engineers receive a 10% salary bump." }, { id:"q3", title:"Mock Test: Advanced Analytics", description:"Use a CTE to find average score per class_id. Join back to Students to find students scoring above their class average.", input:"Table: Students (id, name, score, class_id)", expected_output:"Students outperforming their class average." }] }
        ]
    },

    // ── 6. PYTHON DATA VISUALIZATION ──────────
    dataviz: {
        id: "viz_py",
        title: "Python Viz",
        domain: ["dataAnalyst"],
        compilerPage: "dataviz.html",
        description: "Master data visualization using Matplotlib, Seaborn, Plotly, Bokeh, Altair, and Folium.",
        modules: [
            { moduleId: "module1", name: "Principles of Data Visualization",   topics: ["Chart selection", "Data-Ink ratio", "Tidy data format", "Colorblind-friendly palettes"], questions: [{ id:"q1", title:"Colorblind Palette", description:"Write a function bad_vs_good_colors() returning a list of 3 hex strings forming a colorblind-friendly palette.", input:"", expected_output:"['#E69F00', '#56B4E9', '#009E73']" }, { id:"q2", title:"Data-Ink Ratio", description:"Write function calculate_data_ink_ratio(data_ink_bytes, non_data_ink_bytes) computing the ratio as a percentage.", input:"50, 50", expected_output:"50.0%" }, { id:"q3", title:"Tidy Data Transformation", description:"Write a function tidy_data(wide_data) to pivot wide format data to tidy (long) format.", input:"[{'id':1,'A':10,'B':20}]", expected_output:"[{'id':1,'variable':'A','value':10},{'id':1,'variable':'B','value':20}]" }] },
            { moduleId: "module2", name: "Python Visualization - Matplotlib",  topics: ["plt.plot()", "plt.scatter()", "plt.bar()", "Subplots", "Figure & Axes objects"], questions: [{ id:"q1", title:"Basic Line Plot", description:"Write a function plot_line() that plots x=[1,2,3] vs y=[4,5,6] titled 'Growth'. Return the Axes object.", input:"", expected_output:"<Axes: title={'center': 'Growth'}>" }, { id:"q2", title:"Styled Scatter Plot", description:"Write a function plot_scatter() that makes a scatter plot with red 'x' markers. Return the Axes.", input:"", expected_output:"<Axes: >" }, { id:"q3", title:"Custom Subplots", description:"Write a function custom_subplots() creating a 2-row 1-column figure with a line chart on top and bar chart on bottom. Return the Figure.", input:"", expected_output:"<Figure size 640x480 with 2 Axes>" }] },
            { moduleId: "module3", name: "Python Visualization - Seaborn",    topics: ["sns.histplot()", "sns.boxplot()", "sns.heatmap()", "Seaborn themes"], questions: [{ id:"q1", title:"Distribution Histogram", description:"Write function sns_hist(df) using seaborn.histplot() to plot the 'Age' column distribution. Return Axes.", input:"df_with_age_column", expected_output:"<Axes: xlabel='Age', ylabel='Count'>" }, { id:"q2", title:"Grouped Boxplot", description:"Write function sns_boxplot(df) comparing 'Salary' across 'Departments'. Return Axes.", input:"df_with_salary_and_dept", expected_output:"<Axes: xlabel='Department', ylabel='Salary'>" }, { id:"q3", title:"Annotated Heatmap", description:"Write function sns_heatmap(df) that plots a correlation matrix heatmap with annotations and 'coolwarm' colormap. Return Axes.", input:"numeric_df", expected_output:"<Axes: >" }] },
            { moduleId: "module4", name: "Interactive Plots with Plotly",      topics: ["plotly.express", "px.line()", "px.pie()", "Hover data", "Interactive scatter"], questions: [{ id:"q1", title:"Basic Plotly Line", description:"Write a function basic_plotly_line() using plotly.express to create a line chart. Return the Figure object.", input:"", expected_output:"Figure({ data: [...], layout: [...] })" }, { id:"q2", title:"Plotly Pie Chart", description:"Write function plotly_pie_chart(df) generating a pie chart with values='revenue' and names='region'. Return Figure.", input:"df_with_revenue_region", expected_output:"Figure with pie type." }, { id:"q3", title:"Interactive Scatter with Hover", description:"Write function plotly_interactive_scatter(df) creating a scatter plot with hover data for 'Employee Name' and color by 'Department'.", input:"df_with_employees", expected_output:"Figure with scatter type." }] },
            { moduleId: "module5", name: "Interactive Plots with Bokeh",       topics: ["bokeh.plotting.figure()", "p.line()", "p.vbar()", "HoverTool", "show()"], questions: [{ id:"q1", title:"Bokeh Line Chart", description:"Write function bokeh_line() creating a Bokeh figure and plotting a line with x=[1,2] and y=[3,4]. Return the figure.", input:"", expected_output:"Figure(id=...)" }, { id:"q2", title:"Bokeh Vertical Bars", description:"Write function bokeh_bar() creating a vertical bar chart with width=0.5 and colors='green'. Return the figure.", input:"", expected_output:"Figure(id=...)" }, { id:"q3", title:"Bokeh Hover Tool", description:"Write function bokeh_hover() constructing a HoverTool, applying it to a figure, and plotting scatter circles. Return figure.", input:"", expected_output:"Figure(id=...)" }] },
            { moduleId: "module6", name: "Declarative Visualization with Altair", topics: ["alt.Chart()", "mark_bar()", "mark_circle()", "Encoding channels", ".interactive()"], questions: [{ id:"q1", title:"Altair Bar Chart", description:"Write function altair_bar(df) mapping x='Category' and y='Value' with mark_bar(). Return chart.", input:"df_category_value", expected_output:"vegalite_chart_object" }, { id:"q2", title:"Altair Colored Scatter", description:"Write function altair_colored_scatter(df) using mark_circle() with color encoding='Gender'. Return chart.", input:"df_height_weight_gender", expected_output:"vegalite_chart_object" }, { id:"q3", title:"Altair Zoom & Pan", description:"Write function altair_interactive(df) building a line chart and appending .interactive() for zoom/pan.", input:"df_time_series", expected_output:"vegalite_chart_object" }] },
            { moduleId: "module7", name: "Geographic Mapping with Folium",    topics: ["folium.Map()", "folium.Marker()", "CircleMarker", "Choropleth layers"], questions: [{ id:"q1", title:"Initialize Folium Map", description:"Write function basic_map() returning a folium.Map centered at [40.7128, -74.0060].", input:"", expected_output:"<folium.folium.Map object>" }, { id:"q2", title:"Add Map Markers", description:"Write function add_marker(map_obj) adding a marker at [34.0522, -118.2437] with popup 'LA'. Return map.", input:"folium_map_instance", expected_output:"<folium.folium.Map object>" }, { id:"q3", title:"Map Choropleth", description:"Write function map_choropleth(map_obj, df, geo_json) linking geographic data to unemployment rates as a choropleth layer.", input:"map_obj, df, geo_json", expected_output:"<folium.folium.Map object>" }] },
            { moduleId: "module8", name: "Visualization for Data Science & ML", topics: ["Confusion Matrix Display", "ROC Curve", "PCA Scatter", "sklearn plotting tools"], questions: [{ id:"q1", title:"Confusion Matrix Plot", description:"Write function plot_confusion_matrix(y_true, y_pred) using sklearn ConfusionMatrixDisplay to visualize the matrix.", input:"y_true, y_pred lists", expected_output:"ConfusionMatrixDisplay object." }, { id:"q2", title:"ROC Curve Construction", description:"Write function plot_roc_curve_custom(fpr, tpr) plotting the ROC curve with a dashed diagonal. Return Axes.", input:"fpr_list, tpr_list", expected_output:"<Axes: >" }, { id:"q3", title:"PCA Dimensionality Scatter", description:"Write function plot_pca_features(df) reducing to 2 PCA components and scatter plotting results. Return Axes.", input:"high_dim_df", expected_output:"<Axes: >" }] },
            { moduleId: "mock-test", name: "Final Mock Assessment",           topics: ["Combined visualization skills"], questions: [{ id:"q1", title:"Mock Test: Styled Scatter", description:"Write function mixed_basic_plot(df) returning a Matplotlib scatter plot of 'Revenue' vs 'Cost' with a Seaborn theme.", input:"df_revenue_cost", expected_output:"<Axes: >" }, { id:"q2", title:"Mock Test: Advanced Hover Data", description:"Write function mixed_interactive_dashboard(df) generating a Plotly bar chart comparing 'Sales' by 'Region' with custom hover for 'Profit Margin'.", input:"df_sales_region_profit", expected_output:"Figure with bar type." }, { id:"q3", title:"Mock Test: Proportional Geo-Markers", description:"Write function comprehensive_geo_scatter(df) initializing a Folium map and adding CircleMarkers proportional to 'Population'.", input:"df_lat_lon_population", expected_output:"<folium.folium.Map object>" }] }
        ]
    },

    // ── 7. EXCEL ANALYTICS ────────────────────
    excel: {
        id: "excel",
        title: "Excel Analytics",
        domain: ["dataAnalyst"],
        compilerPage: "excel_compiler.html",
        description: "Master Excel for data analysis — formulas, lookups, pivot tables, charts, and VBA macros.",
        modules: [
            { moduleId: "module1", name: "Getting Started with Excel",        topics: ["Cell references", "TODAY() / NOW()", "Arithmetic operators", "Absolute vs relative references ($)"], questions: [{ id:"q1", title:"Basic: Current Date", description:"Write an Excel formula that returns the current system date and updates automatically.", input:"None", expected_output:"=TODAY()" }, { id:"q2", title:"Intermediate: Simple Arithmetic", description:"Write a formula to add values in cell A1 and B1 without using a named function.", input:"A1=10, B1=15", expected_output:"=A1+B1" }, { id:"q3", title:"Advanced: Absolute Reference", description:"Write a formula multiplying C1 by D1, ensuring D1 never changes when dragged down.", input:"C1=5, D1=20", expected_output:"=C1*$D$1" }] },
            { moduleId: "module2", name: "Essential Formulas & Functions",    topics: ["SUM()", "AVERAGE()", "MAX()", "MIN()", "COUNT()", "COUNTA()"], questions: [{ id:"q1", title:"Basic: Sum Range", description:"Write a formula using SUM to add values in A1:A10.", input:"Range A1:A10", expected_output:"=SUM(A1:A10)" }, { id:"q2", title:"Intermediate: Average Calculation", description:"Write a formula to calculate the mean of B1:B20.", input:"Range B1:B20", expected_output:"=AVERAGE(B1:B20)" }, { id:"q3", title:"Advanced: Maximum Value", description:"Write a formula returning the highest value in C1:C100.", input:"Range C1:C100", expected_output:"=MAX(C1:C100)" }] },
            { moduleId: "module3", name: "Logical Functions (IF, AND, OR)",   topics: ["IF()", "AND()", "OR()", "Nested IF", "IFS()"], questions: [{ id:"q1", title:"Basic: Simple IF Statement", description:"Write an IF function: if A1 > 10 return 'Yes', else 'No'.", input:"A1=15", expected_output:"=IF(A1>10, \"Yes\", \"No\")" }, { id:"q2", title:"Intermediate: IF with AND Logic", description:"Return 'Valid' if A1 > 5 AND B1 < 10, else 'Invalid'.", input:"A1=8, B1=4", expected_output:"=IF(AND(A1>5, B1<10), \"Valid\", \"Invalid\")" }, { id:"q3", title:"Advanced: Nested IF Function", description:"Nested IF for A1: if > 90 return 'A', if > 80 return 'B', otherwise 'C'.", input:"A1=85", expected_output:"=IF(A1>90, \"A\", IF(A1>80, \"B\", \"C\"))" }] },
            { moduleId: "module4", name: "Lookup Functions (VLOOKUP, XLOOKUP)", topics: ["VLOOKUP()", "HLOOKUP()", "XLOOKUP()", "INDEX MATCH", "Exact vs approximate match"], questions: [{ id:"q1", title:"Basic: Exact VLOOKUP", description:"VLOOKUP for exact match of D2 in A2:B10, return column 2.", input:"Lookup value in D2", expected_output:"=VLOOKUP(D2, A2:B10, 2, FALSE)" }, { id:"q2", title:"Intermediate: Horizontal Lookup", description:"HLOOKUP for A1 across A5:E10, return 3rd row.", input:"Lookup value in A1", expected_output:"=HLOOKUP(A1, A5:E10, 3, FALSE)" }, { id:"q3", title:"Advanced: Flexible XLOOKUP", description:"XLOOKUP for F2 in A2:A100, return from C2:C100. If no match, return 'Not Found'.", input:"Lookup value F2", expected_output:"=XLOOKUP(F2, A2:A100, C2:C100, \"Not Found\")" }] },
            { moduleId: "module5", name: "Data Cleaning & Formatting",        topics: ["TRIM()", "PROPER()", "UPPER()", "LOWER()", "TEXTJOIN()", "SUBSTITUTE()"], questions: [{ id:"q1", title:"Basic: Remove Extra Spaces", description:"Write a TRIM formula to remove all extra spaces from A2.", input:"A2='  Excel   Data   '", expected_output:"=TRIM(A2)" }, { id:"q2", title:"Intermediate: Proper Case", description:"Write a formula to convert B2 so each word starts with a capital letter.", input:"B2='jOhN dOe'", expected_output:"=PROPER(B2)" }, { id:"q3", title:"Advanced: Dynamic Text Join", description:"Use TEXTJOIN to combine A2:A5 separated by ', ', ignoring empty cells.", input:"Range A2:A5 with A3 blank", expected_output:"=TEXTJOIN(\", \", TRUE, A2:A5)" }] },
            { moduleId: "module6", name: "Pivot Tables & Charts",             topics: ["Creating Pivot Tables", "GETPIVOTDATA()", "COUNTBLANK()", "COUNTIFS()", "Chart types"], questions: [{ id:"q1", title:"Basic: Retrieve Pivot Data", description:"Write GETPIVOTDATA to extract the 'Sales' data field from a Pivot Table at $A$3.", input:"Pivot Table at $A$3", expected_output:"=GETPIVOTDATA(\"Sales\", $A$3)" }, { id:"q2", title:"Intermediate: Count Blank Cells", description:"Write a formula counting empty cells in D2:D50.", input:"Range D2:D50", expected_output:"=COUNTBLANK(D2:D50)" }, { id:"q3", title:"Advanced: Multi-Condition Counting", description:"COUNTIFS to count rows where A2:A100 = 'East' AND B2:B100 > 100.", input:"Ranges A2:A100 and B2:B100", expected_output:"=COUNTIFS(A2:A100, \"East\", B2:B100, \">100\")" }] },
            { moduleId: "module7", name: "Advanced Data Analysis",            topics: ["SUMPRODUCT()", "INDEX MATCH", "IFERROR()", "Array formulas"], questions: [{ id:"q1", title:"Basic: Array Product Summation", description:"SUMPRODUCT to multiply A2:A10 and B2:B10 elements and return their sum.", input:"Ranges A2:A10, B2:B10", expected_output:"=SUMPRODUCT(A2:A10, B2:B10)" }, { id:"q2", title:"Intermediate: Two-Way Lookup via INDEX MATCH", description:"Return value from B2:B10 where A2:A10 matches E2 using INDEX and MATCH.", input:"E2 lookup value", expected_output:"=INDEX(B2:B10, MATCH(E2, A2:A10, 0))" }, { id:"q3", title:"Advanced: Error Trapping Pipeline", description:"VLOOKUP for A1 in B:C returning column 2. If error occurs, output 'Missing'.", input:"Lookup value A1", expected_output:"=IFERROR(VLOOKUP(A1, B:C, 2, FALSE), \"Missing\")" }] },
            { moduleId: "module8", name: "Macros & VBA",                      topics: ["Recording macros", "Sub procedures", "Range().Clear", "User Defined Functions (UDF)", "MsgBox"], questions: [{ id:"q1", title:"Basic: Standard Subroutine", description:"Write a basic VBA Sub named HelloWorld that triggers a MsgBox displaying 'Hello'.", input:"VBA Module", expected_output:"Sub HelloWorld()\nMsgBox \"Hello\"\nEnd Sub" }, { id:"q2", title:"Intermediate: Range Manipulation", description:"Write one line of VBA code to clear both contents and formatting of A1:B10.", input:"Active Sheet Range", expected_output:"Range(\"A1:B10\").Clear" }, { id:"q3", title:"Advanced: User Defined Function (UDF)", description:"Write a VBA Function named MultiplyByTwo that takes val and returns val * 2.", input:"Numeric Input", expected_output:"Function MultiplyByTwo(val)\nMultiplyByTwo = val * 2\nEnd Function" }] },
            { moduleId: "module9", name: "Final Mock Assessment",             topics: ["Combined Excel skills"], questions: [{ id:"q1", title:"Mock Test: Data Extraction Pipeline", description:"Write a nested formula using TRIM, PROPER, and XLOOKUP to clean A1 before searching in B:B and returning C:C.", input:"Messy text in A1", expected_output:"=XLOOKUP(PROPER(TRIM(A1)), B:B, C:C)" }, { id:"q2", title:"Mock Test: Advanced Conditionals", description:"Return 'Pending' if EITHER A1 OR B1 is blank, otherwise 'Complete'.", input:"Cells A1 and B1", expected_output:"=IF(OR(ISBLANK(A1), ISBLANK(B1)), \"Pending\", \"Complete\")" }, { id:"q3", title:"Mock Test: Analytical Metrics", description:"AVERAGEIFS to average C1:C100 where A1:A100 = 'Active' AND B1:B100 >= 50.", input:"Ranges A1:A100, B1:B100, C1:C100", expected_output:"=AVERAGEIFS(C1:C100, A1:A100, \"Active\", B1:B100, \">=50\")" }] }
        ]
    }
};


// ─────────────────────────────────────────────
// SECTION 3: CHATBOT SYSTEM PROMPT GENERATOR
// Call window.getChatbotSystemPrompt() to get the
// full system prompt string for the /api/chat endpoint.
// ─────────────────────────────────────────────

window.getChatbotSystemPrompt = function() {

    // ── Build a compact text summary of all course data ──
    let courseSummary = "";

    for (const [key, course] of Object.entries(window.courseData)) {
        courseSummary += `\n\n### COURSE: ${course.title} (ID: ${course.id})\n`;
        courseSummary += `Description: ${course.description}\n`;
        courseSummary += `Domains: ${course.domain.join(", ")}\n`;
        courseSummary += `Compiler Page: ${course.compilerPage}\n`;
        courseSummary += `Modules:\n`;

        course.modules.forEach(mod => {
            courseSummary += `  - ${mod.name}`;
            if (mod.topics && mod.topics.length > 0) {
                courseSummary += `: ${mod.topics.join(", ")}`;
            }
            if (mod.questions && mod.questions.length > 0) {
                courseSummary += ` | Questions: ${mod.questions.map(q => q.title).join(" / ")}`;
            }
            courseSummary += `\n`;
        });
    }

    // ── Build domain + roadmap summary ──
    let roadmapSummary = `
### DOMAIN: Data Analyst
Levels: Data Foundations → Statistical Analysis → Database & SQL → Python Engineering → Visual Analytics → Advanced Modeling

Fundamental Courses: Data Fundamentals, Statistics, Excel Analytics, Exploratory DA (EDA), BI Tools (PBI/Tableau)
Programming Courses: SQL Basics and Advanced, Python Basics, NumPy Arrays, Pandas DataFrames, Python Viz, Regression Models

Prerequisites:
- Statistics requires: Data Fundamentals
- Excel Analytics requires: Data Fundamentals  
- SQL requires: Data Fundamentals
- Python Basics requires: Data Fundamentals
- Pandas requires: NumPy Arrays
- EDA requires: Statistics + Pandas
- BI Tools requires: Excel Analytics + EDA
- Regression Models requires: Statistics + Python Basics

### DOMAIN: AI/ML Engineer
Levels: Math Foundations → Statistical Theory → Classical ML → Deep Learning → Applied AI → Ethics & Ops

Fundamental Courses: Linear Algebra, Multivariable Calculus, Probability & Inference, Optimization Theory, AI Ethics & Bias
Programming Courses: Scikit-Learn ML, Neural Networks, PyTorch/TF, NLP & Transformers, Computer Vision, MLOps Deployment

Prerequisites:
- Multivariable Calculus requires: Linear Algebra
- Probability & Inference requires: Linear Algebra
- Optimization Theory requires: Multivariable Calculus
- Scikit-Learn ML requires: Linear Algebra
- Neural Networks requires: Scikit-Learn ML
- PyTorch/TF requires: Neural Networks
- NLP & Transformers requires: Neural Networks
- Computer Vision requires: Neural Networks
- MLOps Deployment requires: PyTorch/TF
`;

    // ── Full System Prompt ──
    return `You are EduPath AI — a specialized educational assistant for the EduPath AI learning platform. You help students understand courses, topics, modules, questions, and their learning path.

## YOUR STRICT SCOPE
You ONLY answer questions related to:
1. The EduPath AI platform itself (how it works, how to navigate it)
2. The two learning domains: Data Analyst and AI/ML Engineer
3. The specific courses, modules, topics, and practice questions in the curriculum below
4. Learning path advice — which courses to take first, prerequisites, what to study next
5. Conceptual explanations of topics that appear inside the curriculum (e.g. explaining what a DataFrame is, what SQL JOINs do, what backpropagation means)
6. Encouragement and study tips relevant to the courses

## WHAT YOU MUST NOT DO
- Do NOT answer questions unrelated to the EduPath AI platform or the listed courses/domains
- Do NOT engage in general-purpose conversations (weather, news, general coding outside curriculum, etc.)
- Do NOT provide answers to homework or external assignments that are not part of this platform's question bank
- Do NOT answer questions about AI/ML tools or frameworks not listed in the curriculum (e.g., LangChain, Hugging Face, etc.)
- If the user asks about something outside your scope, politely redirect them: "I'm specialized for EduPath AI's learning platform. I can help you with your courses, roadmap, topics, or practice questions. What would you like to learn today?"

## HOW TO HANDLE OFF-TOPIC QUESTIONS
When a question is outside your scope, respond warmly but firmly:
"That's a great question, but it's outside my area of expertise here at EduPath AI. I'm best at helping you with your [Data Analyst / AI-ML] roadmap, course modules, and practice questions. Can I help you with something from your curriculum?"

## PLATFORM KNOWLEDGE
${roadmapSummary}

## FULL CURRICULUM DATA
${courseSummary}

## RESPONSE GUIDELINES
- Be concise, friendly, and encouraging
- When explaining a concept, relate it back to the module/course it belongs to
- When asked "what should I learn next?", refer to the prerequisite chain
- Format answers with markdown when helpful (bold, bullets, code snippets for code-related topics)
- For code concept explanations (Python, SQL, NumPy, etc.), always provide a short code example
- Always address the user as a learner on a journey — motivate them

## QUICK REFERENCE — COMPILER PAGES
Each programming course has a live coding environment:
- Python Basics → python_compiler.html
- NumPy Arrays → comp_numpy.html  
- Pandas DataFrames → pandas_compiler.html
- Regression Models → regression_compiler.html
- SQL Basics and Advanced → sql.html
- Python Viz → dataviz.html
- Excel Analytics → excel_compiler.html

Direct users to the correct compiler page when they ask about practice problems or coding exercises.`;
};

window.roadmapData = {
    dataAnalyst: {
        nonProgramming: [
            { id: "df", title: "Data Fundamentals", level: 1, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/9953/9953334.png", color: "#3b82f6", keyTopics: ["Data Types", "Database Intro", "Data Cleaning basics"] },
            { id: "stats", title: "Statistics", level: 2, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png", color: "#8b5cf6", keyTopics: ["Descriptive Stats", "Hypothesis Testing", "Probability Distributions"] },
            { id: "excel", title: "Excel Analytics", level: 2, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/732/732220.png", color: "#10b981", keyTopics: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Conditional Formatting"] },
            { id: "eda", title: "Exploratory DA (EDA)", level: 5, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4245/4245351.png", color: "#f59e0b", keyTopics: ["Handling Missing Data", "Outlier Detection", "Correlation Matrices"] },
            { id: "bi", title: "BI Tools (PBI/Tableau)", level: 5, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/5956/5956597.png", color: "#ec4899", keyTopics: ["DAX Queries", "Dashboard Design", "Data Connections"] }
        ],
        programming: [
            { id: "sql_a", title: "SQL Basics and Advanced", level: 3, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4492/4492311.png", color: "#2563eb", keyTopics: ["JOINS", "Subqueries", "Window Functions"] },
            { id: "py_b", title: "Python Basics", level: 4, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", color: "#f59e0b", keyTopics: ["Loops & Functions", "OOPs Concepts", "Lists & Dictionaries"] },
            { id: "numpy", title: "NumPy Arrays", level: 4, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/9135/9135965.png", color: "#ef4444", keyTopics: ["Array Slicing", "Broadcasting", "Matrix Operations"] },
            { id: "pandas", title: "Pandas DataFrames", level: 4, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4862/4862036.png", color: "#10b981", keyTopics: ["DataFrames", "Groupby & Aggregation", "Merging Data"] },
            { id: "viz_py", title: "Python Viz", level: 5, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png", color: "#6366f1", keyTopics: ["Matplotlib Pyplot", "Seaborn Styling", "Interactive Plots"] },
            { id: "reg", title: "Regression Models", level: 6, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103507.png", color: "#ef4444", keyTopics: ["Linear Regression", "Logistic Regression", "Model Evaluation"] }
        ],
        levels: [
            { lv: 1, name: "Data Foundations", icon: "fa-database" },
            { lv: 2, name: "Statistical Analysis", icon: "fa-chart-line" },
            { lv: 3, name: "Database & SQL", icon: "fa-server" },
            { lv: 4, name: "Python Engineering", icon: "fa-brands fa-python" },
            { lv: 5, name: "Visual Analytics", icon: "fa-pie-chart" },
            { lv: 6, name: "Advanced Modeling", icon: "fa-brain" }
        ]
    },
    aiml: {
        nonProgramming: [
            { id: "math_la", title: "Linear Algebra", level: 1, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/3721/3721619.png", color: "#3b82f6", keyTopics: ["Vectors", "Matrices", "Eigenvalues"] },
            { id: "calc_mv", title: "Multivariable Calculus", level: 1, prereq: ["math_la"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png", color: "#8b5cf6", keyTopics: ["Partial Derivatives", "Gradients", "Chain Rule"] },
            { id: "prob_inf", title: "Probability & Inference", level: 2, prereq: ["math_la"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/1611/1611179.png", color: "#10b981", keyTopics: ["Bayes Theorem", "Random Variables", "Distributions"] },
            { id: "opt_algo", title: "Optimization Theory", level: 3, prereq: ["calc_mv"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2540/2540832.png", color: "#f59e0b", keyTopics: ["Gradient Descent", "Convex Optimization", "Loss Functions"] },
            { id: "ethics_ai", title: "AI Ethics & Bias", level: 6, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/1162/1162456.png", color: "#ec4899", keyTopics: ["Algorithmic Bias", "Data Privacy", "Explainable AI"] }
        ],
        programming: [
            { id: "skl_ml", title: "Scikit-Learn ML", level: 3, prereq: ["math_la"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103507.png", color: "#2563eb", keyTopics: ["Classification", "Clustering", "Cross Validation"] },
            { id: "dl_nn", title: "Neural Networks", level: 4, prereq: ["skl_ml"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103831.png", color: "#f59e0b", keyTopics: ["Backpropagation", "Activation Functions", "Epochs"] },
            { id: "tf_torch", title: "PyTorch/TF", level: 4, prereq: ["dl_nn"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", color: "#ef4444", keyTopics: ["Tensors", "Building Models", "Training Loops"] },
            { id: "nlp_proc", title: "NLP & Transformers", level: 5, prereq: ["dl_nn"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png", color: "#10b981", keyTopics: ["Tokenization", "Word Embeddings", "Attention Mechanism"] },
            { id: "cv_vision", title: "Computer Vision", level: 5, prereq: ["dl_nn"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2892/2892305.png", color: "#6366f1", keyTopics: ["CNNs", "Image Preprocessing", "Object Detection"] },
            { id: "mlo_ops", title: "MLOps Deployment", level: 6, prereq: ["tf_torch"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/9135/9135965.png", color: "#ef4444", keyTopics: ["Docker", "Model Monitoring", "API Endpoints"] }
        ],
        levels: [
            { lv: 1, name: "Math Foundations", icon: "fa-square-root-variable" },
            { lv: 2, name: "Statistical Theory", icon: "fa-chart-area" },
            { lv: 3, name: "Classical ML", icon: "fa-microchip" },
            { lv: 4, name: "Deep Learning", icon: "fa-network-wired" },
            { lv: 5, name: "Applied AI", icon: "fa-eye" },
            { lv: 6, name: "Ethics & Ops", icon: "fa-gears" }
        ]
    }
};
