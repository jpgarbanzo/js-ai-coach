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

  exercises: [
    {
      id: 'ex-06-1',
      title: 'Create Person',
      difficulty: 'beginner',
      description: 'Write a function that returns a person object with a greet method.',
      inputSpec: 'name: string, age: number',
      outputSpec: 'object — { name, age, greet: function }',
      instructions: `
        <p>Write a function called <code>createPerson</code> that takes a <code>name</code> and <code>age</code>, and returns an object with those properties plus a <code>greet</code> method.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>createPerson(name, age)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>createPerson("Alice", 30).greet() → "Hi, I'm Alice"</code></div>
        </div>
        <p>The <code>greet()</code> method should return the string <code>"Hi, I'm {name}"</code> using <code>this.name</code>.</p>
      `,
      starterCode: `// Write a function called createPerson\nfunction createPerson(name, age) {\n  // your code here\n}`,
      solution: `function createPerson(name, age) {\n  return {\n    name,\n    age,\n    greet() {\n      return \`Hi, I'm \${this.name}\`\n    },\n  }\n}`,
      hints: [
        'Return an object literal with name, age, and a greet method',
        'Use shorthand property syntax: { name, age } instead of { name: name, age: age }',
        'Inside greet(), use this.name to access the object\'s name property',
      ],
      testCases: [
        { description: 'createPerson("Alice", 30).greet() returns "Hi, I\'m Alice"', test: 'return createPerson("Alice", 30).greet() === "Hi, I\'m Alice"', input: '"Alice", 30', expected: '"Hi, I\'m Alice"' },
        { description: 'createPerson has correct name property', test: 'return createPerson("Bob", 25).name === "Bob"', input: '"Bob", 25', expected: '"Bob"' },
        { description: 'createPerson has correct age property', test: 'return createPerson("Carol", 20).age === 20', input: '"Carol", 20', expected: '20' },
        { description: 'greet uses this.name not closure', test: 'const p = createPerson("Dave", 40); p.name = "Eve"; return p.greet() === "Hi, I\'m Eve"', input: 'mutated name', expected: '"Hi, I\'m Eve"' },
      ],
      concepts: ['objects', 'methods', 'this', 'shorthand properties', 'template literals'],
    },
    {
      id: 'ex-06-2',
      title: 'Get Keys',
      difficulty: 'beginner',
      description: 'Write a function that returns an array of an object\'s own property keys.',
      inputSpec: 'obj: object',
      outputSpec: 'string[] — array of own property names',
      instructions: `
        <p>Write a function called <code>getKeys</code> that takes any object and returns an array of its own property names using <code>Object.keys()</code>.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>getKeys(obj)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>getKeys({a: 1, b: 2}) → ["a", "b"]</code></div>
        </div>
        <p>Return an empty array for an empty object. The order of keys follows insertion order in modern JavaScript.</p>
      `,
      starterCode: `// Write a function called getKeys\nfunction getKeys(obj) {\n  // your code here\n}`,
      solution: `function getKeys(obj) {\n  return Object.keys(obj)\n}`,
      hints: [
        'Use Object.keys(obj) — it returns an array of the object\'s own enumerable property names',
        'Simply return the result of Object.keys(obj)',
        'For an empty object {}, Object.keys returns []',
      ],
      testCases: [
        { description: 'getKeys({a:1,b:2}) returns ["a","b"]', test: 'const r = getKeys({a:1,b:2}); return r.includes("a") && r.includes("b") && r.length === 2', input: '{a:1,b:2}', expected: '["a","b"]' },
        { description: 'getKeys({}) returns []', test: 'return getKeys({}).length === 0', input: '{}', expected: '[]' },
        { description: 'getKeys({x:1}) returns ["x"]', test: 'const r = getKeys({x:1}); return r.length === 1 && r[0] === "x"', input: '{x:1}', expected: '["x"]' },
        { description: 'getKeys returns correct count', test: 'return getKeys({a:1,b:2,c:3}).length === 3', input: '{a:1,b:2,c:3}', expected: 'length 3' },
      ],
      concepts: ['Object.keys', 'objects', 'arrays'],
    },
    {
      id: 'ex-06-3',
      title: 'Merge Objects',
      difficulty: 'beginner',
      description: 'Write a function that merges two objects, with the second object\'s properties taking precedence.',
      inputSpec: 'obj1: object, obj2: object',
      outputSpec: 'object — merged result, obj2 properties override obj1',
      instructions: `
        <p>Write a function called <code>mergeObjects</code> that takes two objects and returns a new merged object. Properties from <code>obj2</code> override properties from <code>obj1</code> when they share the same key.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>mergeObjects(obj1, obj2)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>mergeObjects({a:1,b:2}, {b:9,c:3}) → {a:1,b:9,c:3}</code></div>
        </div>
        <p>Use the object spread operator. Neither original object should be modified.</p>
      `,
      starterCode: `// Write a function called mergeObjects\nfunction mergeObjects(obj1, obj2) {\n  // your code here\n}`,
      solution: `function mergeObjects(obj1, obj2) {\n  return { ...obj1, ...obj2 }\n}`,
      hints: [
        'Use the spread operator to combine both objects into a new one',
        'Properties from the later spread overwrite earlier ones: { ...obj1, ...obj2 }',
        'This returns a new object — neither original is modified',
      ],
      testCases: [
        { description: 'mergeObjects({a:1,b:2},{b:9,c:3}) returns {a:1,b:9,c:3}', test: 'const r = mergeObjects({a:1,b:2},{b:9,c:3}); return r.a===1 && r.b===9 && r.c===3', input: '{a:1,b:2}, {b:9,c:3}', expected: '{a:1,b:9,c:3}' },
        { description: 'mergeObjects does not modify originals', test: 'const o1={a:1}; const o2={b:2}; mergeObjects(o1,o2); return o1.b===undefined && o2.a===undefined', input: 'two separate objects', expected: 'originals unchanged' },
        { description: 'mergeObjects with empty obj2 returns copy of obj1', test: 'const r = mergeObjects({x:1},{}); return r.x===1', input: '{x:1}, {}', expected: '{x:1}' },
        { description: 'mergeObjects with empty obj1 returns copy of obj2', test: 'const r = mergeObjects({},{y:2}); return r.y===2', input: '{}, {y:2}', expected: '{y:2}' },
      ],
      concepts: ['spread operator', 'object merging', 'immutability'],
    },
    {
      id: 'ex-06-4',
      title: 'Deep Clone',
      difficulty: 'medium',
      description: 'Write a function that returns a deep clone of an object (handles nested objects, no functions).',
      inputSpec: 'obj: object (no functions, no circular references)',
      outputSpec: 'object — deep clone with no shared references',
      instructions: `
        <p>Write a function called <code>deepClone</code> that returns a deep copy of an object. Unlike the spread operator (shallow copy), a deep clone ensures nested objects are also copied, not shared.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>deepClone(obj)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>deepClone({a: 1, b: {c: 2}}) → {a: 1, b: {c: 2}} (new object)</code></div>
        </div>
        <p>You may use <code>JSON.parse(JSON.stringify(obj))</code> as a simple implementation (works for plain objects with no functions or special values). Mutating the clone must not affect the original.</p>
      `,
      starterCode: `// Write a function called deepClone\nfunction deepClone(obj) {\n  // your code here\n}`,
      solution: `function deepClone(obj) {\n  return JSON.parse(JSON.stringify(obj))\n}`,
      hints: [
        'Use JSON.stringify to convert the object to a JSON string, then JSON.parse to convert it back',
        'This creates a completely new object with no shared references to the original',
        'Note: this does not work for functions, undefined values, or circular references — but works fine for plain data objects',
      ],
      testCases: [
        { description: 'deepClone returns equal structure', test: 'const r = deepClone({a:1,b:{c:2}}); return r.a===1 && r.b.c===2', input: '{a:1,b:{c:2}}', expected: '{a:1,b:{c:2}}' },
        { description: 'deepClone is not the same reference', test: 'const o={a:1}; const c=deepClone(o); return c !== o', input: '{a:1}', expected: 'different reference' },
        { description: 'deepClone nested objects are not shared', test: 'const o={a:{b:1}}; const c=deepClone(o); c.a.b=99; return o.a.b===1', input: '{a:{b:1}}', expected: 'o.a.b unchanged at 1' },
        { description: 'deepClone works on empty object', test: 'const r=deepClone({}); return typeof r === "object" && Object.keys(r).length===0', input: '{}', expected: '{}' },
      ],
      concepts: ['deep copy', 'JSON.parse', 'JSON.stringify', 'object references', 'shallow vs deep copy'],
    },
    {
      id: 'ex-06-5',
      title: 'Invert Object',
      difficulty: 'medium',
      description: 'Write a function that returns a new object with keys and values swapped.',
      inputSpec: 'obj: object (string/number values only)',
      outputSpec: 'object — keys and values swapped',
      instructions: `
        <p>Write a function called <code>invertObject</code> that takes an object and returns a new object where the keys become values and the values become keys.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>invertObject(obj)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>invertObject({a: "x", b: "y"}) → {x: "a", y: "b"}</code></div>
        </div>
        <p>Use <code>Object.entries()</code> to get key-value pairs, then build the inverted object. Values in the original object become keys in the result (converted to strings if needed).</p>
      `,
      starterCode: `// Write a function called invertObject\nfunction invertObject(obj) {\n  // your code here\n}`,
      solution: `function invertObject(obj) {\n  const inverted = {}\n  for (const [key, value] of Object.entries(obj)) {\n    inverted[value] = key\n  }\n  return inverted\n}`,
      hints: [
        'Use Object.entries(obj) to get an array of [key, value] pairs',
        'Loop through the entries and swap them: inverted[value] = key',
        'Return the new inverted object',
      ],
      testCases: [
        { description: 'invertObject({a:"x",b:"y"}) returns {x:"a",y:"b"}', test: 'const r=invertObject({a:"x",b:"y"}); return r.x==="a" && r.y==="b"', input: '{a:"x",b:"y"}', expected: '{x:"a",y:"b"}' },
        { description: 'invertObject({}) returns {}', test: 'return Object.keys(invertObject({})).length===0', input: '{}', expected: '{}' },
        { description: 'invertObject({foo:"bar"}) returns {bar:"foo"}', test: 'return invertObject({foo:"bar"}).bar==="foo"', input: '{foo:"bar"}', expected: '{bar:"foo"}' },
        { description: 'invertObject preserves all pairs', test: 'const r=invertObject({a:"1",b:"2",c:"3"}); return r["1"]==="a" && r["2"]==="b" && r["3"]==="c"', input: '{a:"1",b:"2",c:"3"}', expected: '{1:"a",2:"b",3:"c"}' },
      ],
      concepts: ['Object.entries', 'object iteration', 'dynamic keys', 'for...of'],
    },
    {
      id: 'ex-06-6',
      title: 'Flatten Object',
      difficulty: 'hard',
      description: 'Write a function that flattens a nested object into a single-level object with dot-notation keys.',
      inputSpec: 'obj: object (nested plain objects, no arrays)',
      outputSpec: 'object — flat object with dot-path keys',
      instructions: `
        <p>Write a function called <code>flatten</code> that takes a (potentially nested) object and returns a flat object where nested keys are joined with dots.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>flatten(obj)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>flatten({a: {b: {c: 1}}}) → {"a.b.c": 1}</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>flatten({a: 1, b: {c: 2, d: 3}}) → {a: 1, "b.c": 2, "b.d": 3}</code></div>
        </div>
        <p>Use recursion: if a value is a plain object, recurse and prepend the current key with a dot. If it is a primitive, add it directly.</p>
      `,
      starterCode: `// Write a function called flatten\nfunction flatten(obj, prefix) {\n  // your code here\n}`,
      solution: `function flatten(obj, prefix) {\n  const result = {}\n  for (const [key, value] of Object.entries(obj)) {\n    const fullKey = prefix ? \`\${prefix}.\${key}\` : key\n    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {\n      Object.assign(result, flatten(value, fullKey))\n    } else {\n      result[fullKey] = value\n    }\n  }\n  return result\n}`,
      hints: [
        'Use a prefix parameter to track the current path (start with empty string or undefined)',
        'For each key-value pair: if the value is a nested object, recurse with fullKey as the new prefix',
        'If the value is a primitive, set result[fullKey] = value where fullKey is prefix + "." + key (or just key if no prefix)',
      ],
      testCases: [
        { description: 'flatten({a:{b:{c:1}}}) returns {"a.b.c":1}', test: 'const r=flatten({a:{b:{c:1}}}); return r["a.b.c"]===1 && Object.keys(r).length===1', input: '{a:{b:{c:1}}}', expected: '{"a.b.c":1}' },
        { description: 'flatten({a:1,b:{c:2}}) returns {a:1,"b.c":2}', test: 'const r=flatten({a:1,b:{c:2}}); return r.a===1 && r["b.c"]===2', input: '{a:1,b:{c:2}}', expected: '{a:1,"b.c":2}' },
        { description: 'flatten({a:1}) returns {a:1}', test: 'const r=flatten({a:1}); return r.a===1 && Object.keys(r).length===1', input: '{a:1}', expected: '{a:1}' },
        { description: 'flatten({}) returns {}', test: 'return Object.keys(flatten({})).length===0', input: '{}', expected: '{}' },
        { description: 'flatten multi-level nesting', test: 'const r=flatten({x:{y:{z:42}}}); return r["x.y.z"]===42', input: '{x:{y:{z:42}}}', expected: '{"x.y.z":42}' },
      ],
      concepts: ['recursion', 'Object.entries', 'object flattening', 'dot notation', 'Object.assign'],
    },
  ],

  questions: [
    {
      id: 'q-06-1',
      question: 'What is the difference between dot notation and bracket notation for accessing object properties?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Dot notation is read-only; bracket notation allows writing', correct: false },
        { id: 'b', text: 'Bracket notation allows using variables and special characters as keys; dot notation requires valid identifier names', correct: true },
        { id: 'c', text: 'They are always interchangeable', correct: false },
        { id: 'd', text: 'Bracket notation is only for arrays; dot notation is only for objects', correct: false },
      ],
      explanation: 'Dot notation (obj.key) is cleaner but only works with valid identifier names. Bracket notation (obj["key"] or obj[variable]) is required when the key contains spaces or special characters, is a number, or is stored in a variable.',
    },
    {
      id: 'q-06-2',
      question: 'What does `this` refer to inside an object method?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'The global window object', correct: false },
        { id: 'b', text: 'The function itself', correct: false },
        { id: 'c', text: 'The object that owns the method', correct: true },
        { id: 'd', text: 'undefined', correct: false },
      ],
      explanation: 'Inside a regular method, `this` refers to the object the method belongs to. For example, in `person.greet()`, `this` inside `greet` refers to `person`. Note: arrow functions do not have their own `this` — they inherit it from the surrounding scope.',
    },
    {
      id: 'q-06-3',
      question: 'How do you delete a property from an object?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'obj.key = null', correct: false },
        { id: 'b', text: 'obj.key = undefined', correct: false },
        { id: 'c', text: 'delete obj.key', correct: true },
        { id: 'd', text: 'remove(obj.key)', correct: false },
      ],
      explanation: 'The `delete` operator removes a property from an object: `delete obj.key`. Setting a property to null or undefined still keeps the property in the object (just with a null/undefined value). There is no remove() function for objects in JavaScript.',
    },
    {
      id: 'q-06-4',
      question: 'What do `Object.keys()`, `Object.values()`, and `Object.entries()` return?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'They all return the same thing — an array of the object\'s properties', correct: false },
        { id: 'b', text: 'keys() returns property names, values() returns property values, entries() returns [key, value] pair arrays', correct: true },
        { id: 'c', text: 'keys() returns a number, values() returns an array, entries() returns an object', correct: false },
        { id: 'd', text: 'They modify the object and return it', correct: false },
      ],
      explanation: 'Object.keys(obj) returns an array of property names. Object.values(obj) returns an array of property values. Object.entries(obj) returns an array of [key, value] pair arrays. All three are useful for iterating over objects.',
    },
    {
      id: 'q-06-5',
      question: 'What is the difference between a shallow copy and a deep copy of an object?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'A shallow copy is faster but creates a completely independent copy', correct: false },
        { id: 'b', text: 'A shallow copy copies only top-level properties; nested objects are still shared references. A deep copy duplicates everything recursively.', correct: true },
        { id: 'c', text: 'They are the same thing', correct: false },
        { id: 'd', text: 'A shallow copy uses less memory in all cases', correct: false },
      ],
      explanation: 'A shallow copy (like spread: {...obj}) copies the top-level properties, but nested objects still point to the same reference. Modifying a nested property in the copy also changes the original. A deep copy (like JSON.parse(JSON.stringify(obj))) creates entirely new nested objects.',
    },
    {
      id: 'q-06-6',
      question: 'What does object destructuring do?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Converts an object to an array', correct: false },
        { id: 'b', text: 'Deletes properties from an object', correct: false },
        { id: 'c', text: 'Extracts properties from an object into named variables', correct: true },
        { id: 'd', text: 'Creates a frozen (immutable) copy of the object', correct: false },
      ],
      explanation: 'Object destructuring syntax `const { name, age } = person` creates variables named `name` and `age` with the values from the person object. You can also rename (`const { name: n } = person`) or provide defaults (`const { country = "USA" } = person`).',
    },
    {
      id: 'q-06-7',
      question: 'What happens when you use the spread operator to merge two objects that have the same key?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'The first value is kept', correct: false },
        { id: 'b', text: 'An error is thrown', correct: false },
        { id: 'c', text: 'The later spread overwrites the earlier value', correct: true },
        { id: 'd', text: 'Both values are merged into an array', correct: false },
      ],
      explanation: 'When spreading objects, later properties overwrite earlier ones with the same key: `{ ...{a:1, b:2}, ...{b:9} }` results in `{a:1, b:9}`. This makes the spread operator useful for applying updates: `{ ...original, updatedProp: newValue }`.',
    },
    {
      id: 'q-06-8',
      question: 'Which of the following are valid ways to create an object in JavaScript? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'const obj = { key: value }', correct: true },
        { id: 'b', text: 'const obj = new Object()', correct: true },
        { id: 'c', text: 'const obj = Object.create(null)', correct: true },
        { id: 'd', text: 'const obj = object { key: value }', correct: false },
      ],
      explanation: 'Objects can be created with an object literal ({ key: value }), using the Object constructor (new Object()), or using Object.create(). The `object { }` syntax does not exist in JavaScript. Object literals are the most common and concise approach.',
    },
  ],
}
