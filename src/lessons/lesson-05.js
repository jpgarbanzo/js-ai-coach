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

  exercises: [
    {
      id: 'ex-05-1',
      title: 'Sum Array',
      difficulty: 'beginner',
      description: 'Write a function that returns the sum of all numbers in an array using reduce.',
      inputSpec: 'arr: number[]',
      outputSpec: 'number — the sum of all elements',
      instructions: `
        <p>Write a function called <code>sumArray</code> that takes an array of numbers and returns their sum using the <code>.reduce()</code> method.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>sumArray(arr)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>sumArray([1, 2, 3, 4, 5]) → 15</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>sumArray([]) → 0</code></div>
        </div>
        <p>Use <code>.reduce()</code> with an initial accumulator of <code>0</code>.</p>
      `,
      starterCode: `// Write a function called sumArray\nfunction sumArray(arr) {\n  // use .reduce()\n}`,
      solution: `function sumArray(arr) {\n  return arr.reduce((acc, n) => acc + n, 0)\n}`,
      hints: [
        'Use .reduce() with a callback that adds each element to the accumulator',
        'The callback is: (acc, n) => acc + n',
        'Pass 0 as the second argument to reduce to set the initial accumulator value',
      ],
      testCases: [
        { description: 'sumArray([1,2,3,4,5]) returns 15', test: 'return sumArray([1,2,3,4,5]) === 15', input: '[1,2,3,4,5]', expected: '15' },
        { description: 'sumArray([]) returns 0', test: 'return sumArray([]) === 0', input: '[]', expected: '0' },
        { description: 'sumArray([10]) returns 10', test: 'return sumArray([10]) === 10', input: '[10]', expected: '10' },
        { description: 'sumArray([-1, -2, 3]) returns 0', test: 'return sumArray([-1,-2,3]) === 0', input: '[-1,-2,3]', expected: '0' },
      ],
      concepts: ['reduce', 'accumulator', 'array methods'],
    },
    {
      id: 'ex-05-2',
      title: 'Filter Evens',
      difficulty: 'beginner',
      description: 'Write a function that returns only the even numbers from an array using filter.',
      inputSpec: 'arr: number[]',
      outputSpec: 'number[] — array containing only even numbers',
      instructions: `
        <p>Write a function called <code>filterEvens</code> that takes an array of numbers and returns a new array containing only the even numbers.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>filterEvens(arr)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>filterEvens([1, 2, 3, 4, 5, 6]) → [2, 4, 6]</code></div>
        </div>
        <p>Use <code>.filter()</code> with a callback that checks divisibility by 2.</p>
      `,
      starterCode: `// Write a function called filterEvens\nfunction filterEvens(arr) {\n  // use .filter()\n}`,
      solution: `function filterEvens(arr) {\n  return arr.filter(n => n % 2 === 0)\n}`,
      hints: [
        'Use .filter() on the array',
        'The callback should return true for even numbers: n % 2 === 0',
        'filter returns a new array — it does not modify the original',
      ],
      testCases: [
        { description: 'filterEvens([1,2,3,4,5,6]) returns [2,4,6]', test: 'return JSON.stringify(filterEvens([1,2,3,4,5,6])) === JSON.stringify([2,4,6])', input: '[1,2,3,4,5,6]', expected: '[2,4,6]' },
        { description: 'filterEvens([1,3,5]) returns []', test: 'return JSON.stringify(filterEvens([1,3,5])) === JSON.stringify([])', input: '[1,3,5]', expected: '[]' },
        { description: 'filterEvens([0,-2,4]) returns [0,-2,4]', test: 'return JSON.stringify(filterEvens([0,-2,4])) === JSON.stringify([0,-2,4])', input: '[0,-2,4]', expected: '[0,-2,4]' },
        { description: 'filterEvens([]) returns []', test: 'return JSON.stringify(filterEvens([])) === JSON.stringify([])', input: '[]', expected: '[]' },
      ],
      concepts: ['filter', 'modulo', 'arrow functions', 'array methods'],
    },
    {
      id: 'ex-05-3',
      title: 'Double All',
      difficulty: 'beginner',
      description: 'Write a function that returns a new array with each element doubled using map.',
      inputSpec: 'arr: number[]',
      outputSpec: 'number[] — each element multiplied by 2',
      instructions: `
        <p>Write a function called <code>doubleAll</code> that takes an array of numbers and returns a new array where every element is doubled.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>doubleAll(arr)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>doubleAll([1, 2, 3]) → [2, 4, 6]</code></div>
        </div>
        <p>Use <code>.map()</code> to transform each element.</p>
      `,
      starterCode: `// Write a function called doubleAll\nfunction doubleAll(arr) {\n  // use .map()\n}`,
      solution: `function doubleAll(arr) {\n  return arr.map(n => n * 2)\n}`,
      hints: [
        'Use .map() on the array',
        'The callback should return each element multiplied by 2: n => n * 2',
        'map always returns a new array of the same length',
      ],
      testCases: [
        { description: 'doubleAll([1,2,3]) returns [2,4,6]', test: 'return JSON.stringify(doubleAll([1,2,3])) === JSON.stringify([2,4,6])', input: '[1,2,3]', expected: '[2,4,6]' },
        { description: 'doubleAll([0,-1,5]) returns [0,-2,10]', test: 'return JSON.stringify(doubleAll([0,-1,5])) === JSON.stringify([0,-2,10])', input: '[0,-1,5]', expected: '[0,-2,10]' },
        { description: 'doubleAll([]) returns []', test: 'return JSON.stringify(doubleAll([])) === JSON.stringify([])', input: '[]', expected: '[]' },
        { description: 'doubleAll([5]) returns [10]', test: 'return JSON.stringify(doubleAll([5])) === JSON.stringify([10])', input: '[5]', expected: '[10]' },
      ],
      concepts: ['map', 'arrow functions', 'array transformation'],
    },
    {
      id: 'ex-05-4',
      title: 'Find Longest String',
      difficulty: 'medium',
      description: 'Write a function that returns the longest string in an array using reduce.',
      inputSpec: 'arr: string[] (non-empty)',
      outputSpec: 'string — the longest string (first one if tied)',
      instructions: `
        <p>Write a function called <code>findLongest</code> that takes a non-empty array of strings and returns the longest string. If there is a tie, return the first one encountered.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>findLongest(arr)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>findLongest(["cat", "elephant", "ox"]) → "elephant"</code></div>
        </div>
        <p>Use <code>.reduce()</code>: the accumulator starts as the first element, and each step keeps whichever string is longer.</p>
      `,
      starterCode: `// Write a function called findLongest\nfunction findLongest(arr) {\n  // use .reduce()\n}`,
      solution: `function findLongest(arr) {\n  return arr.reduce((longest, str) => str.length > longest.length ? str : longest)\n}`,
      hints: [
        'Use .reduce() without an initial value — it uses the first element as the starting accumulator',
        'The callback should compare string lengths and keep the longer one',
        'If equal length, keep the accumulator (the first one encountered)',
      ],
      testCases: [
        { description: 'findLongest(["cat","elephant","ox"]) returns "elephant"', test: 'return findLongest(["cat","elephant","ox"]) === "elephant"', input: '["cat","elephant","ox"]', expected: '"elephant"' },
        { description: 'findLongest(["a"]) returns "a"', test: 'return findLongest(["a"]) === "a"', input: '["a"]', expected: '"a"' },
        { description: 'findLongest(["ab","cd","e"]) returns "ab" (first of equal length)', test: 'return findLongest(["ab","cd","e"]) === "ab"', input: '["ab","cd","e"]', expected: '"ab"' },
        { description: 'findLongest(["hello","world","hi"]) returns "hello"', test: 'return findLongest(["hello","world","hi"]) === "hello"', input: '["hello","world","hi"]', expected: '"hello"' },
      ],
      concepts: ['reduce', 'string length', 'comparison', 'array methods'],
    },
    {
      id: 'ex-05-5',
      title: 'Group By',
      difficulty: 'medium',
      description: 'Write a function that groups an array of objects by a given property key.',
      inputSpec: 'arr: object[], key: string',
      outputSpec: 'object — keys are the unique values of the property, values are arrays of matching objects',
      instructions: `
        <p>Write a function called <code>groupBy</code> that takes an array of objects and a property name, and returns an object grouping the items by that property.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>groupBy(arr, key)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>groupBy([{type:"a",v:1},{type:"b",v:2},{type:"a",v:3}], "type")</code></div>
          <div class="io-spec-row"><span class="io-label">Returns:</span> <code>{ a: [{type:"a",v:1},{type:"a",v:3}], b: [{type:"b",v:2}] }</code></div>
        </div>
        <p>Use <code>.reduce()</code> where the accumulator is an object. For each item, if the group key doesn't exist yet, create an empty array for it, then push the item.</p>
      `,
      starterCode: `// Write a function called groupBy\nfunction groupBy(arr, key) {\n  // your code here\n}`,
      solution: `function groupBy(arr, key) {\n  return arr.reduce((groups, item) => {\n    const groupKey = item[key]\n    if (!groups[groupKey]) groups[groupKey] = []\n    groups[groupKey].push(item)\n    return groups\n  }, {})\n}`,
      hints: [
        'Use .reduce() with an empty object {} as the initial accumulator',
        'For each item, get the grouping value with item[key]',
        'If the group does not exist in the accumulator yet, create an empty array; then push the item into it',
      ],
      testCases: [
        { description: 'groupBy groups by "type" correctly', test: 'const r = groupBy([{type:"a",v:1},{type:"b",v:2},{type:"a",v:3}],"type"); return r.a.length === 2 && r.b.length === 1', input: '[...], "type"', expected: '{ a: [...], b: [...] }' },
        { description: 'groupBy single item creates correct group', test: 'const r = groupBy([{cat:"x",n:1}],"cat"); return r.x && r.x[0].n === 1', input: '[{cat:"x",n:1}], "cat"', expected: '{ x: [{cat:"x",n:1}] }' },
        { description: 'groupBy empty array returns {}', test: 'const r = groupBy([],"key"); return Object.keys(r).length === 0', input: '[], "key"', expected: '{}' },
        { description: 'groupBy preserves all items', test: 'const arr=[{t:"a"},{t:"b"},{t:"a"}]; const r=groupBy(arr,"t"); return r.a[0].t==="a" && r.b[0].t==="b"', input: '[...], "t"', expected: 'correct grouping' },
      ],
      concepts: ['reduce', 'objects', 'dynamic keys', 'grouping', 'array methods'],
    },
    {
      id: 'ex-05-6',
      title: 'Flatten Deep',
      difficulty: 'hard',
      description: 'Write a recursive function that flattens a nested array of any depth into a flat array.',
      inputSpec: 'arr: any[] (may contain nested arrays)',
      outputSpec: 'any[] — fully flattened array with no nested arrays',
      instructions: `
        <p>Write a function called <code>flattenDeep</code> that takes a (possibly deeply nested) array and returns a new flat array with all nested arrays expanded.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>flattenDeep(arr)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>flattenDeep([1, [2, [3, [4]]]]) → [1, 2, 3, 4]</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>flattenDeep([1, [2, 3], [4, [5]]]) → [1, 2, 3, 4, 5]</code></div>
        </div>
        <p>Use recursion: iterate through each element; if an element is an array, recursively flatten it and spread the results into the output; otherwise just push the value.</p>
      `,
      starterCode: `// Write a function called flattenDeep\nfunction flattenDeep(arr) {\n  // your code here\n}`,
      solution: `function flattenDeep(arr) {\n  const result = []\n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      result.push(...flattenDeep(item))\n    } else {\n      result.push(item)\n    }\n  }\n  return result\n}`,
      hints: [
        'Use a for...of loop to iterate through the array elements',
        'For each element, check if it is an array using Array.isArray(item)',
        'If it is an array, recursively call flattenDeep on it and spread the results: result.push(...flattenDeep(item))',
      ],
      testCases: [
        { description: 'flattenDeep([1,[2,[3,[4]]]]) returns [1,2,3,4]', test: 'return JSON.stringify(flattenDeep([1,[2,[3,[4]]]])) === JSON.stringify([1,2,3,4])', input: '[1,[2,[3,[4]]]]', expected: '[1,2,3,4]' },
        { description: 'flattenDeep([1,[2,3],[4,[5]]]) returns [1,2,3,4,5]', test: 'return JSON.stringify(flattenDeep([1,[2,3],[4,[5]]])) === JSON.stringify([1,2,3,4,5])', input: '[1,[2,3],[4,[5]]]', expected: '[1,2,3,4,5]' },
        { description: 'flattenDeep([1,2,3]) returns [1,2,3] (already flat)', test: 'return JSON.stringify(flattenDeep([1,2,3])) === JSON.stringify([1,2,3])', input: '[1,2,3]', expected: '[1,2,3]' },
        { description: 'flattenDeep([]) returns []', test: 'return JSON.stringify(flattenDeep([])) === JSON.stringify([])', input: '[]', expected: '[]' },
        { description: 'flattenDeep([[[[1]]]]) returns [1]', test: 'return JSON.stringify(flattenDeep([[[[1]]]])) === JSON.stringify([1])', input: '[[[[1]]]]', expected: '[1]' },
      ],
      concepts: ['recursion', 'Array.isArray', 'spread operator', 'for...of', 'arrays'],
    },
  ],

  questions: [
    {
      id: 'q-05-1',
      question: 'What index does the first element of an array have in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: '1', correct: false },
        { id: 'b', text: '0', correct: true },
        { id: 'c', text: '-1', correct: false },
        { id: 'd', text: 'It depends on the array', correct: false },
      ],
      explanation: 'JavaScript arrays are zero-indexed, meaning the first element is at index 0, the second at index 1, and so on. The last element is at index array.length - 1. This is consistent with most programming languages.',
    },
    {
      id: 'q-05-2',
      question: 'What is the difference between `push/pop` and `unshift/shift`?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'push/pop modify the array in place; unshift/shift return new arrays', correct: false },
        { id: 'b', text: 'push/pop add/remove from the END; unshift/shift add/remove from the BEGINNING', correct: true },
        { id: 'c', text: 'They do the same thing', correct: false },
        { id: 'd', text: 'push/pop work only on numbers; unshift/shift work on any type', correct: false },
      ],
      explanation: 'push() adds to the end and pop() removes from the end. unshift() adds to the beginning and shift() removes from the beginning. All four modify the original array. push and unshift return the new length; pop and shift return the removed element.',
    },
    {
      id: 'q-05-3',
      question: 'What does `Array.prototype.map()` return?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'The original array, modified in place', correct: false },
        { id: 'b', text: 'A new array of the same length with each element transformed by the callback', correct: true },
        { id: 'c', text: 'A single accumulated value', correct: false },
        { id: 'd', text: 'undefined', correct: false },
      ],
      explanation: 'map() always returns a new array of the same length as the input, where each element is the result of calling the callback on the corresponding original element. It never modifies the original array.',
    },
    {
      id: 'q-05-4',
      question: 'What is the initial value argument in `reduce()` used for?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'It defines the maximum number of iterations', correct: false },
        { id: 'b', text: 'It sets the starting value of the accumulator before the first element is processed', correct: true },
        { id: 'c', text: 'It filters out elements before reducing', correct: false },
        { id: 'd', text: 'It is required and must always be 0', correct: false },
      ],
      explanation: 'The second argument to reduce() is the initial value of the accumulator. If you provide 0, the sum starts at 0. If you provide [], you can build up a new array. If you omit it, the first element is used as the initial accumulator (but this can cause bugs on empty arrays).',
    },
    {
      id: 'q-05-5',
      question: 'What does `find()` return if no element matches the condition?',
      multiSelect: false,
      options: [
        { id: 'a', text: '-1', correct: false },
        { id: 'b', text: 'null', correct: false },
        { id: 'c', text: 'undefined', correct: true },
        { id: 'd', text: 'throws an error', correct: false },
      ],
      explanation: 'find() returns undefined when no element satisfies the condition. findIndex() returns -1 in the same case. This is why you should check if the result is undefined after calling find(), or use a default value.',
    },
    {
      id: 'q-05-6',
      question: 'What is the default sort order of `Array.prototype.sort()` without a comparator function?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Numeric ascending order', correct: false },
        { id: 'b', text: 'Lexicographic (dictionary/string) order', correct: true },
        { id: 'c', text: 'The original insertion order', correct: false },
        { id: 'd', text: 'Random order', correct: false },
      ],
      explanation: 'By default, sort() converts elements to strings and sorts them lexicographically. This means [10, 9, 2].sort() gives [10, 2, 9] — not [2, 9, 10]! For numeric sorting, always provide a comparator: arr.sort((a, b) => a - b).',
    },
    {
      id: 'q-05-7',
      question: 'What does the spread operator `...` do when used with an array?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Creates a deep copy of the array including nested arrays', correct: false },
        { id: 'b', text: 'Spreads (expands) the array elements into individual values', correct: true },
        { id: 'c', text: 'Converts the array to a string', correct: false },
        { id: 'd', text: 'Sorts the array in place', correct: false },
      ],
      explanation: 'The spread operator (...) expands an array into its individual elements. `[...arr1, ...arr2]` creates a new array by spreading both. It also creates a shallow copy: `const copy = [...original]`. Note: nested arrays/objects are still shared references.',
    },
    {
      id: 'q-05-8',
      question: 'Which array methods do NOT modify the original array? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'map()', correct: true },
        { id: 'b', text: 'filter()', correct: true },
        { id: 'c', text: 'push()', correct: false },
        { id: 'd', text: 'reduce()', correct: true },
        { id: 'e', text: 'sort()', correct: false },
      ],
      explanation: 'map(), filter(), and reduce() are immutable — they return new arrays/values without changing the original. push(), pop(), sort(), splice(), and reverse() mutate the original array. Knowing this helps avoid subtle bugs.',
    },
  ],
}
