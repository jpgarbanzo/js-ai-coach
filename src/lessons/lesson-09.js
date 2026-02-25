export default {
  id: '09',
  title: 'Best Practices',
  description: 'Write clean, maintainable, and professional JavaScript code',
  icon: '✅',
  slides: [
    {
      id: 'slide-09-1',
      title: 'Naming Conventions',
      content: `
        <p>Use descriptive and consistent names throughout your code:</p>
        <div class="code-block">// camelCase for variables and functions
const userName = "Alice";
const totalPrice = 100;
function calculateTotal() { ... }

// PascalCase for classes and components
class UserProfile { ... }
class ProductManager { ... }

// UPPER_CASE for true constants
const MAX_USERS = 100;
const API_URL = "https://api.example.com";
const PI = 3.14159;

// Boolean names with is/has/can prefix
const isActive = true;
const hasPermission = false;
const canEdit = true;</div>
        <p>Avoid generic names like <code>data</code>, <code>info</code>, <code>temp</code>; confusing abbreviations like <code>usrNm</code>; and single-letter names outside of short loops.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-09-2',
      title: 'const by Default, let When Needed',
      content: `
        <p>Using <code>const</code> by default improves immutability and prevents accidental reassignment:</p>
        <div class="code-block">// const by default
const name = "Alice";
const age = 25;
const user = { id: 1, name: "Bob" };

// let only when the value needs to change
let count = 0;
count++; // needs reassignment

let result;
if (condition) {
  result = "A";
} else {
  result = "B";
}

// Avoid var (has problematic function scope and hoisting)
var global = "bad"; // function scope, problematic hoisting</div>
        <p><strong>Note:</strong> <code>const</code> does not make objects or arrays immutable — it only prevents reassigning the variable itself.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-09-3',
      title: 'Always Use === Instead of ==',
      content: `
        <p>Strict equality prevents unexpected type coercion bugs:</p>
        <div class="code-block">// == (loose equality — type coercion)
0 == false   // true (converts types)
'' == false  // true
'5' == 5     // true
null == undefined // true

// === (strict equality — no type conversion)
0 === false   // false
'' === false  // false
'5' === 5     // false
null === undefined // false

// Practical examples
const age = "18";
if (age === 18) {  // false — type mismatch caught
  console.log("Adult");
}

// Same for inequality
if (value !== null) { ... } // correct
if (value != null) { ... }  // avoid</div>
        <p><strong>Rule:</strong> Always use <code>===</code> and <code>!==</code> for comparisons (unless you have a specific reason to allow type coercion).</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-09-1',
        title: 'Fix the Equality Bugs',
        description: 'Identify and fix loose equality comparisons that cause unexpected behavior.',
        instructions: `
          <p>The function <code>checkValue</code> below has bugs because it uses <code>==</code> instead of <code>===</code>. It should:</p>
          <ul>
            <li>Return <code>"zero"</code> only when the value is the number <code>0</code></li>
            <li>Return <code>"empty"</code> only when the value is the empty string <code>""</code></li>
            <li>Return <code>"false"</code> only when the value is the boolean <code>false</code></li>
            <li>Return <code>"other"</code> for anything else</li>
          </ul>
          <p>Rewrite using strict equality so each check matches only its exact type and value.</p>
        `,
        starterCode: `function checkValue(val) {
  if (val == 0) return "zero";
  if (val == "") return "empty";
  if (val == false) return "false";
  return "other";
}`,
        solution: `function checkValue(val) {
  if (val === 0) return "zero"
  if (val === "") return "empty"
  if (val === false) return "false"
  return "other"
}`,
        hints: [
          'Replace every == with === and every != with !==',
          'With ===, checkValue("") should return "empty" but not "zero" or "false"',
          'With ===, checkValue(0) should return "zero" but not "empty" or "false"',
        ],
        testCases: [
          {
            description: 'checkValue(0) returns "zero"',
            test: `return checkValue(0) === "zero"`,
            input: '0',
            expected: '"zero"',
          },
          {
            description: 'checkValue("") returns "empty"',
            test: `return checkValue("") === "empty"`,
            input: '""',
            expected: '"empty"',
          },
          {
            description: 'checkValue(false) returns "false"',
            test: `return checkValue(false) === "false"`,
            input: 'false',
            expected: '"false"',
          },
          {
            description: 'checkValue("0") returns "other" (not "zero")',
            test: `return checkValue("0") === "other"`,
            input: '"0"',
            expected: '"other"',
          },
          {
            description: 'checkValue(null) returns "other"',
            test: `return checkValue(null) === "other"`,
            input: 'null',
            expected: '"other"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['strict equality', '===', 'type coercion', 'comparison operators'],
      },
    },
    {
      id: 'slide-09-4',
      title: 'Avoid Global Variables',
      content: `
        <p>Minimize the global scope to prevent naming conflicts and hard-to-trace bugs:</p>
        <div class="code-block">// Bad — global variables pollute the shared scope
var count = 0;
var config = { debug: true };

function increment() {
  count++; // modifies global
}

// Better — use modules (ES6)
// counter.js
let count = 0;
export function increment() { count++; }
export function getCount() { return count; }

// app.js
import { increment, getCount } from './counter.js';

// Also fine — IIFE (Immediately Invoked Function Expression)
(function() {
  let count = 0; // private to this scope
  function increment() { count++; }
})();</div>
        <p>ES6 modules are the modern solution: each file has its own scope, and you explicitly <code>export</code> and <code>import</code> what you need.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-09-5',
      title: 'Useful Comments and Documentation',
      content: `
        <p>Write comments that explain the <em>why</em>, not the <em>what</em>:</p>
        <div class="code-block">// Bad — states the obvious
let x = 5; // assigns 5 to x
i++;       // increments i

// Good — explains the reason
// Delay prevents rate-limiting on the external API
setTimeout(fetchData, 1000);

// Legacy validation: field limit imposed by billing system
if (input.length > 50) { ... }

// JSDoc for functions
/**
 * Calculates the total price with tax applied.
 * @param {number} price - Base price of the product
 * @param {number} taxRate - Tax percentage (0–100)
 * @returns {number} Total price including tax
 */
function calculateTotalPrice(price, taxRate) {
  return price * (1 + taxRate / 100);
}

// TODO: Add email validation
// FIXME: Safari bug in this function on iOS 15</div>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-09-6',
      title: 'Exercise: Refactor to Best Practices',
      content: `
        <p>Applying naming conventions, <code>const</code>/<code>let</code>, and strict equality makes code more reliable:</p>
        <div class="code-block">// Before — bad practices
var x = 5;
var y = "5";
if (x == y) {
  var z = "equal";
}
console.log(z);
function calc(a, b) { return a + b; }</div>
        <p>After refactoring:</p>
        <div class="code-block">// After — best practices applied
const inputNumber = 5;
const inputString = "5";
let comparisonResult;
if (inputNumber === 5) {         // strict: type matters
  comparisonResult = "is five";
}
/**
 * Adds two numbers together.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function addNumbers(a, b) { return a + b; }</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-09-2',
        title: 'Refactor: Clean Code',
        description: 'Apply best practices: meaningful names, const/let, and strict equality.',
        instructions: `
          <p>Rewrite the following function applying best practices:</p>
          <pre>function f(a, b, c) {
  var x = a * b;
  var y = x + c;
  if (y == 100) {
    var z = "hundred";
  } else {
    var z = "other";
  }
  return z;
}</pre>
          <p>Create a function called <code>calculateLabel</code> that takes <code>quantity</code>, <code>unitPrice</code>, and <code>tax</code> and:</p>
          <ul>
            <li>Calculates <code>subtotal = quantity * unitPrice</code></li>
            <li>Calculates <code>total = subtotal + tax</code></li>
            <li>Returns <code>"hundred"</code> if total is strictly equal to <code>100</code></li>
            <li>Returns <code>"other"</code> otherwise</li>
          </ul>
          <p>Use <code>const</code>/<code>let</code> appropriately and <code>===</code> for comparisons.</p>
        `,
        starterCode: `// Write a clean version of the function
function calculateLabel(quantity, unitPrice, tax) {
  // Use const/let and === appropriately
}`,
        solution: `function calculateLabel(quantity, unitPrice, tax) {
  const subtotal = quantity * unitPrice
  const total = subtotal + tax
  if (total === 100) {
    return "hundred"
  }
  return "other"
}`,
        hints: [
          'Use const for values that will not be reassigned (subtotal, total)',
          'The comparison should be total === 100 (strict equality)',
          'You can return the string directly instead of assigning to a variable',
        ],
        testCases: [
          {
            description: 'calculateLabel(5, 18, 10) returns "hundred"',
            test: `return calculateLabel(5, 18, 10) === "hundred"`,
            input: '5, 18, 10',
            expected: '"hundred"',
          },
          {
            description: 'calculateLabel(2, 40, 20) returns "hundred"',
            test: `return calculateLabel(2, 40, 20) === "hundred"`,
            input: '2, 40, 20',
            expected: '"hundred"',
          },
          {
            description: 'calculateLabel(1, 50, 10) returns "other"',
            test: `return calculateLabel(1, 50, 10) === "other"`,
            input: '1, 50, 10',
            expected: '"other"',
          },
          {
            description: 'calculateLabel(10, 10, 0) returns "hundred"',
            test: `return calculateLabel(10, 10, 0) === "hundred"`,
            input: '10, 10, 0',
            expected: '"hundred"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['naming conventions', 'const/let', 'strict equality', 'code readability'],
      },
    },
    {
      id: 'slide-09-7',
      title: 'Exercise: Add Error Handling',
      content: `
        <p>Robust code handles edge cases explicitly rather than silently failing:</p>
        <div class="code-block">// Without error handling
function divide(a, b) {
  return a / b; // returns Infinity or NaN silently
}

// With proper validation
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  if (b === 0) {
    throw new RangeError("Cannot divide by zero");
  }
  return a / b;
}</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-09-3',
        title: 'Safe Array Average',
        description: 'Write a robust function that handles invalid inputs gracefully.',
        instructions: `
          <p>Write a function called <code>safeAverage</code> that takes an array of numbers and returns the average. Apply best practices:</p>
          <ul>
            <li>If the argument is not an array, throw a <code>TypeError</code> with message <code>"Input must be an array"</code></li>
            <li>If the array is empty, return <code>0</code></li>
            <li>Otherwise, return the average (sum divided by count), rounded to 2 decimal places</li>
          </ul>
          <p>Use <code>Array.isArray()</code> to check the type, and <code>Math.round(value * 100) / 100</code> to round.</p>
        `,
        starterCode: `// Write your function here
function safeAverage(numbers) {
  // Validate input, handle empty array, return average
}`,
        solution: `function safeAverage(numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError("Input must be an array")
  }
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((acc, n) => acc + n, 0)
  return Math.round((sum / numbers.length) * 100) / 100
}`,
        hints: [
          'Use Array.isArray(numbers) to check if the input is an array',
          'Throw with: throw new TypeError("Input must be an array")',
          'Use reduce to sum the numbers, then divide by numbers.length',
        ],
        testCases: [
          {
            description: 'safeAverage([1, 2, 3]) returns 2',
            test: `return safeAverage([1, 2, 3]) === 2`,
            input: '[1, 2, 3]',
            expected: '2',
          },
          {
            description: 'safeAverage([]) returns 0',
            test: `return safeAverage([]) === 0`,
            input: '[]',
            expected: '0',
          },
          {
            description: 'safeAverage([1, 2]) returns 1.5',
            test: `return safeAverage([1, 2]) === 1.5`,
            input: '[1, 2]',
            expected: '1.5',
          },
          {
            description: 'safeAverage(null) throws TypeError',
            test: `try { safeAverage(null); return false; } catch(e) { return e instanceof TypeError }`,
            input: 'null',
            expected: 'throws TypeError',
          },
          {
            description: 'safeAverage("hello") throws TypeError',
            test: `try { safeAverage("hello"); return false; } catch(e) { return e instanceof TypeError }`,
            input: '"hello"',
            expected: 'throws TypeError',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['error handling', 'throw', 'TypeError', 'Array.isArray', 'input validation'],
      },
    },
  ],

  exercises: [
    {
      id: 'ex-09-1',
      title: 'Clean Names Array',
      difficulty: 'beginner',
      description: 'Filter, trim, and deduplicate an array of strings in one pipeline.',
      inputSpec: 'arr: string[]',
      outputSpec: 'string[] — non-empty, trimmed, unique values in original relative order',
      instructions: `
        <p>Implement a function that cleans up a raw array of strings by trimming whitespace, removing empty strings, and deduplicating.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>cleanNames(arr)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>cleanNames(["  Alice", "Bob", "", "Alice"]) → ["Alice", "Bob"]</code></div>
        </div>
        <p>Steps: trim each string, filter out empty strings, then remove duplicates. Preserve the first occurrence order.</p>
      `,
      starterCode: `// Write a function called cleanNames\nfunction cleanNames(arr) {\n  // your code here\n}`,
      solution: `function cleanNames(arr) {\n  const trimmed = arr.map(s => s.trim()).filter(s => s.length > 0)\n  return [...new Set(trimmed)]\n}`,
      hints: [
        'First use .map(s => s.trim()) to trim each string',
        'Then use .filter(s => s.length > 0) to remove empty strings',
        'Finally wrap in new Set([...]) to deduplicate and spread back to an array',
      ],
      testCases: [
        { description: 'trims whitespace from names', test: 'const r = cleanNames(["  Alice  ", "Bob"]); return r[0] === "Alice"', input: '["  Alice  ", "Bob"]', expected: '["Alice", "Bob"]' },
        { description: 'removes empty strings', test: 'const r = cleanNames(["Alice", "", "Bob"]); return !r.includes("")', input: '["Alice", "", "Bob"]', expected: 'no empty strings' },
        { description: 'deduplicates values', test: 'const r = cleanNames(["Alice", "Bob", "Alice"]); return r.filter(n => n === "Alice").length === 1', input: '["Alice","Bob","Alice"]', expected: 'only one "Alice"' },
        { description: 'returns empty array when all entries are empty/whitespace', test: 'return cleanNames(["", "  ", "   "]).length === 0', input: '["", "  ", "   "]', expected: '[]' },
      ],
      concepts: ['map', 'filter', 'Set', 'trim', 'deduplication'],
    },
    {
      id: 'ex-09-2',
      title: 'Safe Get Nested Value',
      difficulty: 'beginner',
      description: 'Safely retrieve a nested property from an object using a dot-path string without throwing.',
      inputSpec: 'obj: object, path: string — dot-separated property path like "a.b.c"',
      outputSpec: 'any — the value at the path, or undefined if any segment is missing',
      instructions: `
        <p>Implement a function that reads a nested property from an object using a dot-notation path string, returning <code>undefined</code> instead of throwing when any segment is missing.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>safeGet(obj, path)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>safeGet({a:{b:{c:42}}}, "a.b.c") → 42</code></div>
        </div>
        <p>Split the path by <code>"."</code>, then reduce over the keys. If any segment is nullish, return <code>undefined</code>.</p>
      `,
      starterCode: `// Write a function called safeGet\nfunction safeGet(obj, path) {\n  // your code here\n}`,
      solution: `function safeGet(obj, path) {\n  return path.split('.').reduce((acc, key) => acc == null ? undefined : acc[key], obj)\n}`,
      hints: [
        'Split the path into keys: path.split(".")',
        'Use reduce to traverse: start with obj, then access each key one at a time',
        'Guard against null/undefined at each step: if acc == null return undefined',
      ],
      testCases: [
        { description: 'safeGet returns a top-level value', test: 'return safeGet({a: 1}, "a") === 1', input: '{a:1}, "a"', expected: '1' },
        { description: 'safeGet returns a deeply nested value', test: 'return safeGet({a:{b:{c:42}}}, "a.b.c") === 42', input: '{a:{b:{c:42}}}, "a.b.c"', expected: '42' },
        { description: 'safeGet returns undefined for missing path', test: 'return safeGet({a: 1}, "a.b.c") === undefined', input: '{a:1}, "a.b.c"', expected: 'undefined' },
        { description: 'safeGet returns undefined when obj is empty', test: 'return safeGet({}, "x.y") === undefined', input: '{}, "x.y"', expected: 'undefined' },
      ],
      concepts: ['reduce', 'optional chaining', 'null checks', 'string split', 'nested objects'],
    },
    {
      id: 'ex-09-3',
      title: 'Validate an Email Address',
      difficulty: 'beginner',
      description: 'Return true if a string is a plausible email address using a basic regular expression.',
      inputSpec: 'email: string',
      outputSpec: 'boolean — true if valid-looking email, false otherwise',
      instructions: `
        <p>Implement a function that uses a basic regex to validate that a string looks like an email address.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>validateEmail(email)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>validateEmail("user@example.com") → true</code></div>
        </div>
        <p>Requirements: must have characters before the <code>@</code>, must have an <code>@</code>, must have characters after the <code>@</code>, and must have a <code>.</code> in the domain part. Simple regex is fine — no need for RFC 5321 compliance.</p>
      `,
      starterCode: `// Write a function called validateEmail\nfunction validateEmail(email) {\n  // your code here\n}`,
      solution: `function validateEmail(email) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)\n}`,
      hints: [
        'Use a regex with .test(email) to check the format',
        'A simple pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/',
        'The pattern means: one-or-more non-whitespace/non-@ chars, then @, then domain chars with a dot',
      ],
      testCases: [
        { description: 'validateEmail("user@example.com") returns true', test: 'return validateEmail("user@example.com") === true', input: '"user@example.com"', expected: 'true' },
        { description: 'validateEmail("a@b.co") returns true', test: 'return validateEmail("a@b.co") === true', input: '"a@b.co"', expected: 'true' },
        { description: 'validateEmail("notanemail") returns false', test: 'return validateEmail("notanemail") === false', input: '"notanemail"', expected: 'false' },
        { description: 'validateEmail("missing@domain") returns false', test: 'return validateEmail("missing@domain") === false', input: '"missing@domain"', expected: 'false' },
        { description: 'validateEmail("@nodomain.com") returns false', test: 'return validateEmail("@nodomain.com") === false', input: '"@nodomain.com"', expected: 'false' },
      ],
      concepts: ['regex', 'test', 'validation', 'string patterns'],
    },
    {
      id: 'ex-09-4',
      title: 'Deep Freeze an Object',
      difficulty: 'medium',
      description: 'Recursively freeze an object and all its nested objects so no properties can be modified.',
      inputSpec: 'obj: object',
      outputSpec: 'object — the same object, deeply frozen',
      instructions: `
        <p>Implement a function that recursively calls <code>Object.freeze()</code> on an object and all of its nested object values.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>deepFreeze(obj)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>const o = deepFreeze({a:{b:1}}); o.a.b = 99; o.a.b === 1 // still 1</code></div>
        </div>
        <p>Use <code>Object.freeze(obj)</code> on the object itself, then recursively freeze any property values that are objects. Return the frozen object.</p>
      `,
      starterCode: `// Write a function called deepFreeze\nfunction deepFreeze(obj) {\n  // your code here\n}`,
      solution: `function deepFreeze(obj) {\n  Object.freeze(obj)\n  Object.values(obj).forEach(val => {\n    if (val !== null && typeof val === 'object') {\n      deepFreeze(val)\n    }\n  })\n  return obj\n}`,
      hints: [
        'Call Object.freeze(obj) first to freeze the top-level object',
        'Use Object.values(obj) to iterate over property values',
        'For each value that is a non-null object, call deepFreeze recursively',
      ],
      testCases: [
        { description: 'deepFreeze freezes top-level properties', test: 'const o = deepFreeze({a:1}); "use strict"; try { o.a = 2 } catch(e) {}; return o.a === 1', input: '{a:1}', expected: 'a remains 1' },
        { description: 'deepFreeze freezes nested objects', test: 'const o = deepFreeze({a:{b:42}}); try { o.a.b = 99 } catch(e) {}; return o.a.b === 42', input: '{a:{b:42}}', expected: 'b remains 42' },
        { description: 'deepFreeze returns the object', test: 'const o = {x:1}; return deepFreeze(o) === o', input: '{x:1}', expected: 'same object reference' },
        { description: 'Object.isFrozen is true on nested object', test: 'const o = deepFreeze({a:{b:1}}); return Object.isFrozen(o.a)', input: '{a:{b:1}}', expected: 'nested object is frozen' },
      ],
      concepts: ['Object.freeze', 'recursion', 'immutability', 'Object.values', 'typeof'],
    },
    {
      id: 'ex-09-5',
      title: 'Retry an Async Function',
      difficulty: 'medium',
      description: 'Call an async function up to N times on failure, returning the first success or throwing the last error.',
      inputSpec: 'fn: () => Promise<any>, times: number',
      outputSpec: 'Promise<any> — resolves with fn result, or rejects with last error after all attempts fail',
      instructions: `
        <p>Implement an async function that retries a failing async function up to <code>times</code> attempts before giving up.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>retry(fn, times)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>await retry(unstableFn, 3) — tries up to 3 times</code></div>
        </div>
        <p>On each attempt, call <code>fn()</code> inside a try/catch. If it succeeds, return the result. If it fails and there are attempts remaining, try again. After the last attempt fails, throw the error.</p>
      `,
      starterCode: `// Write an async function called retry\nasync function retry(fn, times) {\n  // your code here\n}`,
      solution: `async function retry(fn, times) {\n  let lastError\n  for (let i = 0; i < times; i++) {\n    try {\n      return await fn()\n    } catch (err) {\n      lastError = err\n    }\n  }\n  throw lastError\n}`,
      hints: [
        'Use a for loop running up to times iterations',
        'Inside the loop, wrap await fn() in try/catch — if it succeeds, return the result',
        'If it fails, store the error and continue the loop; after the loop, throw the last error',
      ],
      testCases: [
        { description: 'retry resolves immediately on first success', test: 'return retry(() => Promise.resolve(42), 3).then(v => v === 42)', input: 'fn always succeeds', expected: '42' },
        { description: 'retry resolves on second attempt after first fails', test: 'let count = 0; const fn = () => { count++; return count < 2 ? Promise.reject("err") : Promise.resolve("ok") }; return retry(fn, 3).then(v => v === "ok")', input: 'fn fails once then succeeds', expected: '"ok"' },
        { description: 'retry rejects after all attempts fail', test: 'const fn = () => Promise.reject(new Error("fail")); return retry(fn, 2).then(() => false).catch(e => e.message === "fail")', input: 'fn always fails, times=2', expected: 'throws "fail"' },
        { description: 'retry calls fn the correct number of times on total failure', test: 'let count = 0; const fn = () => { count++; return Promise.reject("e") }; return retry(fn, 3).catch(() => count === 3)', input: 'fn fails 3 times', expected: 'fn called 3 times' },
      ],
      concepts: ['async/await', 'try/catch', 'loops', 'error handling', 'retry pattern'],
    },
    {
      id: 'ex-09-6',
      title: 'Debounce a Function',
      difficulty: 'hard',
      description: 'Implement debounce — delay calling a function until it stops being called for a given number of milliseconds.',
      inputSpec: 'fn: function, delay: number (milliseconds)',
      outputSpec: 'function — debounced version of fn',
      instructions: `
        <p>Implement a <code>debounce</code> function that wraps <code>fn</code> so it only gets called after <code>delay</code> milliseconds have elapsed since the last invocation of the wrapper.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>debounce(fn, delay)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>const dFn = debounce(save, 300); // rapid calls only trigger save once after 300ms of silence</code></div>
        </div>
        <p>Each time the returned function is called, cancel the previous scheduled call (if any) using <code>clearTimeout</code>, then schedule a new one with <code>setTimeout</code>. The original function is only called after the delay has fully elapsed without another call.</p>
      `,
      starterCode: `// Write a function called debounce\nfunction debounce(fn, delay) {\n  // your code here\n}`,
      solution: `function debounce(fn, delay) {\n  let timerId\n  return function(...args) {\n    clearTimeout(timerId)\n    timerId = setTimeout(() => fn(...args), delay)\n  }\n}`,
      hints: [
        'Store a timer ID in a closure variable (e.g., let timerId)',
        'Each call to the returned function should clearTimeout(timerId) first',
        'Then set a new timer: timerId = setTimeout(() => fn(...args), delay)',
      ],
      testCases: [
        { description: 'debounce returns a function', test: 'return typeof debounce(() => {}, 100) === "function"', input: 'debounce(() => {}, 100)', expected: 'function' },
        { description: 'fn is not called immediately', test: 'let called = false; const d = debounce(() => { called = true }, 100); d(); return called === false', input: 'call debounced fn', expected: 'fn not called yet' },
        { description: 'fn is called after delay (async test)', test: 'return new Promise(resolve => { let count = 0; const d = debounce(() => count++, 50); d(); d(); d(); setTimeout(() => resolve(count === 1), 150) })', input: '3 rapid calls', expected: 'fn called exactly once' },
        { description: 'fn is not called when called once and checked before delay', test: 'let n = 0; const d = debounce(() => n++, 200); d(); d(); return n === 0', input: '2 rapid calls, check before delay', expected: '0 (not yet called)' },
      ],
      concepts: ['closures', 'setTimeout', 'clearTimeout', 'debounce pattern', 'rest/spread'],
    },
  ],

  questions: [
    {
      id: 'q-09-1',
      question: 'Which declaration keyword should you prefer for most variable declarations in modern JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'var — it has been the standard for decades', correct: false },
        { id: 'b', text: 'let — always, for both mutable and immutable values', correct: false },
        { id: 'c', text: 'const — use by default; only switch to let when reassignment is needed', correct: true },
        { id: 'd', text: 'It does not matter which you use', correct: false },
      ],
      explanation: 'Modern best practice is "const by default, let when needed, never var." Using const signals that a variable will not be reassigned, making code easier to reason about and preventing accidental reassignment bugs.',
    },
    {
      id: 'q-09-2',
      question: 'What is the difference between === (strict equality) and == (loose equality)?',
      multiSelect: false,
      options: [
        { id: 'a', text: '=== is only for comparing strings; == works for all types', correct: false },
        { id: 'b', text: '=== compares value and type without coercion; == converts types before comparing', correct: true },
        { id: 'c', text: '== is faster because it skips the type check', correct: false },
        { id: 'd', text: 'They behave identically for primitive values', correct: false },
      ],
      explanation: 'Strict equality (===) requires both sides to have the same type AND the same value. Loose equality (==) applies type coercion rules that can produce surprising results: 0 == false is true, "" == false is true, null == undefined is true. Always use === to avoid these surprises.',
    },
    {
      id: 'q-09-3',
      question: 'Which naming convention is correct for each case? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'camelCase for variable and function names: getUserName, totalPrice', correct: true },
        { id: 'b', text: 'PascalCase for class names: UserProfile, ShoppingCart', correct: true },
        { id: 'c', text: 'SCREAMING_SNAKE_CASE for true constants: MAX_RETRIES, API_KEY', correct: true },
        { id: 'd', text: 'snake_case for all function names: get_user_name, calculate_total', correct: false },
      ],
      explanation: 'JavaScript conventions: camelCase for variables/functions, PascalCase for classes/constructors, UPPER_SNAKE_CASE for module-level constants. snake_case is common in Python and SQL but is not the JavaScript convention.',
    },
    {
      id: 'q-09-4',
      question: 'Why should global variables be avoided in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Global variables are slower to access than local variables', correct: false },
        { id: 'b', text: 'They pollute the shared scope, leading to naming conflicts and hard-to-trace bugs when multiple scripts run on the same page', correct: true },
        { id: 'c', text: 'Global variables cannot hold object values', correct: false },
        { id: 'd', text: 'Browsers delete global variables after page load', correct: false },
      ],
      explanation: 'Global variables are shared across all scripts on a page. If two scripts define the same global name, one silently overwrites the other, causing subtle bugs. ES6 modules solve this by giving each file its own scope, making global pollution a non-issue.',
    },
    {
      id: 'q-09-5',
      question: 'What characterizes a pure function?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'It must use arrow function syntax and have no parameters', correct: false },
        { id: 'b', text: 'Given the same inputs it always returns the same output, and it has no side effects', correct: true },
        { id: 'c', text: 'It must call at least one other function internally', correct: false },
        { id: 'd', text: 'It cannot use variables declared outside its body', correct: false },
      ],
      explanation: 'Pure functions are deterministic (same input → same output every time) and free of side effects (no modifying external state, no I/O, no mutations). They are easy to test, cache, and compose. Syntax (arrow vs. declaration) is irrelevant to purity.',
    },
    {
      id: 'q-09-6',
      question: 'What is the "early return" pattern and why is it a best practice?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Returning from a function at the very start without doing any work', correct: false },
        { id: 'b', text: 'Returning immediately when an invalid condition is detected, avoiding deeply nested if/else blocks', correct: true },
        { id: 'c', text: 'Always returning undefined to avoid implicit returns', correct: false },
        { id: 'd', text: 'Using return instead of break in loops', correct: false },
      ],
      explanation: 'The early return (guard clause) pattern checks invalid or edge-case conditions at the top of a function and returns early. This avoids deeply nested if/else chains and keeps the "happy path" code at a lower indentation level, improving readability.',
    },
    {
      id: 'q-09-7',
      question: 'What does the DRY principle stand for, and what problem does it address?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Do Repeat Yourself — copy code so each section is self-contained', correct: false },
        { id: 'b', text: 'Don\'t Repeat Yourself — duplicate logic should be extracted into a reusable function or variable to avoid inconsistencies when updating', correct: true },
        { id: 'c', text: 'Define Reusable Yields — a pattern for generator functions', correct: false },
        { id: 'd', text: 'Dynamic Rendering Yield — a React rendering optimization', correct: false },
      ],
      explanation: 'DRY (Don\'t Repeat Yourself) means that each piece of knowledge or logic should have a single, authoritative representation. When logic is duplicated, a bug fix or requirement change must be applied in multiple places — missing one leads to inconsistency.',
    },
    {
      id: 'q-09-8',
      question: 'Which statements about code comments are best practices? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'Explain the "why" behind non-obvious decisions, not just the "what"', correct: true },
        { id: 'b', text: 'Use JSDoc comments (/** ... */) for public functions to document params and return types', correct: true },
        { id: 'c', text: 'Comment every single line so readers know exactly what happens', correct: false },
        { id: 'd', text: 'Use TODO and FIXME markers to flag known issues or planned improvements', correct: true },
      ],
      explanation: 'Good comments explain reasoning, document interfaces with JSDoc, and flag technical debt with TODO/FIXME. Over-commenting (explaining obvious code line by line) clutters the code and quickly goes out of date, becoming misleading rather than helpful.',
    },
  ],
}
