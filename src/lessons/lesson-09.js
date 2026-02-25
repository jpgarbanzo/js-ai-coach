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
}
