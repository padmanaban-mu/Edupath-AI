const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'modules');

// Focused solely on modules containing a "PROGRAM" component as per the PDF outline.
const curriculum = [
  {
    moduleId: 'module2',
    name: 'DataFrames Basics',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Create DataFrame from Dictionary',
        description: 'Import pandas as pd and write a function `create_df()` that creates and returns a Pandas DataFrame from a given dictionary of lists.',
        input: "{'Name': ['Alice', 'Bob'], 'Age': [25, 30]}",
        expected_output: "   Name  Age\n0  Alice   25\n1    Bob   30",
        hidden_test_cases: "Verify the returned object is of type pd.DataFrame."
      },
      {
        id: 'q2',
        title: 'Intermediate: DataFrame Attributes',
        description: 'Write a function `df_info(df)` that returns a tuple containing the shape of the DataFrame and a list of its column names.',
        input: "DataFrame with 5 rows and 3 columns ('A', 'B', 'C')",
        expected_output: "((5, 3), ['A', 'B', 'C'])",
        hidden_test_cases: "Test with DataFrames of varying shapes and empty DataFrames."
      },
      {
        id: 'q3',
        title: 'Advanced: Set Custom Index',
        description: 'Write a function `set_custom_index(df, col_name)` that sets the specified column as the index of the DataFrame without dropping it, and returns the new DataFrame.',
        input: "df, 'ID'",
        expected_output: "DataFrame indexed by the 'ID' column.",
        hidden_test_cases: "Ensure the original DataFrame is not mutated if inplace=False is standard."
      }
    ]
  },
  {
    moduleId: 'module3',
    name: 'Reading Data (CSV, Excel, etc.)',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Read CSV',
        description: 'Write a function `load_csv(filepath)` that uses `pd.read_csv()` to load a CSV file into a DataFrame and returns it.',
        input: "'data.csv'",
        expected_output: "DataFrame containing the CSV data.",
        hidden_test_cases: "Test with a hidden CSV file to ensure correct dynamic loading."
      },
      {
        id: 'q2',
        title: 'Intermediate: Read Specific Columns',
        description: 'Write a function `load_specific_cols(filepath, cols_list)` that reads only the specified columns from a CSV file to save memory.',
        input: "'data.csv', ['Name', 'Salary']",
        expected_output: "DataFrame with only 'Name' and 'Salary' columns.",
        hidden_test_cases: "Test with columns that do not exist to ensure KeyError is handled or exposed."
      },
      {
        id: 'q3',
        title: 'Advanced: Handle Dates on Load',
        description: 'Write a function `load_with_dates(filepath, date_col)` that reads a CSV and parses the specified column as datetime objects upon loading.',
        input: "'sales.csv', 'Date'",
        expected_output: "DataFrame where the 'Date' column is of dtype datetime64[ns].",
        hidden_test_cases: "Verify the dtype of the target column is strictly datetime64."
      }
    ]
  },
  {
    moduleId: 'module4',
    name: 'Selection and Indexing',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Select Single Column',
        description: 'Write a function `get_column(df, col_name)` that returns a Pandas Series representing the requested column from the DataFrame.',
        input: "df, 'Price'",
        expected_output: "Series containing Price data.",
        hidden_test_cases: "Test with columns containing spaces in their names."
      },
      {
        id: 'q2',
        title: 'Intermediate: Conditional Filtering',
        description: 'Write a function `filter_high_sales(df, threshold)` that returns a DataFrame containing only rows where the "Sales" column is strictly greater than the threshold.',
        input: "df, 1000",
        expected_output: "Filtered DataFrame.",
        hidden_test_cases: "Test with thresholds that exclude all rows (returns empty DataFrame)."
      },
      {
        id: 'q3',
        title: 'Advanced: iloc Matrix Slicing',
        description: 'Write a function `slice_matrix(df)` that uses `.iloc` to return a DataFrame containing only the first 3 rows and the last 2 columns of the input DataFrame.',
        input: "DataFrame (5x5)",
        expected_output: "DataFrame (3x2)",
        hidden_test_cases: "Test with DataFrames smaller than 3x2 to check bounds handling."
      }
    ]
  },
  {
    moduleId: 'module5',
    name: 'Numerical Operations & Mapping',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Column Arithmetic',
        description: 'Write a function `calculate_profit(df)` that creates a new column "Profit" by subtracting the "Cost" column from the "Revenue" column. Return the updated DataFrame.',
        input: "DataFrame with 'Revenue' and 'Cost'",
        expected_output: "DataFrame with new 'Profit' column.",
        hidden_test_cases: "Ensure subtraction handles negative profit margins correctly."
      },
      {
        id: 'q2',
        title: 'Intermediate: Apply Function',
        description: 'Write a function `categorize_age(df)` that uses `.apply()` to create an "AgeGroup" column: "Adult" if Age >= 18, else "Minor".',
        input: "DataFrame with 'Age' column",
        expected_output: "DataFrame with 'AgeGroup' column mapped properly.",
        hidden_test_cases: "Test exact boundary condition (Age == 18)."
      },
      {
        id: 'q3',
        title: 'Advanced: Dictionary Mapping',
        description: 'Write a function `map_status(df)` that uses `.map()` to replace values in the "Status_Code" column based on a dictionary: {1: "Pending", 2: "Approved", 3: "Rejected"}.',
        input: "DataFrame with 'Status_Code' [1, 2, 1, 3]",
        expected_output: "Column values converted to string representations.",
        hidden_test_cases: "Test with unmapped codes to see if they result in NaN as expected."
      }
    ]
  },
  {
    moduleId: 'module6',
    name: 'Handling Missing Data',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Identify Missing Values',
        description: 'Write a function `count_missing(df)` that returns a Series containing the total count of NaN values for each column in the DataFrame.',
        input: "DataFrame with missing values",
        expected_output: "Series with column names as index and integer counts as values.",
        hidden_test_cases: "Test with a fully populated DataFrame (all counts should be 0)."
      },
      {
        id: 'q2',
        title: 'Intermediate: Drop NaNs',
        description: 'Write a function `clean_rows(df)` that drops any row containing at least one missing value using `.dropna()`.',
        input: "DataFrame",
        expected_output: "Cleaned DataFrame.",
        hidden_test_cases: "Test with rows containing all NaNs vs single NaNs."
      },
      {
        id: 'q3',
        title: 'Advanced: Fill NaNs with Mean',
        description: 'Write a function `impute_missing(df, col_name)` that fills missing values in the specified numeric column with the mean of that column.',
        input: "df, 'Score'",
        expected_output: "DataFrame with 'Score' NaNs replaced by the mean score.",
        hidden_test_cases: "Ensure the mean calculation ignores existing NaNs during computation."
      }
    ]
  },
  {
    moduleId: 'module7',
    name: 'GroupBy & Aggregations',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Simple GroupBy',
        description: 'Write a function `average_salary_by_dept(df)` that groups data by "Department" and returns the mean of the "Salary" column.',
        input: "DataFrame with 'Department' and 'Salary'",
        expected_output: "Series indexed by Department with mean Salary.",
        hidden_test_cases: "Check handling of a department with only one employee."
      },
      {
        id: 'q2',
        title: 'Intermediate: Multiple Aggregations',
        description: 'Write a function `sales_stats(df)` that groups by "Region" and uses `.agg()` to return both the "sum" and "mean" of "Sales".',
        input: "DataFrame with 'Region' and 'Sales'",
        expected_output: "DataFrame with MultiIndex columns (Sales -> sum, mean).",
        hidden_test_cases: "Verify exact MultiIndex column structure."
      },
      {
        id: 'q3',
        title: 'Advanced: Custom GroupBy Filter',
        description: 'Write a function `filter_large_groups(df, min_size)` that groups by "Category" and uses `.filter()` to return a DataFrame excluding categories with fewer than `min_size` entries.',
        input: "df, 5",
        expected_output: "Filtered DataFrame containing only rows from large categories.",
        hidden_test_cases: "Test where no groups meet the condition (returns empty)."
      }
    ]
  },
  {
    moduleId: 'module8',
    name: 'Concatenation & Merging',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Vertical Concatenation',
        description: 'Write a function `stack_dataframes(df1, df2)` that uses `pd.concat()` to append df2 below df1, ignoring the original indices.',
        input: "Two DataFrames with identical columns",
        expected_output: "Single stacked DataFrame with a fresh continuous index.",
        hidden_test_cases: "Pass DataFrames with slightly mismatched columns to verify NaN filling."
      },
      {
        id: 'q2',
        title: 'Intermediate: Inner Join',
        description: 'Write a function `merge_users(users_df, orders_df)` that performs an inner merge on the common column "User_ID".',
        input: "Two DataFrames sharing 'User_ID'",
        expected_output: "Merged DataFrame containing only matched users.",
        hidden_test_cases: "Test with overlapping non-key columns to check for _x and _y suffixes."
      },
      {
        id: 'q3',
        title: 'Advanced: Left Join with Fill',
        description: 'Write a function `left_join_fill(df_left, df_right)` that performs a left merge on "Prod_ID", and fills any resulting NaNs in the "Price" column with 0.',
        input: "df_left, df_right",
        expected_output: "Left merged DataFrame with no NaNs in 'Price'.",
        hidden_test_cases: "Ensure only the 'Price' column NaNs are filled, not others."
      }
    ]
  },
  {
    moduleId: 'module9',
    name: 'Time Series Data',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Convert to Datetime',
        description: 'Write a function `parse_dates(df, col_name)` that converts a string column into proper Pandas datetime objects.',
        input: "df, 'Date_String'",
        expected_output: "DataFrame with converted column dtype datetime64.",
        hidden_test_cases: "Pass mixed date formats (e.g., MM/DD/YY and YYYY-MM-DD)."
      },
      {
        id: 'q2',
        title: 'Intermediate: Set Datetime Index',
        description: 'Write a function `set_time_index(df, col_name)` that sets a datetime column as the index and sorts the index chronologically.',
        input: "df, 'Timestamp'",
        expected_output: "Time-indexed, sorted DataFrame.",
        hidden_test_cases: "Pass an unsorted timeline to verify proper sorting behavior."
      },
      {
        id: 'q3',
        title: 'Advanced: Resampling Data',
        description: 'Write a function `monthly_revenue(df)` that takes a DataFrame with a daily DatetimeIndex and uses `.resample(\'M\').sum()` to calculate total monthly revenue.',
        input: "Daily indexed DataFrame with 'Revenue'",
        expected_output: "Monthly indexed DataFrame with summed revenue.",
        hidden_test_cases: "Verify leap year handling in February totals."
      }
    ]
  },
  {
    moduleId: 'module10',
    name: 'Multi-indexing',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Create MultiIndex',
        description: 'Write a function `create_multi_index(df)` that sets both "Year" and "Quarter" columns as a hierarchical MultiIndex for the DataFrame.',
        input: "DataFrame with 'Year' and 'Quarter' columns",
        expected_output: "MultiIndexed DataFrame.",
        hidden_test_cases: "Check the `df.index.nlevels` is exactly 2."
      },
      {
        id: 'q2',
        title: 'Intermediate: Select from MultiIndex',
        description: 'Write a function `get_year_data(df, year)` that uses `.loc` to extract all data for a specific year from a MultiIndexed (Year, Quarter) DataFrame.',
        input: "df, 2023",
        expected_output: "DataFrame containing only 2023 data (dropping the Year level depending on exact loc usage).",
        hidden_test_cases: "Requesting a year that doesn't exist (handle KeyError)."
      },
      {
        id: 'q3',
        title: 'Advanced: Cross-section (xs)',
        description: 'Write a function `get_q1_data(df)` that uses `.xs()` to select data for "Q1" across all years in a MultiIndexed (Year, Quarter) DataFrame.',
        input: "df",
        expected_output: "Data matching Quarter == 'Q1' for all years.",
        hidden_test_cases: "Ensure the 'Quarter' level is successfully bypassed using level=1."
      }
    ]
  },
  {
    moduleId: 'module11',
    name: 'Data Visualization with Pandas',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Line Plot Generation',
        description: 'Write a function `plot_trends(df)` that uses `df.plot()` to generate a line plot of all numerical columns. Return the matplotlib Axes object.',
        input: "DataFrame with numeric data",
        expected_output: "Axes object of the plot.",
        hidden_test_cases: "Verify the returned object is `matplotlib.axes.Axes`."
      },
      {
        id: 'q2',
        title: 'Intermediate: Bar Chart',
        description: 'Write a function `plot_sales_bar(df)` that creates a bar chart specifically for the "Sales" column, colored green. Return the Axes object.',
        input: "DataFrame",
        expected_output: "Axes object representing a green bar chart.",
        hidden_test_cases: "Check plot arguments for kind='bar' and color='green'."
      },
      {
        id: 'q3',
        title: 'Advanced: Scatter Plot',
        description: 'Write a function `plot_scatter(df)` that plots "Height" against "Weight" as a scatter plot, using "Age" to define the colormap (c="Age", colormap="viridis"). Return the Axes object.',
        input: "DataFrame",
        expected_output: "Axes object of the scatter plot.",
        hidden_test_cases: "Verify plotting variables X and Y are correctly assigned."
      }
    ]
  },
  {
    moduleId: 'module12',
    name: 'Advanced Operations & Optimization',
    questions: [
      {
        id: 'q1',
        title: 'Basic: Efficient Eval',
        description: 'Write a function `calculate_speed(df)` that uses `df.eval()` to calculate "Distance / Time" and assigns it to a new column "Speed".',
        input: "DataFrame with 'Distance' and 'Time'",
        expected_output: "DataFrame updated using eval for memory efficiency.",
        hidden_test_cases: "Check handling of division by zero within eval."
      },
      {
        id: 'q2',
        title: 'Intermediate: Query Filtering',
        description: 'Write a function `fast_filter(df, target_cat)` that uses `df.query()` to filter rows where "Category" equals the variable `target_cat` and "Price" > 50.',
        input: "df, 'Electronics'",
        expected_output: "Filtered DataFrame using the query engine.",
        hidden_test_cases: "Ensure @ variable referencing works in the query string."
      },
      {
        id: 'q3',
        title: 'Advanced: Memory Downcasting',
        description: 'Write a function `optimize_memory(df)` that converts all float64 columns to float32, and int64 columns to int32 to optimize memory footprint using `pd.to_numeric(downcast=...)`.',
        input: "DataFrame with heavy memory usage",
        expected_output: "Optimized DataFrame with reduced memory usage.",
        hidden_test_cases: "Check `df.dtypes` to ensure specific float64 and int64 conversions were successful."
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

console.log('Successfully generated 33 questions across 11 Pandas modules.');