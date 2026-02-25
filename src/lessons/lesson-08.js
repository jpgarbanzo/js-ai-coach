export default {
  id: '08',
  title: 'DOM Manipulation',
  description: 'Select, modify, create, and respond to events on HTML elements with JavaScript',
  icon: '🌐',
  slides: [
    {
      id: 'slide-08-1',
      title: 'Selecting DOM Elements',
      content: `
        <p>Use these methods to find elements in the page:</p>
        <div class="code-block">// getElementById — fastest, only for IDs
const title = document.getElementById('title');

// querySelector — any CSS selector, returns first match
const firstParagraph = document.querySelector('p');
const byClass = document.querySelector('.card');
const byId = document.querySelector('#menu');
const nested = document.querySelector('nav .link');

// querySelectorAll — all matching elements (NodeList)
const buttons = document.querySelectorAll('button');
const items = document.querySelectorAll('.list > li');

// Iterate over the NodeList
buttons.forEach(btn => {
  console.log(btn.textContent);
});</div>
        <p>Prefer <code>querySelector</code> for flexibility; use <code>getElementById</code> when performance matters and you only need an ID lookup.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-08-2',
      title: 'Modifying Content, Attributes, and Classes',
      content: `
        <p><strong>Change element content:</strong></p>
        <div class="code-block">const el = document.getElementById('demo');

// innerHTML — parses and renders HTML (XSS risk with user data)
el.innerHTML = '&lt;strong&gt;Bold text&lt;/strong&gt;';

// textContent — plain text only, safer
el.textContent = 'Just text, no HTML tags rendered';</div>
        <p><strong>Attributes:</strong></p>
        <div class="code-block">const link = document.querySelector('a');
link.setAttribute('href', 'https://example.com');
link.getAttribute('href');       // read value
link.removeAttribute('target');  // remove it</div>
        <p><strong>CSS classes:</strong></p>
        <div class="code-block">const el = document.getElementById('box');

el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('highlighted'); // adds if absent, removes if present
el.classList.contains('active');    // returns true/false
el.classList.replace('old', 'new');</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-08-1',
        title: 'Toggle a Highlight Class',
        description: 'Write a function that toggles a CSS class on an element.',
        instructions: `
          <p>A <code>&lt;div id="box"&gt;Click me&lt;/div&gt;</code> is provided in the sandbox.</p>
          <p>Write a function called <code>toggleHighlight</code> that:</p>
          <ul>
            <li>Selects the element with id <code>"box"</code></li>
            <li>Toggles the class <code>"highlighted"</code> on it using <code>classList.toggle()</code></li>
          </ul>
          <p>After calling it once, the box should have the class. After calling it again, the class should be gone.</p>
        `,
        sandboxHTML: `<div id="box" style="padding:20px;background:#eee;display:inline-block;border-radius:6px;">Click me</div>
<style>.highlighted { background: #fbbf24 !important; font-weight: bold; }</style>`,
        starterCode: `// Write your function here
function toggleHighlight() {
  // Select #box and toggle the "highlighted" class
}

// Call it to test
toggleHighlight();`,
        solution: `function toggleHighlight() {
  const box = document.getElementById('box')
  box.classList.toggle('highlighted')
}

toggleHighlight();`,
        hints: [
          'Use document.getElementById("box") to select the element',
          'Use element.classList.toggle("highlighted") to add the class if absent, or remove it if present',
          'Call the function at the end to apply the change when the code runs',
        ],
        testCases: [
          {
            description: 'toggleHighlight adds the "highlighted" class',
            test: `toggleHighlight(); return document.getElementById('box').classList.contains('highlighted')`,
            input: 'call toggleHighlight()',
            expected: 'box has class "highlighted"',
          },
          {
            description: 'toggleHighlight removes the class on second call',
            test: `toggleHighlight(); toggleHighlight(); return !document.getElementById('box').classList.contains('highlighted')`,
            input: 'call twice',
            expected: 'class removed on second toggle',
          },
        ],
        difficulty: 'beginner',
        concepts: ['DOM selection', 'classList.toggle', 'getElementById'],
      },
    },
    {
      id: 'slide-08-3',
      title: 'Creating and Removing Elements',
      content: `
        <p>Dynamically add and remove elements from the page:</p>
        <div class="code-block">// createElement — create a new element
const newDiv = document.createElement('div');
newDiv.textContent = 'New content';
newDiv.classList.add('card');

// appendChild — add to end of parent
const container = document.getElementById('container');
container.appendChild(newDiv);

// Create a complete list item
const li = document.createElement('li');
li.innerHTML = '&lt;strong&gt;Item&lt;/strong&gt;';
document.querySelector('ul').appendChild(li);

// Remove an element
const toRemove = document.getElementById('old');
toRemove.remove(); // modern API

// Clear all children
container.innerHTML = '';</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-08-2',
        title: 'Add Items to a List',
        description: 'Dynamically create and append list items to a ul element.',
        instructions: `
          <p>A <code>&lt;ul id="list"&gt;&lt;/ul&gt;</code> is provided in the sandbox.</p>
          <p>Write a function called <code>addItems</code> that takes an array of strings and appends each one as a new <code>&lt;li&gt;</code> element to the list.</p>
          <p>Example: <code>addItems(["Apple", "Banana", "Cherry"])</code> should produce a list with 3 items.</p>
        `,
        sandboxHTML: `<ul id="list" style="padding:16px;background:#f9f9f9;border-radius:6px;min-height:40px;"></ul>`,
        starterCode: `// Write your function here
function addItems(items) {
  const list = document.getElementById('list');
  // Create and append li elements for each item
}

// Test it
addItems(["Apple", "Banana", "Cherry"]);`,
        solution: `function addItems(items) {
  const list = document.getElementById('list')
  for (const item of items) {
    const li = document.createElement('li')
    li.textContent = item
    list.appendChild(li)
  }
}

addItems(["Apple", "Banana", "Cherry"]);`,
        hints: [
          'Get the list element with document.getElementById("list")',
          'Loop through the items array with for...of',
          'For each item: create an li with createElement("li"), set its textContent, then append to the list with appendChild',
        ],
        testCases: [
          {
            description: 'addItems adds 3 li elements to the list',
            test: `addItems(["Apple","Banana","Cherry"]); return document.getElementById('list').querySelectorAll('li').length >= 3`,
            input: '["Apple","Banana","Cherry"]',
            expected: '3 list items',
          },
          {
            description: 'First item has correct text',
            test: `document.getElementById('list').innerHTML=''; addItems(["Alpha","Beta"]); return document.getElementById('list').querySelector('li').textContent === "Alpha"`,
            input: '["Alpha","Beta"]',
            expected: 'first li has text "Alpha"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['createElement', 'appendChild', 'textContent', 'for...of', 'DOM manipulation'],
      },
    },
    {
      id: 'slide-08-4',
      title: 'Event Listeners',
      content: `
        <p>Respond to user actions with event listeners:</p>
        <div class="code-block">const button = document.getElementById('myBtn');

// addEventListener(event, handler)
button.addEventListener('click', function() {
  console.log('Clicked!');
});

// Arrow function handler
button.addEventListener('click', () => {
  button.textContent = 'Clicked!';
});

// Named function (can be removed later)
function handleClick(event) {
  console.log('Target:', event.target);
  event.preventDefault(); // stop default behavior
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);</div>
        <p><strong>Common events:</strong> <code>click</code>, <code>submit</code>, <code>keydown</code>, <code>keyup</code>, <code>mouseover</code>, <code>change</code>, <code>input</code></p>
        <p>The event object (<code>e</code> or <code>event</code>) carries information about the event: <code>e.target</code> (the element clicked), <code>e.key</code> (key pressed), <code>e.preventDefault()</code> (stop default behavior).</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-08-3',
        title: 'Click Counter',
        description: 'Use event listeners to count button clicks and display the count.',
        instructions: `
          <p>A button and a display element are provided in the sandbox:</p>
          <pre>&lt;button id="countBtn"&gt;Click me&lt;/button&gt;
&lt;p id="display"&gt;Count: 0&lt;/p&gt;</pre>
          <p>Write code that:</p>
          <ul>
            <li>Tracks the number of times the button is clicked</li>
            <li>Updates the text of <code>#display</code> to show: <code>"Count: N"</code> where N is the click count</li>
          </ul>
        `,
        sandboxHTML: `<button id="countBtn" style="padding:10px 20px;font-size:1em;cursor:pointer;">Click me</button>
<p id="display" style="font-size:1.2em;margin-top:10px;">Count: 0</p>`,
        starterCode: `// Write your code here
let count = 0;
const btn = document.getElementById('countBtn');
const display = document.getElementById('display');

// Add a click event listener that increments count and updates display`,
        solution: `let count = 0
const btn = document.getElementById('countBtn')
const display = document.getElementById('display')

btn.addEventListener('click', () => {
  count++
  display.textContent = \`Count: \${count}\`
})`,
        hints: [
          'Use addEventListener("click", handler) on the button element',
          'Inside the handler, increment the count variable: count++',
          'Update display.textContent using a template literal: `Count: ${count}`',
        ],
        testCases: [
          {
            description: 'Clicking the button updates the display',
            test: `document.getElementById('countBtn').click(); return document.getElementById('display').textContent === 'Count: 1'`,
            input: 'click button once',
            expected: 'display shows "Count: 1"',
          },
          {
            description: 'Clicking twice shows Count: 2',
            test: `document.getElementById('countBtn').click(); document.getElementById('countBtn').click(); return document.getElementById('display').textContent.includes('2')`,
            input: 'click button twice',
            expected: 'display shows "Count: 2"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['addEventListener', 'click event', 'textContent', 'state in closures'],
      },
    },
    {
      id: 'slide-08-5',
      title: 'Exercise: Dynamic Form Validation',
      content: `
        <p>A practical use case: validating form input before submission.</p>
        <div class="code-block">const form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent page reload

  const emailInput = document.querySelector('#email');
  const email = emailInput.value;

  if (!email.includes('@')) {
    emailInput.classList.add('error');
    document.getElementById('errorMsg').textContent = 'Invalid email';
  } else {
    emailInput.classList.remove('error');
    document.getElementById('errorMsg').textContent = '';
    console.log('Form submitted:', email);
  }
});</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-08-4',
        title: 'Input Character Counter',
        description: 'Show a live character count as the user types in an input field.',
        instructions: `
          <p>An input and a counter display are provided:</p>
          <pre>&lt;input id="textInput" maxlength="100" placeholder="Type here..."&gt;
&lt;p id="charCount"&gt;0 / 100 characters&lt;/p&gt;</pre>
          <p>Write code that listens to the <code>input</code> event on the text field and updates the counter to show: <code>"N / 100 characters"</code> where N is the current length.</p>
        `,
        sandboxHTML: `<input id="textInput" maxlength="100" placeholder="Type here..." style="padding:8px;font-size:1em;width:300px;border:1px solid #ccc;border-radius:4px;">
<p id="charCount" style="margin-top:8px;color:#555;">0 / 100 characters</p>`,
        starterCode: `// Write your code here
const input = document.getElementById('textInput');
const counter = document.getElementById('charCount');

// Listen to the 'input' event and update counter.textContent`,
        solution: `const input = document.getElementById('textInput')
const counter = document.getElementById('charCount')

input.addEventListener('input', () => {
  counter.textContent = \`\${input.value.length} / 100 characters\`
})`,
        hints: [
          'Listen for the "input" event (fires on every keystroke) rather than "change" (fires only on blur)',
          'Inside the handler, read the current value length: input.value.length',
          'Update counter.textContent using a template literal',
        ],
        testCases: [
          {
            description: 'Counter updates when input value changes',
            test: `
              const inp = document.getElementById('textInput');
              inp.value = 'hello';
              inp.dispatchEvent(new Event('input'));
              return document.getElementById('charCount').textContent === '5 / 100 characters'
            `,
            input: 'type "hello"',
            expected: '"5 / 100 characters"',
          },
          {
            description: 'Counter shows 0 for empty input',
            test: `
              const inp = document.getElementById('textInput');
              inp.value = '';
              inp.dispatchEvent(new Event('input'));
              return document.getElementById('charCount').textContent === '0 / 100 characters'
            `,
            input: 'empty input',
            expected: '"0 / 100 characters"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['addEventListener', 'input event', 'value property', 'textContent', 'template literals'],
      },
    },
  ],

  exercises: [
    {
      id: 'ex-08-1',
      title: 'Build an HTML Element String',
      difficulty: 'beginner',
      description: 'Return an HTML string for an element with a given tag and text content.',
      inputSpec: 'tag: string, text: string',
      outputSpec: 'string — HTML like <tag>text</tag>',
      instructions: `
        <p>Implement a function that builds an HTML element string from a tag name and text content. This simulates what <code>createElement</code> + <code>textContent</code> does in the DOM.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>buildElement(tag, text)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>buildElement("p", "Hello") → "&lt;p&gt;Hello&lt;/p&gt;"</code></div>
        </div>
        <p>The output should be a string with an opening tag, the text, and a closing tag. No extra spaces or attributes needed.</p>
      `,
      starterCode: `// Write a function called buildElement\nfunction buildElement(tag, text) {\n  // your code here\n}`,
      solution: `function buildElement(tag, text) {\n  return \`<\${tag}>\${text}</\${tag}>\`\n}`,
      hints: [
        'Use a template literal to combine the tag and text',
        'Opening tag: `<${tag}>`, closing tag: `</${tag}>`',
        'Full result: `<${tag}>${text}</${tag}>`',
      ],
      testCases: [
        { description: 'buildElement("p", "Hello") returns "<p>Hello</p>"', test: 'return buildElement("p", "Hello") === "<p>Hello</p>"', input: '"p", "Hello"', expected: '"<p>Hello</p>"' },
        { description: 'buildElement("h1", "Title") returns "<h1>Title</h1>"', test: 'return buildElement("h1", "Title") === "<h1>Title</h1>"', input: '"h1", "Title"', expected: '"<h1>Title</h1>"' },
        { description: 'buildElement("span", "ok") returns "<span>ok</span>"', test: 'return buildElement("span", "ok") === "<span>ok</span>"', input: '"span", "ok"', expected: '"<span>ok</span>"' },
        { description: 'buildElement wraps text between matching tags', test: 'const r = buildElement("div", "test"); return r.startsWith("<div>") && r.endsWith("</div>")', input: '"div", "test"', expected: 'starts with <div> ends with </div>' },
      ],
      concepts: ['template literals', 'string manipulation', 'DOM concepts'],
    },
    {
      id: 'ex-08-2',
      title: 'Parse a CSS Selector',
      difficulty: 'beginner',
      description: 'Parse a simple CSS selector string into a structured object describing its type and value.',
      inputSpec: 'selector: string — one of "#id", ".class", or "tag"',
      outputSpec: 'object — { type: "id"|"class"|"tag", value: string }',
      instructions: `
        <p>Implement a function that parses a simple CSS selector and returns an object with its type and value.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>parseSelector(selector)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>parseSelector("#main") → { type: "id", value: "main" }</code></div>
        </div>
        <p>Rules: if the selector starts with <code>#</code>, it is an id; if it starts with <code>.</code>, it is a class; otherwise it is a tag. Strip the leading symbol for the value.</p>
      `,
      starterCode: `// Write a function called parseSelector\nfunction parseSelector(selector) {\n  // your code here\n}`,
      solution: `function parseSelector(selector) {\n  if (selector.startsWith('#')) return { type: 'id', value: selector.slice(1) }\n  if (selector.startsWith('.')) return { type: 'class', value: selector.slice(1) }\n  return { type: 'tag', value: selector }\n}`,
      hints: [
        'Check the first character of selector: selector[0] or selector.startsWith(...)',
        'Use selector.slice(1) to remove the leading # or . character',
        'Return a plain object with type and value properties',
      ],
      testCases: [
        { description: 'parseSelector("#myId") returns {type:"id", value:"myId"}', test: 'const r = parseSelector("#myId"); return r.type === "id" && r.value === "myId"', input: '"#myId"', expected: '{type:"id", value:"myId"}' },
        { description: 'parseSelector(".myClass") returns {type:"class", value:"myClass"}', test: 'const r = parseSelector(".myClass"); return r.type === "class" && r.value === "myClass"', input: '".myClass"', expected: '{type:"class", value:"myClass"}' },
        { description: 'parseSelector("div") returns {type:"tag", value:"div"}', test: 'const r = parseSelector("div"); return r.type === "tag" && r.value === "div"', input: '"div"', expected: '{type:"tag", value:"div"}' },
        { description: 'parseSelector("#app") strips the # symbol', test: 'return parseSelector("#app").value === "app"', input: '"#app"', expected: '"app"' },
      ],
      concepts: ['string methods', 'conditionals', 'objects', 'DOM concepts'],
    },
    {
      id: 'ex-08-3',
      title: 'Toggle a Class in an Array',
      difficulty: 'beginner',
      description: 'Given an array of class names, add or remove a class name to simulate classList.toggle.',
      inputSpec: 'classList: string[], className: string',
      outputSpec: 'string[] — new array with className added if missing, or removed if present',
      instructions: `
        <p>Implement a function that simulates <code>classList.toggle()</code> using plain arrays. It should add the class if it is not present, and remove it if it is.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>toggleClass(classList, className)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>toggleClass(["btn", "active"], "active") → ["btn"]</code></div>
        </div>
        <p>Return a new array — do not mutate the original. The original order of remaining elements should be preserved.</p>
      `,
      starterCode: `// Write a function called toggleClass\nfunction toggleClass(classList, className) {\n  // your code here\n}`,
      solution: `function toggleClass(classList, className) {\n  if (classList.includes(className)) {\n    return classList.filter(c => c !== className)\n  }\n  return [...classList, className]\n}`,
      hints: [
        'Use classList.includes(className) to check if the class is already present',
        'If present, return classList.filter(c => c !== className) to remove it',
        'If absent, return [...classList, className] to add it without mutating the original',
      ],
      testCases: [
        { description: 'adds className when not present', test: 'const r = toggleClass(["btn"], "active"); return r.includes("active")', input: '["btn"], "active"', expected: 'includes "active"' },
        { description: 'removes className when present', test: 'const r = toggleClass(["btn", "active"], "active"); return !r.includes("active")', input: '["btn","active"], "active"', expected: 'does not include "active"' },
        { description: 'preserves other classes when removing', test: 'const r = toggleClass(["btn", "active", "large"], "active"); return r.includes("btn") && r.includes("large")', input: '["btn","active","large"], "active"', expected: '"btn" and "large" preserved' },
        { description: 'does not mutate the original array', test: 'const arr = ["btn"]; toggleClass(arr, "active"); return arr.length === 1', input: '["btn"], "active"', expected: 'original unchanged' },
      ],
      concepts: ['array methods', 'includes', 'filter', 'spread', 'immutability', 'DOM concepts'],
    },
    {
      id: 'ex-08-4',
      title: 'Build an Attribute String',
      difficulty: 'medium',
      description: 'Convert an attributes object into an HTML attribute string.',
      inputSpec: 'attrs: object — key-value pairs where boolean true means a standalone attribute',
      outputSpec: 'string — space-separated attribute string like key="value" or just key for booleans',
      instructions: `
        <p>Implement a function that converts a plain object of HTML attributes into a string suitable for use in an HTML tag.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>buildAttributeString(attrs)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>buildAttributeString({id:"btn", disabled:true}) → 'id="btn" disabled'</code></div>
        </div>
        <p>For string/number values use <code>key="value"</code>. For boolean <code>true</code>, output just the key name (standalone attribute). Join all parts with a single space.</p>
      `,
      starterCode: `// Write a function called buildAttributeString\nfunction buildAttributeString(attrs) {\n  // your code here\n}`,
      solution: `function buildAttributeString(attrs) {\n  return Object.entries(attrs)\n    .map(([key, val]) => val === true ? key : \`\${key}="\${val}"\`)\n    .join(' ')\n}`,
      hints: [
        'Use Object.entries(attrs) to get [key, value] pairs',
        'Map each pair: if value is true output just the key, otherwise output key="value"',
        'Join the parts with " " (a single space)',
      ],
      testCases: [
        { description: 'handles string attribute', test: 'return buildAttributeString({id:"btn"}) === \'id="btn"\'', input: '{id:"btn"}', expected: 'id="btn"' },
        { description: 'handles boolean true as standalone attribute', test: 'return buildAttributeString({disabled:true}) === "disabled"', input: '{disabled:true}', expected: '"disabled"' },
        { description: 'combines multiple attributes', test: 'const r = buildAttributeString({id:"x", class:"primary"}); return r === \'id="x" class="primary"\'', input: '{id:"x", class:"primary"}', expected: 'id="x" class="primary"' },
        { description: 'mixes string and boolean attributes', test: 'const r = buildAttributeString({type:"submit", disabled:true}); return r.includes(\'type="submit"\') && r.includes("disabled")', input: '{type:"submit", disabled:true}', expected: 'type="submit" disabled' },
      ],
      concepts: ['Object.entries', 'map', 'join', 'template literals', 'HTML attributes'],
    },
    {
      id: 'ex-08-5',
      title: 'Extract Event Types from Code',
      difficulty: 'medium',
      description: 'Given a JavaScript code string, extract all unique event type strings used in addEventListener calls.',
      inputSpec: 'code: string — JavaScript source code',
      outputSpec: 'string[] — array of unique event type strings found in addEventListener calls',
      instructions: `
        <p>Implement a function that parses a code string and extracts all event types passed to <code>addEventListener</code>.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>parseEventType(code)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>parseEventType('btn.addEventListener("click", fn)') → ["click"]</code></div>
        </div>
        <p>Use a regular expression to find all <code>addEventListener("eventName")</code> or <code>addEventListener('eventName')</code> patterns. Return only unique values. Order does not matter.</p>
      `,
      starterCode: `// Write a function called parseEventType\nfunction parseEventType(code) {\n  // your code here\n}`,
      solution: `function parseEventType(code) {\n  const matches = [...code.matchAll(/addEventListener\\(['"]([^'"]+)['"]/g)]\n  const types = matches.map(m => m[1])\n  return [...new Set(types)]\n}`,
      hints: [
        'Use a regex like /addEventListener\\([\'"]([^\'"]+)[\'"]/g to match addEventListener calls',
        'Use String.matchAll() or a global regex with exec() to find all matches',
        'Wrap results in new Set([...]) to deduplicate, then spread back to an array',
      ],
      testCases: [
        { description: 'extracts single event type', test: 'const r = parseEventType(\'btn.addEventListener("click", fn)\'); return r.includes("click") && r.length === 1', input: 'single addEventListener', expected: '["click"]' },
        { description: 'extracts multiple different event types', test: 'const r = parseEventType(\'el.addEventListener("click", f); el.addEventListener("keydown", g)\'); return r.includes("click") && r.includes("keydown") && r.length === 2', input: 'click and keydown', expected: '["click","keydown"]' },
        { description: 'deduplicates repeated event types', test: 'const r = parseEventType(\'a.addEventListener("click", f1); b.addEventListener("click", f2)\'); return r.filter(x => x === "click").length === 1', input: 'two click listeners', expected: 'only one "click"' },
        { description: 'returns empty array when no addEventListener found', test: 'return parseEventType("console.log(42)").length === 0', input: 'no addEventListener', expected: '[]' },
      ],
      concepts: ['regex', 'matchAll', 'Set', 'spread', 'string parsing', 'DOM concepts'],
    },
    {
      id: 'ex-08-6',
      title: 'DOM Tree Path Finder',
      difficulty: 'hard',
      description: 'Given a plain-object tree and a simple CSS selector, find and return the first matching node.',
      inputSpec: 'tree: object (tagName, id?, className?, children[]), selector: string',
      outputSpec: 'object|null — first node matching the selector, or null if not found',
      instructions: `
        <p>Implement a function that traverses a plain-object tree (simulating a DOM) and returns the first node matching a simple CSS selector.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>domPathFinder(tree, selector)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>domPathFinder(tree, "#main") → node with id "main"</code></div>
        </div>
        <p>Each node has: <code>tagName</code> (string), optional <code>id</code> (string), optional <code>className</code> (string, space-separated classes), and <code>children</code> (array of nodes).</p>
        <p>Supported selectors: <code>#id</code>, <code>.class</code>, or <code>tagName</code>. Use breadth-first or depth-first search. Return the node object itself (not a copy), or <code>null</code> if not found.</p>
      `,
      starterCode: `// Write a function called domPathFinder\nfunction domPathFinder(tree, selector) {\n  // your code here\n}`,
      solution: `function domPathFinder(tree, selector) {\n  function matches(node, sel) {\n    if (sel.startsWith('#')) return node.id === sel.slice(1)\n    if (sel.startsWith('.')) return (node.className || '').split(' ').includes(sel.slice(1))\n    return node.tagName === sel\n  }\n  function search(node) {\n    if (matches(node, selector)) return node\n    for (const child of (node.children || [])) {\n      const found = search(child)\n      if (found) return found\n    }\n    return null\n  }\n  return search(tree)\n}`,
      hints: [
        'Write a helper matches(node, selector) that checks if a node satisfies the selector',
        'For #id: node.id === selector.slice(1); for .class: node.className.split(" ").includes(selector.slice(1)); for tag: node.tagName === selector',
        'Recursively search children with a depth-first approach, returning the first match found',
      ],
      testCases: [
        { description: 'finds node by tag name', test: 'const tree = {tagName:"div",children:[{tagName:"p",children:[]}]}; return domPathFinder(tree, "p").tagName === "p"', input: 'selector "p"', expected: 'p node' },
        { description: 'finds node by id', test: 'const tree = {tagName:"div",id:"root",children:[{tagName:"span",id:"child",children:[]}]}; return domPathFinder(tree, "#child").id === "child"', input: 'selector "#child"', expected: 'node with id "child"' },
        { description: 'finds node by class', test: 'const tree = {tagName:"div",children:[{tagName:"p",className:"active bold",children:[]}]}; return domPathFinder(tree, ".active").tagName === "p"', input: 'selector ".active"', expected: 'p with class "active"' },
        { description: 'returns null when no match', test: 'const tree = {tagName:"div",children:[]}; return domPathFinder(tree, "#nothere") === null', input: 'selector "#nothere"', expected: 'null' },
        { description: 'returns first match in depth-first order', test: 'const tree = {tagName:"div",children:[{tagName:"span",id:"a",children:[]},{tagName:"span",id:"b",children:[]}]}; return domPathFinder(tree, "span").id === "a"', input: 'two span children', expected: 'first span (id "a")' },
      ],
      concepts: ['recursion', 'tree traversal', 'string parsing', 'DOM simulation', 'depth-first search'],
    },
  ],

  questions: [
    {
      id: 'q-08-1',
      question: 'What is the difference between querySelector and getElementById?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'getElementById accepts any CSS selector; querySelector only works with IDs', correct: false },
        { id: 'b', text: 'querySelector accepts any CSS selector and returns the first match; getElementById only looks up by ID and is generally faster', correct: true },
        { id: 'c', text: 'They are identical — both return the same result for any selector', correct: false },
        { id: 'd', text: 'getElementById returns a NodeList; querySelector returns a single element', correct: false },
      ],
      explanation: 'getElementById is a specialized method that only works for ID lookups and is slightly faster because it uses the browser\'s internal ID index. querySelector is more flexible and accepts any valid CSS selector, returning the first matching element.',
    },
    {
      id: 'q-08-2',
      question: 'When should you use textContent instead of innerHTML to set element content?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'When you need to render HTML tags within the content', correct: false },
        { id: 'b', text: 'When setting plain text content, especially from user input, to avoid XSS vulnerabilities', correct: true },
        { id: 'c', text: 'textContent is deprecated and should never be used', correct: false },
        { id: 'd', text: 'When you need to get the computed style of an element', correct: false },
      ],
      explanation: 'textContent treats the value as plain text and does not parse HTML, so any tags in the string are displayed literally. This is important for security: setting innerHTML with user-provided data can create XSS (cross-site scripting) vulnerabilities if the input contains malicious script tags.',
    },
    {
      id: 'q-08-3',
      question: 'Which classList methods can be used to add, remove, and toggle a class? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'classList.add("name") — adds the class if not present', correct: true },
        { id: 'b', text: 'classList.remove("name") — removes the class if present', correct: true },
        { id: 'c', text: 'classList.toggle("name") — adds if absent, removes if present', correct: true },
        { id: 'd', text: 'classList.set("name") — sets the class list to only this class', correct: false },
      ],
      explanation: 'The classList API provides add(), remove(), toggle(), contains(), and replace() methods. There is no set() method. toggle() is especially useful for interactive UI elements that switch states.',
    },
    {
      id: 'q-08-4',
      question: 'What is the correct way to create a new element, set its text, and append it to a parent?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'document.newElement("li", "text"); parent.attach(li)', correct: false },
        { id: 'b', text: 'const li = document.createElement("li"); li.textContent = "text"; parent.appendChild(li)', correct: true },
        { id: 'c', text: 'const li = new Element("li"); li.text = "text"; parent.add(li)', correct: false },
        { id: 'd', text: 'parent.innerHTML += "<li>text</li>" is the only way', correct: false },
      ],
      explanation: 'The standard pattern is: create with document.createElement(), set content with textContent (or innerHTML for HTML), then insert with appendChild() or insertBefore(). The += innerHTML pattern is an anti-pattern because it re-parses and recreates all existing children on each call.',
    },
    {
      id: 'q-08-5',
      question: 'How do you attach an event listener to an element, and how can you later remove it?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'el.onClick = handler; el.removeClick(handler)', correct: false },
        { id: 'b', text: 'el.on("click", handler); el.off("click", handler)', correct: false },
        { id: 'c', text: 'el.addEventListener("click", handler); el.removeEventListener("click", handler)', correct: true },
        { id: 'd', text: 'el.listen("click", handler); el.unlisten("click", handler)', correct: false },
      ],
      explanation: 'addEventListener and removeEventListener are the standard DOM methods. To remove a listener, you must pass the same function reference — anonymous functions cannot be removed, which is why naming event handler functions is important when cleanup is needed.',
    },
    {
      id: 'q-08-6',
      question: 'What does event.preventDefault() do inside an event handler?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Stops the event from bubbling up to parent elements', correct: false },
        { id: 'b', text: 'Prevents the browser\'s default action for the event (e.g., following a link, submitting a form)', correct: true },
        { id: 'c', text: 'Removes the event listener after it fires once', correct: false },
        { id: 'd', text: 'Prevents the event from reaching child elements', correct: false },
      ],
      explanation: 'preventDefault() cancels the browser\'s built-in response to an event. For example, calling it on a form "submit" event prevents the page from reloading, and on an anchor "click" event prevents navigation. It does not affect event propagation — for that, use stopPropagation().',
    },
    {
      id: 'q-08-7',
      question: 'What is event bubbling in the DOM?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Events travel from the document root down to the target element', correct: false },
        { id: 'b', text: 'After an event fires on a target element, it propagates upward through ancestor elements', correct: true },
        { id: 'c', text: 'Multiple events fire simultaneously when one is triggered', correct: false },
        { id: 'd', text: 'The event loops repeatedly until stopped', correct: false },
      ],
      explanation: 'Event bubbling means an event fired on a child element also triggers on all ancestor elements (bubbling up the DOM tree). The opposite — events traveling down from root to target — is called event capturing. You can stop bubbling with event.stopPropagation().',
    },
    {
      id: 'q-08-8',
      question: 'Which of the following are valid uses of setAttribute? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'el.setAttribute("href", "https://example.com") — sets a link URL', correct: true },
        { id: 'b', text: 'el.setAttribute("disabled", "") — disables an input', correct: true },
        { id: 'c', text: 'el.setAttribute("style", "color: red") — sets inline style', correct: true },
        { id: 'd', text: 'el.setAttribute("textContent", "hello") — sets element text', correct: false },
      ],
      explanation: 'setAttribute works for any HTML attribute — href, disabled, style, data-*, aria-*, etc. However, textContent is a DOM property, not an HTML attribute, so it cannot be set via setAttribute. For content, use el.textContent = "hello" directly.',
    },
  ],
}
