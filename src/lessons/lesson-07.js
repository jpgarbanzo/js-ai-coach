export default {
  id: '07',
  title: 'Functions',
  description: 'Master function declarations, arrow functions, closures, and rest/spread parameters',
  icon: '⚙️',
  slides: [
    {
      id: 'slide-07-1',
      title: 'Function Declarations and Parameters',
      content: `
        <p>Functions are reusable blocks of code that perform a specific task:</p>
        <div class="code-block">// Function declaration (has hoisting)
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Multiple parameters
function add(a, b) {
  return a + b;
}

// Default parameters (ES6)
function greetWithCountry(name, country = "USA") {
  return \`Hello \${name} from \${country}!\`;
}

greet("Alice");           // "Hello, Alice!"
greetWithCountry("Bob");  // "Hello Bob from USA!"
greetWithCountry("Eve", "UK"); // "Hello Eve from UK!"</div>
        <p>If a function has no <code>return</code> statement, it returns <code>undefined</code> automatically.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-07-1',
        title: 'Temperature Converter',
        description: 'Write functions that convert temperatures between Celsius and Fahrenheit.',
        instructions: `
          <p>Create two functions:</p>
          <ul>
            <li><code>celsiusToFahrenheit(celsius)</code> — converts Celsius to Fahrenheit using the formula: <code>(celsius * 9/5) + 32</code></li>
            <li><code>fahrenheitToCelsius(fahrenheit)</code> — converts Fahrenheit to Celsius using the formula: <code>(fahrenheit - 32) * 5/9</code></li>
          </ul>
          <p>Both functions should round the result to 2 decimal places using <code>Math.round</code> or <code>toFixed</code>.</p>
          <p>Tip: <code>Math.round(value * 100) / 100</code> rounds to 2 decimal places.</p>
          <p>Example: <code>celsiusToFahrenheit(100)</code> → <code>212</code></p>
        `,
        starterCode: `// Write your functions here
function celsiusToFahrenheit(celsius) {
  // Your code here
}

function fahrenheitToCelsius(fahrenheit) {
  // Your code here
}`,
        solution: `function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9 / 5 + 32) * 100) / 100
}

function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5 / 9) * 100) / 100
}`,
        hints: [
          'For Celsius to Fahrenheit: multiply by 9/5, then add 32',
          'For Fahrenheit to Celsius: subtract 32 first, then multiply by 5/9',
          'To round to 2 decimal places: Math.round(result * 100) / 100',
        ],
        testCases: [
          {
            description: 'celsiusToFahrenheit(0) returns 32',
            test: `return celsiusToFahrenheit(0) === 32`,
            input: '0',
            expected: '32',
          },
          {
            description: 'celsiusToFahrenheit(100) returns 212',
            test: `return celsiusToFahrenheit(100) === 212`,
            input: '100',
            expected: '212',
          },
          {
            description: 'celsiusToFahrenheit(-40) returns -40',
            test: `return celsiusToFahrenheit(-40) === -40`,
            input: '-40',
            expected: '-40',
          },
          {
            description: 'fahrenheitToCelsius(32) returns 0',
            test: `return fahrenheitToCelsius(32) === 0`,
            input: '32',
            expected: '0',
          },
          {
            description: 'fahrenheitToCelsius(212) returns 100',
            test: `return fahrenheitToCelsius(212) === 100`,
            input: '212',
            expected: '100',
          },
          {
            description: 'fahrenheitToCelsius(98.6) returns approximately 37',
            test: `return fahrenheitToCelsius(98.6) === 37`,
            input: '98.6',
            expected: '37',
          },
        ],
        difficulty: 'beginner',
        concepts: ['functions', 'parameters', 'return', 'arithmetic', 'Math.round'],
      },
    },
    {
      id: 'slide-07-2',
      title: 'Arrow Functions',
      content: `
        <p>Arrow functions provide a concise syntax (ES6+):</p>
        <div class="code-block">// Traditional function expression
const multiply = function(a, b) {
  return a * b;
};

// Arrow function
const multiplyArrow = (a, b) => {
  return a * b;
};

// Implicit return (single expression — no curly braces needed)
const double = x => x * 2;
const square = x => x * x;
const add = (a, b) => a + b;

// No parameters
const getDate = () => new Date();

// Return an object (wrap in parentheses)
const makeUser = name => ({ name, active: true });

// Arrow functions in array methods
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);     // [2, 4, 6, 8, 10]
const evens = nums.filter(n => n % 2 === 0); // [2, 4]</div>
        <p>Arrow functions do NOT have their own <code>this</code> binding — they use <code>this</code> from the surrounding scope. This is why they work well as callbacks.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-07-2',
        title: 'Arrow Function Rewrite',
        description: 'Convert traditional functions to arrow functions and practice implicit returns.',
        instructions: `
          <p>Write the following as arrow functions:</p>
          <ul>
            <li><code>isEven(n)</code> — returns <code>true</code> if n is even, <code>false</code> if not. Use implicit return.</li>
            <li><code>clamp(value, min, max)</code> — returns <code>min</code> if value is below min, <code>max</code> if above max, otherwise the value itself. Can use ternary operators.</li>
            <li><code>toUpperWords(str)</code> — takes a string and returns it with every word capitalized. Use <code>split</code>, <code>map</code>, and <code>join</code>.</li>
          </ul>
          <p>Example: <code>toUpperWords("hello world")</code> → <code>"Hello World"</code></p>
        `,
        starterCode: `// Write as arrow functions
const isEven = (n) => {
  // Return true if n is even
}

const clamp = (value, min, max) => {
  // Return value clamped between min and max
}

const toUpperWords = (str) => {
  // Capitalize first letter of each word
}`,
        solution: `const isEven = n => n % 2 === 0

const clamp = (value, min, max) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

const toUpperWords = str =>
  str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')`,
        hints: [
          'isEven can use an implicit return: n => n % 2 === 0',
          'clamp uses comparisons: if value < min return min, if value > max return max, else return value',
          'toUpperWords: split by space, map each word to capitalize its first letter (charAt(0).toUpperCase() + word.slice(1)), then join back',
        ],
        testCases: [
          {
            description: 'isEven(4) returns true',
            test: `return isEven(4) === true`,
            input: '4',
            expected: 'true',
          },
          {
            description: 'isEven(7) returns false',
            test: `return isEven(7) === false`,
            input: '7',
            expected: 'false',
          },
          {
            description: 'isEven(0) returns true',
            test: `return isEven(0) === true`,
            input: '0',
            expected: 'true',
          },
          {
            description: 'clamp(5, 1, 10) returns 5',
            test: `return clamp(5, 1, 10) === 5`,
            input: '5, 1, 10',
            expected: '5',
          },
          {
            description: 'clamp(-5, 0, 100) returns 0',
            test: `return clamp(-5, 0, 100) === 0`,
            input: '-5, 0, 100',
            expected: '0',
          },
          {
            description: 'clamp(200, 0, 100) returns 100',
            test: `return clamp(200, 0, 100) === 100`,
            input: '200, 0, 100',
            expected: '100',
          },
          {
            description: 'toUpperWords("hello world") returns "Hello World"',
            test: `return toUpperWords("hello world") === "Hello World"`,
            input: '"hello world"',
            expected: '"Hello World"',
          },
          {
            description: 'toUpperWords("the quick brown fox") returns capitalized',
            test: `return toUpperWords("the quick brown fox") === "The Quick Brown Fox"`,
            input: '"the quick brown fox"',
            expected: '"The Quick Brown Fox"',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['arrow functions', 'implicit return', 'ternary', 'string methods', 'map'],
      },
    },
    {
      id: 'slide-07-3',
      title: 'Rest Parameters and Spread',
      content: `
        <p><strong>Rest parameters</strong> (<code>...args</code>) collect remaining arguments into an array:</p>
        <div class="code-block">// Collect all arguments
function sumAll(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sumAll(1, 2, 3);         // 6
sumAll(1, 2, 3, 4, 5);  // 15

// Mix regular and rest parameters
function logInfo(label, ...items) {
  console.log(\`\${label}: \${items.join(", ")}\`);
}
logInfo("Fruits", "apple", "pear", "grape");
// "Fruits: apple, pear, grape"</div>
        <p>The <strong>spread operator</strong> (<code>...</code>) expands an array into individual values:</p>
        <div class="code-block">const nums = [5, 2, 8, 1, 9];
Math.max(...nums);   // 9 — same as Math.max(5, 2, 8, 1, 9)
Math.min(...nums);   // 1

// Combine arrays
const a = [1, 2];
const b = [3, 4];
const combined = [...a, ...b]; // [1, 2, 3, 4]</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-07-3',
        title: 'Variable Argument Functions',
        description: 'Write functions that use rest parameters to accept any number of arguments.',
        instructions: `
          <p>Create two functions using rest parameters:</p>
          <ul>
            <li><code>sumAll(...numbers)</code> — returns the sum of all numbers passed as arguments</li>
            <li><code>longestWord(...words)</code> — returns the longest string passed. If there is a tie, return the first one.</li>
          </ul>
          <p>Example: <code>sumAll(1, 2, 3, 4)</code> → <code>10</code></p>
          <p>Example: <code>longestWord("cat", "elephant", "dog")</code> → <code>"elephant"</code></p>
        `,
        starterCode: `// Write your functions here using rest parameters
function sumAll(...numbers) {
  // Your code here
}

function longestWord(...words) {
  // Your code here
}`,
        solution: `function sumAll(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0)
}

function longestWord(...words) {
  return words.reduce((longest, word) => word.length > longest.length ? word : longest, words[0] ?? '')
}`,
        hints: [
          'The rest parameter ...numbers collects all arguments into an array named numbers',
          'For sumAll, use reduce with an accumulator starting at 0',
          'For longestWord, use reduce to keep track of the longest word found so far: compare word.length > longest.length',
        ],
        testCases: [
          {
            description: 'sumAll(1, 2, 3) returns 6',
            test: `return sumAll(1, 2, 3) === 6`,
            input: '1, 2, 3',
            expected: '6',
          },
          {
            description: 'sumAll() with no args returns 0',
            test: `return sumAll() === 0`,
            input: '(no arguments)',
            expected: '0',
          },
          {
            description: 'sumAll(10) returns 10',
            test: `return sumAll(10) === 10`,
            input: '10',
            expected: '10',
          },
          {
            description: 'longestWord("cat", "elephant", "dog") returns "elephant"',
            test: `return longestWord("cat", "elephant", "dog") === "elephant"`,
            input: '"cat", "elephant", "dog"',
            expected: '"elephant"',
          },
          {
            description: 'longestWord("hi", "hello") returns "hello"',
            test: `return longestWord("hi", "hello") === "hello"`,
            input: '"hi", "hello"',
            expected: '"hello"',
          },
          {
            description: 'longestWord("abc", "def") returns "abc" (tie goes to first)',
            test: `return longestWord("abc", "def") === "abc"`,
            input: '"abc", "def"',
            expected: '"abc"',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['rest parameters', 'spread operator', 'reduce', 'variadic functions'],
      },
    },
    {
      id: 'slide-07-4',
      title: 'Closures',
      content: `
        <p>A <strong>closure</strong> is a function that remembers the variables from its outer scope even after that outer function has returned:</p>
        <div class="code-block">function makeCounter(startAt = 0) {
  let count = startAt; // private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = startAt; },
    getValue: () => count,
  };
}

const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.decrement(); // 11
counter.getValue();  // 11
counter.reset();
counter.getValue();  // 10 (back to start)</div>
        <p>The inner functions can read and modify <code>count</code> because they form a closure over it. Outside code cannot access <code>count</code> directly — this is a form of <strong>data privacy</strong>.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-07-4',
        title: 'Memoize with Closure',
        description: 'Use a closure to create a function that caches results.',
        instructions: `
          <p>Create a function called <code>makeMultiplier</code> that takes a number <code>factor</code> and returns a new function. That returned function takes a number <code>n</code> and returns <code>n * factor</code>.</p>
          <p>This pattern (a function returning another function) is called a <strong>factory function</strong> and relies on closures.</p>
          <p>Example:</p>
          <pre>const double = makeMultiplier(2);
double(5);  // 10
double(8);  // 16

const triple = makeMultiplier(3);
triple(5);  // 15</pre>
        `,
        starterCode: `// Write your function here
function makeMultiplier(factor) {
  // Return a function that multiplies by factor
}`,
        solution: `function makeMultiplier(factor) {
  return function(n) {
    return n * factor
  }
}`,
        hints: [
          'makeMultiplier should return a function (not a value)',
          'The returned function takes n as its parameter and returns n * factor',
          'The inner function "closes over" the factor variable from makeMultiplier\'s scope',
        ],
        testCases: [
          {
            description: 'makeMultiplier(2) creates a doubler',
            test: `const double = makeMultiplier(2); return double(5) === 10`,
            input: 'makeMultiplier(2)',
            expected: 'function that doubles',
          },
          {
            description: 'double(8) returns 16',
            test: `const double = makeMultiplier(2); return double(8) === 16`,
            input: 'double(8)',
            expected: '16',
          },
          {
            description: 'makeMultiplier(3) creates a tripler',
            test: `const triple = makeMultiplier(3); return triple(5) === 15`,
            input: 'makeMultiplier(3)',
            expected: 'function that triples',
          },
          {
            description: 'makeMultiplier(0) always returns 0',
            test: `const zero = makeMultiplier(0); return zero(100) === 0`,
            input: 'makeMultiplier(0)',
            expected: '0',
          },
          {
            description: 'makeMultiplier(-1) negates numbers',
            test: `const negate = makeMultiplier(-1); return negate(7) === -7`,
            input: 'makeMultiplier(-1)',
            expected: '-7',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['closures', 'factory functions', 'higher-order functions', 'scope'],
      },
    },
  ],
}
