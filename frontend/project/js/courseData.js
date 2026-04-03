// File: js/courseData.js
// This is the Central Single Source of Truth for EduPath AI.

window.roadmapData = {
    dataAnalyst: {
        nonProgramming: [
            { id: "df", title: "Data Fundamentals", level: 1, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/9953/9953334.png", color: "#3b82f6", keyTopics: ["Data Types", "Database Intro", "Data Cleaning basics"] },
            { id: "stats", title: "Statistics", level: 2, prereq: ["df"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png", color: "#8b5cf6", keyTopics: ["Descriptive Stats", "Hypothesis Testing", "Probability Distributions"] },
            { id: "excel", title: "Excel Analytics", level: 2, prereq: ["df"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/732/732220.png", color: "#10b981", keyTopics: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Conditional Formatting"] },
            { id: "eda", title: "Exploratory DA (EDA)", level: 5, prereq: ["stats", "pandas"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4245/4245351.png", color: "#f59e0b", keyTopics: ["Handling Missing Data", "Outlier Detection", "Correlation Matrices"] },
            { id: "bi", title: "BI Tools (PBI/Tableau)", level: 5, prereq: ["excel", "eda"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/5956/5956597.png", color: "#ec4899", keyTopics: ["DAX Queries", "Dashboard Design", "Data Connections"] }
        ],
        programming: [
            { id: "sql_a", title: "SQL Basics and Advanced", level: 3, prereq: ["df"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4492/4492311.png", color: "#2563eb", keyTopics: ["JOINS", "Subqueries", "Window Functions"] },
            { id: "py_b", title: "Python Basics", level: 4, prereq: ["df"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", color: "#f59e0b", keyTopics: ["Loops & Functions", "OOPs Concepts", "Lists & Dictionaries"] },
            { id: "numpy", title: "NumPy Arrays", level: 4, prereq: ["py_b"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/9135/9135965.png", color: "#ef4444", keyTopics: ["Array Slicing", "Broadcasting", "Matrix Operations"] },
            { id: "pandas", title: "Pandas DataFrames", level: 4, prereq: ["numpy"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4862/4862036.png", color: "#10b981", keyTopics: ["DataFrames", "Groupby & Aggregation", "Merging Data"] },
            { id: "viz_py", title: "Python Viz", level: 5, prereq: ["pandas"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png", color: "#6366f1", keyTopics: ["Matplotlib Pyplot", "Seaborn Styling", "Interactive Plots"] },
            { id: "reg", title: "Regression Models", level: 6, prereq: ["stats", "py_b"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103507.png", color: "#ef4444", keyTopics: ["Linear Regression", "Logistic Regression", "Model Evaluation"] }
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