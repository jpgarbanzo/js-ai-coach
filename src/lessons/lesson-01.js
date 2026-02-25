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
}
