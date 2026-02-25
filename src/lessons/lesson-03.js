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

  exercises: [
    {
      id: 'ex-03-1',
      title: 'Calculator Function',
      difficulty: 'beginner',
      description: 'Write a function that performs basic arithmetic given two numbers and an operator string.',
      inputSpec: 'a: number, b: number, operator: string ("+", "-", "*", "/")',
      outputSpec: 'number — the result, or null for division by zero or unknown operator',
      instructions: `
        <p>Write a function called <code>calculate</code> that takes two numbers and an operator string, then returns the result.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>calculate(a, b, operator)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>calculate(10, 3, "+") → 13</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>calculate(10, 0, "/") → null</code></div>
        </div>
        <p>Supported operators: <code>"+"</code>, <code>"-"</code>, <code>"*"</code>, <code>"/"</code>. Return <code>null</code> if dividing by zero or if the operator is unknown.</p>
      `,
      starterCode: `// Write a function called calculate\nfunction calculate(a, b, operator) {\n  // your code here\n}`,
      solution: `function calculate(a, b, operator) {\n  if (operator === '+') return a + b\n  if (operator === '-') return a - b\n  if (operator === '*') return a * b\n  if (operator === '/') {\n    if (b === 0) return null\n    return a / b\n  }\n  return null\n}`,
      hints: [
        'Use if statements to check which operator was passed',
        'Guard against division by zero: check b === 0 before dividing',
        'Return null as the default for any unrecognized operator',
      ],
      testCases: [
        { description: 'calculate(10, 5, "+") returns 15', test: 'return calculate(10, 5, "+") === 15', input: '10, 5, "+"', expected: '15' },
        { description: 'calculate(10, 3, "-") returns 7', test: 'return calculate(10, 3, "-") === 7', input: '10, 3, "-"', expected: '7' },
        { description: 'calculate(4, 5, "*") returns 20', test: 'return calculate(4, 5, "*") === 20', input: '4, 5, "*"', expected: '20' },
        { description: 'calculate(10, 4, "/") returns 2.5', test: 'return calculate(10, 4, "/") === 2.5', input: '10, 4, "/"', expected: '2.5' },
        { description: 'calculate(10, 0, "/") returns null', test: 'return calculate(10, 0, "/") === null', input: '10, 0, "/"', expected: 'null' },
      ],
      concepts: ['arithmetic operators', 'conditionals', 'return', 'division by zero'],
    },
    {
      id: 'ex-03-2',
      title: 'Even or Odd',
      difficulty: 'beginner',
      description: 'Write a function that returns "even" or "odd" for a given integer using the modulo operator.',
      inputSpec: 'n: number (integer)',
      outputSpec: 'string — "even" or "odd"',
      instructions: `
        <p>Write a function called <code>isEvenOrOdd</code> that takes an integer and returns <code>"even"</code> if it is even or <code>"odd"</code> if it is odd.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>isEvenOrOdd(n)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>isEvenOrOdd(4) → "even"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>isEvenOrOdd(7) → "odd"</code></div>
        </div>
        <p>Use the modulo operator <code>%</code> to get the remainder when dividing by 2. A remainder of 0 means the number is even.</p>
      `,
      starterCode: `// Write a function called isEvenOrOdd\nfunction isEvenOrOdd(n) {\n  // your code here\n}`,
      solution: `function isEvenOrOdd(n) {\n  return n % 2 === 0 ? 'even' : 'odd'\n}`,
      hints: [
        'Use the modulo operator: n % 2 gives the remainder when dividing by 2',
        'If the remainder is 0, the number is even',
        'Use a ternary operator: n % 2 === 0 ? "even" : "odd"',
      ],
      testCases: [
        { description: 'isEvenOrOdd(4) returns "even"', test: 'return isEvenOrOdd(4) === "even"', input: '4', expected: '"even"' },
        { description: 'isEvenOrOdd(7) returns "odd"', test: 'return isEvenOrOdd(7) === "odd"', input: '7', expected: '"odd"' },
        { description: 'isEvenOrOdd(0) returns "even"', test: 'return isEvenOrOdd(0) === "even"', input: '0', expected: '"even"' },
        { description: 'isEvenOrOdd(-3) returns "odd"', test: 'return isEvenOrOdd(-3) === "odd"', input: '-3', expected: '"odd"' },
        { description: 'isEvenOrOdd(-2) returns "even"', test: 'return isEvenOrOdd(-2) === "even"', input: '-2', expected: '"even"' },
      ],
      concepts: ['modulo', 'ternary operator', 'arithmetic operators'],
    },
    {
      id: 'ex-03-3',
      title: 'Ternary Grader',
      difficulty: 'beginner',
      description: 'Write a function that returns "pass" or "fail" based on a score using the ternary operator.',
      inputSpec: 'score: number',
      outputSpec: 'string — "pass" if score >= 60, "fail" otherwise',
      instructions: `
        <p>Write a function called <code>passOrFail</code> that takes a score (0–100) and returns <code>"pass"</code> if the score is 60 or above, or <code>"fail"</code> otherwise.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>passOrFail(score)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>passOrFail(75) → "pass"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>passOrFail(45) → "fail"</code></div>
        </div>
        <p>Use the ternary operator <code>condition ? valueIfTrue : valueIfFalse</code> for a single-line solution.</p>
      `,
      starterCode: `// Write a function called passOrFail\nfunction passOrFail(score) {\n  // your code here\n}`,
      solution: `function passOrFail(score) {\n  return score >= 60 ? 'pass' : 'fail'\n}`,
      hints: [
        'Use a ternary operator: condition ? "pass" : "fail"',
        'The condition is score >= 60',
        'Return the ternary expression directly',
      ],
      testCases: [
        { description: 'passOrFail(75) returns "pass"', test: 'return passOrFail(75) === "pass"', input: '75', expected: '"pass"' },
        { description: 'passOrFail(60) returns "pass" (boundary)', test: 'return passOrFail(60) === "pass"', input: '60', expected: '"pass"' },
        { description: 'passOrFail(59) returns "fail" (boundary)', test: 'return passOrFail(59) === "fail"', input: '59', expected: '"fail"' },
        { description: 'passOrFail(0) returns "fail"', test: 'return passOrFail(0) === "fail"', input: '0', expected: '"fail"' },
        { description: 'passOrFail(100) returns "pass"', test: 'return passOrFail(100) === "pass"', input: '100', expected: '"pass"' },
      ],
      concepts: ['ternary operator', 'comparison operators', 'return'],
    },
    {
      id: 'ex-03-4',
      title: 'Strict vs Loose Equality',
      difficulty: 'medium',
      description: 'Write a function that returns an object comparing == and === for a pair of values.',
      inputSpec: 'a: any, b: any',
      outputSpec: 'object — { loose: boolean, strict: boolean }',
      instructions: `
        <p>Write a function called <code>compareEquality</code> that takes two values <code>a</code> and <code>b</code> and returns an object with the results of both equality checks.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>compareEquality(a, b)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>compareEquality(5, "5") → { loose: true, strict: false }</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>compareEquality(5, 5) → { loose: true, strict: true }</code></div>
        </div>
        <p>The returned object must have: <code>loose</code> (result of <code>a == b</code>) and <code>strict</code> (result of <code>a === b</code>).</p>
      `,
      starterCode: `// Write a function called compareEquality\nfunction compareEquality(a, b) {\n  // your code here\n}`,
      solution: `function compareEquality(a, b) {\n  return {\n    loose: a == b,\n    strict: a === b,\n  }\n}`,
      hints: [
        'Return an object literal with two properties',
        'The loose property is: a == b (double equals, allows type coercion)',
        'The strict property is: a === b (triple equals, no type coercion)',
      ],
      testCases: [
        { description: 'compareEquality(5, "5") — loose true, strict false', test: 'const r = compareEquality(5, "5"); return r.loose === true && r.strict === false', input: '5, "5"', expected: '{ loose: true, strict: false }' },
        { description: 'compareEquality(5, 5) — both true', test: 'const r = compareEquality(5, 5); return r.loose === true && r.strict === true', input: '5, 5', expected: '{ loose: true, strict: true }' },
        { description: 'compareEquality(0, false) — loose true, strict false', test: 'const r = compareEquality(0, false); return r.loose === true && r.strict === false', input: '0, false', expected: '{ loose: true, strict: false }' },
        { description: 'compareEquality(null, undefined) — loose true, strict false', test: 'const r = compareEquality(null, undefined); return r.loose === true && r.strict === false', input: 'null, undefined', expected: '{ loose: true, strict: false }' },
        { description: 'compareEquality(1, 2) — both false', test: 'const r = compareEquality(1, 2); return r.loose === false && r.strict === false', input: '1, 2', expected: '{ loose: false, strict: false }' },
      ],
      concepts: ['strict equality', 'loose equality', 'type coercion', 'objects'],
    },
    {
      id: 'ex-03-5',
      title: 'Logical Evaluator',
      difficulty: 'medium',
      description: 'Write a function that evaluates logical operations (AND, OR, NOT) on two boolean values.',
      inputSpec: 'a: boolean, b: boolean, operator: string ("AND", "OR", "NOT")',
      outputSpec: 'boolean — the result of the logical operation',
      instructions: `
        <p>Write a function called <code>logicalEval</code> that takes two booleans <code>a</code> and <code>b</code>, and an operator string, and returns the boolean result.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>logicalEval(a, b, operator)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>logicalEval(true, false, "AND") → false</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>logicalEval(true, false, "OR") → true</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>logicalEval(true, false, "NOT") → false</code> (NOT applies to <code>a</code>)</div>
        </div>
        <p>For <code>"NOT"</code>, apply the NOT operator to <code>a</code> only (ignore <code>b</code>). Return <code>null</code> for unknown operators.</p>
      `,
      starterCode: `// Write a function called logicalEval\nfunction logicalEval(a, b, operator) {\n  // your code here\n}`,
      solution: `function logicalEval(a, b, operator) {\n  if (operator === 'AND') return a && b\n  if (operator === 'OR') return a || b\n  if (operator === 'NOT') return !a\n  return null\n}`,
      hints: [
        'Use if statements to branch on the operator string',
        'For "AND" return a && b, for "OR" return a || b',
        'For "NOT" return !a (the NOT operator only needs one operand)',
      ],
      testCases: [
        { description: 'logicalEval(true, false, "AND") returns false', test: 'return logicalEval(true, false, "AND") === false', input: 'true, false, "AND"', expected: 'false' },
        { description: 'logicalEval(true, true, "AND") returns true', test: 'return logicalEval(true, true, "AND") === true', input: 'true, true, "AND"', expected: 'true' },
        { description: 'logicalEval(true, false, "OR") returns true', test: 'return logicalEval(true, false, "OR") === true', input: 'true, false, "OR"', expected: 'true' },
        { description: 'logicalEval(false, false, "OR") returns false', test: 'return logicalEval(false, false, "OR") === false', input: 'false, false, "OR"', expected: 'false' },
        { description: 'logicalEval(true, false, "NOT") returns false', test: 'return logicalEval(true, false, "NOT") === false', input: 'true, false, "NOT"', expected: 'false' },
        { description: 'logicalEval(false, true, "NOT") returns true', test: 'return logicalEval(false, true, "NOT") === true', input: 'false, true, "NOT"', expected: 'true' },
      ],
      concepts: ['logical operators', 'AND', 'OR', 'NOT', 'conditionals'],
    },
    {
      id: 'ex-03-6',
      title: 'Expression Evaluator',
      difficulty: 'hard',
      description: 'Write a function that evaluates simple arithmetic expressions respecting operator precedence.',
      inputSpec: 'expr: string — e.g. "2 + 3 * 4"',
      outputSpec: 'number — the correctly evaluated result',
      instructions: `
        <p>Write a function called <code>evalExpr</code> that takes a string containing a simple arithmetic expression with integers and the operators <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and evaluates it respecting standard operator precedence (multiplication and division before addition and subtraction).</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>evalExpr(expr)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>evalExpr("2 + 3 * 4") → 14</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>evalExpr("10 - 2 * 3") → 4</code></div>
        </div>
        <p>Strategy: first split by spaces to get tokens, then process <code>*</code> and <code>/</code> first (reducing the token array), then process <code>+</code> and <code>-</code>. Tokens are space-separated (e.g. "2 + 3 * 4").</p>
      `,
      starterCode: `// Write a function called evalExpr\nfunction evalExpr(expr) {\n  // your code here\n}`,
      solution: `function evalExpr(expr) {\n  let tokens = expr.split(' ')\n  // First pass: handle * and /\n  let i = 0\n  while (i < tokens.length) {\n    if (tokens[i] === '*' || tokens[i] === '/') {\n      const left = Number(tokens[i - 1])\n      const right = Number(tokens[i + 1])\n      const result = tokens[i] === '*' ? left * right : left / right\n      tokens.splice(i - 1, 3, String(result))\n      i = 0 // restart\n    } else {\n      i++\n    }\n  }\n  // Second pass: handle + and -\n  let result = Number(tokens[0])\n  for (let j = 1; j < tokens.length; j += 2) {\n    const op = tokens[j]\n    const val = Number(tokens[j + 1])\n    if (op === '+') result += val\n    else if (op === '-') result -= val\n  }\n  return result\n}`,
      hints: [
        'Split the expression by spaces to get an array of tokens (numbers and operators)',
        'First loop through the tokens and handle all * and / operations, collapsing those tokens into a single result',
        'Then loop through the remaining tokens to handle + and - from left to right',
      ],
      testCases: [
        { description: 'evalExpr("2 + 3 * 4") returns 14', test: 'return evalExpr("2 + 3 * 4") === 14', input: '"2 + 3 * 4"', expected: '14' },
        { description: 'evalExpr("10 - 2 * 3") returns 4', test: 'return evalExpr("10 - 2 * 3") === 4', input: '"10 - 2 * 3"', expected: '4' },
        { description: 'evalExpr("6 / 2 + 1") returns 4', test: 'return evalExpr("6 / 2 + 1") === 4', input: '"6 / 2 + 1"', expected: '4' },
        { description: 'evalExpr("5 + 3") returns 8', test: 'return evalExpr("5 + 3") === 8', input: '"5 + 3"', expected: '8' },
        { description: 'evalExpr("4 * 3 - 2") returns 10', test: 'return evalExpr("4 * 3 - 2") === 10', input: '"4 * 3 - 2"', expected: '10' },
      ],
      concepts: ['operator precedence', 'parsing', 'arrays', 'arithmetic operators', 'algorithms'],
    },
  ],

  questions: [
    {
      id: 'q-03-1',
      question: 'What does the modulo operator `%` return?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'The percentage of the first number', correct: false },
        { id: 'b', text: 'The quotient of integer division', correct: false },
        { id: 'c', text: 'The remainder after dividing the first number by the second', correct: true },
        { id: 'd', text: 'The absolute difference between two numbers', correct: false },
      ],
      explanation: 'The modulo operator returns the remainder of division. For example, 10 % 3 = 1 because 10 / 3 is 3 with a remainder of 1. It is commonly used to check if a number is even (n % 2 === 0).',
    },
    {
      id: 'q-03-2',
      question: 'What is the result of `5 == "5"` in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'false, because they are different types', correct: false },
        { id: 'b', text: 'true, because == performs type coercion', correct: true },
        { id: 'c', text: 'throws a TypeError', correct: false },
        { id: 'd', text: 'undefined', correct: false },
      ],
      explanation: 'The == operator (loose equality) performs type coercion before comparing. It converts "5" (string) to 5 (number) and then compares, resulting in true. This is why you should use === (strict equality) to avoid unexpected results.',
    },
    {
      id: 'q-03-3',
      question: 'What is the correct syntax for a ternary operator?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'condition ?? trueValue : falseValue', correct: false },
        { id: 'b', text: 'if condition then trueValue else falseValue', correct: false },
        { id: 'c', text: 'condition ? trueValue : falseValue', correct: true },
        { id: 'd', text: 'condition -> trueValue | falseValue', correct: false },
      ],
      explanation: 'The ternary operator uses the syntax: condition ? valueIfTrue : valueIfFalse. It is a concise way to express an if-else expression in a single line and is great for assigning values based on a condition.',
    },
    {
      id: 'q-03-4',
      question: 'What does the `&&` operator return when the first operand is falsy?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Always returns false', correct: false },
        { id: 'b', text: 'Returns the first falsy value (short-circuits)', correct: true },
        { id: 'c', text: 'Evaluates and returns the second operand', correct: false },
        { id: 'd', text: 'Returns undefined', correct: false },
      ],
      explanation: 'The && operator short-circuits: if the first operand is falsy, it returns that operand immediately without evaluating the second. For example, `null && someFunction()` returns null without calling someFunction. If the first is truthy, it returns the second operand.',
    },
    {
      id: 'q-03-5',
      question: 'What is the result of `2 + 3 * 4` in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: '20', correct: false },
        { id: 'b', text: '14', correct: true },
        { id: 'c', text: '24', correct: false },
        { id: 'd', text: '9', correct: false },
      ],
      explanation: 'Multiplication (*) has higher precedence than addition (+), so 3 * 4 = 12 is evaluated first, then 2 + 12 = 14. To force a different order, use parentheses: (2 + 3) * 4 = 20.',
    },
    {
      id: 'q-03-6',
      question: 'Which statement about the `||` (OR) operator is true?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'It always returns a boolean true or false', correct: false },
        { id: 'b', text: 'It returns the first truthy value, or the last value if none are truthy', correct: true },
        { id: 'c', text: 'Both operands are always evaluated', correct: false },
        { id: 'd', text: 'It only works with boolean values', correct: false },
      ],
      explanation: 'The || operator returns the first truthy value it encounters, or the last operand if none are truthy. For example, `null || "default"` returns "default". This is commonly used to provide default values. It also short-circuits: if the first value is truthy, the second is never evaluated.',
    },
    {
      id: 'q-03-7',
      question: 'Which of the following expressions correctly checks if `x` is between 10 and 20 (inclusive)?',
      multiSelect: false,
      options: [
        { id: 'a', text: '10 <= x <= 20', correct: false },
        { id: 'b', text: 'x >= 10 && x <= 20', correct: true },
        { id: 'c', text: 'x >= 10 || x <= 20', correct: false },
        { id: 'd', text: 'x in [10, 20]', correct: false },
      ],
      explanation: 'To check a range, use two separate comparisons joined with &&: x >= 10 && x <= 20. The expression 10 <= x <= 20 does not work as expected in JavaScript — it evaluates left to right as (10 <= x) <= 20, which compares a boolean to 20.',
    },
    {
      id: 'q-03-8',
      question: 'What does the `!` (NOT) operator do?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Returns the bitwise complement of a number', correct: false },
        { id: 'b', text: 'Inverts a boolean value — true becomes false, false becomes true', correct: true },
        { id: 'c', text: 'Checks if a value is null or undefined', correct: false },
        { id: 'd', text: 'Throws an error if the operand is falsy', correct: false },
      ],
      explanation: 'The ! operator negates a boolean: !true is false and !false is true. When applied to non-boolean values, it first converts to boolean, then negates. !!"hello" is true (truthy string → true → true). !!0 is false.',
    },
  ],
}
