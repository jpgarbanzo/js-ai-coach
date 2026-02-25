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
}
