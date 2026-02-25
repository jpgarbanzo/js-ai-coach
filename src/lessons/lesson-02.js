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

  exercises: [
    {
      id: 'ex-02-1',
      title: 'typeof Checker',
      difficulty: 'beginner',
      description: 'Write a function that returns the typeof string for any value.',
      inputSpec: 'value: any',
      outputSpec: 'string — the typeof result',
      instructions: `
        <p>Write a function called <code>getType</code> that takes any value and returns the result of <code>typeof value</code> as a string.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>getType(value)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>getType(42) → "number"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>getType("hello") → "string"</code></div>
        </div>
        <p>This is a direct application of the <code>typeof</code> operator — just return its result.</p>
      `,
      starterCode: `// Write a function called getType\nfunction getType(value) {\n  // your code here\n}`,
      solution: `function getType(value) {\n  return typeof value\n}`,
      hints: [
        'The typeof operator returns a string describing the type',
        'Simply return typeof value',
        'Remember: typeof null returns "object" (a known quirk)',
      ],
      testCases: [
        { description: 'getType(42) returns "number"', test: 'return getType(42) === "number"', input: '42', expected: '"number"' },
        { description: 'getType("hi") returns "string"', test: 'return getType("hi") === "string"', input: '"hi"', expected: '"string"' },
        { description: 'getType(true) returns "boolean"', test: 'return getType(true) === "boolean"', input: 'true', expected: '"boolean"' },
        { description: 'getType(undefined) returns "undefined"', test: 'return getType(undefined) === "undefined"', input: 'undefined', expected: '"undefined"' },
        { description: 'getType(null) returns "object"', test: 'return getType(null) === "object"', input: 'null', expected: '"object"' },
      ],
      concepts: ['typeof', 'data types', 'return'],
    },
    {
      id: 'ex-02-2',
      title: 'Swap Two Variables',
      difficulty: 'beginner',
      description: 'Write a function that swaps two values and returns them as an array.',
      inputSpec: 'a: any, b: any',
      outputSpec: 'array — [b, a] (values swapped)',
      instructions: `
        <p>Write a function called <code>swap</code> that takes two values <code>a</code> and <code>b</code>, swaps them, and returns the result as an array <code>[b, a]</code>.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>swap(a, b)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>swap(1, 2) → [2, 1]</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>swap("hello", "world") → ["world", "hello"]</code></div>
        </div>
        <p>Use destructuring assignment to swap without a temporary variable: <code>[a, b] = [b, a]</code>.</p>
      `,
      starterCode: `// Write a function called swap\nfunction swap(a, b) {\n  // your code here\n}`,
      solution: `function swap(a, b) {\n  [a, b] = [b, a]\n  return [a, b]\n}`,
      hints: [
        'Use destructuring assignment to swap: [a, b] = [b, a]',
        'After the swap, a holds the old b value and b holds the old a value',
        'Return them as an array: return [a, b]',
      ],
      testCases: [
        { description: 'swap(1, 2) returns [2, 1]', test: 'const r = swap(1, 2); return r[0] === 2 && r[1] === 1', input: '1, 2', expected: '[2, 1]' },
        { description: 'swap("a", "b") returns ["b", "a"]', test: 'const r = swap("a", "b"); return r[0] === "b" && r[1] === "a"', input: '"a", "b"', expected: '["b", "a"]' },
        { description: 'swap(true, false) returns [false, true]', test: 'const r = swap(true, false); return r[0] === false && r[1] === true', input: 'true, false', expected: '[false, true]' },
        { description: 'swap(5, 5) returns [5, 5]', test: 'const r = swap(5, 5); return r[0] === 5 && r[1] === 5', input: '5, 5', expected: '[5, 5]' },
      ],
      concepts: ['destructuring', 'variables', 'arrays', 'swap pattern'],
    },
    {
      id: 'ex-02-3',
      title: 'Null/Undefined Checker',
      difficulty: 'beginner',
      description: 'Write a function that identifies whether a value is null, undefined, or defined.',
      inputSpec: 'value: any',
      outputSpec: 'string — "null", "undefined", or "defined"',
      instructions: `
        <p>Write a function called <code>checkValue</code> that takes any value and returns:</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>checkValue(value)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>checkValue(null) → "null"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>checkValue(undefined) → "undefined"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>checkValue(42) → "defined"</code></div>
        </div>
        <p>Check for <code>null</code> first (using <code>=== null</code>), then for <code>undefined</code> (using <code>=== undefined</code>), then return <code>"defined"</code> for everything else.</p>
      `,
      starterCode: `// Write a function called checkValue\nfunction checkValue(value) {\n  // your code here\n}`,
      solution: `function checkValue(value) {\n  if (value === null) return 'null'\n  if (value === undefined) return 'undefined'\n  return 'defined'\n}`,
      hints: [
        'Use strict equality (===) to check for null: value === null',
        'Use strict equality to check for undefined: value === undefined',
        'Return "defined" as the fallback for all other values',
      ],
      testCases: [
        { description: 'checkValue(null) returns "null"', test: 'return checkValue(null) === "null"', input: 'null', expected: '"null"' },
        { description: 'checkValue(undefined) returns "undefined"', test: 'return checkValue(undefined) === "undefined"', input: 'undefined', expected: '"undefined"' },
        { description: 'checkValue(0) returns "defined"', test: 'return checkValue(0) === "defined"', input: '0', expected: '"defined"' },
        { description: 'checkValue("") returns "defined"', test: 'return checkValue("") === "defined"', input: '""', expected: '"defined"' },
        { description: 'checkValue(false) returns "defined"', test: 'return checkValue(false) === "defined"', input: 'false', expected: '"defined"' },
      ],
      concepts: ['null', 'undefined', 'strict equality', 'conditionals'],
    },
    {
      id: 'ex-02-4',
      title: 'Type Coercion Explorer',
      difficulty: 'medium',
      description: 'Write a function that returns an object showing the results of common type coercion operations.',
      inputSpec: 'none',
      outputSpec: 'object — coercion results',
      instructions: `
        <p>Write a function called <code>coercionResults</code> that takes no arguments and returns an object with these exact properties showing what JavaScript coerces each expression to:</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>coercionResults()</code></div>
          <div class="io-spec-row"><span class="io-label">Returns:</span> an object with specific coercion values</div>
        </div>
        <p>The returned object must have these keys:</p>
        <ul>
          <li><code>stringPlusNumber</code>: the result of <code>"5" + 3</code></li>
          <li><code>stringMinusNumber</code>: the result of <code>"5" - 3</code></li>
          <li><code>booleanEmptyString</code>: the result of <code>Boolean("")</code></li>
          <li><code>booleanZeroString</code>: the result of <code>Boolean("0")</code></li>
          <li><code>booleanZero</code>: the result of <code>Boolean(0)</code></li>
        </ul>
      `,
      starterCode: `// Write a function called coercionResults\nfunction coercionResults() {\n  // your code here\n}`,
      solution: `function coercionResults() {\n  return {\n    stringPlusNumber: "5" + 3,\n    stringMinusNumber: "5" - 3,\n    booleanEmptyString: Boolean(""),\n    booleanZeroString: Boolean("0"),\n    booleanZero: Boolean(0),\n  }\n}`,
      hints: [
        '"5" + 3 triggers string concatenation, giving "53" (not 8)',
        '"5" - 3 triggers numeric coercion, giving 2',
        'Boolean("") is false (empty string is falsy), but Boolean("0") is true (non-empty string is truthy)',
      ],
      testCases: [
        { description: 'stringPlusNumber is "53"', test: 'return coercionResults().stringPlusNumber === "53"', input: '(none)', expected: '"53"' },
        { description: 'stringMinusNumber is 2', test: 'return coercionResults().stringMinusNumber === 2', input: '(none)', expected: '2' },
        { description: 'booleanEmptyString is false', test: 'return coercionResults().booleanEmptyString === false', input: '(none)', expected: 'false' },
        { description: 'booleanZeroString is true', test: 'return coercionResults().booleanZeroString === true', input: '(none)', expected: 'true' },
        { description: 'booleanZero is false', test: 'return coercionResults().booleanZero === false', input: '(none)', expected: 'false' },
      ],
      concepts: ['type coercion', 'Boolean()', 'string concatenation', 'falsy values'],
    },
    {
      id: 'ex-02-5',
      title: 'Type Converter',
      difficulty: 'medium',
      description: 'Write a function that converts a value to a specified target type.',
      inputSpec: 'value: any, targetType: string ("string" | "number" | "boolean")',
      outputSpec: 'converted value, or null if conversion is not possible',
      instructions: `
        <p>Write a function called <code>convertType</code> that takes a <code>value</code> and a <code>targetType</code> string, and returns the value converted to that type.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>convertType(value, targetType)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>convertType(42, "string") → "42"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>convertType("3.14", "number") → 3.14</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>convertType(0, "boolean") → false</code></div>
        </div>
        <p>If <code>targetType</code> is <code>"number"</code> and the result is <code>NaN</code>, return <code>null</code>. Return <code>null</code> for unknown target types.</p>
      `,
      starterCode: `// Write a function called convertType\nfunction convertType(value, targetType) {\n  // your code here\n}`,
      solution: `function convertType(value, targetType) {\n  if (targetType === 'string') return String(value)\n  if (targetType === 'number') {\n    const n = Number(value)\n    return isNaN(n) ? null : n\n  }\n  if (targetType === 'boolean') return Boolean(value)\n  return null\n}`,
      hints: [
        'Use String(), Number(), and Boolean() for conversion based on the targetType',
        'For "number" conversion, check if the result isNaN and return null if so',
        'Use if/else if statements to branch on the targetType value',
      ],
      testCases: [
        { description: 'convertType(42, "string") returns "42"', test: 'return convertType(42, "string") === "42"', input: '42, "string"', expected: '"42"' },
        { description: 'convertType("3.14", "number") returns 3.14', test: 'return convertType("3.14", "number") === 3.14', input: '"3.14", "number"', expected: '3.14' },
        { description: 'convertType(0, "boolean") returns false', test: 'return convertType(0, "boolean") === false', input: '0, "boolean"', expected: 'false' },
        { description: 'convertType(1, "boolean") returns true', test: 'return convertType(1, "boolean") === true', input: '1, "boolean"', expected: 'true' },
        { description: 'convertType("abc", "number") returns null (NaN)', test: 'return convertType("abc", "number") === null', input: '"abc", "number"', expected: 'null' },
        { description: 'convertType(42, "unknown") returns null', test: 'return convertType(42, "unknown") === null', input: '42, "unknown"', expected: 'null' },
      ],
      concepts: ['type conversion', 'String()', 'Number()', 'Boolean()', 'NaN', 'isNaN'],
    },
    {
      id: 'ex-02-6',
      title: 'Variable Scope Analyzer',
      difficulty: 'hard',
      description: 'Write a function that returns an object describing const vs let reassignment behavior.',
      inputSpec: 'none',
      outputSpec: 'object — { letReassigned: number, constThrows: boolean, typeAfterReassign: string }',
      instructions: `
        <p>Write a function called <code>scopeDemo</code> that demonstrates <code>let</code> vs <code>const</code> behavior and returns an object with:</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>scopeDemo()</code></div>
          <div class="io-spec-row"><span class="io-label">Returns:</span> <code>{ letReassigned, constThrows, typeAfterReassign }</code></div>
        </div>
        <ul>
          <li><code>letReassigned</code>: declare <code>let x = 5</code>, then reassign <code>x = 10</code> — this property should be <code>10</code></li>
          <li><code>constThrows</code>: try to reassign a <code>const</code> inside a try/catch — this property should be <code>true</code> if it throws</li>
          <li><code>typeAfterReassign</code>: declare <code>let y = 1</code>, then reassign <code>y = "hello"</code> — this should be the <code>typeof y</code> after reassignment (should be <code>"string"</code>)</li>
        </ul>
      `,
      starterCode: `// Write a function called scopeDemo\nfunction scopeDemo() {\n  // your code here\n}`,
      solution: `function scopeDemo() {\n  let x = 5\n  x = 10\n  const letReassigned = x\n\n  let constThrows = false\n  try {\n    const c = 1\n    // attempting reassignment in eval to trigger error\n    eval('const _c = 1; _c = 2')\n  } catch (e) {\n    constThrows = true\n  }\n\n  let y = 1\n  y = 'hello'\n  const typeAfterReassign = typeof y\n\n  return { letReassigned, constThrows, typeAfterReassign }\n}`,
      hints: [
        'Declare let x = 5 and reassign it to 10; capture the new value',
        'Wrap a const reassignment attempt in a try/catch — if the catch block runs, set constThrows to true',
        'Declare let y = 1, reassign y = "hello", then use typeof y to get the type after reassignment',
      ],
      testCases: [
        { description: 'scopeDemo().letReassigned is 10', test: 'return scopeDemo().letReassigned === 10', input: '(none)', expected: '10' },
        { description: 'scopeDemo().constThrows is true', test: 'return scopeDemo().constThrows === true', input: '(none)', expected: 'true' },
        { description: 'scopeDemo().typeAfterReassign is "string"', test: 'return scopeDemo().typeAfterReassign === "string"', input: '(none)', expected: '"string"' },
      ],
      concepts: ['let', 'const', 'reassignment', 'try/catch', 'dynamic typing', 'typeof'],
    },
  ],

  questions: [
    {
      id: 'q-02-1',
      question: 'Which keyword should you use by default when declaring a variable in modern JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'var', correct: false },
        { id: 'b', text: 'let', correct: false },
        { id: 'c', text: 'const', correct: true },
        { id: 'd', text: 'def', correct: false },
      ],
      explanation: 'Use `const` by default because it prevents accidental reassignment and makes your intent clear. Only use `let` when you know the value will need to change. Avoid `var` due to its confusing scoping rules.',
    },
    {
      id: 'q-02-2',
      question: 'What does `typeof null` return in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: '"null"', correct: false },
        { id: 'b', text: '"undefined"', correct: false },
        { id: 'c', text: '"object"', correct: true },
        { id: 'd', text: '"boolean"', correct: false },
      ],
      explanation: '`typeof null` returns "object" — this is a well-known bug in JavaScript that has been kept for backwards compatibility. To check if a value is null, use strict equality: `value === null`.',
    },
    {
      id: 'q-02-3',
      question: 'What is the difference between `null` and `undefined`?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'They are exactly the same', correct: false },
        { id: 'b', text: 'null means a variable was never declared; undefined means it has no value', correct: false },
        { id: 'c', text: 'undefined is assigned by JavaScript automatically; null is assigned intentionally by the programmer', correct: true },
        { id: 'd', text: 'undefined is a number type; null is an object type', correct: false },
      ],
      explanation: '`undefined` means a variable has been declared but not assigned a value — JavaScript sets this automatically. `null` is an intentional "no value" marker set by the programmer to indicate the absence of an object.',
    },
    {
      id: 'q-02-4',
      question: 'What is the result of `"5" + 3` in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: '8', correct: false },
        { id: 'b', text: '"53"', correct: true },
        { id: 'c', text: 'NaN', correct: false },
        { id: 'd', text: '"8"', correct: false },
      ],
      explanation: 'When you use `+` with a string and a number, JavaScript converts the number to a string and concatenates them, producing "53". This is called type coercion. For arithmetic subtraction like "5" - 3, JavaScript converts the string to a number and returns 2.',
    },
    {
      id: 'q-02-5',
      question: 'Which of the following values are falsy in JavaScript? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: '0', correct: true },
        { id: 'b', text: '"0"', correct: false },
        { id: 'c', text: 'null', correct: true },
        { id: 'd', text: 'undefined', correct: true },
        { id: 'e', text: '[]', correct: false },
      ],
      explanation: 'The falsy values in JavaScript are: false, 0, "" (empty string), null, undefined, and NaN. Notably, "0" (non-empty string) and [] (empty array) are truthy despite appearing "empty".',
    },
    {
      id: 'q-02-6',
      question: 'What is a template literal in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'A string enclosed in single quotes', correct: false },
        { id: 'b', text: 'A string enclosed in backticks that supports embedded expressions and multi-line text', correct: true },
        { id: 'c', text: 'A function that generates HTML', correct: false },
        { id: 'd', text: 'A regular expression pattern', correct: false },
      ],
      explanation: 'Template literals use backtick characters (`) and allow you to embed expressions with ${...} syntax, write multi-line strings, and avoid messy string concatenation. They are the recommended way to build strings containing variables.',
    },
    {
      id: 'q-02-7',
      question: 'What does `Number("abc")` return?',
      multiSelect: false,
      options: [
        { id: 'a', text: '0', correct: false },
        { id: 'b', text: 'null', correct: false },
        { id: 'c', text: 'NaN', correct: true },
        { id: 'd', text: 'throws an error', correct: false },
      ],
      explanation: 'When you try to convert a non-numeric string to a number using Number(), it returns NaN (Not a Number). It does not throw an error. You can check for this with isNaN() or Number.isNaN().',
    },
    {
      id: 'q-02-8',
      question: 'Can you reassign a variable declared with `const`?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Yes, const variables can be freely reassigned', correct: false },
        { id: 'b', text: 'No, attempting to reassign a const throws a TypeError at runtime', correct: true },
        { id: 'c', text: 'No, but it silently fails without an error', correct: false },
        { id: 'd', text: 'Yes, but only if the new value is the same type', correct: false },
      ],
      explanation: 'A `const` declaration prevents reassignment. Attempting `const x = 1; x = 2` throws a TypeError. However, if the const holds an object or array, you can still mutate its contents — const only prevents reassigning the binding itself.',
    },
  ],
}
