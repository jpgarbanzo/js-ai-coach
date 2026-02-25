export default {
  id: '02',
  title: 'Variables and Data Types',
  description: 'Learn how to declare variables with let and const, and explore JavaScript\'s data types',
  icon: '📦',
  slides: [
    {
      id: 'slide-02-1',
      title: 'Variables: let, const, and var',
      content: `
        <p>Variables are <strong>named containers</strong> that store data values.</p>
        <div class="code-block">// Declare variables with let
let name = "Alice";
let age = 25;

// Declare constants with const
const PI = 3.14159;
const COUNTRY = "USA";

// Old way with var (avoid this)
var oldVariable = "don't use";</div>
        <p><strong>Three ways to declare variables:</strong></p>
        <ul>
          <li><strong>let:</strong> A variable whose value can change</li>
          <li><strong>const:</strong> A constant that cannot be reassigned</li>
          <li><strong>var:</strong> Old style with scope issues — avoid it</li>
        </ul>
        <p><strong>Golden rule:</strong> Use <code>const</code> by default; use <code>let</code> only when you need to reassign; never use <code>var</code>.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-02-2',
      title: 'Number and String Types',
      content: `
        <p>JavaScript has a single <strong>number</strong> type for integers and decimals:</p>
        <div class="code-block">let age = 25;
let price = 19.99;
let power = 2 ** 8;  // 256 — exponentiation

// Special values
let infinite = Infinity;  // result of dividing by zero
let notANumber = NaN;     // result of invalid operation</div>
        <p><strong>Strings</strong> represent text. Use backticks for template literals:</p>
        <div class="code-block">let firstName = "Alice";
let lastName = 'Smith';

// Template literals (ES6) — recommended
let greeting = \`Hello, I am \${firstName} \${lastName}\`;

// Traditional concatenation
let greeting2 = "Hello, " + firstName;</div>
        <p>Prefer template literals when embedding variables in strings.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-02-3',
      title: 'Boolean, null, and undefined',
      content: `
        <p><strong>Booleans</strong> have only two values: <code>true</code> or <code>false</code>.</p>
        <div class="code-block">let isAdult = true;
let hasPermission = false;

// Result of comparisons
let isEqual = (5 === 5);  // true
let isGreater = (10 > 20); // false</div>
        <p><strong>null vs undefined</strong> — both mean "no value", but differ in intent:</p>
        <div class="code-block">// undefined — JavaScript assigns this automatically
let unassigned;
console.log(unassigned); // undefined

// null — the programmer intentionally sets this
let currentUser = null; // no user logged in

// Loose equality (==) treats them as equal
console.log(null == undefined);  // true
// Strict equality (===) does not
console.log(null === undefined); // false</div>
        <p><strong>Falsy values:</strong> <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code></p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-02-4',
      title: 'The typeof Operator',
      content: `
        <p>The <code>typeof</code> operator returns the type of a value as a string:</p>
        <div class="code-block">console.log(typeof 42);          // "number"
console.log(typeof "Hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" — historical bug!
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"</div>
        <p><strong>Practical use:</strong></p>
        <div class="code-block">let value = "123";
if (typeof value === "string") {
  console.log("It's a string:", value);
}</div>
        <p>Note: <code>typeof null</code> returns <code>"object"</code> — this is a known JavaScript bug kept for backwards compatibility.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-02-1',
        title: 'Detect the Data Type',
        description: 'Write a function that returns a human-readable description of a value\'s type.',
        instructions: `
          <p>Create a function called <code>describeType</code> that takes any value and returns a string describing its type:</p>
          <ul>
            <li>If the value is a number, return <code>"number"</code></li>
            <li>If the value is a string, return <code>"string"</code></li>
            <li>If the value is a boolean, return <code>"boolean"</code></li>
            <li>If the value is <code>null</code>, return <code>"null"</code> (not "object"!)</li>
            <li>If the value is <code>undefined</code>, return <code>"undefined"</code></li>
            <li>Otherwise, return <code>"other"</code></li>
          </ul>
          <p>Example: <code>describeType(42)</code> should return <code>"number"</code></p>
        `,
        starterCode: `// Write your function here
function describeType(value) {
  // Your code here
}`,
        solution: `function describeType(value) {
  if (value === null) return 'null'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'string') return 'string'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'undefined') return 'undefined'
  return 'other'
}`,
        hints: [
          'Check for null first using strict equality (=== null) before using typeof, because typeof null returns "object"',
          'Use typeof to check for number, string, boolean, and undefined',
          'Use if/else if statements to handle each case, and return "other" as the default',
        ],
        testCases: [
          {
            description: 'describeType(42) returns "number"',
            test: `return describeType(42) === "number"`,
            input: '42',
            expected: '"number"',
          },
          {
            description: 'describeType("hello") returns "string"',
            test: `return describeType("hello") === "string"`,
            input: '"hello"',
            expected: '"string"',
          },
          {
            description: 'describeType(true) returns "boolean"',
            test: `return describeType(true) === "boolean"`,
            input: 'true',
            expected: '"boolean"',
          },
          {
            description: 'describeType(null) returns "null"',
            test: `return describeType(null) === "null"`,
            input: 'null',
            expected: '"null"',
          },
          {
            description: 'describeType(undefined) returns "undefined"',
            test: `return describeType(undefined) === "undefined"`,
            input: 'undefined',
            expected: '"undefined"',
          },
          {
            description: 'describeType({}) returns "other"',
            test: `return describeType({}) === "other"`,
            input: '{}',
            expected: '"other"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['typeof', 'null', 'undefined', 'conditionals', 'strict equality'],
      },
    },
    {
      id: 'slide-02-5',
      title: 'Exercise: Working with Variables',
      content: `
        <p>Let's practice declaring variables, using template literals, and working with types.</p>
        <div class="code-block">// Practical example
const MAX_ATTEMPTS = 3;
let attempts = 0;
let currentUser = null;
let isAuthenticated = false;

while (attempts < MAX_ATTEMPTS && !isAuthenticated) {
  // login logic
  attempts++;
}</div>
        <p>Notice how <code>const</code> is used for the limit (never changes), <code>let</code> for the counter (changes each loop), and <code>null</code> for a value that isn't set yet.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-02-2',
        title: 'Build a User Profile String',
        description: 'Use template literals and variables to build a formatted profile string.',
        instructions: `
          <p>Create a function called <code>buildProfile</code> that takes three parameters: <code>name</code> (string), <code>age</code> (number), and <code>isActive</code> (boolean).</p>
          <p>It should return a string in this exact format:</p>
          <p><code>"Name: Alice | Age: 30 | Status: active"</code></p>
          <p>Rules:</p>
          <ul>
            <li>If <code>isActive</code> is <code>true</code>, status should be <code>"active"</code></li>
            <li>If <code>isActive</code> is <code>false</code>, status should be <code>"inactive"</code></li>
          </ul>
          <p>Example: <code>buildProfile("Alice", 30, true)</code> → <code>"Name: Alice | Age: 30 | Status: active"</code></p>
        `,
        starterCode: `// Write your function here
function buildProfile(name, age, isActive) {
  // Your code here
}`,
        solution: `function buildProfile(name, age, isActive) {
  const status = isActive ? 'active' : 'inactive'
  return \`Name: \${name} | Age: \${age} | Status: \${status}\`
}`,
        hints: [
          'Use a ternary operator to compute the status string: `const status = isActive ? "active" : "inactive"`',
          'Use a template literal (backticks) to build the return string and embed the variables with ${...}',
          'Make sure the format matches exactly: "Name: X | Age: Y | Status: Z"',
        ],
        testCases: [
          {
            description: 'buildProfile("Alice", 30, true) returns correct string',
            test: `return buildProfile("Alice", 30, true) === "Name: Alice | Age: 30 | Status: active"`,
            input: '"Alice", 30, true',
            expected: '"Name: Alice | Age: 30 | Status: active"',
          },
          {
            description: 'buildProfile("Bob", 25, false) returns correct string',
            test: `return buildProfile("Bob", 25, false) === "Name: Bob | Age: 25 | Status: inactive"`,
            input: '"Bob", 25, false',
            expected: '"Name: Bob | Age: 25 | Status: inactive"',
          },
          {
            description: 'buildProfile("Charlie", 0, true) handles age of 0',
            test: `return buildProfile("Charlie", 0, true) === "Name: Charlie | Age: 0 | Status: active"`,
            input: '"Charlie", 0, true',
            expected: '"Name: Charlie | Age: 0 | Status: active"',
          },
          {
            description: 'buildProfile("", 18, false) handles empty name',
            test: `return buildProfile("", 18, false) === "Name:  | Age: 18 | Status: inactive"`,
            input: '"", 18, false',
            expected: '"Name:  | Age: 18 | Status: inactive"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['template literals', 'ternary operator', 'variables', 'booleans', 'string interpolation'],
      },
    },
    {
      id: 'slide-02-6',
      title: 'Exercise: Type Conversion',
      content: `
        <p>JavaScript sometimes converts types automatically (type coercion). Understanding this helps avoid bugs.</p>
        <div class="code-block">// Explicit type conversion
const numStr = "42";
const num = Number(numStr);    // 42 (number)
const str = String(100);       // "100" (string)
const bool = Boolean(0);       // false
const bool2 = Boolean("hi");   // true

// parseInt and parseFloat
parseInt("42px");    // 42
parseFloat("3.14"); // 3.14</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-02-3',
        title: 'Safe Number Parser',
        description: 'Write a function that safely converts a string to a number.',
        instructions: `
          <p>Create a function called <code>safeParseNumber</code> that takes a value and returns:</p>
          <ul>
            <li>The numeric value if the input is a valid number or a numeric string</li>
            <li><code>0</code> if the input converts to <code>NaN</code></li>
          </ul>
          <p>Use <code>Number()</code> to convert and <code>isNaN()</code> to check the result.</p>
          <p>Example: <code>safeParseNumber("42")</code> → <code>42</code>, <code>safeParseNumber("abc")</code> → <code>0</code></p>
        `,
        starterCode: `// Write your function here
function safeParseNumber(value) {
  // Your code here
}`,
        solution: `function safeParseNumber(value) {
  const num = Number(value)
  return isNaN(num) ? 0 : num
}`,
        hints: [
          'Use Number(value) to attempt the conversion to a number',
          'Use isNaN() to check if the result is NaN (Not a Number)',
          'Use a ternary operator: if it is NaN return 0, otherwise return the converted number',
        ],
        testCases: [
          {
            description: 'safeParseNumber("42") returns 42',
            test: `return safeParseNumber("42") === 42`,
            input: '"42"',
            expected: '42',
          },
          {
            description: 'safeParseNumber(7) returns 7',
            test: `return safeParseNumber(7) === 7`,
            input: '7',
            expected: '7',
          },
          {
            description: 'safeParseNumber("abc") returns 0',
            test: `return safeParseNumber("abc") === 0`,
            input: '"abc"',
            expected: '0',
          },
          {
            description: 'safeParseNumber("") returns 0',
            test: `return safeParseNumber("") === 0`,
            input: '""',
            expected: '0',
          },
          {
            description: 'safeParseNumber("3.14") returns 3.14',
            test: `return safeParseNumber("3.14") === 3.14`,
            input: '"3.14"',
            expected: '3.14',
          },
          {
            description: 'safeParseNumber(null) returns 0',
            test: `return safeParseNumber(null) === 0`,
            input: 'null',
            expected: '0',
          },
        ],
        difficulty: 'beginner',
        concepts: ['type conversion', 'Number()', 'isNaN', 'ternary operator'],
      },
    },
  ],
}
