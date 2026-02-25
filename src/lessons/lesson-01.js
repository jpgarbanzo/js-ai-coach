export default {
  id: '01',
  title: 'Introduction to JavaScript',
  description: 'Learn what JavaScript is, its history, and how to include it in web pages',
  icon: '🎯',
  slides: [
    {
      id: 'slide-01-1',
      title: 'Introduction to JavaScript',
      content: `
        <p>JavaScript is the most widely used programming language in the world, present in virtually every modern website.</p>
        <p><strong>Key characteristics:</strong></p>
        <ul>
          <li><strong>High-Level Language:</strong> Easy for humans to read and write</li>
          <li><strong>Interpreted:</strong> Runs directly without prior compilation</li>
          <li><strong>Dynamically Typed:</strong> Variables don't have a fixed type</li>
          <li><strong>Prototype-Based:</strong> Flexible inheritance system</li>
          <li><strong>First-Class Functions:</strong> Functions are values</li>
          <li><strong>Event-Driven:</strong> Responds to user events</li>
        </ul>
        <p>JavaScript runs in the browser (front-end) and also on the server (Node.js).</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-01-2',
      title: 'Brief History of JavaScript',
      content: `
        <p>JavaScript was created in <strong>1995</strong> by Brendan Eich in just 10 days while working at Netscape Navigator.</p>
        <ul>
          <li><strong>1995:</strong> Created as "Mocha", then "LiveScript"</li>
          <li><strong>1996:</strong> Renamed to "JavaScript" (Java was popular at the time)</li>
          <li><strong>1997:</strong> Standardized as ECMAScript (ES1)</li>
          <li><strong>2009:</strong> ES5 — the most widely compatible version</li>
          <li><strong>2015:</strong> ES6/ES2015 — modern revolution (let, const, arrow functions, classes)</li>
          <li><strong>2016–present:</strong> Annual updates (ES2016, ES2017… ES2024)</li>
        </ul>
        <p>Today, JavaScript is the only programming language that runs natively in all browsers.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-01-3',
      title: 'The DOM',
      content: `
        <p>The <strong>DOM (Document Object Model)</strong> is a tree-shaped representation of an HTML document.</p>
        <div class="code-block">&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;p&gt;Content&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</div>
        <p><strong>The DOM allows JavaScript to:</strong></p>
        <ul>
          <li>Access and read HTML elements</li>
          <li>Modify content and attributes</li>
          <li>Add or remove elements</li>
          <li>Change CSS styles</li>
          <li>Respond to user events (clicks, keypresses, etc.)</li>
        </ul>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-01-4',
      title: 'Ways to Include JavaScript',
      content: `
        <p>There are three ways to include JavaScript in an HTML page:</p>
        <p><strong>1. Inline</strong> — directly in HTML attributes (avoid in production):</p>
        <div class="code-block">&lt;button onclick="alert('Hello!')"&gt;Click Me&lt;/button&gt;</div>
        <p><strong>2. Internal script</strong> — inside a &lt;script&gt; tag in the HTML:</p>
        <div class="code-block">&lt;script&gt;
  document.getElementById('btn').addEventListener('click', () =&gt; {
    alert('Hello!');
  });
&lt;/script&gt;</div>
        <p><strong>3. External script</strong> — a separate .js file (recommended):</p>
        <div class="code-block">&lt;!-- With defer (recommended for DOM scripts) --&gt;
&lt;script src="script.js" defer&gt;&lt;/script&gt;

&lt;!-- With async (order not guaranteed) --&gt;
&lt;script src="script.js" async&gt;&lt;/script&gt;</div>
        <p><strong>Key rule:</strong> Use <code>defer</code> for scripts that interact with the DOM.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-01-1',
        title: 'Identify the Script Type',
        description: 'Write a function that identifies which type of script inclusion is described.',
        instructions: `
          <p>Create a function called <code>getScriptType</code> that takes a string describing a script inclusion method and returns the type name.</p>
          <ul>
            <li>If the description contains <code>"onclick"</code> or <code>"inline"</code>, return <code>"inline"</code></li>
            <li>If the description contains <code>"&lt;script&gt;"</code> or <code>"internal"</code>, return <code>"internal"</code></li>
            <li>If the description contains <code>"src"</code> or <code>"external"</code>, return <code>"external"</code></li>
            <li>Otherwise, return <code>"unknown"</code></li>
          </ul>
          <p>Example: <code>getScriptType("uses onclick attribute")</code> should return <code>"inline"</code></p>
        `,
        starterCode: `// Write your function here
function getScriptType(description) {
  // Your code here
}`,
        solution: `function getScriptType(description) {
  if (description.includes('onclick') || description.includes('inline')) {
    return 'inline'
  }
  if (description.includes('<script>') || description.includes('internal')) {
    return 'internal'
  }
  if (description.includes('src') || description.includes('external')) {
    return 'external'
  }
  return 'unknown'
}`,
        hints: [
          'Use the String method `includes()` to check whether a string contains a certain word',
          'Use if/else if/else to check each condition in order',
          'Return a string literal like "inline", "internal", or "external" for each case',
        ],
        testCases: [
          {
            description: 'getScriptType("uses onclick attribute") returns "inline"',
            test: `return getScriptType("uses onclick attribute") === "inline"`,
            input: '"uses onclick attribute"',
            expected: '"inline"',
          },
          {
            description: 'getScriptType("inline event handler") returns "inline"',
            test: `return getScriptType("inline event handler") === "inline"`,
            input: '"inline event handler"',
            expected: '"inline"',
          },
          {
            description: 'getScriptType("placed inside <script> tag") returns "internal"',
            test: `return getScriptType("placed inside <script> tag") === "internal"`,
            input: '"placed inside <script> tag"',
            expected: '"internal"',
          },
          {
            description: 'getScriptType("loaded via src attribute") returns "external"',
            test: `return getScriptType("loaded via src attribute") === "external"`,
            input: '"loaded via src attribute"',
            expected: '"external"',
          },
          {
            description: 'getScriptType("external file with defer") returns "external"',
            test: `return getScriptType("external file with defer") === "external"`,
            input: '"external file with defer"',
            expected: '"external"',
          },
          {
            description: 'getScriptType("something else") returns "unknown"',
            test: `return getScriptType("something else") === "unknown"`,
            input: '"something else"',
            expected: '"unknown"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['functions', 'string methods', 'conditionals', 'return'],
      },
    },
    {
      id: 'slide-01-5',
      title: 'Exercise: JavaScript Concepts',
      content: `
        <p>Let's practice applying what you've learned about JavaScript basics.</p>
        <p>JavaScript is described as a <strong>dynamically-typed</strong>, <strong>interpreted</strong> language that enables interactive web experiences.</p>
        <p>Key engines that run JavaScript:</p>
        <ul>
          <li><strong>V8:</strong> Chrome, Edge, Node.js</li>
          <li><strong>SpiderMonkey:</strong> Firefox</li>
          <li><strong>JavaScriptCore:</strong> Safari</li>
        </ul>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-01-2',
        title: 'JavaScript Facts Checker',
        description: 'Write a function that checks facts about JavaScript.',
        instructions: `
          <p>Create a function called <code>isJSFact</code> that takes a statement string and returns <code>true</code> if it is a correct fact about JavaScript, or <code>false</code> if it is not.</p>
          <p>The function should return <code>true</code> for these exact strings:</p>
          <ul>
            <li><code>"JavaScript was created in 1995"</code></li>
            <li><code>"V8 is used by Chrome"</code></li>
            <li><code>"JavaScript is interpreted"</code></li>
          </ul>
          <p>And <code>false</code> for anything else.</p>
        `,
        starterCode: `// Write your function here
function isJSFact(statement) {
  // Your code here
}`,
        solution: `function isJSFact(statement) {
  const facts = [
    "JavaScript was created in 1995",
    "V8 is used by Chrome",
    "JavaScript is interpreted",
  ]
  return facts.includes(statement)
}`,
        hints: [
          'Create an array of known true facts as string values',
          'Use the array `.includes()` method to check if the statement is in your facts array',
          'The function should return a boolean (true or false)',
        ],
        testCases: [
          {
            description: 'isJSFact("JavaScript was created in 1995") returns true',
            test: `return isJSFact("JavaScript was created in 1995") === true`,
            input: '"JavaScript was created in 1995"',
            expected: 'true',
          },
          {
            description: 'isJSFact("V8 is used by Chrome") returns true',
            test: `return isJSFact("V8 is used by Chrome") === true`,
            input: '"V8 is used by Chrome"',
            expected: 'true',
          },
          {
            description: 'isJSFact("JavaScript is interpreted") returns true',
            test: `return isJSFact("JavaScript is interpreted") === true`,
            input: '"JavaScript is interpreted"',
            expected: 'true',
          },
          {
            description: 'isJSFact("JavaScript was created in 2010") returns false',
            test: `return isJSFact("JavaScript was created in 2010") === false`,
            input: '"JavaScript was created in 2010"',
            expected: 'false',
          },
          {
            description: 'isJSFact("Python is faster") returns false',
            test: `return isJSFact("Python is faster") === false`,
            input: '"Python is faster"',
            expected: 'false',
          },
        ],
        difficulty: 'beginner',
        concepts: ['arrays', 'array includes', 'functions', 'return', 'booleans'],
      },
    },
  ],

  exercises: [
    {
      id: 'ex-01-1',
      title: 'Greet by Name',
      difficulty: 'beginner',
      description: 'Write a function that returns a greeting string for a given name.',
      inputSpec: 'name: string',
      outputSpec: 'string — "Hello, {name}!"',
      instructions: `
        <p>Write a function called <code>greet</code> that takes a person's name and returns a greeting.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>greet(name)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>greet("Alice") → "Hello, Alice!"</code></div>
        </div>
        <p>The greeting must follow the exact format: <code>"Hello, {name}!"</code> with a comma and exclamation mark.</p>
      `,
      starterCode: `// Write a function called greet\nfunction greet(name) {\n  // your code here\n}`,
      solution: `function greet(name) {\n  return \`Hello, \${name}!\`\n}`,
      hints: [
        'Use a template literal (backticks) to embed the name in the string',
        'The format is: "Hello, " + the name + "!"',
        'Return `Hello, ${name}!` using template literal syntax',
      ],
      testCases: [
        { description: 'greet("Alice") returns "Hello, Alice!"', test: 'return greet("Alice") === "Hello, Alice!"', input: '"Alice"', expected: '"Hello, Alice!"' },
        { description: 'greet("Bob") returns "Hello, Bob!"', test: 'return greet("Bob") === "Hello, Bob!"', input: '"Bob"', expected: '"Hello, Bob!"' },
        { description: 'greet("World") returns "Hello, World!"', test: 'return greet("World") === "Hello, World!"', input: '"World"', expected: '"Hello, World!"' },
        { description: 'greet("") returns "Hello, !"', test: 'return greet("") === "Hello, !"', input: '""', expected: '"Hello, !"' },
      ],
      concepts: ['functions', 'template literals', 'return', 'strings'],
    },
    {
      id: 'ex-01-2',
      title: 'Is Even',
      difficulty: 'beginner',
      description: 'Write a function that returns true if a number is even, false otherwise.',
      inputSpec: 'n: number',
      outputSpec: 'boolean — true if n is even',
      instructions: `
        <p>Write a function called <code>isEven</code> that takes a number and returns <code>true</code> if it is even, <code>false</code> if it is odd.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>isEven(n)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>isEven(4) → true</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>isEven(7) → false</code></div>
        </div>
        <p>Use the modulo operator <code>%</code> to check the remainder when dividing by 2.</p>
      `,
      starterCode: `// Write a function called isEven\nfunction isEven(n) {\n  // your code here\n}`,
      solution: `function isEven(n) {\n  return n % 2 === 0\n}`,
      hints: [
        'A number is even if it has no remainder when divided by 2',
        'Use the modulo operator: n % 2',
        'Return the boolean expression n % 2 === 0 directly',
      ],
      testCases: [
        { description: 'isEven(4) returns true', test: 'return isEven(4) === true', input: '4', expected: 'true' },
        { description: 'isEven(7) returns false', test: 'return isEven(7) === false', input: '7', expected: 'false' },
        { description: 'isEven(0) returns true', test: 'return isEven(0) === true', input: '0', expected: 'true' },
        { description: 'isEven(-2) returns true', test: 'return isEven(-2) === true', input: '-2', expected: 'true' },
        { description: 'isEven(-3) returns false', test: 'return isEven(-3) === false', input: '-3', expected: 'false' },
      ],
      concepts: ['functions', 'modulo', 'boolean expressions', 'return'],
    },
    {
      id: 'ex-01-3',
      title: 'Square a Number',
      difficulty: 'beginner',
      description: 'Write a function that returns the square of a number.',
      inputSpec: 'n: number',
      outputSpec: 'number — n squared (n × n)',
      instructions: `
        <p>Write a function called <code>square</code> that takes a number and returns its square (the number multiplied by itself).</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>square(n)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>square(5) → 25</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>square(-3) → 9</code></div>
        </div>
        <p>You can use either <code>n * n</code> or the exponentiation operator <code>n ** 2</code>.</p>
      `,
      starterCode: `// Write a function called square\nfunction square(n) {\n  // your code here\n}`,
      solution: `function square(n) {\n  return n * n\n}`,
      hints: [
        'Multiply the number by itself: n * n',
        'Alternatively, use the exponentiation operator: n ** 2',
        'Return the result directly',
      ],
      testCases: [
        { description: 'square(5) returns 25', test: 'return square(5) === 25', input: '5', expected: '25' },
        { description: 'square(3) returns 9', test: 'return square(3) === 9', input: '3', expected: '9' },
        { description: 'square(0) returns 0', test: 'return square(0) === 0', input: '0', expected: '0' },
        { description: 'square(-3) returns 9', test: 'return square(-3) === 9', input: '-3', expected: '9' },
        { description: 'square(1) returns 1', test: 'return square(1) === 1', input: '1', expected: '1' },
      ],
      concepts: ['functions', 'arithmetic operators', 'return', 'exponentiation'],
    },
    {
      id: 'ex-01-4',
      title: 'Describe the Type',
      difficulty: 'medium',
      description: 'Write a function that returns a string describing the type of a value using typeof.',
      inputSpec: 'value: any',
      outputSpec: 'string — "number", "string", "boolean", or "other"',
      instructions: `
        <p>Write a function called <code>describeType</code> that takes any value and returns a string describing its type.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>describeType(value)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>describeType(42) → "number"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>describeType("hi") → "string"</code></div>
        </div>
        <p>Return <code>"number"</code>, <code>"string"</code>, or <code>"boolean"</code> for those primitive types. Return <code>"other"</code> for everything else (objects, arrays, null, undefined, functions).</p>
      `,
      starterCode: `// Write a function called describeType\nfunction describeType(value) {\n  // your code here\n}`,
      solution: `function describeType(value) {\n  const t = typeof value\n  if (t === 'number') return 'number'\n  if (t === 'string') return 'string'\n  if (t === 'boolean') return 'boolean'\n  return 'other'\n}`,
      hints: [
        'Use the typeof operator to get the type as a string',
        'typeof returns "number", "string", "boolean", "undefined", "object", or "function"',
        'Use if statements to check for each of the three types, and return "other" as the default',
      ],
      testCases: [
        { description: 'describeType(42) returns "number"', test: 'return describeType(42) === "number"', input: '42', expected: '"number"' },
        { description: 'describeType("hello") returns "string"', test: 'return describeType("hello") === "string"', input: '"hello"', expected: '"string"' },
        { description: 'describeType(true) returns "boolean"', test: 'return describeType(true) === "boolean"', input: 'true', expected: '"boolean"' },
        { description: 'describeType(null) returns "other"', test: 'return describeType(null) === "other"', input: 'null', expected: '"other"' },
        { description: 'describeType([]) returns "other"', test: 'return describeType([]) === "other"', input: '[]', expected: '"other"' },
        { description: 'describeType(undefined) returns "other"', test: 'return describeType(undefined) === "other"', input: 'undefined', expected: '"other"' },
      ],
      concepts: ['typeof', 'conditionals', 'functions', 'return'],
    },
    {
      id: 'ex-01-5',
      title: 'Reverse Greet',
      difficulty: 'medium',
      description: 'Write a function that returns the greeting "Hello, {name}!" reversed character by character.',
      inputSpec: 'name: string',
      outputSpec: 'string — the greeting reversed',
      instructions: `
        <p>Write a function called <code>reverseGreet</code> that takes a name, builds the greeting <code>"Hello, {name}!"</code>, and returns it reversed character by character.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>reverseGreet(name)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>reverseGreet("Al") → "!lA ,olleH"</code></div>
        </div>
        <p>Hint: You can split the string into characters, reverse the array, then join them back.</p>
      `,
      starterCode: `// Write a function called reverseGreet\nfunction reverseGreet(name) {\n  // your code here\n}`,
      solution: `function reverseGreet(name) {\n  const greeting = \`Hello, \${name}!\`\n  return greeting.split('').reverse().join('')\n}`,
      hints: [
        'First build the greeting string using a template literal: `Hello, ${name}!`',
        'Use .split("") to turn the string into an array of individual characters',
        'Chain .reverse() then .join("") to get the reversed string',
      ],
      testCases: [
        { description: 'reverseGreet("Al") returns "!lA ,olleH"', test: 'return reverseGreet("Al") === "!lA ,olleH"', input: '"Al"', expected: '"!lA ,olleH"' },
        { description: 'reverseGreet("Bob") returns "!boB ,olleH"', test: 'return reverseGreet("Bob") === "!boB ,olleH"', input: '"Bob"', expected: '"!boB ,olleH"' },
        { description: 'reverseGreet("") returns "! ,olleH"', test: 'return reverseGreet("") === "! ,olleH"', input: '""', expected: '"! ,olleH"' },
      ],
      concepts: ['strings', 'array methods', 'split', 'reverse', 'join', 'template literals'],
    },
    {
      id: 'ex-01-6',
      title: 'JavaScript Info Object',
      difficulty: 'hard',
      description: 'Write a function that returns an object with key facts about JavaScript.',
      inputSpec: 'none',
      outputSpec: 'object — { name, year, creator, isTyped }',
      instructions: `
        <p>Write a function called <code>jsInfo</code> that takes no arguments and returns an object with these exact properties:</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>jsInfo()</code></div>
          <div class="io-spec-row"><span class="io-label">Returns:</span> <code>{ name: "JavaScript", year: 1995, creator: "Brendan Eich", isTyped: false }</code></div>
        </div>
        <p>Property types matter: <code>name</code> and <code>creator</code> are strings, <code>year</code> is a number, and <code>isTyped</code> is a boolean (<code>false</code> because JavaScript is dynamically typed, not statically typed).</p>
      `,
      starterCode: `// Write a function called jsInfo\nfunction jsInfo() {\n  // your code here\n}`,
      solution: `function jsInfo() {\n  return {\n    name: 'JavaScript',\n    year: 1995,\n    creator: 'Brendan Eich',\n    isTyped: false,\n  }\n}`,
      hints: [
        'Return an object literal using curly braces { }',
        'Each property is written as key: value — make sure to use the correct data types (number for year, boolean for isTyped)',
        'JavaScript is dynamically typed, so isTyped should be false',
      ],
      testCases: [
        { description: 'jsInfo() returns object with name "JavaScript"', test: 'return jsInfo().name === "JavaScript"', input: '(none)', expected: '"JavaScript"' },
        { description: 'jsInfo() returns object with year 1995', test: 'return jsInfo().year === 1995', input: '(none)', expected: '1995' },
        { description: 'jsInfo() returns object with creator "Brendan Eich"', test: 'return jsInfo().creator === "Brendan Eich"', input: '(none)', expected: '"Brendan Eich"' },
        { description: 'jsInfo() returns object with isTyped false', test: 'return jsInfo().isTyped === false', input: '(none)', expected: 'false' },
        { description: 'jsInfo() year is a number not a string', test: 'return typeof jsInfo().year === "number"', input: '(none)', expected: 'typeof year === "number"' },
      ],
      concepts: ['objects', 'object literals', 'data types', 'return'],
    },
  ],

  questions: [
    {
      id: 'q-01-1',
      question: 'In what year was JavaScript created?',
      multiSelect: false,
      options: [
        { id: 'a', text: '1990', correct: false },
        { id: 'b', text: '1995', correct: true },
        { id: 'c', text: '2000', correct: false },
        { id: 'd', text: '2005', correct: false },
      ],
      explanation: 'JavaScript was created in 1995 by Brendan Eich while working at Netscape. It was initially named Mocha, then LiveScript, before being renamed JavaScript.',
    },
    {
      id: 'q-01-2',
      question: 'Who created JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Tim Berners-Lee', correct: false },
        { id: 'b', text: 'James Gosling', correct: false },
        { id: 'c', text: 'Brendan Eich', correct: true },
        { id: 'd', text: 'Guido van Rossum', correct: false },
      ],
      explanation: 'Brendan Eich created JavaScript in 1995 while at Netscape. Tim Berners-Lee invented the web, James Gosling created Java, and Guido van Rossum created Python.',
    },
    {
      id: 'q-01-3',
      question: 'Which of the following best describes JavaScript as a language?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Compiled and statically typed', correct: false },
        { id: 'b', text: 'Interpreted and dynamically typed', correct: true },
        { id: 'c', text: 'Compiled and dynamically typed', correct: false },
        { id: 'd', text: 'Interpreted and statically typed', correct: false },
      ],
      explanation: 'JavaScript is interpreted (it runs directly without a separate compilation step) and dynamically typed (variable types are determined at runtime, not at compile time).',
    },
    {
      id: 'q-01-4',
      question: 'What does DOM stand for?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Document Object Model', correct: true },
        { id: 'b', text: 'Data Object Mapping', correct: false },
        { id: 'c', text: 'Dynamic Object Method', correct: false },
        { id: 'd', text: 'Document Oriented Markup', correct: false },
      ],
      explanation: 'DOM stands for Document Object Model. It is a tree-shaped representation of an HTML page that JavaScript can read and manipulate.',
    },
    {
      id: 'q-01-5',
      question: 'Which `<script>` attribute should you use to load an external JavaScript file that needs access to DOM elements?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'async', correct: false },
        { id: 'b', text: 'defer', correct: true },
        { id: 'c', text: 'type="module"', correct: false },
        { id: 'd', text: 'sync', correct: false },
      ],
      explanation: 'The `defer` attribute tells the browser to download the script in parallel but execute it only after the HTML document is fully parsed, ensuring DOM elements are available. `async` does not guarantee execution order.',
    },
    {
      id: 'q-01-6',
      question: 'What is ECMAScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'A JavaScript engine built into Chrome', correct: false },
        { id: 'b', text: 'The official standard specification that JavaScript implements', correct: true },
        { id: 'c', text: 'A server-side runtime for JavaScript', correct: false },
        { id: 'd', text: 'A CSS preprocessor', correct: false },
      ],
      explanation: 'ECMAScript is the standard specification for JavaScript, maintained by ECMA International. JavaScript is the most well-known implementation of ECMAScript. ES6 (2015) was a major update adding let, const, arrow functions, and classes.',
    },
    {
      id: 'q-01-7',
      question: 'What does the `typeof` operator return?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'A number representing the type code', correct: false },
        { id: 'b', text: 'A string describing the type of the operand', correct: true },
        { id: 'c', text: 'A boolean indicating whether the value is defined', correct: false },
        { id: 'd', text: 'The constructor function of the value', correct: false },
      ],
      explanation: 'The `typeof` operator returns a string such as "number", "string", "boolean", "undefined", "object", or "function". For example, `typeof 42` returns the string "number".',
    },
    {
      id: 'q-01-8',
      question: 'Which JavaScript engine is used by Google Chrome?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'SpiderMonkey', correct: false },
        { id: 'b', text: 'JavaScriptCore', correct: false },
        { id: 'c', text: 'Chakra', correct: false },
        { id: 'd', text: 'V8', correct: true },
      ],
      explanation: 'V8 is the JavaScript engine developed by Google and used in Chrome, Edge, and Node.js. SpiderMonkey is used by Firefox, JavaScriptCore (Nitro) is used by Safari.',
    },
    {
      id: 'q-01-9',
      question: 'Which of the following are valid ways to include JavaScript in an HTML page? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'Inline in an HTML event attribute like onclick', correct: true },
        { id: 'b', text: 'Inside a <script> tag in the HTML', correct: true },
        { id: 'c', text: 'In an external .js file referenced via <script src="...">',  correct: true },
        { id: 'd', text: 'Inside a <style> tag', correct: false },
      ],
      explanation: 'JavaScript can be included inline (via event attributes), internally (inside a <script> tag), or externally (via a separate .js file). The <style> tag is for CSS, not JavaScript.',
    },
  ],
}
