export default {
  id: '03',
  title: 'Operators',
  description: 'Master arithmetic, comparison, logical, and ternary operators in JavaScript',
  icon: '🔧',
  slides: [
    {
      id: 'slide-03-1',
      title: 'Arithmetic Operators',
      content: `
        <p>Arithmetic operators perform mathematical operations:</p>
        <div class="code-block">let a = 10;
let b = 3;

console.log(a + b);   // 13 — Addition
console.log(a - b);   // 7  — Subtraction
console.log(a * b);   // 30 — Multiplication
console.log(a / b);   // 3.333... — Division
console.log(a % b);   // 1  — Modulo (remainder)
console.log(a ** b);  // 1000 — Exponentiation

// Increment and decrement
let x = 5;
x++;  // 6 — post-increment
++x;  // 7 — pre-increment
x--;  // 6 — post-decrement
--x;  // 5 — pre-decrement</div>
        <p>The <strong>modulo</strong> operator (<code>%</code>) returns the remainder of division. Very useful for checking if a number is even or odd: <code>n % 2 === 0</code> means even.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-03-1',
        title: 'Arithmetic Calculator',
        description: 'Write a function that performs arithmetic operations.',
        instructions: `
          <p>Create a function called <code>calculate</code> that takes three parameters: <code>a</code> (number), <code>b</code> (number), and <code>operator</code> (string).</p>
          <p>Based on the operator, it should return:</p>
          <ul>
            <li><code>"+"</code> → sum of a and b</li>
            <li><code>"-"</code> → a minus b</li>
            <li><code>"*"</code> → product of a and b</li>
            <li><code>"/"</code> → a divided by b (return <code>null</code> if b is 0)</li>
            <li><code>"%"</code> → remainder of a divided by b</li>
          </ul>
          <p>Example: <code>calculate(10, 3, "%")</code> should return <code>1</code></p>
        `,
        starterCode: `// Write your function here
function calculate(a, b, operator) {
  // Your code here
}`,
        solution: `function calculate(a, b, operator) {
  if (operator === '+') return a + b
  if (operator === '-') return a - b
  if (operator === '*') return a * b
  if (operator === '/') {
    if (b === 0) return null
    return a / b
  }
  if (operator === '%') return a % b
  return null
}`,
        hints: [
          'Use if statements (or a switch) to check which operator was passed',
          'Guard against division by zero: if b === 0, return null before dividing',
          'Each branch should return the result of the operation',
        ],
        testCases: [
          {
            description: 'calculate(10, 5, "+") returns 15',
            test: `return calculate(10, 5, "+") === 15`,
            input: '10, 5, "+"',
            expected: '15',
          },
          {
            description: 'calculate(10, 3, "-") returns 7',
            test: `return calculate(10, 3, "-") === 7`,
            input: '10, 3, "-"',
            expected: '7',
          },
          {
            description: 'calculate(4, 5, "*") returns 20',
            test: `return calculate(4, 5, "*") === 20`,
            input: '4, 5, "*"',
            expected: '20',
          },
          {
            description: 'calculate(10, 4, "/") returns 2.5',
            test: `return calculate(10, 4, "/") === 2.5`,
            input: '10, 4, "/"',
            expected: '2.5',
          },
          {
            description: 'calculate(10, 0, "/") returns null',
            test: `return calculate(10, 0, "/") === null`,
            input: '10, 0, "/"',
            expected: 'null',
          },
          {
            description: 'calculate(10, 3, "%") returns 1',
            test: `return calculate(10, 3, "%") === 1`,
            input: '10, 3, "%"',
            expected: '1',
          },
        ],
        difficulty: 'beginner',
        concepts: ['arithmetic operators', 'modulo', 'conditionals', 'return'],
      },
    },
    {
      id: 'slide-03-2',
      title: 'Comparison Operators and === vs ==',
      content: `
        <p>Comparison operators compare values and return <code>true</code> or <code>false</code>:</p>
        <div class="code-block">let a = 5;
let b = "5";

// == (loose equality) — converts types before comparing
console.log(a == b);   // true  ⚠️ converts "5" to 5
console.log(0 == false); // true  ⚠️

// === (strict equality) — no type conversion
console.log(a === b);  // false ✓ different types
console.log(a !== b);  // true  ✓

// Other comparisons
console.log(a < 10);   // true
console.log(a > 10);   // false
console.log(a <= 5);   // true
console.log(a >= 6);   // false</div>
        <p><strong>Rule:</strong> Always use <code>===</code> and <code>!==</code>. The <code>==</code> operator causes surprising bugs due to implicit type conversion.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-03-2',
        title: 'Age Category Classifier',
        description: 'Write a function that classifies a person\'s age into a category using comparison operators.',
        instructions: `
          <p>Create a function called <code>getAgeCategory</code> that takes a number <code>age</code> and returns a string:</p>
          <ul>
            <li>Age 0–12 → <code>"child"</code></li>
            <li>Age 13–17 → <code>"teenager"</code></li>
            <li>Age 18–64 → <code>"adult"</code></li>
            <li>Age 65 and above → <code>"senior"</code></li>
            <li>Negative age → <code>"invalid"</code></li>
          </ul>
          <p>Example: <code>getAgeCategory(20)</code> should return <code>"adult"</code></p>
        `,
        starterCode: `// Write your function here
function getAgeCategory(age) {
  // Your code here
}`,
        solution: `function getAgeCategory(age) {
  if (age < 0) return 'invalid'
  if (age <= 12) return 'child'
  if (age <= 17) return 'teenager'
  if (age <= 64) return 'adult'
  return 'senior'
}`,
        hints: [
          'Check for the invalid case first (negative age)',
          'Use <= to check ranges from smallest to largest — each subsequent condition only runs if the earlier ones were false',
          'The last return handles 65 and above since all smaller values were already caught',
        ],
        testCases: [
          {
            description: 'getAgeCategory(5) returns "child"',
            test: `return getAgeCategory(5) === "child"`,
            input: '5',
            expected: '"child"',
          },
          {
            description: 'getAgeCategory(0) returns "child"',
            test: `return getAgeCategory(0) === "child"`,
            input: '0',
            expected: '"child"',
          },
          {
            description: 'getAgeCategory(15) returns "teenager"',
            test: `return getAgeCategory(15) === "teenager"`,
            input: '15',
            expected: '"teenager"',
          },
          {
            description: 'getAgeCategory(30) returns "adult"',
            test: `return getAgeCategory(30) === "adult"`,
            input: '30',
            expected: '"adult"',
          },
          {
            description: 'getAgeCategory(70) returns "senior"',
            test: `return getAgeCategory(70) === "senior"`,
            input: '70',
            expected: '"senior"',
          },
          {
            description: 'getAgeCategory(-1) returns "invalid"',
            test: `return getAgeCategory(-1) === "invalid"`,
            input: '-1',
            expected: '"invalid"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['comparison operators', 'if/else', 'strict equality', 'return'],
      },
    },
    {
      id: 'slide-03-3',
      title: 'Logical Operators and Ternary',
      content: `
        <p><strong>Logical operators</strong> combine or invert boolean values:</p>
        <div class="code-block">let age = 20;
let hasPermission = true;

// && (AND) — both must be true
if (age >= 18 && hasPermission) {
  console.log("Can enter");
}

// || (OR) — at least one must be true
if (age < 18 || !hasPermission) {
  console.log("Cannot enter");
}

// ! (NOT) — inverts the value
let isLoggedIn = false;
if (!isLoggedIn) {
  console.log("Please log in");
}</div>
        <p>The <strong>ternary operator</strong> is a shortcut for if-else:</p>
        <div class="code-block">// condition ? valueIfTrue : valueIfFalse
const label = age >= 18 ? "Adult" : "Minor";
const price = isMember ? 10 : 15;</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-03-3',
        title: 'Admission Gate Checker',
        description: 'Use logical operators to determine if someone can enter an event.',
        instructions: `
          <p>Create a function called <code>canEnter</code> that takes two parameters: <code>age</code> (number) and <code>hasTicket</code> (boolean).</p>
          <p>The function should return:</p>
          <ul>
            <li><code>true</code> if the person is 18 or older <strong>AND</strong> has a ticket</li>
            <li><code>false</code> otherwise</li>
          </ul>
          <p>Additionally, create a function called <code>getLabel</code> that takes the same parameters and returns the string <code>"Allowed"</code> if they can enter, or <code>"Denied"</code> if they cannot. Use the ternary operator.</p>
          <p>Example: <code>canEnter(20, true)</code> → <code>true</code>, <code>getLabel(20, true)</code> → <code>"Allowed"</code></p>
        `,
        starterCode: `// Write your functions here
function canEnter(age, hasTicket) {
  // Your code here
}

function getLabel(age, hasTicket) {
  // Use the ternary operator and canEnter
}`,
        solution: `function canEnter(age, hasTicket) {
  return age >= 18 && hasTicket
}

function getLabel(age, hasTicket) {
  return canEnter(age, hasTicket) ? 'Allowed' : 'Denied'
}`,
        hints: [
          'canEnter should use the && (AND) operator to require BOTH conditions to be true',
          'The function can return the result of the boolean expression directly — no need for an if statement',
          'getLabel should call canEnter and use the ternary operator: canEnter(age, hasTicket) ? "Allowed" : "Denied"',
        ],
        testCases: [
          {
            description: 'canEnter(20, true) returns true',
            test: `return canEnter(20, true) === true`,
            input: '20, true',
            expected: 'true',
          },
          {
            description: 'canEnter(17, true) returns false (underage)',
            test: `return canEnter(17, true) === false`,
            input: '17, true',
            expected: 'false',
          },
          {
            description: 'canEnter(25, false) returns false (no ticket)',
            test: `return canEnter(25, false) === false`,
            input: '25, false',
            expected: 'false',
          },
          {
            description: 'canEnter(18, true) returns true (exactly 18)',
            test: `return canEnter(18, true) === true`,
            input: '18, true',
            expected: 'true',
          },
          {
            description: 'getLabel(21, true) returns "Allowed"',
            test: `return getLabel(21, true) === "Allowed"`,
            input: '21, true',
            expected: '"Allowed"',
          },
          {
            description: 'getLabel(16, false) returns "Denied"',
            test: `return getLabel(16, false) === "Denied"`,
            input: '16, false',
            expected: '"Denied"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['logical operators', 'AND', 'NOT', 'ternary operator', 'boolean expressions'],
      },
    },
    {
      id: 'slide-03-4',
      title: 'Operator Precedence',
      content: `
        <p>Operators are evaluated in a specific order. Higher precedence runs first:</p>
        <div class="code-block">// Without parentheses
let result = 5 + 3 * 2;   // 11 (not 16)
// * has higher precedence than +

// With parentheses to override
let result2 = (5 + 3) * 2; // 16

// Logical operator precedence
// && has higher precedence than ||
true || false && false  // true (same as: true || (false && false))</div>
        <p><strong>Order of precedence (high to low):</strong></p>
        <ol>
          <li>Parentheses <code>( )</code></li>
          <li>Exponentiation <code>**</code></li>
          <li>Unary: <code>++</code>, <code>--</code>, <code>!</code></li>
          <li>Multiplication / Division: <code>*</code>, <code>/</code>, <code>%</code></li>
          <li>Addition / Subtraction: <code>+</code>, <code>-</code></li>
          <li>Comparison: <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></li>
          <li>Equality: <code>===</code>, <code>!==</code></li>
          <li>AND: <code>&&</code></li>
          <li>OR: <code>||</code></li>
          <li>Ternary: <code>? :</code></li>
          <li>Assignment: <code>=</code>, <code>+=</code>, etc.</li>
        </ol>
        <p><strong>Tip:</strong> When in doubt, use parentheses to make intent explicit.</p>
      `,
      hasExercise: false,
    },
  ],
}
