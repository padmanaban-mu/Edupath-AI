const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'modules');

const curriculum = [
  {
    moduleId: 'module1',
    name: 'Principles of Data Visualization',
    questions: [
      {
        id: 'q1',
        title: 'Colorblind Palette',
        description: 'Write a function `bad_vs_good_colors()` that returns a list of 3 color hex strings that constitute a colorblind-friendly palette.',
        input: '',
        expected_output: "['#E69F00', '#56B4E9', '#009E73']"
      },
      {
        id: 'q2',
        title: 'Data-Ink Ratio',
        description: "Define a function `calculate_data_ink_ratio(data_ink_bytes, non_data_ink_bytes)` that computes Edward Tufte's Data-Ink ratio mathematically as a percentage.",
        input: '50, 50',
        expected_output: '50.0%'
      },
      {
        id: 'q3',
        title: 'Tidy Data Transformation',
        description: 'Take an un-tidy dataset (wide format) list of dicts, and write a function `tidy_data(wide_data)` to pivot it into a tidy format (long format) suitable for plotting.',
        input: "[{'id': 1, 'A': 10, 'B': 20}]",
        expected_output: "[{'id': 1, 'variable': 'A', 'value': 10}, {'id': 1, 'variable': 'B', 'value': 20}]"
      }
    ]
  },
  {
    moduleId: 'module2',
    name: 'Python Visualization - Matplotlib',
    questions: [
      {
        id: 'q1',
        title: 'Basic Line Plot',
        description: "Write a function `plot_line()` that uses Matplotlib to plot x=[1,2,3] against y=[4,5,6]. Give it the title 'Growth'. Return the matplotlib.axes.Axes object.",
        input: '',
        expected_output: '<Axes: title={\'center\': \'Growth\'}>'
      },
      {
        id: 'q2',
        title: 'Styled Scatter Plot',
        description: "Write a function `plot_scatter()` that makes a scatter plot and explicitly sets the color of the markers to red and marker style to an 'x'. Return the Axes.",
        input: '',
        expected_output: '<Axes: >'
      },
      {
        id: 'q3',
        title: 'Custom Subplots',
        description: 'Write a function `custom_subplots()` that creates a figure with 2 rows and 1 column of subplots. Plot a line on the top axis and a bar chart on the bottom axis. Return the Figure object.',
        input: '',
        expected_output: '<Figure size 640x480 with 2 Axes>'
      }
    ]
  },
  {
    moduleId: 'module3',
    name: 'Python Visualization - Seaborn',
    questions: [
      {
        id: 'q1',
        title: 'Distribution Histogram',
        description: "Write a function `sns_hist(df)` that uses seaborn.histplot() to plot a distribution graph of the 'Age' column in the provided DataFrame. Return the Axes.",
        input: 'df_with_age_column',
        expected_output: '<Axes: xlabel=\'Age\', ylabel=\'Count\'>'
      },
      {
        id: 'q2',
        title: 'Grouped Boxplot',
        description: "Write a function `sns_boxplot(df)` that creates a Seaborn boxplot comparing 'Salary' across different 'Departments'. Return the Axes.",
        input: 'df_with_salary_and_dept',
        expected_output: '<Axes: xlabel=\'Department\', ylabel=\'Salary\'>'
      },
      {
        id: 'q3',
        title: 'Annotated Heatmap',
        description: "Write a function `sns_heatmap(df)` that computes the correlation matrix of df and plots it using seaborn.heatmap() with annotations and 'coolwarm' colormap. Return Axes.",
        input: 'numeric_df',
        expected_output: '<Axes: >'
      }
    ]
  },
  {
    moduleId: 'module4',
    name: 'Interactive Plots with Plotly',
    questions: [
      {
        id: 'q1',
        title: 'Basic Plotly Line',
        description: 'Write a function `basic_plotly_line()` that uses plotly.express to create a line chart. Return the Plotly Figure object.',
        input: '',
        expected_output: 'Figure({ data: [...], layout: [...] })'
      },
      {
        id: 'q2',
        title: 'Plotly Pie Chart',
        description: "Write a function `plotly_pie_chart(df)` that generates a Plotly pie chart mapping variables values='revenue' and names='region'. Return the Figure.",
        input: 'df_with_revenue_region',
        expected_output: 'Figure({ data: [{"type": "pie"}], ... })'
      },
      {
        id: 'q3',
        title: 'Interactive Scatter with Hover',
        description: "Write a function `plotly_interactive_scatter(df)` that creates an interactive scatter plot. Add hover data showing 'Employee Name' and map 'Department' to marker colors.",
        input: 'df_with_employees',
        expected_output: 'Figure({ data: [{"type": "scatter"}], ... })'
      }
    ]
  },
  {
    moduleId: 'module5',
    name: 'Interactive Plots with Bokeh',
    questions: [
      {
        id: 'q1',
        title: 'Bokeh Line Chart',
        description: 'Write a function `bokeh_line()` that creates a basic Bokeh figure object and plots a line using p.line() with x=[1,2] and y=[3,4]. Return the figure.',
        input: '',
        expected_output: 'Figure(id=...)'
      },
      {
        id: 'q2',
        title: 'Bokeh Vertical Bars',
        description: "Write a function `bokeh_bar()` that creates a vertical bar chart using p.vbar(). Set the bar widths to 0.5 and colors to 'green'. Return the figure.",
        input: '',
        expected_output: 'Figure(id=...)'
      },
      {
        id: 'q3',
        title: 'Bokeh Hover Tool',
        description: 'Write a function `bokeh_hover()` that constructs a HoverTool, applies it to a new figure, and plots a scatter circle layout. Return the figure.',
        input: '',
        expected_output: 'Figure(id=...)'
      }
    ]
  },
  {
    moduleId: 'module6',
    name: 'Declarative Visualization with Altair',
    questions: [
      {
        id: 'q1',
        title: 'Altair Bar Chart',
        description: "Write a function `altair_bar(df)` that maps x='Category' and y='Value' using alt.Chart(df).mark_bar(). Return the chart object.",
        input: 'df_category_value',
        expected_output: 'vegalite_chart_object'
      },
      {
        id: 'q2',
        title: 'Altair Colored Scatter',
        description: "Write a function `altair_colored_scatter(df)` that plots a scatter plot using mark_circle(), explicitly encoding color to 'Gender'. Return chart.",
        input: 'df_height_weight_gender',
        expected_output: 'vegalite_chart_object'
      },
      {
        id: 'q3',
        title: 'Altair Zoom & Pan',
        description: 'Write a function `altair_interactive(df)` that builds an Altair line chart and appends the .interactive() method to allow zoom and pan functionalities.',
        input: 'df_time_series',
        expected_output: 'vegalite_chart_object'
      }
    ]
  },
  {
    moduleId: 'module7',
    name: 'Geographic Mapping with Folium',
    questions: [
      {
        id: 'q1',
        title: 'Initialize Folium Map',
        description: 'Write a function `basic_map()` that uses folium to initialize and return a folium.Map object centered precisely at coordinates [40.7128, -74.0060].',
        input: '',
        expected_output: '<folium.folium.Map object>'
      },
      {
        id: 'q2',
        title: 'Add Map Markers',
        description: "Write a function `add_marker(map_obj)` that adds a folium.Marker at [34.0522, -118.2437] with popup text 'LA', and returns the mutated map object.",
        input: 'folium_map_instance',
        expected_output: '<folium.folium.Map object>'
      },
      {
        id: 'q3',
        title: 'Map Choropleth',
        description: 'Write a function `map_choropleth(map_obj, df, geo_json)` that links state-level geographic data to unemployment rates in df, establishing a choropleth layer.',
        input: 'map_obj, df, geo_json',
        expected_output: '<folium.folium.Map object>'
      }
    ]
  },
  {
    moduleId: 'module8',
    name: 'Visualization for Data Science & ML',
    questions: [
      {
        id: 'q1',
        title: 'Confusion Matrix Plot',
        description: 'Write a function `plot_confusion_matrix(y_true, y_pred)` that uses Scikit-Learn ConfusionMatrixDisplay to generate a Matplotlib figure visualizing the matrix.',
        input: 'y_true, y_pred lists',
        expected_output: '<sklearn.metrics._plot.confusion_matrix.ConfusionMatrixDisplay>'
      },
      {
        id: 'q2',
        title: 'ROC Curve Construction',
        description: 'Write a function `plot_roc_curve_custom(fpr, tpr)` that plots the ROC curve using Matplotlib. Add a dashed diagonal line (0,0) to (1,1). Return Axes.',
        input: 'fpr_list, tpr_list',
        expected_output: '<Axes: >'
      },
      {
        id: 'q3',
        title: 'PCA Dimensionality Scatter',
        description: 'Write a function `plot_pca_features(df)` that reduces a high-dimensional DataFrame to 2 components via PCA, and scatter plots the results using Matplotlib. Return Axes.',
        input: 'high_dim_df',
        expected_output: '<Axes: >'
      }
    ]
  },
  {
    moduleId: 'mock-test',
    name: 'Final Mock Assessment',
    questions: [
      {
        id: 'q1',
        title: 'Mock Test: Styled Scatter',
        description: "Write a function `mixed_basic_plot(df)` that takes a DataFrame and returns a Matplotlib Axes object showing a scatter plot of 'Revenue' vs 'Cost', utilizing a Seaborn default theme.",
        input: 'df_revenue_cost',
        expected_output: '<Axes: >'
      },
      {
        id: 'q2',
        title: 'Mock Test: Advanced Hover Data',
        description: "Write a function `mixed_interactive_dashboard(df)` that generates a Plotly bar chart comparing 'Sales' by 'Region', including a custom hover data tooltip showing 'Profit Margin'. Return Figure.",
        input: 'df_sales_region_profit',
        expected_output: 'Figure({ data: [{"type": "bar"}], ... })'
      },
      {
        id: 'q3',
        title: 'Mock Test: Proportional Geo-Markers',
        description: "Write a function `comprehensive_geo_scatter(df)` that initializes a Folium map, processes coordinates from df, and adds CircleMarkers proportional to the 'Population' column. Return map.",
        input: 'df_lat_lon_population',
        expected_output: '<folium.folium.Map object>'
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

console.log('Successfully generated 27 Data Visualization questions across 8 modules and 1 Mock Test.');