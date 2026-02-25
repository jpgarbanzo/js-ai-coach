export default {
  id: '05',
  title: 'Arrays',
  description: 'Store and manipulate collections of data with JavaScript arrays and their powerful methods',
  icon: '📋',
  slides: [
    {
      id: 'slide-05-1',
      title: 'Creating and Accessing Arrays',
      content: `
        <p>Arrays are <strong>ordered lists</strong> that can hold any type of data:</p>
        <div class="code-block">const fruits = ["apple", "pear", "grape"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["text", 42, true, null];
const empty = [];

// Access elements by index (starts at 0)
console.log(fruits[0]);  // "apple"
console.log(fruits[2]);  // "grape"
console.log(fruits[fruits.length - 1]); // "grape" (last)

// Modify elements
fruits[1] = "banana";
console.log(fruits); // ["apple", "banana", "grape"]

// Array length
console.log(fruits.length); // 3</div>
        <p><strong>Key characteristics:</strong></p>
        <ul>
          <li>Indexed from 0</li>
          <li>Dynamic — they can grow or shrink</li>
          <li>Can hold mixed types</li>
        </ul>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-05-2',
      title: 'Modifying Arrays: push, pop, shift, unshift',
      content: `
        <p>Add and remove elements at the beginning or end:</p>
        <div class="code-block">const arr = [1, 2, 3];

// push — add to the END, returns new length
arr.push(4);       // arr = [1, 2, 3, 4]

// pop — remove from END, returns removed element
const last = arr.pop();  // last = 4, arr = [1, 2, 3]

// unshift — add to BEGINNING, returns new length
arr.unshift(0);    // arr = [0, 1, 2, 3]

// shift — remove from BEGINNING, returns removed element
const first = arr.shift(); // first = 0, arr = [1, 2, 3]</div>
        <p>Memory aid: <strong>push/pop</strong> affect the end; <strong>unshift/shift</strong> affect the beginning.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-05-3',
      title: 'map, filter, and reduce',
      content: `
        <p>The three most powerful array methods — they do NOT modify the original array:</p>
        <div class="code-block">const nums = [1, 2, 3, 4, 5];

// map — transform every element, returns new array
const doubled = nums.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter — keep elements that pass a test, returns new array
const evens = nums.filter(n => n % 2 === 0);
// [2, 4]

// reduce — accumulate a single value
const sum = nums.reduce((acc, n) => acc + n, 0);
// 15 (0 + 1 + 2 + 3 + 4 + 5)

// Chaining methods
const sumOfDoubledEvens = nums
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0);
// 12 (2*2 + 4*2)</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-05-1',
        title: 'Filter Even Numbers',
        description: 'Use the filter method to extract even numbers from an array.',
        instructions: `
          <p>Create a function called <code>getEvens</code> that takes an array of numbers and returns a new array containing only the even numbers.</p>
          <p>Use the <code>.filter()</code> method.</p>
          <p>Example: <code>getEvens([1, 2, 3, 4, 5, 6])</code> should return <code>[2, 4, 6]</code></p>
        `,
        starterCode: `// Write your function here
function getEvens(numbers) {
  // Use .filter()
}`,
        solution: `function getEvens(numbers) {
  return numbers.filter(n => n % 2 === 0)
}`,
        hints: [
          'Use the .filter() method on the array',
          'The test function should return true for even numbers: n => n % 2 === 0',
          'The modulo operator (%) returns the remainder of division; a number is even if remainder when divided by 2 is 0',
        ],
        testCases: [
          {
            description: 'getEvens([1,2,3,4,5,6]) returns [2,4,6]',
            test: `return JSON.stringify(getEvens([1,2,3,4,5,6])) === JSON.stringify([2,4,6])`,
            input: '[1,2,3,4,5,6]',
            expected: '[2,4,6]',
          },
          {
            description: 'getEvens([1,3,5]) returns []',
            test: `return JSON.stringify(getEvens([1,3,5])) === JSON.stringify([])`,
            input: '[1,3,5]',
            expected: '[]',
          },
          {
            description: 'getEvens([0, -2, 4]) returns [0, -2, 4]',
            test: `return JSON.stringify(getEvens([0,-2,4])) === JSON.stringify([0,-2,4])`,
            input: '[0,-2,4]',
            expected: '[0,-2,4]',
          },
          {
            description: 'getEvens([]) returns []',
            test: `return JSON.stringify(getEvens([])) === JSON.stringify([])`,
            input: '[]',
            expected: '[]',
          },
        ],
        difficulty: 'beginner',
        concepts: ['filter', 'arrow functions', 'modulo operator', 'arrays'],
      },
    },
    {
      id: 'slide-05-4',
      title: 'Exercise: Transform Data with map',
      content: `
        <p>The <code>map</code> method is great for transforming every element in an array:</p>
        <div class="code-block">const prices = [10, 25, 8, 50];

// Add tax (10%) to each price
const withTax = prices.map(p => p * 1.1);
// [11, 27.5, 8.8, 55]

// Convert to objects
const products = prices.map((price, index) => ({
  id: index + 1,
  price,
}));
// [{id:1, price:10}, {id:2, price:25}, ...]</div>
        <p>Note: <code>map</code> always returns a new array of the same length as the input.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-05-2',
        title: 'Double and Square',
        description: 'Practice using map to transform array elements.',
        instructions: `
          <p>Create two functions:</p>
          <ul>
            <li><code>doubleAll(numbers)</code> — returns a new array where every number is doubled</li>
            <li><code>squareAll(numbers)</code> — returns a new array where every number is squared</li>
          </ul>
          <p>Use the <code>.map()</code> method in both.</p>
          <p>Example: <code>doubleAll([1, 2, 3])</code> → <code>[2, 4, 6]</code></p>
          <p>Example: <code>squareAll([1, 2, 3])</code> → <code>[1, 4, 9]</code></p>
        `,
        starterCode: `// Write your functions here
function doubleAll(numbers) {
  // Use .map()
}

function squareAll(numbers) {
  // Use .map()
}`,
        solution: `function doubleAll(numbers) {
  return numbers.map(n => n * 2)
}

function squareAll(numbers) {
  return numbers.map(n => n * n)
}`,
        hints: [
          'Use .map() with an arrow function that multiplies each element',
          'For doubleAll, multiply each number by 2: n => n * 2',
          'For squareAll, multiply each number by itself: n => n * n',
        ],
        testCases: [
          {
            description: 'doubleAll([1,2,3]) returns [2,4,6]',
            test: `return JSON.stringify(doubleAll([1,2,3])) === JSON.stringify([2,4,6])`,
            input: '[1,2,3]',
            expected: '[2,4,6]',
          },
          {
            description: 'doubleAll([0,-1,5]) handles zeros and negatives',
            test: `return JSON.stringify(doubleAll([0,-1,5])) === JSON.stringify([0,-2,10])`,
            input: '[0,-1,5]',
            expected: '[0,-2,10]',
          },
          {
            description: 'squareAll([1,2,3,4]) returns [1,4,9,16]',
            test: `return JSON.stringify(squareAll([1,2,3,4])) === JSON.stringify([1,4,9,16])`,
            input: '[1,2,3,4]',
            expected: '[1,4,9,16]',
          },
          {
            description: 'squareAll([0, -3]) returns [0, 9]',
            test: `return JSON.stringify(squareAll([0,-3])) === JSON.stringify([0,9])`,
            input: '[0,-3]',
            expected: '[0,9]',
          },
          {
            description: 'doubleAll([]) returns []',
            test: `return JSON.stringify(doubleAll([])) === JSON.stringify([])`,
            input: '[]',
            expected: '[]',
          },
        ],
        difficulty: 'beginner',
        concepts: ['map', 'arrow functions', 'array transformation'],
      },
    },
    {
      id: 'slide-05-5',
      title: 'reduce and Array Search Methods',
      content: `
        <p>Use <strong>reduce</strong> to compute a single value from an array:</p>
        <div class="code-block">const nums = [1, 2, 3, 4, 5];

// Sum all numbers (starting accumulator: 0)
const sum = nums.reduce((acc, n) => acc + n, 0); // 15

// Find maximum
const max = nums.reduce((max, n) => n > max ? n : max, nums[0]); // 5</div>
        <p><strong>Search methods:</strong></p>
        <div class="code-block">const fruits = ["apple", "pear", "grape", "pear"];

// find — first element matching condition
const long = fruits.find(f => f.length > 4);
// "apple"

// findIndex — index of first match
const idx = fruits.findIndex(f => f === "grape");
// 2

// includes — does the array contain this value?
fruits.includes("pear");    // true
fruits.includes("mango");   // false

// indexOf — first position of value
fruits.indexOf("pear");     // 1</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-05-3',
        title: 'Shopping Cart Total',
        description: 'Use reduce to calculate the total price of items in a shopping cart.',
        instructions: `
          <p>Create a function called <code>cartTotal</code> that takes an array of product objects, each with a <code>price</code> and <code>quantity</code> property, and returns the total cost.</p>
          <p>Use the <code>.reduce()</code> method.</p>
          <p>Example:</p>
          <pre>cartTotal([
  { price: 10, quantity: 2 },
  { price: 5, quantity: 3 }
]) // returns 35 (10*2 + 5*3)</pre>
        `,
        starterCode: `// Write your function here
function cartTotal(items) {
  // Use .reduce()
}`,
        solution: `function cartTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}`,
        hints: [
          'Use .reduce() with a starting accumulator of 0',
          'For each item, add item.price * item.quantity to the accumulator',
          'The reduce callback signature is (accumulator, currentItem) => newAccumulator',
        ],
        testCases: [
          {
            description: 'cartTotal with two items returns correct total',
            test: `return cartTotal([{price:10, quantity:2},{price:5, quantity:3}]) === 35`,
            input: '[{price:10, qty:2},{price:5, qty:3}]',
            expected: '35',
          },
          {
            description: 'cartTotal with empty array returns 0',
            test: `return cartTotal([]) === 0`,
            input: '[]',
            expected: '0',
          },
          {
            description: 'cartTotal with single item',
            test: `return cartTotal([{price:20, quantity:1}]) === 20`,
            input: '[{price:20, quantity:1}]',
            expected: '20',
          },
          {
            description: 'cartTotal handles quantity of 0',
            test: `return cartTotal([{price:50, quantity:0},{price:10, quantity:3}]) === 30`,
            input: '[{price:50, qty:0},{price:10, qty:3}]',
            expected: '30',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['reduce', 'accumulator', 'object properties', 'array methods'],
      },
    },
    {
      id: 'slide-05-6',
      title: 'Exercise: Find in an Array',
      content: `
        <p>The <code>find</code> and <code>findIndex</code> methods are useful for locating elements:</p>
        <div class="code-block">const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" },
];

// Find user with id 2
const user = users.find(u => u.id === 2);
// { id: 2, name: "Bob" }

// Find index of user with name "Carol"
const idx = users.findIndex(u => u.name === "Carol");
// 2

// If not found, find returns undefined, findIndex returns -1
const notFound = users.find(u => u.id === 999);
// undefined</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-05-4',
        title: 'Find User by ID',
        description: 'Use the find method to look up a user by their ID.',
        instructions: `
          <p>Create a function called <code>findUserById</code> that takes an array of user objects and an <code>id</code> number, and returns the matching user object.</p>
          <p>If no user is found, return <code>null</code> (not <code>undefined</code>).</p>
          <p>Each user object has the shape: <code>{ id: number, name: string }</code></p>
          <p>Example: <code>findUserById([{id:1,name:"Alice"},{id:2,name:"Bob"}], 2)</code> → <code>{id:2, name:"Bob"}</code></p>
        `,
        starterCode: `// Write your function here
function findUserById(users, id) {
  // Use .find()
}`,
        solution: `function findUserById(users, id) {
  return users.find(u => u.id === id) ?? null
}`,
        hints: [
          'Use the .find() method with a callback that checks u.id === id',
          'If find() returns undefined (not found), return null instead using the nullish coalescing operator (??) or an if check',
          'Alternatively: const user = users.find(u => u.id === id); return user !== undefined ? user : null;',
        ],
        testCases: [
          {
            description: 'findUserById finds user with id 1',
            test: `const users = [{id:1,name:"Alice"},{id:2,name:"Bob"}]; const r = findUserById(users, 1); return r && r.name === "Alice"`,
            input: '[{id:1,...},{id:2,...}], 1',
            expected: '{id:1, name:"Alice"}',
          },
          {
            description: 'findUserById finds user with id 2',
            test: `const users = [{id:1,name:"Alice"},{id:2,name:"Bob"}]; const r = findUserById(users, 2); return r && r.id === 2`,
            input: '[{id:1,...},{id:2,...}], 2',
            expected: '{id:2, name:"Bob"}',
          },
          {
            description: 'findUserById returns null when not found',
            test: `const users = [{id:1,name:"Alice"}]; return findUserById(users, 999) === null`,
            input: '[{id:1,...}], 999',
            expected: 'null',
          },
          {
            description: 'findUserById returns null for empty array',
            test: `return findUserById([], 1) === null`,
            input: '[], 1',
            expected: 'null',
          },
        ],
        difficulty: 'beginner',
        concepts: ['find', 'arrow functions', 'object properties', 'null vs undefined'],
      },
    },
  ],
}
