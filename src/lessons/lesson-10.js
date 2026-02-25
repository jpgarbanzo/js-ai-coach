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

  exercises: [
    {
      id: 'ex-10-1',
      title: 'Create a Delay Promise',
      difficulty: 'beginner',
      description: 'Return a Promise that resolves after a given number of milliseconds.',
      inputSpec: 'ms: number — milliseconds to wait',
      outputSpec: 'Promise<undefined> — resolves after ms milliseconds',
      instructions: `
        <p>Implement a <code>delay</code> function that returns a Promise resolving after <code>ms</code> milliseconds, simulating an async pause.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>delay(ms)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>await delay(500) // waits 500ms then continues</code></div>
        </div>
        <p>Use <code>setTimeout</code> inside a <code>new Promise</code>. The Promise should resolve with no value (undefined) after the specified time.</p>
      `,
      starterCode: `// Write a function called delay\nfunction delay(ms) {\n  // your code here\n}`,
      solution: `function delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms))\n}`,
      hints: [
        'Return new Promise(resolve => ...)',
        'Inside the Promise, call setTimeout(resolve, ms) to resolve after ms milliseconds',
        'You do not need to pass a value to resolve — just resolve() or pass it directly',
      ],
      testCases: [
        { description: 'delay returns a Promise', test: 'return delay(10) instanceof Promise', input: '10', expected: 'Promise' },
        { description: 'delay resolves with undefined', test: 'return delay(10).then(v => v === undefined)', input: '10', expected: 'undefined' },
        { description: 'delay resolves after the given time', test: 'return new Promise(resolve => { const start = Date.now(); delay(50).then(() => resolve(Date.now() - start >= 40)) })', input: '50', expected: 'resolves after ~50ms' },
        { description: 'delay(0) resolves immediately', test: 'return delay(0).then(v => v === undefined)', input: '0', expected: 'undefined' },
      ],
      concepts: ['Promise', 'setTimeout', 'async', 'resolve'],
    },
    {
      id: 'ex-10-2',
      title: 'Fetch with Fallback',
      difficulty: 'beginner',
      description: 'Try to fetch and parse JSON from a URL; return a fallback value if anything fails.',
      inputSpec: 'url: string, fallback: any',
      outputSpec: 'Promise<any> — parsed JSON on success, or fallback value on any error',
      instructions: `
        <p>Implement an async function that attempts a fetch request and returns the parsed JSON, or the fallback value if the fetch or parsing fails for any reason.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>fetchWithFallback(url, fallback)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>await fetchWithFallback("/api/data", []) // returns [] if fetch fails</code></div>
        </div>
        <p>Use try/catch. In the catch block, return the fallback value instead of re-throwing. A mock fetch is used in tests.</p>
      `,
      starterCode: `// Write an async function called fetchWithFallback\nasync function fetchWithFallback(url, fallback) {\n  // your code here\n}`,
      solution: `async function fetchWithFallback(url, fallback) {\n  try {\n    const response = await fetch(url)\n    return await response.json()\n  } catch (err) {\n    return fallback\n  }\n}`,
      hints: [
        'Use try/catch to wrap the fetch call',
        'In the try block: await fetch(url), then await response.json()',
        'In the catch block: return fallback (not throw)',
      ],
      testCases: [
        { description: 'returns parsed JSON on success', test: 'globalThis.fetch = () => Promise.resolve({ json: () => Promise.resolve({ok:true}) }); return fetchWithFallback("/url", null).then(v => v.ok === true)', input: 'successful fetch', expected: '{ok:true}' },
        { description: 'returns fallback when fetch rejects', test: 'globalThis.fetch = () => Promise.reject(new Error("Network error")); return fetchWithFallback("/url", 42).then(v => v === 42)', input: 'fetch rejects', expected: '42' },
        { description: 'returns fallback when json() rejects', test: 'globalThis.fetch = () => Promise.resolve({ json: () => Promise.reject(new Error("bad json")) }); return fetchWithFallback("/url", "default").then(v => v === "default")', input: 'bad JSON', expected: '"default"' },
        { description: 'fallback can be any value including arrays', test: 'globalThis.fetch = () => Promise.reject("err"); return fetchWithFallback("/url", []).then(v => Array.isArray(v))', input: 'fallback []', expected: 'array' },
      ],
      concepts: ['async/await', 'try/catch', 'fetch', 'error handling', 'fallback pattern'],
    },
    {
      id: 'ex-10-3',
      title: 'Implement Promise.all from Scratch',
      difficulty: 'beginner',
      description: 'Build a Promise.all equivalent without using the built-in Promise.all.',
      inputSpec: 'promises: Promise<any>[]',
      outputSpec: 'Promise<any[]> — resolves with array of all results in order, or rejects if any promise rejects',
      instructions: `
        <p>Implement <code>promiseAll</code> that behaves like the native <code>Promise.all</code> — it waits for all input promises and resolves with an array of results in the original order.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>promiseAll(promises)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>promiseAll([Promise.resolve(1), Promise.resolve(2)]) → [1, 2]</code></div>
        </div>
        <p>If any promise rejects, reject immediately with that error. Preserve the original order of results regardless of resolution order. Do not use <code>Promise.all</code> internally.</p>
      `,
      starterCode: `// Write a function called promiseAll (do NOT use Promise.all inside)\nfunction promiseAll(promises) {\n  // your code here\n}`,
      solution: `function promiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    if (promises.length === 0) return resolve([])\n    const results = new Array(promises.length)\n    let remaining = promises.length\n    promises.forEach((p, i) => {\n      Promise.resolve(p).then(val => {\n        results[i] = val\n        remaining--\n        if (remaining === 0) resolve(results)\n      }).catch(reject)\n    })\n  })\n}`,
      hints: [
        'Return a new Promise and maintain an array of results and a counter of remaining promises',
        'For each promise, attach .then to store the result at the correct index and decrement the counter',
        'When the counter reaches 0, resolve with the results array; on any rejection, call reject immediately',
      ],
      testCases: [
        { description: 'resolves with all values in order', test: 'return promiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).then(r => r[0]===1 && r[1]===2 && r[2]===3)', input: '[resolve(1), resolve(2), resolve(3)]', expected: '[1, 2, 3]' },
        { description: 'rejects when any promise rejects', test: 'return promiseAll([Promise.resolve(1), Promise.reject("oops")]).then(() => false).catch(e => e === "oops")', input: '[resolve(1), reject("oops")]', expected: 'rejects with "oops"' },
        { description: 'resolves with empty array for empty input', test: 'return promiseAll([]).then(r => Array.isArray(r) && r.length === 0)', input: '[]', expected: '[]' },
        { description: 'returns a Promise', test: 'return promiseAll([Promise.resolve(1)]) instanceof Promise', input: '[resolve(1)]', expected: 'Promise' },
      ],
      concepts: ['Promise', 'new Promise', 'resolve', 'reject', 'forEach', 'counters'],
    },
    {
      id: 'ex-10-4',
      title: 'Async Retry with Backoff',
      difficulty: 'medium',
      description: 'Retry a failing async function up to N times, returning the first success or throwing the last error.',
      inputSpec: 'fn: () => Promise<any>, retries: number',
      outputSpec: 'Promise<any> — resolves with fn() result, or rejects after all retries are exhausted',
      instructions: `
        <p>Implement an async function that calls <code>fn</code> up to <code>retries</code> times. On each failure it tries again until either it succeeds or runs out of attempts.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>asyncRetry(fn, retries)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>await asyncRetry(unstable, 3) // tries up to 3 times</code></div>
        </div>
        <p>Use a loop with try/catch. Return the result as soon as one attempt succeeds. After the last failed attempt, throw the error from that attempt.</p>
      `,
      starterCode: `// Write an async function called asyncRetry\nasync function asyncRetry(fn, retries) {\n  // your code here\n}`,
      solution: `async function asyncRetry(fn, retries) {\n  let lastError\n  for (let i = 0; i < retries; i++) {\n    try {\n      return await fn()\n    } catch (err) {\n      lastError = err\n    }\n  }\n  throw lastError\n}`,
      hints: [
        'Use a for loop running retries times',
        'Inside each iteration, try await fn() — if it succeeds, return the result immediately',
        'If it throws, store the error and continue the loop; after the loop ends, throw the last stored error',
      ],
      testCases: [
        { description: 'resolves on first attempt when fn succeeds', test: 'return asyncRetry(() => Promise.resolve("ok"), 3).then(v => v === "ok")', input: 'fn succeeds immediately', expected: '"ok"' },
        { description: 'resolves on second attempt after first fails', test: 'let n = 0; const fn = () => ++n === 1 ? Promise.reject("fail") : Promise.resolve("done"); return asyncRetry(fn, 3).then(v => v === "done")', input: 'fn fails once then succeeds', expected: '"done"' },
        { description: 'rejects after all retries exhausted', test: 'const fn = () => Promise.reject(new Error("always fails")); return asyncRetry(fn, 2).then(() => false).catch(e => e.message === "always fails")', input: 'fn always fails, retries=2', expected: 'throws "always fails"' },
        { description: 'fn is called exactly retries times on total failure', test: 'let count = 0; const fn = () => { count++; return Promise.reject("e") }; return asyncRetry(fn, 4).catch(() => count === 4)', input: 'fn fails, retries=4', expected: 'fn called 4 times' },
      ],
      concepts: ['async/await', 'try/catch', 'loops', 'error handling', 'retry pattern'],
    },
    {
      id: 'ex-10-5',
      title: 'Race with Timeout',
      difficulty: 'medium',
      description: 'Return a promise that settles with the given promise\'s value, or rejects with "Timeout" if too slow.',
      inputSpec: 'promise: Promise<any>, ms: number',
      outputSpec: 'Promise<any> — resolves with the promise value, or rejects with "Timeout" after ms milliseconds',
      instructions: `
        <p>Implement a function that races a given promise against a timeout. If the promise resolves before the timeout, return its value. If the timeout fires first, reject with the string <code>"Timeout"</code>.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>raceWithTimeout(promise, ms)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>raceWithTimeout(slowFetch(), 1000) // rejects with "Timeout" if slowFetch takes > 1s</code></div>
        </div>
        <p>Create a timeout promise using <code>setTimeout</code> + <code>new Promise</code> that rejects after <code>ms</code> milliseconds. Use <code>Promise.race()</code> to race them.</p>
      `,
      starterCode: `// Write a function called raceWithTimeout\nfunction raceWithTimeout(promise, ms) {\n  // your code here\n}`,
      solution: `function raceWithTimeout(promise, ms) {\n  const timeout = new Promise((_, reject) => setTimeout(() => reject('Timeout'), ms))\n  return Promise.race([promise, timeout])\n}`,
      hints: [
        'Create a timeout Promise: new Promise((_, reject) => setTimeout(() => reject("Timeout"), ms))',
        'Use Promise.race([promise, timeout]) to return whichever settles first',
        'Promise.race resolves or rejects with the first settled promise\'s value/reason',
      ],
      testCases: [
        { description: 'resolves with promise value when fast enough', test: 'return raceWithTimeout(Promise.resolve(42), 100).then(v => v === 42)', input: 'fast promise, 100ms timeout', expected: '42' },
        { description: 'rejects with "Timeout" when promise is too slow', test: 'const slow = new Promise(r => setTimeout(r, 200)); return raceWithTimeout(slow, 50).then(() => false).catch(e => e === "Timeout")', input: 'slow promise (200ms), 50ms timeout', expected: '"Timeout"' },
        { description: 'returns a Promise', test: 'return raceWithTimeout(Promise.resolve(1), 100) instanceof Promise', input: 'any promise', expected: 'Promise' },
        { description: 'passes through rejection from original promise', test: 'return raceWithTimeout(Promise.reject("err"), 100).catch(e => e === "err")', input: 'rejecting promise', expected: '"err"' },
      ],
      concepts: ['Promise.race', 'setTimeout', 'new Promise', 'timeout pattern', 'async'],
    },
    {
      id: 'ex-10-6',
      title: 'Async Queue',
      difficulty: 'hard',
      description: 'Implement a simple async queue class that processes tasks one at a time in the order they were added.',
      inputSpec: 'AsyncQueue class with add(asyncFn) method',
      outputSpec: 'class — tasks are run sequentially; add() returns a Promise resolving with the task result',
      instructions: `
        <p>Implement a class <code>AsyncQueue</code> that queues async tasks and executes them one at a time in order.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Class:</span> <code>AsyncQueue</code></div>
          <div class="io-spec-row"><span class="io-label">Method:</span> <code>add(asyncFn) → Promise</code></div>
        </div>
        <p>Each call to <code>add(asyncFn)</code> enqueues an async function and returns a Promise that resolves when that task completes. Tasks must run one at a time — a new task only starts after the previous one finishes. The queue starts empty and idle.</p>
      `,
      starterCode: `// Write a class called AsyncQueue\nclass AsyncQueue {\n  constructor() {\n    // your code here\n  }\n\n  add(asyncFn) {\n    // your code here\n  }\n}`,
      solution: `class AsyncQueue {\n  constructor() {\n    this._queue = []\n    this._running = false\n  }\n\n  add(asyncFn) {\n    return new Promise((resolve, reject) => {\n      this._queue.push({ asyncFn, resolve, reject })\n      this._run()\n    })\n  }\n\n  async _run() {\n    if (this._running) return\n    this._running = true\n    while (this._queue.length > 0) {\n      const { asyncFn, resolve, reject } = this._queue.shift()\n      try {\n        resolve(await asyncFn())\n      } catch (err) {\n        reject(err)\n      }\n    }\n    this._running = false\n  }\n}`,
      hints: [
        'Keep an internal array (queue) and a boolean flag indicating if the runner is active',
        'add() pushes { asyncFn, resolve, reject } onto the queue and starts the runner if it is not already running',
        'The runner loops while the queue is non-empty: shift the next item, await asyncFn(), call resolve/reject, then continue',
      ],
      testCases: [
        { description: 'add() returns a Promise', test: 'const q = new AsyncQueue(); return q.add(() => Promise.resolve(1)) instanceof Promise', input: 'add one task', expected: 'Promise' },
        { description: 'resolves with the task return value', test: 'const q = new AsyncQueue(); return q.add(() => Promise.resolve(42)).then(v => v === 42)', input: 'task resolves 42', expected: '42' },
        { description: 'tasks run in order', test: 'const q = new AsyncQueue(); const log = []; const t = v => () => new Promise(r => setTimeout(() => { log.push(v); r(v) }, 10)); return Promise.all([q.add(t(1)), q.add(t(2)), q.add(t(3))]).then(() => log[0]===1 && log[1]===2 && log[2]===3)', input: '3 tasks', expected: 'log: [1,2,3]' },
        { description: 'rejects when task throws', test: 'const q = new AsyncQueue(); return q.add(() => Promise.reject("oops")).catch(e => e === "oops")', input: 'failing task', expected: '"oops"' },
      ],
      concepts: ['classes', 'async/await', 'Promises', 'queues', 'concurrency control'],
    },
  ],

  questions: [
    {
      id: 'q-10-1',
      question: 'JavaScript is described as single-threaded. What does this mean in practice?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Only one variable can be declared at a time', correct: false },
        { id: 'b', text: 'Only one piece of JavaScript code can execute at a time — there is no true parallelism in user code', correct: true },
        { id: 'c', text: 'JavaScript can only run in one browser tab at a time', correct: false },
        { id: 'd', text: 'Functions can only call one other function in their body', correct: false },
      ],
      explanation: 'JavaScript has a single call stack, meaning only one function can execute at a time. Long-running synchronous operations block all other code. Async operations (fetch, setTimeout, etc.) are offloaded to Web APIs, allowing the call stack to stay unblocked while waiting.',
    },
    {
      id: 'q-10-2',
      question: 'What is the role of the Event Loop in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'It runs multiple threads in parallel to handle async work', correct: false },
        { id: 'b', text: 'It continuously checks if the call stack is empty and, if so, moves the next callback from the task queue to the stack', correct: true },
        { id: 'c', text: 'It converts callback-based code to Promises automatically', correct: false },
        { id: 'd', text: 'It manages memory allocation for async functions', correct: false },
      ],
      explanation: 'The Event Loop is a loop that runs continuously: if the call stack is empty and there is a callback in the task queue (from setTimeout, DOM events, fetch, etc.), it moves that callback onto the stack to be executed. This is how async code eventually runs.',
    },
    {
      id: 'q-10-3',
      question: 'What is the order of execution for this code?\nconsole.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");',
      multiSelect: false,
      options: [
        { id: 'a', text: 'A, B, C, D', correct: false },
        { id: 'b', text: 'A, D, B, C', correct: false },
        { id: 'c', text: 'A, D, C, B', correct: true },
        { id: 'd', text: 'A, C, D, B', correct: false },
      ],
      explanation: 'Synchronous code runs first: A, then D. Microtasks (Promise .then callbacks) run before macrotasks (setTimeout). So C runs before B. The final order is A, D, C, B. This is because Promise callbacks go into the microtask queue, which is drained before the macrotask queue is checked.',
    },
    {
      id: 'q-10-4',
      question: 'What are the three states a Promise can be in?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Loading, Loaded, Error', correct: false },
        { id: 'b', text: 'Pending, Fulfilled, Rejected', correct: true },
        { id: 'c', text: 'Waiting, Running, Done', correct: false },
        { id: 'd', text: 'Open, Resolved, Closed', correct: false },
      ],
      explanation: 'A Promise starts in the Pending state. If the async operation succeeds, it transitions to Fulfilled (resolve was called). If it fails, it transitions to Rejected (reject was called). Once settled (fulfilled or rejected), a Promise cannot change state.',
    },
    {
      id: 'q-10-5',
      question: 'What is the key advantage of async/await over raw .then() chaining?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'async/await is faster at runtime than .then()', correct: false },
        { id: 'b', text: 'async/await makes asynchronous code read like synchronous code, improving readability and making error handling with try/catch more natural', correct: true },
        { id: 'c', text: 'async/await can run multiple promises at the same time; .then() cannot', correct: false },
        { id: 'd', text: 'async/await functions do not return Promises', correct: false },
      ],
      explanation: 'async/await is syntactic sugar built on Promises. It does not add new capabilities — it makes async code easier to read and write by eliminating nested .then() chains and allowing try/catch for error handling instead of .catch(). An async function always returns a Promise.',
    },
    {
      id: 'q-10-6',
      question: 'What is the difference between Promise.all and Promise.race?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Promise.all runs promises sequentially; Promise.race runs them in parallel', correct: false },
        { id: 'b', text: 'Promise.all waits for all to resolve (or rejects on first failure); Promise.race settles as soon as any one promise settles', correct: true },
        { id: 'c', text: 'Promise.all can only handle two promises; Promise.race handles any number', correct: false },
        { id: 'd', text: 'They are identical — both wait for all promises', correct: false },
      ],
      explanation: 'Promise.all takes an array and resolves with an array of all results once every promise fulfills, but rejects immediately if any one rejects. Promise.race settles (resolves or rejects) with the value or reason of whichever promise settles first, ignoring the rest.',
    },
    {
      id: 'q-10-7',
      question: 'Which statements about error handling in async code are correct? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'try/catch works inside async functions to catch rejected awaited promises', correct: true },
        { id: 'b', text: '.catch() on a promise chain handles rejections from the preceding .then() calls', correct: true },
        { id: 'c', text: 'fetch() rejects the Promise when it receives a 404 HTTP status', correct: false },
        { id: 'd', text: 'An uncaught rejected Promise triggers an "unhandledRejection" event', correct: true },
      ],
      explanation: 'try/catch inside async functions catches both synchronous errors and awaited Promise rejections. .catch() on a chain handles any prior rejection. However, fetch() only rejects on network failures — HTTP error codes like 404 result in a fulfilled Promise where response.ok is false. Unhandled rejections trigger the unhandledRejection event.',
    },
    {
      id: 'q-10-8',
      question: 'What is the difference between macrotasks and microtasks in the JavaScript event loop?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Macrotasks are larger and take longer to execute; microtasks are smaller and faster', correct: false },
        { id: 'b', text: 'Microtasks (Promise callbacks, queueMicrotask) run after the current task but before the next macrotask (setTimeout, setInterval, I/O)', correct: true },
        { id: 'c', text: 'They are the same thing — microtask is just a newer name for macrotask', correct: false },
        { id: 'd', text: 'Macrotasks are synchronous; microtasks are asynchronous', correct: false },
      ],
      explanation: 'After each macrotask (a setTimeout callback, an I/O callback, etc.), the engine drains the entire microtask queue (Promise .then handlers, queueMicrotask callbacks, MutationObserver) before picking up the next macrotask. This is why Promise .then always runs before the next setTimeout even if both are already ready.',
    },
  ],
}
