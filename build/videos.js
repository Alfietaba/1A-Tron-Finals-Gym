/* ============================================================
   VIDEOS: "I don't understand this unit" links, per course and topic.
   Each entry is [title, YouTube video id] or [title, full URL]. Every link came from a search, not from memory.
   ============================================================ */
var VIDS = {
  math115: {
    t1: [["Linear combinations, span, and basis vectors (3Blue1Brown, Essence of linear algebra ch. 2)", "k7RM-ot2NWY"], ["Linear Algebra, Lecture 3: Linear Combinations", "7LDLe131WAI"], ["Introducing Linear Combinations & Span", "WJlQzgS_itI"]],
    t2: [["The Dot Product and the Angle Between Two Vectors (Multi Calc lecture)", "Z3mmbJmtsFM"], ["Connection Between Dot Product and Angle Between Vectors", "a6LTXO3ZwmY"], ["Dot Product and Angle Between 3D Vectors", "U7pXzmrwjWg"]],
    t3: [["Equations of Lines and Planes (Calculus 3)", "O25STNI4rLQ"], ["Vector Equation of a Line", "H7wre3njI0Y"], ["Vector Equation of a Plane", "vX2RXK9I4vU"]],
    t4: [["Scalar Equation of a Plane (full lesson)", "tHN-mXUyKZc"], ["How to Find the Scalar Equation of a Plane", "rhn03W_MAG4"], ["Equation of a Plane Through Three Points Using the Cross Product", "A3m450k7qMY"]],
    t5: [["2D Vector Projections and Distance from a Point to a Line", "zrZu51C8U1I"], ["How to Find the Distance Between a Point and a Plane", "zWMTTRJ0l4w"], ["Distances to Lines and Planes", "xO6Q1GVaChU"]],
    t6: [["Gaussian Elimination & Row Echelon Form", "xCXRp2b8gNs"], ["Gauss-Jordan Elimination & Reduced Row Echelon Form", "4F5z6ipcid8"], ["Gaussian Elimination with Infinitely Many Solutions", "FSNIU0svV74"]],
    t7: [["Rank and Solving Ax = 0", "gyc98ynuygI"], ["The Rank of a Matrix and the Number of Solutions of a System", "zj3m94ejscU"], ["Solving Homogeneous Linear Systems (Gaussian Elimination)", "EJOoP3AUGqg"]],
    t8: [["Matrix-Vector Multiplication as a Combination of Columns", "HxOLfqvzPXY"], ["Matrix-Vector and Matrix-Matrix Multiplication (rows and columns views)", "7CBkZq3eQ_0"], ["Finding Ax via the Columns of A", "HH0nOI2Lkko"]],
    t9: [["Matrix multiplication as composition (3Blue1Brown, Essence of linear algebra ch. 4)", "XkY2DOUCWMU"], ["How To Multiply Matrices: Quick & Easy", "2spTnAiQg4M"], ["Matrix Multiplication Explained", "OezBnu8K-_M"]],
    t10: [["Row Reduction to Find an Inverse Matrix", "tMbGYkxfVMo"], ["Inverse of a 3x3 Matrix Using Row Operations", "Nys6Zllvl4Y"], ["Inverse of a Matrix: 2x2 Formula and Gauss-Jordan", "NOtIgvOx4Oc"]],
    t11: [["Linear combinations, span, and basis vectors (3Blue1Brown, ch. 2)", "k7RM-ot2NWY"], ["Basis, Spanning and Linear Independence (Oxford Linear Algebra)", "wdOFi8aUNp0"], ["Span and Linear Independence", "Lyxv6EK_ZTQ"]],
    t12: [["What is a Subspace? (Passing Linear Algebra)", "JoeVHP_jg44"], ["Subspaces Are the Natural Subsets of Linear Algebra", "rgxyxcTwvuo"], ["Subspaces and Span", "tM4TDL9Hj8U"]],
    t13: [["What is a Basis for a Subspace? (Passing Linear Algebra)", "au17uFyDupo"], ["The Easiest Way to Find Basis and Dimension", "tUAtkuu3R0U"], ["Linear Algebra, Lecture 31: The Dimension of a Subspace", "03AbedID9ok"]],
    t14: [["Inverse matrices, column space and null space (3Blue1Brown, ch. 7)", "uQhTuRlWMxw"], ["The Null Space & Column Space of a Matrix", "YQRioQ1XUck"], ["Column, Row and Null Space of a Matrix: bases and dimension", "23Eg310fmns"]],
    t15: [["Linear transformations and matrices (3Blue1Brown, ch. 3)", "kYB8IZa5AuE"], ["Three-dimensional linear transformations (3Blue1Brown, ch. 5)", "rHLEWRxRGiM"], ["Nonsquare matrices as transformations between dimensions (3Blue1Brown, ch. 8)", "v8VSDg_WQlA"]],
    t16: [["The Kernel and Range of a Linear Transformation (geometric and algebraic)", "_paaXszJC3Q"], ["Kernel and Range, step by step", "r7e_0FULGUc"], ["Kernel, Range, Onto, One-To-One", "Kimzqvh_3UM"]],
    t17: [["The determinant (3Blue1Brown, ch. 6)", "Ip3X9LOh2dk"], ["Cofactor Expansions of Determinants", "rixK1vIN-44"], ["Find the Determinant of a 3x3 Matrix Using Cofactor Expansion", "ZMuWKZya2E0"]],
    t18: [["De Moivre's Formula: rectangular to polar form", "zoqYo5G_NEQ"], ["Powers and Roots of Complex Numbers", "VOFyDPBTT5w"], ["De Moivre's Theorem: Roots of Polar Complex Numbers", "xPn8pHCZL18"]],
    t19: [["Eigenvalues and Eigenvectors Explained (Oxford Linear Algebra, worked examples)", "8uISh6xyW7w"], ["What eigenvalues and eigenvectors mean geometrically", "4wTHFmZPhT0"], ["Eigenvalues and Eigenvectors: meaning and step-by-step", "BWvx4wUSGdA"]],
    t20: [["How to Diagonalize a Matrix", "l6nmQPE6LG0"], ["Full Example: Diagonalizing a Matrix", "ieWyx2mlZyk"], ["Linear Algebra, Lecture 40: Diagonalization and Large Matrix Powers", "LoTuUy4aB7g"]]
  },
  math116: {
    k1: [["Finding the Domain and Range of Functions (Calculus 1)", "b7Y1kG1Onl0"], ["How to Find the Domain of a Function: Radicals, Fractions & Square Roots", "djT6-YamHaA"], ["Domain and Range of a Function From a Graph", "KirGQOwjBVI"]],
    k2: [["How to Do Composition of Functions and Inverse Functions", "E-Hust7G3l0"], ["Composition of Functions and Inverses", "LWXvgS5xpc0"], ["Compositions of Inverse Functions: f⁻¹(f(x)) = x", "WOEBuxK_8AY"]],
    k3: [["Even, Odd, or Neither Functions: Graphs & Algebraically", "fKyBOLsqRlo"], ["Graph Transformations and Even, Odd, Multiple Shifts", "SjMX8nuVKAs"], ["Even and Odd Functions (using a graph)", "8165AYZ7U3A"]],
    k4: [["Absolute Value Inequalities: How To Solve Them", "ZJvOGkykJ44"], ["Absolute Value Inequalities: How to Solve", "dCA-XdjJ1MA"], ["Absolute Value Equations and Inequalities: Number Line & Interval Notation", "3LN0IDooaIE"]],
    k5: [["Calculus I: Exponential and Logarithmic Functions", "Fhdn9CTUZOc"], ["Logs: Complete Guide to Mastering Logarithms", "qHMDIZlIaE0"], ["How to Use the Logarithm Laws", "qAc3Hct_m04"]],
    k6: [["Inverse Trig Functions Explained Visually (arcsin, arccos, arctan)", "EXu5fJSW7To"], ["Graphing Inverse Trig Functions (arcsin, arccos, arctan)", "txtSr9TL8ms"], ["How To Find The Amplitude, Period, Range & Phase Shift of Sine & Cosine", "za09_Y5POCE"], ["Variations of Sine and Cosine: y = A sin(Bx − C)", "Xzf18NQaNEY"]],
    k7: [["Hyperbolic Trig Functions: Basic Introduction", "PJRSu0Vf0r0"], ["Introduction to sinh(x) and cosh(x): parity and graphs", "kQOr_pIN8Vc"], ["Unit Step Function (Heaviside Step Function)", "K6r6pTZPWZQ"], ["The Unit Step Function and its translations", "6gvq54tXu3g"]],
    k8: [["Calculus 1: Introduction to Limits", "YNstP0ESndU"], ["How to Evaluate Limits Algebraically", "XH8_YqSxNSE"], ["Calculating Limits Using the Limit Laws (factoring and conjugates)", "UpEejH7Gkoo"]],
    k9: [["Piecewise Functions: Limits and Continuity", "JrYmEo6hoiU"], ["Find the Values a and b That Make a Piecewise Function Continuous", "cJ5vSs7wvzc"], ["Find a and b So f Is Continuous Everywhere", "1Yslh5D5EsM"]],
    k10: [["Differentiation Rules: Power, Product, Quotient, Chain", "esxNDR1epeo"], ["Learn Derivatives Fast (all the rules)", "gSpItqgZ1mo"], ["The Product and Quotient Rules for Derivatives", "L66FBwEF8vc"]],
    k11: [["Newton's Method", "-5e2cULI3H8"], ["Newton's Method Visually Explained", "4s-cGdk47xg"], ["Rolle's Theorem and the Mean Value Theorem, with examples", "0jiVRRKmGoE"], ["The Mean Value Theorem (intuition and proof)", "eO7nprhLhM8"]],
    k12: [["Critical Points, Local Max and Min, First Derivative Test", "DRc9-daH09A"], ["Intervals of Increase, Decrease & Local Extrema", "42XsRttdBbM"], ["Increasing/Decreasing, First & Second Derivative Tests, Concavity (full tutorial)", "15awMHeP1Yc"]],
    k13: [["Concavity, Inflection Points, and the Second Derivative", "OhqNbQi9QPk"], ["Curve Sketching (critical points, inflection points, derivative tests)", "tk7Zu3v2oLw"], ["Curve Sketching: Concavity & Points of Inflection (MCV4U)", "rG-uPvwR4gU"]],
    k14: [["Finding Absolute Maximum and Minimum Values on a Closed Interval", "3wrXDw5ETh4"], ["Global Optimization: Check the Endpoints of the Closed Interval!", "NjHAvhoc11E"], ["Extreme Values and Optimization (full lecture)", "45THdDilo4w"]],
    k15: [["Introduction to Related Rates", "I9mVUo-bhM8"], ["How to Solve ANY Related Rates Problem", "gBHIZlF0TX8"], ["Related Rates: Conical Tank, Ladder, Shadow, Sphere", "ps-r4nti5Go"]],
    k16: [["L'Hospital's Rule for Indeterminate Forms (Introduction)", "88ezmpDObDo"], ["Understand the Idea Behind L'Hôpital's Rule", "4M0hBataUn4"], ["L'Hôpital's Rule: Indeterminate Forms, Limits at Infinity, ln, Trig & Exponentials", "thEnl_gCjXA"]],
    k17: [["Linear Approximation, Differentials, Tangent Line, Linearization", "FIbpibkywmk"], ["Linear Approximations and Differentials", "9f3wSvmOHSc"], ["Differentials and Linear Approximations: Theory", "UAzgQtwkmvI"]],
    k18: [["Riemann Sums and the Definite Integral (conceptual)", "N3NkavlmLc8"], ["Definite Integrals as the Limit of a Riemann Sum", "q-G8F0h52L0"], ["Evaluate a Definite Integral Using Right Riemann Sums and Limits", "JUvm7-WNWv4"], ["Writing Definite Integrals from Limits of Riemann Sums", "QkzH8NVecgQ"]],
    k19: [["Fundamental Theorem of Calculus: Part 1 and Part 2 Explained", "7uDGju1peGM"], ["Fundamental Theorem of Calculus Part 1", "aeB5BWY0RlE"], ["Fundamental Theorem of Calculus Part 2", "ns8N1UuXl4w"]],
    k20: [["How to Integrate Using U-Substitution (NancyPi)", "8B31SAk1nD8"], ["How To Integrate Using U-Substitution", "sdYdnpYn-1o"], ["U-Substitution With Definite Integrals", "tM4RWc9ryx0"]]
  },
  che102: {
    h1: [["The mole and Avogadro's number (Khan Academy)", "_Su9Fij7TMQ"], ["Avogadro's Number, The Mole, Grams, Atoms, Molar Mass Calculations", "74-X94OP2XI"], ["Avogadro's Number: Converting Between Atoms and Moles", "VFORULBoGLM"]],
    h2: [["Unit Conversion Using Dimensional Analysis (Factor Label Method)", "cbPmLTIe4A4"], ["Dimensional Analysis: Converting Units with 3 Conversion Factors", "eKDePGWNAHo"], ["Conversion Factors: Mega, Kilo, Milli, Micro & More", "XkFT0cOBnDI"]],
    h3: [["How to Solve Reaction Stoichiometry Problems (Mass-Mass)", "rrTqOsZPpaU"], ["Stoichiometry Mole to Mole Conversions: Molar Ratio Practice", "3zmeVamEsWI"], ["How to Find the Mole Ratio to Solve Stoichiometry Problems", "i71BMVlrMiw"]],
    h4: [["Limiting & Excess Reactants", "ICDj0a9kaUo"], ["Limiting Reactant Problems (Chad's Prep)", "k0pd4KhxvyQ"], ["Excess Reactant Problems", "LfHvKAFfyHA"]],
    h5: [["Atom Economy and Percentage Yield", "KQYj_dJyexM"], ["Percentage Yield & Atom Economy", "TC3BUvoD4CY"], ["Percent Yield and Atom Economy (IB Chemistry)", "2XNbgn3jHkE"]],
    h6: [["Molarity and Dilution", "QYK3Aj-IUIs"], ["Molarity and Dilutions (Chad's Prep)", "zhGeTri8xX8"], ["Molarity, Molality, Volume & Mass Percent, Mole Fraction", "O_nyEj_hZzg"]],
    h7: [["Introduction to Combustion Analysis, Empirical & Molecular Formula Problems", "uvR7zNJ1KoI"], ["Empirical and Molecular Formula from Combustion Analysis", "_ucdYzkYZxU"], ["Writing Empirical Formulas From Percent Composition", "HwkLIvCv7oI"]],
    h8: [["Ideal Gas Law Practice Problems", "iaZ96KaQ44c"], ["PV = nRT: What it is, What R is, and Four Practice Problems", "Icxv8raDGBQ"], ["The ideal gas law (Khan Academy)", "qObcdZj8YTM"]],
    h9: [["Dalton's Law of Partial Pressure Problems, Mole Fraction", "J7YRwU7IV8Q"], ["Dalton's Law and Partial Pressures", "jbmOcH1fFKs"], ["Dalton's Law of Partial Pressures and the Mole Fraction with Examples", "DC_OSJod8YU"]],
    h10: [["Non-Ideal Gases and the Van der Waals Equation", "8zJrjEV9n8o"], ["Real Gases and the van der Waals Equation Explained", "l9Ufpv0KFB0"], ["Calculate v_rms (Root-Mean-Square Speed) for a Gas Particle", "TOkB6l1Mpvs"], ["Kinetic Molecular Theory of Gases, rms Speed and Graham's Law", "M1yGTWmPizk"]],
    h11: [["Collision Theory and Activation Energy", "Bp_W_Rsz1SE"], ["Collision Theory: What Affects the Rate of Reaction?", "daihzyMQ_X8"], ["Collision Theory, Activation Energy, and Steric Factor", "23myK4rS3QY"]],
    h12: [["Integrated Rate Law Problems: Zero, First & Second Order, Half Life, Graphs", "2LMdj91x2HA"], ["Integrated Rate Law and Half-Life (AP Chemistry)", "1qQAVaciNW0"], ["Integrated Rate Law Worked Examples and Half-Life", "VUr8WUixmXo"]],
    h13: [["Collision Theory, Arrhenius Equation & Activation Energy", "jX4dEOFwaLQ"], ["Sample Problem: Two-Point Arrhenius Equation", "haLOexa-t7w"], ["Calculating Activation Energy from an Arrhenius Plot", "vfHSNtWtRlA"]],
    h14: [["Clausius-Clapeyron Equation Examples and Practice Problems", "JUzap3y5pC4"], ["Clausius-Clapeyron, Vapor Pressure, Relative Humidity and Dew Point", "W48RPrBO7gY"], ["The Clausius-Clapeyron Equation", "dE-NnaWvAHo"]],
    h15: [["Phase Diagrams (Chad's Prep): triple point, critical point", "n3Sn2hdgzLE"], ["Reading a Phase Diagram", "6VfSoI7dKmI"], ["Phase Diagram worked example (CHEM 201)", "HKu9r42pDPg"]],
    h16: [["Henry's Law and Raoult's Law (and activity)", "eCtGgvLc4G8"], ["Raoult's Law as a Special Case of Henry's Law", "pRcK8kFYMvs"], ["Henry's Law", "4v46eEPfwfU"]],
    h17: [["Colligative Properties (Chad's Prep, with van 't Hoff factor)", "93QS5BhEN7s"], ["Intro to Colligative Properties, Conceptually", "8KG9igx90dk"], ["Practice Problem: Colligative Properties", "EnKp15oQAwg"]],
    h18: [["Writing and Calculating Kc & Kp", "E2eSkoDS-WE"], ["Writing the Equilibrium Constant and Converting Kc to Kp", "AFz21TpFktE"], ["Worked Examples: Calculating Equilibrium Constants (Khan Academy)", "5HZbCNg9mIw"]],
    h19: [["Equilibrium Calculations Using ICE Tables (Chad's Prep)", "60jE_6j3Ak0"], ["ICE Tables: Solving for K and Equilibrium Concentrations", "T9tyHQmFHRw"], ["Reaction Quotients and Equilibrium Constants", "YTLkR1SlNjI"]],
    h20: [["Le Chatelier's Principle & Reaction Quotients (Chad's Prep)", "NgkGD6w2hMY"], ["Le Chatelier's Principle Explained with Examples", "JEvlWxUyCC4"], ["Van't Hoff Equation: Calculate K at a New Temperature", "5h-ecIvXfQo"], ["Temperature Dependence of the Equilibrium Constant", "qMQ4pDBQY8I"]],
    h21: [["Standard reduction potentials (Khan Academy)", "oAOq55MPJpM"], ["Calculating Standard Cell Potential (E°cell)", "1h5sKZf1qyY"], ["Cell Potential Problems: Electrochemistry", "UzkLP8segcs"]],
    h22: [["The Nernst equation (Khan Academy)", "PemB4mY4Jfk"], ["Concentration Cells, Nernst Equation and K/Q Calculations", "oK9T1U_TruY"], ["Electrolysis Calculations (Chad's Prep)", "v7DHz18jvXU"], ["Electrolysis Calculations and Faraday's Constant", "2KhM9J_GiWY"]]
  },
  mte121: {
    c1: [["C++ for Beginners: Variables, Data Types, Overflow, sizeof", "solufpKPDwY"], ["C++ for Beginners: Operators", "RP3BWoep69U"], ["Variables and basic data types (C++)", "4psGUiKacPQ"]],
    c2: [["C++ Boolean and Logic Operators (if/else)", "Wcvlz-dFAEk"], ["If Statements: if, else if, else (C++)", "zS651dNfa6c"], ["C++ for Beginners: If/else statement", "N42EzLQ4gDE"]],
    c3: [["For Loop, While Loop and Do While Loop in C++", "pvlAnG3EhWM"], ["C++ Loops: For, While & Do While Explained with Examples", "S84dj8PtI5I"], ["Using the C++ While Loop to Read Files", "e6qno-ZyKYA"], ["How To Use ifstream To Read Files", "wVhCnzFwxt4"]],
    c4: [["Pass by Reference vs Pass by Value: C++ Functions for Beginners", "EQVY3BY8ZfU"], ["Pass by Value and Pass by Reference (Animated)", "ErMKBh1pobg"], ["C++ Pass By Reference vs Pass By Value", "ccn0Sk9ShiY"]],
    c5: [["Getting Started with VEXcode IQ C++", "zj2z-Dk_Ly8"], ["C++ Tutorial for VEX IQ, Part 1: Drivetrain", "B83kq5D3A4w"], ["C++ Tutorial for VEX IQ, Part 3: Loops and Avoiding Obstacles", "wbWCsvLh3Rg"], ["How to Turn Your Robot with the Gyro Sensor (VEX IQ C++)", "q0ScftdId1c"]],
    c6: [["C++ Arrays for Beginners: Passing Arrays to Functions", "GvJv8vS7S5Q"], ["C++ Tutorial: Passing an Array to a Function", "qc4PTgRImhM"], ["C/C++: Passing Arrays to Functions", "HNPh7t-Cpr8"]],
    c7: [["Multidimensional Arrays in C++ (2D arrays)", "A4nX2f4xldQ"], ["Pass 2-D Arrays to Functions in C++", "3wtCVsP1UWM"], ["How to Declare, Define, and Access Structures: C++ Structs #1", "qjyJ-ueJEGg"], ["Passing Structures to Functions: C++ Structs #6", "O269m7gB6To"]],
    c8: [["C++ Tutorial for Beginners: Introduction to Classes and Public/Private Members", "GqqujGu06ag"], ["C++ Classes: Getters and Setters", "0vRoAzIti50"], ["C++ Class Constructor", "HIloCCbSTY0"]],
    c9: [["Header & Implementation File for C++ Classes", "ru_u9N7jydU"], ["Separating a C++ Class into .h and .cpp Files", "gyA7uDlazkc"], ["Operator Overloading Introduction (C++)", "9tHu4mWtrnM"], ["C++ Operator Overloading Explained", "bQLy53peImg"]]
  },
  mte100: {
    d1: [["Introduction to the Engineering Design Process", "pfJVWaMGN6A"], ["STEMonstrations: Engineering Design Process (NASA)", "IbbxjA5e2hw"], ["Engineering Design Process: the 7 steps", "nBWFRHlvkKc"]],
    d2: [["An Introduction to the Engineering Design Process: defining the problem", "03x3JLD8uxk"], ["How to Make Decisions like an Engineer: The Decision Matrix", "kl5E2ZalaL4"], ["Pugh Charts and the Weighted Decision Matrix", "jLdiq-MzRqw"]],
    d3: [["The Iron Ring: What It Means to Be a Canadian Engineer", "fYn9C_ixIPA"], ["Professional Engineers Ontario (official channel)", "https://www.youtube.com/@PeoOnCa/videos"], ["Iron Ring", "bBe3w_foU84"]],
    d4: [["Sketch like an Engineer #3: Isometric Drawing", "VExQl96VAiM"], ["Isometric Drawing Made Easy, from Orthographic Projections", "h_u0BHKJ0yk"], ["Isometric Drawing Basics (technical drawing)", "ivXEt8vQ98Y"]],
    d5: [["Interpreting Engineering Drawings: Orthographic Projection (third angle, glass box)", "al5g0Ql86Ro"], ["How to Draw Front, Top, and Right Side Orthographic Views", "ISLN-sYKGCk"], ["Third Angle Projection by Hand: Complete Orthographic Drawing", "QTMfdxI5QYk"]],
    d6: [["Blueprint Line Types Explained", "jj4mUHzTSYc"], ["12 Must-Know Line Types in Engineering Drawings", "gp5Vx8MLRj8"], ["Hidden Detail & Lines in Engineering Drawing (animation)", "856698C84t4"]],
    d7: [["Dimensioning Rules in Engineering Drawings", "km-3sQ9kz20"], ["How to Draw Dimension and Extension Lines in Mechanical Drawing", "iGB87YvHZFA"], ["Detail Drawings and Dimensioning Rules (Intro to Drafting 5)", "qbrCS-iU73g"]],
    d8: [["Lesson: Section Views in Technical Drawings", "QrqjYLlzAnY"], ["Types of Section Views in Engineering Drawing", "Pqw964eiy8M"], ["What Type of Section? (full, half, offset, aligned, revolved, broken-out)", "f3DTAW9WAjU"]],
    d9: [["Holes and Hole Notes (thru, blind, countersink, counterbore)", "QyqUULdJbNk"], ["Blueprint Reading: Common Hole Features", "f4QX4QlDYN8"], ["Types of Holes in Engineering Drawing (incl. tapped holes)", "kVY5o9qKBec"]],
    d10: [["AutoCAD Tutorial for Beginners", "SApOp59NxYA"], ["AutoCAD: Tutorial for Beginners in 12 Minutes", "AvyOe8l463c"], ["AutoCAD for Beginners: Full University Course", "VtLXKU1PpRU"]],
    d11: [["Limits, Fits & Tolerances (#5minFriday)", "o0_xv-xKprE"], ["Fits Simply Explained (clearance, transition, interference)", "1Bzt-BwSqFk"], ["Tolerancing and Fits with Practical Exercises", "jM6Lpr_B5yg"]],
    d12: [["GD&T Feature Control Frame Basics", "mA6RrNrRYUI"], ["GD&T: Understanding Datums", "fUXMoz4va9g"], ["RFS, MMC and LMC Modifiers in GD&T", "AO6jRhLn3yU"], ["GD&T Bonus Tolerance vs Datum Shift", "wggn9__P728"]],
    d13: [["Rolling Element Bearings Simply Explained", "yW7YL-a9IYQ"], ["What is a Bearing? Types of Bearings and How They Work", "8q25EUszBSI"], ["Fundamentals of Bearings with Rolling Elements", "HwiT92neBac"]],
    d14: [["Gears Explained (driver, driven, ratios, torque)", "4ROtKKuSaBI"], ["Simple Gears Explained: calculating the gear ratio", "mhtF00LQQjI"], ["Introduction to Gears: Types, Ratios, and Mechanical Advantage", "omln3cCRHNE"], ["Compare the Parts: Rigid Coupling vs Flexible Coupling", "rZy3ToN3jBU"]],
    d15: [["Stall Torque and No-Load Speed (Engineers Studio #4)", "zDnmNZxmm_Y"], ["Steady-State DC Motor Behaviour: the speed-torque curve", "wI3dSff8Qa0"], ["PWM H-Bridge Motor Control", "3Lfh6Py6nc4"], ["DC Motor Control: PWM waveforms on a full H-bridge", "63R71jCpihI"]],
    d16: [["Wheatstone Bridge with Strain Gauge Explained", "GjmM6KKhgp0"], ["Why You Need a Wheatstone Bridge for Accurate Strain Gauge Readings", "L0uW1NHYdDQ"], ["RTD, Thermocouple and Thermistor Explained Simply", "J2ulD-bPTS4"], ["Encoder Explained: Incremental vs Absolute, Resolution and Signals", "4UoyIwBAxug"], ["How a Rotary Incremental Encoder Works: Direction and Position", "Xbfnxbjjm9s"]],
    d17: [["WBS, Gantt Chart and Critical Path: Explained", "YDxAKKVdMVM"], ["Critical Path Method Explained, Part 1", "qovA5KE9kyo"], ["Critical Path Analysis: Creating Gantt Charts", "V-POYsOpFes"]]
  }
};
var VIDQ = { math115: 'linear algebra', math116: 'calculus', che102: 'chemistry', mte121: 'C++', mte100: 'engineering' };
var VIDSERIES = { math115: ["Essence of linear algebra (3Blue1Brown, full series)", "PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"] };

function vidList(c, t) { return (VIDS[c.id] || {})[t] || []; }
function vidURL(v) { return /^https?:/.test(v) ? v : 'https://www.youtube.com/watch?v=' + v; }
function vidPlayIcon() { return '<svg class="tv-yt" viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="#ff0033"/><path d="M10 8.6v6.8l5.8-3.4z" fill="#fff"/></svg>'; }
function vidBtnHTML(c, t) {
  if (!vidList(c, t.id).length) return '';
  return '<button class="tv-btn" type="button" data-vids="' + t.id + '">' + vidPlayIcon() + '<span>I don\'t understand this unit</span></button>';
}
function showVideos(c, tid) {
  var t = c.TBY[tid], vs = vidList(c, tid); if (!t || !vs.length) return;
  var plain = String(t.name).replace(/<[^>]+>/g, '');
  var q = encodeURIComponent(plain + ' ' + (VIDQ[c.id] || '') + ' explained');
  var items = vs.map(function (v) {
    var isVid = !/^https?:/.test(v[1]);
    return '<li><a class="tv-it" href="' + vidURL(v[1]) + '" target="_blank" rel="noopener">' +
      '<span class="tv-th">' + (isVid ? '<img src="https://i.ytimg.com/vi/' + v[1] + '/mqdefault.jpg" alt="" loading="lazy" referrerpolicy="no-referrer">' : '') + vidPlayIcon() + '</span>' +
      '<span class="tv-tx"><span class="tv-t">' + esc(v[0]) + '</span><span class="tv-src">' + (isVid ? 'YouTube' : 'YouTube channel') + ' ↗</span></span></a></li>';
  }).join('');
  var ser = VIDSERIES[c.id];
  var m = overlay(
    '<div class="tv">' +
      '<p class="lt-k tv-k">' + esc(c.code) + ' · ' + esc(t.sec || '') + '</p>' +
      '<h3>' + esc(plain) + '</h3>' +
      '<p class="tv-lead">Videos that explain this unit. Watch one, then come back and drill it while it is fresh.</p>' +
      '<ul class="tv-list">' + items + '</ul>' +
      '<p class="tv-more"><a href="https://www.youtube.com/results?search_query=' + q + '" target="_blank" rel="noopener">Search YouTube for more ↗</a>' +
      (ser ? '<a href="https://www.youtube.com/playlist?list=' + ser[1] + '" target="_blank" rel="noopener">' + esc(ser[0]) + ' ↗</a>' : '') + '</p>' +
      '<div class="aid-acts"><button class="btn ghost" type="button" id="tv-x">Close</button><button class="btn" type="button" id="tv-go">Drill this topic</button></div>' +
    '</div>', 'tv-modal');
  m.m.setAttribute('aria-label', 'Videos for ' + plain);
  m.m.querySelectorAll('.tv-th img').forEach(function (im) { im.addEventListener('error', function () { im.remove(); }); });
  m.m.querySelector('#tv-x').addEventListener('click', m.close);
  m.m.querySelector('#tv-go').addEventListener('click', function () { m.close(); Snd.tap(); startRun(pickSmart(10, tid), 'drill'); });
}
