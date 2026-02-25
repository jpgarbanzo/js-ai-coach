export default {
  id: '06',
  title: 'Objects',
  description: 'Learn to create and manipulate objects, the fundamental data structure of JavaScript',
  icon: '🗂️',
  slides: [
    {
      id: 'slide-06-1',
      title: 'Creating Objects and Accessing Properties',
      content: `
        <p>Objects are <strong>collections of key-value pairs</strong> that represent real-world entities:</p>
        <div class="code-block">// Object literal notation
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
  isActive: true,
};

// Dot notation — most common
console.log(person.name);  // "Alice"
console.log(person.age);   // 30

// Bracket notation — use when key is a variable or has spaces
const key = "age";
console.log(person[key]);           // 30
console.log(person["isActive"]);    // true

// Nested objects
const user = {
  name: "Bob",
  address: {
    city: "Boston",
    zip: "02101",
  },
};
console.log(user.address.city); // "Boston"</div>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-06-2',
      title: 'Modifying Objects and Methods',
      content: `
        <p>Objects are dynamic — you can add, change, or delete properties at any time:</p>
        <div class="code-block">const user = { name: "Carlos", age: 28 };

// Add new property
user.email = "carlos@example.com";

// Modify existing property
user.age = 29;

// Delete a property
delete user.email;

// Check if property exists
console.log("age" in user);             // true
console.log(user.hasOwnProperty("age")); // true</div>
        <p><strong>Methods</strong> are functions stored as object properties:</p>
        <div class="code-block">const person = {
  name: "Ana",
  age: 30,

  // Method (shorthand syntax, ES6)
  greet() {
    return \`Hello, I am \${this.name}\`;
  },
};

console.log(person.greet()); // "Hello, I am Ana"</div>
        <p>Inside a method, <code>this</code> refers to the object that owns the method.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-06-1',
        title: 'Build a User Object',
        description: 'Create and manipulate an object with properties and methods.',
        instructions: `
          <p>Create a function called <code>createUser</code> that takes <code>name</code>, <code>age</code>, and <code>email</code> and returns an object with:</p>
          <ul>
            <li>Properties: <code>name</code>, <code>age</code>, <code>email</code></li>
            <li>A method <code>greet()</code> that returns: <code>"Hi, I'm [name] and I'm [age] years old."</code></li>
            <li>A method <code>isAdult()</code> that returns <code>true</code> if age >= 18, else <code>false</code></li>
          </ul>
          <p>Example: <code>createUser("Alice", 25, "alice@example.com").greet()</code> → <code>"Hi, I'm Alice and I'm 25 years old."</code></p>
        `,
        starterCode: `// Write your function here
function createUser(name, age, email) {
  // Return an object with name, age, email, greet(), and isAdult()
}`,
        solution: `function createUser(name, age, email) {
  return {
    name,
    age,
    email,
    greet() {
      return \`Hi, I'm \${this.name} and I'm \${this.age} years old.\`
    },
    isAdult() {
      return this.age >= 18
    },
  }
}`,
        hints: [
          'Use ES6 shorthand property notation: { name, age, email } instead of { name: name, age: age, email: email }',
          'Define greet() as a method using shorthand syntax: greet() { return ... }',
          'Inside methods, use `this.name` and `this.age` to access the object\'s own properties',
        ],
        testCases: [
          {
            description: 'greet() returns correct string',
            test: `const u = createUser("Alice", 25, "a@b.com"); return u.greet() === "Hi, I'm Alice and I'm 25 years old."`,
            input: '"Alice", 25, "a@b.com"',
            expected: '"Hi, I\'m Alice and I\'m 25 years old."',
          },
          {
            description: 'isAdult() returns true for age 18',
            test: `return createUser("Bob", 18, "b@b.com").isAdult() === true`,
            input: '"Bob", 18, ...',
            expected: 'true',
          },
          {
            description: 'isAdult() returns false for age 17',
            test: `return createUser("Kim", 17, "k@b.com").isAdult() === false`,
            input: '"Kim", 17, ...',
            expected: 'false',
          },
          {
            description: 'Object has correct name property',
            test: `return createUser("Carol", 30, "c@b.com").name === "Carol"`,
            input: '"Carol", 30, ...',
            expected: '"Carol"',
          },
          {
            description: 'Object has correct email property',
            test: `return createUser("Dave", 22, "dave@test.com").email === "dave@test.com"`,
            input: '..., "dave@test.com"',
            expected: '"dave@test.com"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['objects', 'methods', 'this', 'shorthand properties', 'template literals'],
      },
    },
    {
      id: 'slide-06-3',
      title: 'Object.keys, values, entries and Destructuring',
      content: `
        <p>Useful static methods for inspecting objects:</p>
        <div class="code-block">const product = { name: "Laptop", price: 999, stock: 5 };

// Keys — array of property names
Object.keys(product);    // ["name", "price", "stock"]

// Values — array of values
Object.values(product);  // ["Laptop", 999, 5]

// Entries — array of [key, value] pairs
Object.entries(product); // [["name","Laptop"],["price",999],["stock",5]]

// Iterate with for...of + entries
for (const [key, value] of Object.entries(product)) {
  console.log(\`\${key}: \${value}\`);
}</div>
        <p><strong>Destructuring</strong> extracts properties into variables cleanly:</p>
        <div class="code-block">const user = { name: "Pedro", age: 35, city: "NY" };

// Basic destructuring
const { name, age } = user;
console.log(name); // "Pedro"

// Rename while destructuring
const { name: userName } = user;

// Default values for missing properties
const { country = "USA" } = user;
console.log(country); // "USA"</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-06-2',
        title: 'Object Inspector',
        description: 'Use Object methods to analyze an object\'s structure.',
        instructions: `
          <p>Create a function called <code>summarizeObject</code> that takes any object and returns a summary object with:</p>
          <ul>
            <li><code>keyCount</code>: the number of properties</li>
            <li><code>keys</code>: array of property names</li>
            <li><code>hasName</code>: <code>true</code> if the object has a property called <code>"name"</code>, <code>false</code> otherwise</li>
          </ul>
          <p>Use <code>Object.keys()</code>.</p>
          <p>Example: <code>summarizeObject({name:"Alice", age:30})</code> → <code>{keyCount: 2, keys: ["name","age"], hasName: true}</code></p>
        `,
        starterCode: `// Write your function here
function summarizeObject(obj) {
  // Use Object.keys()
}`,
        solution: `function summarizeObject(obj) {
  const keys = Object.keys(obj)
  return {
    keyCount: keys.length,
    keys,
    hasName: keys.includes('name'),
  }
}`,
        hints: [
          'Use Object.keys(obj) to get an array of the object\'s property names',
          'The length property of that array gives you the key count',
          'Use the .includes("name") method on the keys array to check if "name" is present',
        ],
        testCases: [
          {
            description: 'summarizeObject({name:"Alice", age:30}) returns keyCount 2',
            test: `return summarizeObject({name:"Alice", age:30}).keyCount === 2`,
            input: '{name:"Alice", age:30}',
            expected: 'keyCount: 2',
          },
          {
            description: 'summarizeObject has correct keys array',
            test: `const r = summarizeObject({name:"Alice", age:30}); return r.keys.includes("name") && r.keys.includes("age")`,
            input: '{name:"Alice", age:30}',
            expected: '["name","age"]',
          },
          {
            description: 'summarizeObject sets hasName true when name exists',
            test: `return summarizeObject({name:"Alice"}).hasName === true`,
            input: '{name:"Alice"}',
            expected: 'hasName: true',
          },
          {
            description: 'summarizeObject sets hasName false when name missing',
            test: `return summarizeObject({age:30}).hasName === false`,
            input: '{age:30}',
            expected: 'hasName: false',
          },
          {
            description: 'summarizeObject handles empty object',
            test: `const r = summarizeObject({}); return r.keyCount === 0 && r.hasName === false`,
            input: '{}',
            expected: '{keyCount: 0, keys: [], hasName: false}',
          },
        ],
        difficulty: 'beginner',
        concepts: ['Object.keys', 'array length', 'array includes', 'objects'],
      },
    },
    {
      id: 'slide-06-4',
      title: 'Spread Operator and Object Copying',
      content: `
        <p>The <strong>spread operator</strong> (<code>...</code>) copies and combines objects easily:</p>
        <div class="code-block">const base = { name: "Alice", age: 25 };

// Copy an object
const copy = { ...base };

// Add new properties
const extended = {
  ...base,
  city: "New York",
  active: true,
};

// Merge two objects (later keys overwrite earlier ones)
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 99, c: 3 };
const merged = { ...obj1, ...obj2 };
// { a: 1, b: 99, c: 3 }

// "Update" a property without mutating original
const updated = { ...base, age: 26 };
console.log(base.age);    // 25 (unchanged)
console.log(updated.age); // 26</div>
        <p><strong>Important:</strong> Spread creates a <em>shallow</em> copy — nested objects are still references.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-06-3',
        title: 'Immutable Object Update',
        description: 'Practice creating updated copies of objects without mutating the original.',
        instructions: `
          <p>Create a function called <code>updateUser</code> that takes a <code>user</code> object and an <code>updates</code> object, and returns a new object that is the user with the updates applied. The original user object must not be modified.</p>
          <p>Use the spread operator.</p>
          <p>Example:</p>
          <pre>updateUser({name:"Alice", age:25}, {age: 26, city:"NYC"})
// returns {name:"Alice", age:26, city:"NYC"}</pre>
        `,
        starterCode: `// Write your function here
function updateUser(user, updates) {
  // Use the spread operator — do not modify user directly
}`,
        solution: `function updateUser(user, updates) {
  return { ...user, ...updates }
}`,
        hints: [
          'Use the spread operator to copy user properties first: { ...user }',
          'Then spread updates after so they overwrite any matching keys: { ...user, ...updates }',
          'Because you create a new object, the original user is never changed',
        ],
        testCases: [
          {
            description: 'updateUser merges correctly',
            test: `const r = updateUser({name:"Alice",age:25},{age:26,city:"NYC"}); return r.name === "Alice" && r.age === 26 && r.city === "NYC"`,
            input: '{name:"Alice",age:25}, {age:26,city:"NYC"}',
            expected: '{name:"Alice",age:26,city:"NYC"}',
          },
          {
            description: 'updateUser does not modify original',
            test: `const u = {name:"Alice",age:25}; updateUser(u,{age:99}); return u.age === 25`,
            input: 'original user',
            expected: 'original unchanged',
          },
          {
            description: 'updateUser with empty updates returns copy',
            test: `const r = updateUser({name:"Bob"}, {}); return r.name === "Bob"`,
            input: '{name:"Bob"}, {}',
            expected: '{name:"Bob"}',
          },
          {
            description: 'updateUser can add new properties',
            test: `const r = updateUser({name:"Carol"}, {email:"carol@test.com"}); return r.email === "carol@test.com"`,
            input: '{name:"Carol"}, {email:"..."}',
            expected: 'new property added',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['spread operator', 'object copying', 'immutability', 'object merging'],
      },
    },
    {
      id: 'slide-06-5',
      title: 'Exercise: Destructuring in Practice',
      content: `
        <p>Destructuring makes code cleaner when working with function parameters:</p>
        <div class="code-block">// Without destructuring
function greetUser(user) {
  return \`Hello, \${user.name}! You are \${user.age}.\`;
}

// With destructuring
function greetUser({ name, age }) {
  return \`Hello, \${name}! You are \${age}.\`;
}

// Destructuring with defaults
function createProfile({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-06-4',
        title: 'Destructuring Function Parameters',
        description: 'Use destructuring to write clean functions that accept objects.',
        instructions: `
          <p>Create a function called <code>formatProduct</code> that takes a product object with <code>name</code>, <code>price</code>, and optionally <code>category</code> (default: <code>"general"</code>).</p>
          <p>Use destructuring in the function parameters.</p>
          <p>It should return: <code>"[category] name: $price"</code></p>
          <p>Example: <code>formatProduct({name:"Widget", price:9.99})</code> → <code>"[general] Widget: $9.99"</code></p>
          <p>Example: <code>formatProduct({name:"Phone", price:499, category:"electronics"})</code> → <code>"[electronics] Phone: $499"</code></p>
        `,
        starterCode: `// Write your function here using parameter destructuring
function formatProduct({ name, price, category = 'general' }) {
  // Your code here
}`,
        solution: `function formatProduct({ name, price, category = 'general' }) {
  return \`[\${category}] \${name}: $\${price}\`
}`,
        hints: [
          'The destructuring is already in the parameter list: { name, price, category = "general" }',
          'Use a template literal to build the return string',
          'The format is exactly: "[category] name: $price"',
        ],
        testCases: [
          {
            description: 'formatProduct uses default category "general"',
            test: `return formatProduct({name:"Widget", price:9.99}) === "[general] Widget: $9.99"`,
            input: '{name:"Widget", price:9.99}',
            expected: '"[general] Widget: $9.99"',
          },
          {
            description: 'formatProduct uses provided category',
            test: `return formatProduct({name:"Phone", price:499, category:"electronics"}) === "[electronics] Phone: $499"`,
            input: '{name:"Phone", price:499, category:"electronics"}',
            expected: '"[electronics] Phone: $499"',
          },
          {
            description: 'formatProduct handles 0 price',
            test: `return formatProduct({name:"Free Item", price:0}) === "[general] Free Item: $0"`,
            input: '{name:"Free Item", price:0}',
            expected: '"[general] Free Item: $0"',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['destructuring', 'default parameters', 'template literals', 'object parameters'],
      },
    },
  ],
}
