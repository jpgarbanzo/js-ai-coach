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

  exercises: [
    {
      id: 'ex-07-1',
      title: 'Multiply Two Numbers',
      difficulty: 'beginner',
      description: 'Write a function that returns the product of two numbers.',
      inputSpec: 'a: number, b: number',
      outputSpec: 'number — the product a * b',
      instructions: `
        <p>Implement a simple function that multiplies two numbers together.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>multiply(a, b)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>multiply(3, 4) → 12</code></div>
        </div>
        <p>The function should work with negative numbers and zero as well.</p>
      `,
      starterCode: `// Write a function called multiply\nfunction multiply(a, b) {\n  // your code here\n}`,
      solution: `function multiply(a, b) {\n  return a * b\n}`,
      hints: [
        'Use the * operator to multiply two values',
        'Return the result directly: return a * b',
        'This is a one-liner — no loops or conditions needed',
      ],
      testCases: [
        { description: 'multiply(3, 4) returns 12', test: 'return multiply(3, 4) === 12', input: '3, 4', expected: '12' },
        { description: 'multiply(0, 99) returns 0', test: 'return multiply(0, 99) === 0', input: '0, 99', expected: '0' },
        { description: 'multiply(-2, 5) returns -10', test: 'return multiply(-2, 5) === -10', input: '-2, 5', expected: '-10' },
        { description: 'multiply(7, 7) returns 49', test: 'return multiply(7, 7) === 49', input: '7, 7', expected: '49' },
      ],
      concepts: ['functions', 'arithmetic', 'return'],
    },
    {
      id: 'ex-07-2',
      title: 'Greet All with Rest Params',
      difficulty: 'beginner',
      description: 'Use rest parameters to greet any number of names in one call.',
      inputSpec: '...names: string[] — one or more name strings',
      outputSpec: 'string — "Hello, Name1, Name2, ...!"',
      instructions: `
        <p>Implement a function that takes any number of names using rest parameters and returns a greeting string.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>greetAll(...names)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>greetAll("Alice", "Bob") → "Hello, Alice, Bob!"</code></div>
        </div>
        <p>The names should be joined with a comma and a space. The string must start with "Hello, " and end with "!".</p>
      `,
      starterCode: `// Write a function called greetAll\nfunction greetAll(...names) {\n  // your code here\n}`,
      solution: `function greetAll(...names) {\n  return \`Hello, \${names.join(', ')}!\`\n}`,
      hints: [
        'Use rest parameters (...names) to collect all arguments into an array',
        'Use names.join(", ") to combine the names with a comma-space separator',
        'Wrap the result in a template literal: `Hello, ${names.join(", ")}!`',
      ],
      testCases: [
        { description: 'greetAll("Alice") returns "Hello, Alice!"', test: 'return greetAll("Alice") === "Hello, Alice!"', input: '"Alice"', expected: '"Hello, Alice!"' },
        { description: 'greetAll("Alice", "Bob") returns "Hello, Alice, Bob!"', test: 'return greetAll("Alice", "Bob") === "Hello, Alice, Bob!"', input: '"Alice", "Bob"', expected: '"Hello, Alice, Bob!"' },
        { description: 'greetAll("Alice", "Bob", "Charlie") returns correct string', test: 'return greetAll("Alice", "Bob", "Charlie") === "Hello, Alice, Bob, Charlie!"', input: '"Alice", "Bob", "Charlie"', expected: '"Hello, Alice, Bob, Charlie!"' },
        { description: 'greetAll("X") contains "Hello," prefix', test: 'return greetAll("X").startsWith("Hello,")', input: '"X"', expected: 'starts with "Hello,"' },
      ],
      concepts: ['rest parameters', 'template literals', 'array join'],
    },
    {
      id: 'ex-07-3',
      title: 'Apply Twice',
      difficulty: 'beginner',
      description: 'Write a higher-order function that applies a function to a value twice.',
      inputSpec: 'fn: function, x: any',
      outputSpec: 'any — result of fn(fn(x))',
      instructions: `
        <p>Implement a function that calls <code>fn</code> on <code>x</code>, then calls <code>fn</code> again on the result.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>applyTwice(fn, x)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>applyTwice(x => x + 3, 7) → 13</code></div>
        </div>
        <p>This pattern is the basis of function composition. The function <code>fn</code> can be any single-argument function.</p>
      `,
      starterCode: `// Write a function called applyTwice\nfunction applyTwice(fn, x) {\n  // your code here\n}`,
      solution: `function applyTwice(fn, x) {\n  return fn(fn(x))\n}`,
      hints: [
        'First call fn(x) to get an intermediate result',
        'Then call fn again on that intermediate result',
        'You can do it in one line: return fn(fn(x))',
      ],
      testCases: [
        { description: 'applyTwice(x => x + 3, 7) returns 13', test: 'return applyTwice(x => x + 3, 7) === 13', input: 'x => x + 3, 7', expected: '13' },
        { description: 'applyTwice(x => x * 2, 3) returns 12', test: 'return applyTwice(x => x * 2, 3) === 12', input: 'x => x * 2, 3', expected: '12' },
        { description: 'applyTwice(x => x - 1, 10) returns 8', test: 'return applyTwice(x => x - 1, 10) === 8', input: 'x => x - 1, 10', expected: '8' },
        { description: 'applyTwice works with string functions', test: 'return applyTwice(s => s + "!", "hi") === "hi!!"', input: 's => s + "!", "hi"', expected: '"hi!!"' },
      ],
      concepts: ['higher-order functions', 'function arguments', 'function application'],
    },
    {
      id: 'ex-07-4',
      title: 'Memoize a Function',
      difficulty: 'medium',
      description: 'Return a memoized version of a function that caches results by first argument.',
      inputSpec: 'fn: function',
      outputSpec: 'function — memoized version of fn',
      instructions: `
        <p>Implement a <code>memoize</code> function that takes a function <code>fn</code> and returns a new function. The new function should cache the result of each call keyed by the first argument, so repeated calls with the same argument skip recomputation.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>memoize(fn)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>const mDouble = memoize(x => x * 2); mDouble(5) → 10</code></div>
        </div>
        <p>Use a plain object or <code>Map</code> as the cache. The memoized function should return the cached value on repeated calls rather than calling <code>fn</code> again.</p>
      `,
      starterCode: `// Write a function called memoize\nfunction memoize(fn) {\n  // your code here\n}`,
      solution: `function memoize(fn) {\n  const cache = new Map()\n  return function(arg) {\n    if (cache.has(arg)) return cache.get(arg)\n    const result = fn(arg)\n    cache.set(arg, result)\n    return result\n  }\n}`,
      hints: [
        'Create a cache (Map or plain object) inside memoize using a closure',
        'Return a new function that first checks if the argument is in the cache',
        'If the cache has a hit, return it; otherwise call fn(arg), store the result, and return it',
      ],
      testCases: [
        { description: 'memoize returns a function', test: 'return typeof memoize(x => x) === "function"', input: 'x => x', expected: 'function' },
        { description: 'memoized function returns correct value', test: 'const f = memoize(x => x * 3); return f(4) === 12', input: 'x => x * 3, called with 4', expected: '12' },
        { description: 'memoized function caches results (call count check)', test: 'let count = 0; const f = memoize(x => { count++; return x * 2; }); f(5); f(5); return count === 1', input: 'call f(5) twice', expected: 'fn called only once' },
        { description: 'different args produce different results', test: 'const f = memoize(x => x + 10); return f(1) === 11 && f(2) === 12', input: 'f(1), f(2)', expected: '11, 12' },
      ],
      concepts: ['closures', 'memoization', 'Map', 'higher-order functions', 'caching'],
    },
    {
      id: 'ex-07-5',
      title: 'Function Composition',
      difficulty: 'medium',
      description: 'Implement right-to-left function composition for any number of functions.',
      inputSpec: '...fns: function[] — functions to compose',
      outputSpec: 'function — composed function where compose(f, g)(x) equals f(g(x))',
      instructions: `
        <p>Implement <code>compose</code>, which takes any number of functions and returns a new function. The returned function applies the functions from right to left.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>compose(...fns)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>compose(x => x + 1, x => x * 2)(3) → 7</code></div>
        </div>
        <p>With the example above: first <code>x * 2</code> gives 6, then <code>x + 1</code> gives 7. This is standard mathematical function composition.</p>
      `,
      starterCode: `// Write a function called compose\nfunction compose(...fns) {\n  // your code here\n}`,
      solution: `function compose(...fns) {\n  return function(x) {\n    return fns.reduceRight((acc, fn) => fn(acc), x)\n  }\n}`,
      hints: [
        'Use rest parameters (...fns) to collect all functions',
        'Return a new function that takes an initial value x',
        'Use reduceRight to apply functions from right to left: fns.reduceRight((acc, fn) => fn(acc), x)',
      ],
      testCases: [
        { description: 'compose(f, g)(x) applies g then f', test: 'const fn = compose(x => x + 1, x => x * 2); return fn(3) === 7', input: 'compose(x=>x+1, x=>x*2)(3)', expected: '7' },
        { description: 'compose with single function works', test: 'const fn = compose(x => x * 10); return fn(5) === 50', input: 'compose(x=>x*10)(5)', expected: '50' },
        { description: 'compose applies three functions right-to-left', test: 'const fn = compose(x => x - 1, x => x * 3, x => x + 2); return fn(4) === 17', input: 'compose(x=>x-1, x=>x*3, x=>x+2)(4)', expected: '17' },
        { description: 'compose returns a function', test: 'return typeof compose(x => x) === "function"', input: 'compose(x => x)', expected: 'function' },
      ],
      concepts: ['function composition', 'reduceRight', 'higher-order functions', 'rest parameters'],
    },
    {
      id: 'ex-07-6',
      title: 'Curry Any Function',
      difficulty: 'hard',
      description: 'Implement currying for a function of any arity.',
      inputSpec: 'fn: function — a function with a fixed number of parameters (fn.length)',
      outputSpec: 'function — curried version of fn',
      instructions: `
        <p>Implement a <code>curry</code> function that transforms a multi-argument function into a series of single-argument functions.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>curry(fn)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>curry((a,b,c) => a+b+c)(1)(2)(3) → 6</code></div>
        </div>
        <p>Use <code>fn.length</code> to know how many arguments are needed. When enough arguments have been collected, call the original function. Otherwise return another curried function waiting for more arguments.</p>
        <p>You may also allow partial application: <code>curriedFn(1, 2)(3)</code> should also work.</p>
      `,
      starterCode: `// Write a function called curry\nfunction curry(fn) {\n  // your code here\n}`,
      solution: `function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn(...args)\n    }\n    return function(...moreArgs) {\n      return curried(...args, ...moreArgs)\n    }\n  }\n}`,
      hints: [
        'Check args.length against fn.length to know if enough arguments have been supplied',
        'If enough args: call fn(...args) and return the result',
        'If not enough: return a new function that concatenates the current args with new ones and calls curried again',
      ],
      testCases: [
        { description: 'curry works with one-at-a-time application', test: 'const add3 = curry((a, b, c) => a + b + c); return add3(1)(2)(3) === 6', input: 'curry((a,b,c)=>a+b+c)(1)(2)(3)', expected: '6' },
        { description: 'curry works with partial application', test: 'const add3 = curry((a, b, c) => a + b + c); return add3(1, 2)(3) === 6', input: 'add3(1,2)(3)', expected: '6' },
        { description: 'curry works with all args at once', test: 'const add3 = curry((a, b, c) => a + b + c); return add3(1, 2, 3) === 6', input: 'add3(1,2,3)', expected: '6' },
        { description: 'curry returns a function when partially applied', test: 'const add3 = curry((a, b, c) => a + b + c); return typeof add3(1) === "function"', input: 'add3(1)', expected: 'function' },
        { description: 'curry works with two-argument functions', test: 'const mul = curry((a, b) => a * b); return mul(4)(5) === 20', input: 'curry((a,b)=>a*b)(4)(5)', expected: '20' },
      ],
      concepts: ['currying', 'closures', 'recursion', 'rest/spread', 'higher-order functions'],
    },
  ],

  questions: [
    {
      id: 'q-07-1',
      question: 'Which of the following function types are hoisted to the top of their scope so they can be called before their definition in the code?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Arrow functions assigned to const', correct: false },
        { id: 'b', text: 'Function declarations (function foo() {})', correct: true },
        { id: 'c', text: 'Function expressions assigned to var', correct: false },
        { id: 'd', text: 'Anonymous functions passed as callbacks', correct: false },
      ],
      explanation: 'Function declarations are fully hoisted — both their name and body. Function expressions and arrow functions are not hoisted in a callable way (the variable may be hoisted but its value is undefined until the assignment line runs).',
    },
    {
      id: 'q-07-2',
      question: 'What is the key difference between arrow functions and regular functions regarding the "this" keyword?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Arrow functions always bind "this" to the global object', correct: false },
        { id: 'b', text: 'Arrow functions do not have their own "this"; they inherit it from the enclosing scope', correct: true },
        { id: 'c', text: 'Regular functions cannot use "this" at all', correct: false },
        { id: 'd', text: 'Arrow functions bind "this" to the first argument', correct: false },
      ],
      explanation: 'Arrow functions use lexical "this" — they close over the "this" value from wherever they were defined, rather than getting a new "this" each time they are called. This makes them ideal for callbacks inside class methods.',
    },
    {
      id: 'q-07-3',
      question: 'Given: function greet(name, greeting = "Hello") { return greeting + ", " + name; } — what does greet("Alice") return?',
      multiSelect: false,
      options: [
        { id: 'a', text: '"undefined, Alice"', correct: false },
        { id: 'b', text: '"Hello, Alice"', correct: true },
        { id: 'c', text: 'An error because greeting is missing', correct: false },
        { id: 'd', text: '"Alice, Hello"', correct: false },
      ],
      explanation: 'Default parameters are used when the argument is omitted or passed as undefined. Here, greeting defaults to "Hello", so greet("Alice") returns "Hello, Alice".',
    },
    {
      id: 'q-07-4',
      question: 'What is the difference between rest parameters (...args) and the spread operator (...)?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'They are identical — both collect values into arrays', correct: false },
        { id: 'b', text: 'Rest collects arguments into an array in a function definition; spread expands an iterable into individual values at a call site', correct: true },
        { id: 'c', text: 'Spread only works on strings; rest works on arrays', correct: false },
        { id: 'd', text: 'Rest parameters appear at the call site; spread appears in the function definition', correct: false },
      ],
      explanation: 'The same ... syntax serves two different purposes depending on context. In a function parameter list (...args), it collects remaining arguments into an array (rest). At a call site or in an array literal ([...arr]), it expands an iterable into individual elements (spread).',
    },
    {
      id: 'q-07-5',
      question: 'A closure is best described as:',
      multiSelect: false,
      options: [
        { id: 'a', text: 'A function that takes another function as an argument', correct: false },
        { id: 'b', text: 'A function that has access to variables from its outer (enclosing) scope even after that outer scope has returned', correct: true },
        { id: 'c', text: 'A function with no parameters', correct: false },
        { id: 'd', text: 'An immediately invoked function expression', correct: false },
      ],
      explanation: 'Closures allow inner functions to "remember" and access variables from the outer function\'s scope, even after the outer function has finished executing. This is how private state can be created in JavaScript.',
    },
    {
      id: 'q-07-6',
      question: 'What is an IIFE (Immediately Invoked Function Expression) and why is it used?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'A function that runs only once via a timer', correct: false },
        { id: 'b', text: 'A function that is defined and called immediately, creating a private scope to avoid polluting the global namespace', correct: true },
        { id: 'c', text: 'A function that calls itself recursively', correct: false },
        { id: 'd', text: 'A function declared inside a class constructor', correct: false },
      ],
      explanation: 'An IIFE uses the pattern (function() { ... })() or (() => { ... })(). It executes immediately after being defined. Its primary use is to create an isolated scope so variables inside do not leak into the global scope.',
    },
    {
      id: 'q-07-7',
      question: 'Which of the following are characteristics of a pure function? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'Given the same inputs, it always returns the same output', correct: true },
        { id: 'b', text: 'It has no side effects (does not modify external state)', correct: true },
        { id: 'c', text: 'It must use arrow function syntax', correct: false },
        { id: 'd', text: 'It does not rely on or modify variables outside its own scope', correct: true },
      ],
      explanation: 'Pure functions are deterministic (same input always yields same output) and free of side effects (no mutation of external state, no I/O). The syntax used (arrow vs. declaration) is irrelevant to purity.',
    },
    {
      id: 'q-07-8',
      question: 'A higher-order function is one that:',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Has more than three parameters', correct: false },
        { id: 'b', text: 'Takes another function as an argument and/or returns a function as its result', correct: true },
        { id: 'c', text: 'Is declared at the top level of a module', correct: false },
        { id: 'd', text: 'Uses recursion internally', correct: false },
      ],
      explanation: 'Higher-order functions operate on other functions — either by accepting them as arguments (like Array.map, Array.filter) or by returning them (like factory functions and memoize). This is a core concept of functional programming in JavaScript.',
    },
  ],
}
