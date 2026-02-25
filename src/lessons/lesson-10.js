export default {
  id: '10',
  title: 'Async JavaScript',
  description: 'Master asynchronous programming with Promises, async/await, and the Fetch API',
  icon: '⚡',
  slides: [
    {
      id: 'slide-10-1',
      title: 'JavaScript is Single-Threaded',
      content: `
        <p>JavaScript runs on a <strong>single thread</strong>, executing one operation at a time. The runtime has four key components:</p>
        <div class="code-block">// Synchronous code runs in order
console.log("1. First");
console.log("2. Second");
console.log("3. Third");
// Output: 1. First, 2. Second, 3. Third</div>
        <p><strong>Key components:</strong></p>
        <ul>
          <li><strong>Call Stack</strong> — execution stack (LIFO: last in, first out)</li>
          <li><strong>Web APIs</strong> — browser-provided functions (setTimeout, fetch, DOM events)</li>
          <li><strong>Task Queue</strong> — queue of callbacks waiting to run</li>
          <li><strong>Event Loop</strong> — moves tasks from queue to stack when stack is empty</li>
        </ul>
        <p>The advantage: no race conditions or deadlocks. The challenge: slow operations block everything.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-10-2',
      title: 'The Event Loop',
      content: `
        <p>The Event Loop coordinates the Call Stack and Task Queue:</p>
        <div class="code-block">console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0); // Even with 0ms delay!

console.log("3. End");

// Output:
// 1. Start
// 3. End
// 2. Timeout  ← runs after stack is empty</div>
        <p><strong>Why this order?</strong></p>
        <ol>
          <li><code>"Start"</code> executes on the Call Stack</li>
          <li><code>setTimeout</code> sends its callback to Web APIs</li>
          <li><code>"End"</code> executes on the Call Stack</li>
          <li>Stack is now empty — Event Loop moves callback from Task Queue</li>
          <li><code>"Timeout"</code> executes</li>
        </ol>
        <p><strong>Golden rule:</strong> Async callbacks always wait for the Call Stack to be empty.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-10-3',
      title: 'Callbacks and Callback Hell',
      content: `
        <p>Callbacks are functions passed as arguments to be called later:</p>
        <div class="code-block">// Simple callback
function loadData(callback) {
  setTimeout(() => {
    const data = { name: "Alice", age: 25 };
    callback(data);
  }, 1000);
}

loadData((data) => {
  console.log("Loaded:", data);
});</div>
        <p>Nested callbacks become difficult to read and maintain — known as <strong>Callback Hell</strong>:</p>
        <div class="code-block">// Callback Hell — avoid this
loadUser(id, (user) => {
  loadPosts(user.id, (posts) => {
    loadComments(posts[0].id, (comments) => {
      loadAuthor(comments[0].authorId, (author) => {
        // Too deeply nested!
      });
    });
  });
});</div>
        <p>Promises and async/await solve the callback hell problem with flat, readable code.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-10-4',
      title: 'Promises',
      content: `
        <p>A <strong>Promise</strong> represents a value that will be available in the future:</p>
        <div class="code-block">// Create a Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Data loaded!");
    } else {
      reject("Load failed");
    }
  }, 1000);
});

// Consume the Promise
myPromise
  .then(result => {
    console.log(result); // "Data loaded!"
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Done (success or failure)");
  });</div>
        <p><strong>Promise states:</strong></p>
        <ul>
          <li><strong>Pending</strong> — initial state (in progress)</li>
          <li><strong>Fulfilled</strong> — operation succeeded (<code>resolve</code> called)</li>
          <li><strong>Rejected</strong> — operation failed (<code>reject</code> called)</li>
        </ul>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-10-1',
        title: 'Build a Promise',
        description: 'Create and consume a Promise that simulates an async validation.',
        instructions: `
          <p>Write a function called <code>validateAge</code> that takes a <code>age</code> number and returns a <strong>Promise</strong>.</p>
          <ul>
            <li>If <code>age</code> is 18 or above, the Promise should <strong>resolve</strong> with the string <code>"Access granted"</code></li>
            <li>If <code>age</code> is below 18, the Promise should <strong>reject</strong> with the string <code>"Access denied: must be 18+"</code></li>
          </ul>
          <p>The Promise does not need a delay — resolve/reject immediately.</p>
          <p>Example:</p>
          <pre>validateAge(21).then(msg => console.log(msg)); // "Access granted"
validateAge(16).catch(err => console.log(err)); // "Access denied: must be 18+"</pre>
        `,
        starterCode: `// Write your function here
function validateAge(age) {
  return new Promise((resolve, reject) => {
    // resolve or reject based on age
  });
}`,
        solution: `function validateAge(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve("Access granted")
    } else {
      reject("Access denied: must be 18+")
    }
  })
}`,
        hints: [
          'Return new Promise((resolve, reject) => { ... })',
          'Inside the Promise body, use an if/else to call resolve or reject',
          'Call resolve("Access granted") when age >= 18, reject("Access denied: must be 18+") otherwise',
        ],
        testCases: [
          {
            description: 'validateAge(21) resolves with "Access granted"',
            test: `return validateAge(21).then(msg => msg === "Access granted")`,
            input: '21',
            expected: '"Access granted"',
          },
          {
            description: 'validateAge(18) resolves with "Access granted"',
            test: `return validateAge(18).then(msg => msg === "Access granted")`,
            input: '18',
            expected: '"Access granted"',
          },
          {
            description: 'validateAge(16) rejects with denial message',
            test: `return validateAge(16).then(() => false).catch(err => err === "Access denied: must be 18+")`,
            input: '16',
            expected: '"Access denied: must be 18+"',
          },
          {
            description: 'validateAge(0) rejects',
            test: `return validateAge(0).then(() => false).catch(err => typeof err === "string" && err.length > 0)`,
            input: '0',
            expected: 'rejected with string message',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['Promise', 'resolve', 'reject', 'then', 'catch'],
      },
    },
    {
      id: 'slide-10-5',
      title: 'async / await',
      content: `
        <p><code>async/await</code> makes asynchronous code read like synchronous code:</p>
        <div class="code-block">// async declares an asynchronous function (always returns a Promise)
async function loadUser(id) {
  try {
    const user = await fetchUser(id);      // pauses until resolved
    const posts = await fetchPosts(user.id); // then runs
    console.log("User:", user.name);
    console.log("Posts:", posts.length);
    return { user, posts };
  } catch (error) {
    console.error("Error:", error);
  }
}

loadUser(1);</div>
        <p><strong>Key rules:</strong></p>
        <ul>
          <li><code>async</code> marks a function as asynchronous — it always returns a Promise</li>
          <li><code>await</code> pauses the <em>current function</em> (not the whole app) until the Promise settles</li>
          <li><code>await</code> can only be used inside <code>async</code> functions</li>
          <li>Use <code>try/catch</code> to handle errors just like synchronous code</li>
        </ul>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-10-2',
        title: 'Async/Await Flow',
        description: 'Use async/await to chain asynchronous operations sequentially.',
        instructions: `
          <p>Two helper functions are provided that return Promises:</p>
          <pre>function getUser(id) {
  return Promise.resolve({ id, name: "Alice", score: 42 });
}
function getBonus(score) {
  return Promise.resolve(score > 40 ? "gold" : "silver");
}</pre>
          <p>Write an <code>async</code> function called <code>getUserReport</code> that takes an <code>id</code> and:</p>
          <ul>
            <li>Awaits <code>getUser(id)</code> to get the user</li>
            <li>Awaits <code>getBonus(user.score)</code> to get the bonus tier</li>
            <li>Returns an object <code>{ name, bonus }</code></li>
          </ul>
          <p>Example: <code>await getUserReport(1)</code> → <code>{ name: "Alice", bonus: "gold" }</code></p>
        `,
        starterCode: `// Helper functions (already provided — do not change)
function getUser(id) {
  return Promise.resolve({ id, name: "Alice", score: 42 });
}
function getBonus(score) {
  return Promise.resolve(score > 40 ? "gold" : "silver");
}

// Write your async function here
async function getUserReport(id) {
  // await getUser, then getBonus, then return { name, bonus }
}`,
        solution: `function getUser(id) {
  return Promise.resolve({ id, name: "Alice", score: 42 })
}
function getBonus(score) {
  return Promise.resolve(score > 40 ? "gold" : "silver")
}

async function getUserReport(id) {
  const user = await getUser(id)
  const bonus = await getBonus(user.score)
  return { name: user.name, bonus }
}`,
        hints: [
          'Declare the function with the async keyword: async function getUserReport(id)',
          'Use const user = await getUser(id) to get the user object',
          'Then use const bonus = await getBonus(user.score) to get the bonus',
        ],
        testCases: [
          {
            description: 'getUserReport returns object with name and bonus',
            test: `return getUserReport(1).then(r => r.name === "Alice" && r.bonus === "gold")`,
            input: '1',
            expected: '{ name: "Alice", bonus: "gold" }',
          },
          {
            description: 'getUserReport resolves (is a Promise)',
            test: `return getUserReport(1) instanceof Promise`,
            input: '1',
            expected: 'returns a Promise',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['async', 'await', 'Promise chaining', 'sequential async operations'],
      },
    },
    {
      id: 'slide-10-6',
      title: 'Promise.all — Parallel Execution',
      content: `
        <p>Use <code>Promise.all</code> to run independent async operations in parallel:</p>
        <div class="code-block">// Slow — sequential awaits (3 seconds total if each takes 1s)
async function loadSlow() {
  const users    = await fetch('/api/users');   // 1s
  const posts    = await fetch('/api/posts');   // 1s
  const settings = await fetch('/api/settings'); // 1s
  return { users, posts, settings }; // 3s total
}

// Fast — parallel with Promise.all (1 second total)
async function loadFast() {
  const [users, posts, settings] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/settings'),
  ]);
  return { users, posts, settings }; // ~1s total
}</div>
        <p><strong>Rule:</strong> Use sequential <code>await</code> only when each operation depends on the previous result. For independent operations, use <code>Promise.all</code>.</p>
        <p><code>Promise.all</code> rejects immediately if <em>any</em> Promise rejects. Use <code>Promise.allSettled</code> if you need all results regardless of failures.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-10-3',
        title: 'Parallel Data Loading',
        description: 'Use Promise.all to fetch multiple independent values in parallel.',
        instructions: `
          <p>Three helper functions are provided, each returning a Promise:</p>
          <pre>function getPrice(id)    { return Promise.resolve(id * 10); }
function getStock(id)    { return Promise.resolve(id * 5); }
function getCategory(id) { return Promise.resolve(id % 2 === 0 ? "even" : "odd"); }</pre>
          <p>Write an <code>async</code> function called <code>getProductInfo</code> that takes an <code>id</code> and uses <code>Promise.all</code> to fetch all three values in parallel. Return an object <code>{ price, stock, category }</code>.</p>
        `,
        starterCode: `// Helper functions (already provided)
function getPrice(id)    { return Promise.resolve(id * 10); }
function getStock(id)    { return Promise.resolve(id * 5); }
function getCategory(id) { return Promise.resolve(id % 2 === 0 ? "even" : "odd"); }

// Write your function here
async function getProductInfo(id) {
  // Use Promise.all to fetch all three in parallel
}`,
        solution: `function getPrice(id)    { return Promise.resolve(id * 10) }
function getStock(id)    { return Promise.resolve(id * 5) }
function getCategory(id) { return Promise.resolve(id % 2 === 0 ? "even" : "odd") }

async function getProductInfo(id) {
  const [price, stock, category] = await Promise.all([
    getPrice(id),
    getStock(id),
    getCategory(id),
  ])
  return { price, stock, category }
}`,
        hints: [
          'Use await Promise.all([...]) to run all three Promises at once',
          'Destructure the result array: const [price, stock, category] = await Promise.all([...])',
          'Pass getPrice(id), getStock(id), getCategory(id) as the array elements',
        ],
        testCases: [
          {
            description: 'getProductInfo(4) returns correct price',
            test: `return getProductInfo(4).then(r => r.price === 40)`,
            input: '4',
            expected: 'price: 40',
          },
          {
            description: 'getProductInfo(4) returns correct stock',
            test: `return getProductInfo(4).then(r => r.stock === 20)`,
            input: '4',
            expected: 'stock: 20',
          },
          {
            description: 'getProductInfo(4) returns category "even"',
            test: `return getProductInfo(4).then(r => r.category === "even")`,
            input: '4',
            expected: 'category: "even"',
          },
          {
            description: 'getProductInfo(3) returns category "odd"',
            test: `return getProductInfo(3).then(r => r.category === "odd")`,
            input: '3',
            expected: 'category: "odd"',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['Promise.all', 'parallel execution', 'async', 'await', 'destructuring'],
      },
    },
    {
      id: 'slide-10-7',
      title: 'Fetch API',
      content: `
        <p>The <strong>Fetch API</strong> is the modern standard for making HTTP requests:</p>
        <div class="code-block">// GET request
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');

    // IMPORTANT: fetch only rejects on network errors,
    // not on HTTP error codes (404, 500)
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// POST request
async function createUser(user) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return await response.json();
}</div>
        <p><strong>Key properties of <code>response</code>:</strong></p>
        <ul>
          <li><code>response.ok</code> — <code>true</code> if status is 200–299</li>
          <li><code>response.status</code> — HTTP status code (200, 404, 500, etc.)</li>
          <li><code>response.json()</code> — parse body as JSON (returns a Promise)</li>
          <li><code>response.text()</code> — get body as plain text (returns a Promise)</li>
        </ul>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-10-4',
        title: 'Handle Fetch Errors',
        description: 'Write a safe fetch wrapper that handles both network and HTTP errors.',
        instructions: `
          <p>Write an <code>async</code> function called <code>safeFetch</code> that takes a <code>url</code> string and:</p>
          <ul>
            <li>Calls <code>fetch(url)</code> with <code>await</code></li>
            <li>Checks <code>response.ok</code> — if false, throws an <code>Error</code> with message <code>"HTTP error: " + response.status</code></li>
            <li>Returns the parsed JSON from <code>response.json()</code></li>
            <li>Wraps everything in <code>try/catch</code> and re-throws any error</li>
          </ul>
          <p>A mock fetch function is provided for testing — do not redefine <code>fetch</code>.</p>
        `,
        starterCode: `// Write your function here
async function safeFetch(url) {
  // try: await fetch, check response.ok, return response.json()
  // catch: re-throw the error
}`,
        solution: `async function safeFetch(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status)
    }
    return await response.json()
  } catch (error) {
    throw error
  }
}`,
        hints: [
          'Use try/catch around the fetch call to handle both network and HTTP errors',
          'After awaiting fetch, check: if (!response.ok) throw new Error("HTTP error: " + response.status)',
          'Return await response.json() to parse the response body',
        ],
        testCases: [
          {
            description: 'safeFetch resolves with parsed JSON on success',
            test: `
              globalThis.fetch = () => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ id: 1 }) });
              return safeFetch("https://example.com").then(data => data.id === 1)
            `,
            input: 'successful fetch',
            expected: '{ id: 1 }',
          },
          {
            description: 'safeFetch rejects on HTTP 404',
            test: `
              globalThis.fetch = () => Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) });
              return safeFetch("https://example.com").then(() => false).catch(e => e.message === "HTTP error: 404")
            `,
            input: '404 response',
            expected: 'throws "HTTP error: 404"',
          },
          {
            description: 'safeFetch rejects on HTTP 500',
            test: `
              globalThis.fetch = () => Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) });
              return safeFetch("https://example.com").then(() => false).catch(e => e.message === "HTTP error: 500")
            `,
            input: '500 response',
            expected: 'throws "HTTP error: 500"',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['fetch', 'async/await', 'response.ok', 'HTTP errors', 'try/catch'],
      },
    },
  ],
}
