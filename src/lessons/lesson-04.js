export default {
  id: '04',
  title: 'Control Structures',
  description: 'Control program flow with conditionals, loops, and error handling',
  icon: '🔀',
  slides: [
    {
      id: 'slide-04-1',
      title: 'if, else if, else',
      content: `
        <p>Execute code based on conditions:</p>
        <div class="code-block">let age = 20;

if (age < 13) {
  console.log("Child");
} else if (age < 18) {
  console.log("Teenager");
} else if (age < 65) {
  console.log("Adult");
} else {
  console.log("Senior");
}</div>
        <p>The <strong>switch statement</strong> is cleaner when comparing the same variable to many values:</p>
        <div class="code-block">let day = "monday";

switch (day) {
  case "monday":
    console.log("Start of week");
    break;
  case "friday":
    console.log("Almost weekend!");
    break;
  case "saturday":
  case "sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Regular day");
}</div>
        <p>Always include <code>break</code> in switch cases to prevent fall-through.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-04-1',
        title: 'Grade Calculator',
        description: 'Write a function that converts a numeric score to a letter grade.',
        instructions: `
          <p>Create a function called <code>getGrade</code> that takes a <code>score</code> (number from 0–100) and returns a letter grade:</p>
          <ul>
            <li>90–100 → <code>"A"</code></li>
            <li>80–89 → <code>"B"</code></li>
            <li>70–79 → <code>"C"</code></li>
            <li>60–69 → <code>"D"</code></li>
            <li>Below 60 → <code>"F"</code></li>
            <li>Below 0 or above 100 → <code>"invalid"</code></li>
          </ul>
          <p>Example: <code>getGrade(85)</code> should return <code>"B"</code></p>
        `,
        starterCode: `// Write your function here
function getGrade(score) {
  // Your code here
}`,
        solution: `function getGrade(score) {
  if (score < 0 || score > 100) return 'invalid'
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}`,
        hints: [
          'Check for the out-of-range case first (score < 0 or score > 100)',
          'Check from the highest grade downward — each condition uses >= and only fires if all higher checks failed',
          'The last return handles the F case since all other ranges were already caught above',
        ],
        testCases: [
          {
            description: 'getGrade(95) returns "A"',
            test: `return getGrade(95) === "A"`,
            input: '95',
            expected: '"A"',
          },
          {
            description: 'getGrade(83) returns "B"',
            test: `return getGrade(83) === "B"`,
            input: '83',
            expected: '"B"',
          },
          {
            description: 'getGrade(72) returns "C"',
            test: `return getGrade(72) === "C"`,
            input: '72',
            expected: '"C"',
          },
          {
            description: 'getGrade(65) returns "D"',
            test: `return getGrade(65) === "D"`,
            input: '65',
            expected: '"D"',
          },
          {
            description: 'getGrade(50) returns "F"',
            test: `return getGrade(50) === "F"`,
            input: '50',
            expected: '"F"',
          },
          {
            description: 'getGrade(-5) returns "invalid"',
            test: `return getGrade(-5) === "invalid"`,
            input: '-5',
            expected: '"invalid"',
          },
          {
            description: 'getGrade(101) returns "invalid"',
            test: `return getGrade(101) === "invalid"`,
            input: '101',
            expected: '"invalid"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['if/else if/else', 'comparison operators', 'return', 'logical operators'],
      },
    },
    {
      id: 'slide-04-2',
      title: 'for Loops and for...of',
      content: `
        <p>The <strong>for loop</strong> repeats code a specific number of times:</p>
        <div class="code-block">// Syntax: for (init; condition; increment)
for (let i = 0; i < 5; i++) {
  console.log(\`Iteration \${i}\`);
}
// Prints: 0, 1, 2, 3, 4

// Iterating an array by index
const fruits = ["apple", "pear", "grape"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}</div>
        <p><strong>for...of</strong> is the modern way to iterate array values:</p>
        <div class="code-block">const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}
// Prints: red, green, blue</div>
        <p>Use <code>break</code> to exit a loop early, and <code>continue</code> to skip the current iteration.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-04-2',
        title: 'FizzBuzz',
        description: 'The classic programming challenge using loops and conditionals.',
        instructions: `
          <p>Create a function called <code>fizzBuzz</code> that takes a number <code>n</code> and returns an array of strings from 1 to n where:</p>
          <ul>
            <li>Multiples of both 3 and 5 → <code>"FizzBuzz"</code></li>
            <li>Multiples of 3 only → <code>"Fizz"</code></li>
            <li>Multiples of 5 only → <code>"Buzz"</code></li>
            <li>All other numbers → the number as a string (e.g. <code>"7"</code>)</li>
          </ul>
          <p>Example: <code>fizzBuzz(5)</code> → <code>["1", "2", "Fizz", "4", "Buzz"]</code></p>
        `,
        starterCode: `// Write your function here
function fizzBuzz(n) {
  const result = [];
  // Your code here
  return result;
}`,
        solution: `function fizzBuzz(n) {
  const result = []
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('FizzBuzz')
    } else if (i % 3 === 0) {
      result.push('Fizz')
    } else if (i % 5 === 0) {
      result.push('Buzz')
    } else {
      result.push(String(i))
    }
  }
  return result
}`,
        hints: [
          'Use a for loop from 1 to n (inclusive)',
          'Check divisibility by BOTH 3 and 5 first (using &&), before checking each individually — otherwise a multiple of 15 would match the wrong branch',
          'Use the modulo operator (%) to check divisibility: i % 3 === 0 means i is divisible by 3',
        ],
        testCases: [
          {
            description: 'fizzBuzz(5) returns correct array',
            test: `const r = fizzBuzz(5); return JSON.stringify(r) === JSON.stringify(["1","2","Fizz","4","Buzz"])`,
            input: '5',
            expected: '["1","2","Fizz","4","Buzz"]',
          },
          {
            description: 'fizzBuzz(15) has "FizzBuzz" at index 14',
            test: `return fizzBuzz(15)[14] === "FizzBuzz"`,
            input: '15',
            expected: '"FizzBuzz" at position 15',
          },
          {
            description: 'fizzBuzz(3) last element is "Fizz"',
            test: `const r = fizzBuzz(3); return r[2] === "Fizz"`,
            input: '3',
            expected: '"Fizz"',
          },
          {
            description: 'fizzBuzz(1) returns ["1"]',
            test: `return JSON.stringify(fizzBuzz(1)) === JSON.stringify(["1"])`,
            input: '1',
            expected: '["1"]',
          },
          {
            description: 'fizzBuzz(0) returns empty array',
            test: `return fizzBuzz(0).length === 0`,
            input: '0',
            expected: '[]',
          },
        ],
        difficulty: 'beginner',
        concepts: ['for loop', 'modulo operator', 'if/else if/else', 'arrays', 'push'],
      },
    },
    {
      id: 'slide-04-3',
      title: 'while, do-while, and break/continue',
      content: `
        <p>The <strong>while loop</strong> runs as long as a condition is true:</p>
        <div class="code-block">let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// do-while executes at LEAST once
let num = 0;
do {
  console.log(num);
  num++;
} while (num < 5);</div>
        <p><strong>break</strong> exits the loop entirely; <strong>continue</strong> skips to the next iteration:</p>
        <div class="code-block">// break — stop when found
for (let i = 0; i < 10; i++) {
  if (i === 5) break;  // stops at 5
  console.log(i);       // prints 0,1,2,3,4
}

// continue — skip even numbers
for (let i = 0; i < 6; i++) {
  if (i % 2 === 0) continue;
  console.log(i);  // prints 1,3,5
}</div>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-04-4',
      title: 'try...catch Error Handling',
      content: `
        <p>Use <code>try...catch</code> to handle errors gracefully and prevent app crashes:</p>
        <div class="code-block">try {
  // Code that might fail
  const data = JSON.parse(jsonString);
  console.log(data);
} catch (error) {
  // Handle the error
  console.error("Parse failed:", error.message);
} finally {
  // Always runs — good for cleanup
  console.log("Process complete");
}</div>
        <p>Throw your own errors with descriptive messages:</p>
        <div class="code-block">function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  const result = divide(10, 0);
} catch (error) {
  console.log(error.message); // "Cannot divide by zero"
}</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-04-3',
        title: 'Safe Array Element Accessor',
        description: 'Write a function that safely accesses array elements with error handling.',
        instructions: `
          <p>Create a function called <code>safeGet</code> that takes an <code>array</code> and an <code>index</code> and returns the element at that index.</p>
          <p>If the index is out of range (negative or >= array length), it should throw an error with the message: <code>"Index out of range"</code></p>
          <p>Then create a function called <code>tryGet</code> that calls <code>safeGet</code> inside a try-catch and returns the element if successful, or <code>null</code> if an error is thrown.</p>
        `,
        starterCode: `// Write your functions here
function safeGet(array, index) {
  // Throw an error if index is invalid
}

function tryGet(array, index) {
  // Use try-catch to call safeGet safely
}`,
        solution: `function safeGet(array, index) {
  if (index < 0 || index >= array.length) {
    throw new Error('Index out of range')
  }
  return array[index]
}

function tryGet(array, index) {
  try {
    return safeGet(array, index)
  } catch (error) {
    return null
  }
}`,
        hints: [
          'In safeGet, check if index < 0 or index >= array.length and throw new Error("Index out of range")',
          'In tryGet, wrap the call to safeGet in a try block and return null in the catch block',
          'If safeGet does not throw, its return value flows through the try block and gets returned normally',
        ],
        testCases: [
          {
            description: 'safeGet([1,2,3], 0) returns 1',
            test: `return safeGet([1,2,3], 0) === 1`,
            input: '[1,2,3], 0',
            expected: '1',
          },
          {
            description: 'safeGet([1,2,3], 2) returns 3',
            test: `return safeGet([1,2,3], 2) === 3`,
            input: '[1,2,3], 2',
            expected: '3',
          },
          {
            description: 'safeGet throws for index out of range',
            test: `try { safeGet([1,2,3], 5); return false; } catch(e) { return e.message === "Index out of range"; }`,
            input: '[1,2,3], 5',
            expected: 'throws "Index out of range"',
          },
          {
            description: 'safeGet throws for negative index',
            test: `try { safeGet([1,2,3], -1); return false; } catch(e) { return e.message === "Index out of range"; }`,
            input: '[1,2,3], -1',
            expected: 'throws "Index out of range"',
          },
          {
            description: 'tryGet([1,2,3], 1) returns 2',
            test: `return tryGet([1,2,3], 1) === 2`,
            input: '[1,2,3], 1',
            expected: '2',
          },
          {
            description: 'tryGet([1,2,3], 10) returns null',
            test: `return tryGet([1,2,3], 10) === null`,
            input: '[1,2,3], 10',
            expected: 'null',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['try/catch', 'throw', 'Error', 'array access', 'validation'],
      },
    },
    {
      id: 'slide-04-5',
      title: 'Exercise: Iterating with for...of',
      content: `
        <p>The <code>for...of</code> loop is the cleanest way to iterate over array values:</p>
        <div class="code-block">const scores = [85, 92, 78, 96, 60];
let total = 0;

for (const score of scores) {
  total += score;
}

const average = total / scores.length;
console.log(\`Average: \${average}\`);</div>
        <p>For iterating over object properties, use <code>for...in</code>:</p>
        <div class="code-block">const person = { name: "Alice", age: 30 };
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}</div>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-04-4',
        title: 'Sum Only Positive Numbers',
        description: 'Use a loop with continue to sum only positive numbers in an array.',
        instructions: `
          <p>Create a function called <code>sumPositive</code> that takes an array of numbers and returns the sum of only the positive numbers (greater than 0).</p>
          <p>Use a <code>for...of</code> loop and the <code>continue</code> statement to skip non-positive numbers.</p>
          <p>Example: <code>sumPositive([1, -2, 3, -4, 5])</code> should return <code>9</code></p>
        `,
        starterCode: `// Write your function here
function sumPositive(numbers) {
  let sum = 0;
  // Use for...of with continue
  return sum;
}`,
        solution: `function sumPositive(numbers) {
  let sum = 0
  for (const num of numbers) {
    if (num <= 0) continue
    sum += num
  }
  return sum
}`,
        hints: [
          'Use a for...of loop to iterate through the numbers array',
          'Inside the loop, use `if (num <= 0) continue` to skip zero and negative numbers',
          'Add the current number to sum after the continue check, then return sum at the end',
        ],
        testCases: [
          {
            description: 'sumPositive([1, -2, 3, -4, 5]) returns 9',
            test: `return sumPositive([1, -2, 3, -4, 5]) === 9`,
            input: '[1, -2, 3, -4, 5]',
            expected: '9',
          },
          {
            description: 'sumPositive([]) returns 0',
            test: `return sumPositive([]) === 0`,
            input: '[]',
            expected: '0',
          },
          {
            description: 'sumPositive([-1, -2, -3]) returns 0',
            test: `return sumPositive([-1, -2, -3]) === 0`,
            input: '[-1, -2, -3]',
            expected: '0',
          },
          {
            description: 'sumPositive([10, 0, 5]) returns 15 (zero is excluded)',
            test: `return sumPositive([10, 0, 5]) === 15`,
            input: '[10, 0, 5]',
            expected: '15',
          },
          {
            description: 'sumPositive([100]) returns 100',
            test: `return sumPositive([100]) === 100`,
            input: '[100]',
            expected: '100',
          },
        ],
        difficulty: 'beginner',
        concepts: ['for...of', 'continue', 'accumulator pattern', 'conditionals'],
      },
    },
  ],

  exercises: [
    {
      id: 'ex-04-1',
      title: 'Grade Classifier',
      difficulty: 'beginner',
      description: 'Write a function that converts a numeric score to a letter grade using if/else.',
      inputSpec: 'score: number (0–100)',
      outputSpec: 'string — "A", "B", "C", "D", "F", or "invalid"',
      instructions: `
        <p>Write a function called <code>getGrade</code> that takes a <code>score</code> (0–100) and returns the corresponding letter grade.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>getGrade(score)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>getGrade(85) → "B"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>getGrade(50) → "F"</code></div>
        </div>
        <p>Grading scale: 90–100 → "A", 80–89 → "B", 70–79 → "C", 60–69 → "D", below 60 → "F". Return "invalid" for scores outside 0–100.</p>
      `,
      starterCode: `// Write a function called getGrade\nfunction getGrade(score) {\n  // your code here\n}`,
      solution: `function getGrade(score) {\n  if (score < 0 || score > 100) return 'invalid'\n  if (score >= 90) return 'A'\n  if (score >= 80) return 'B'\n  if (score >= 70) return 'C'\n  if (score >= 60) return 'D'\n  return 'F'\n}`,
      hints: [
        'Check for out-of-range values first (< 0 or > 100)',
        'Check from highest grade downward using >= comparisons',
        'Each check only runs if all previous checks were false, so simple >= thresholds work',
      ],
      testCases: [
        { description: 'getGrade(95) returns "A"', test: 'return getGrade(95) === "A"', input: '95', expected: '"A"' },
        { description: 'getGrade(83) returns "B"', test: 'return getGrade(83) === "B"', input: '83', expected: '"B"' },
        { description: 'getGrade(72) returns "C"', test: 'return getGrade(72) === "C"', input: '72', expected: '"C"' },
        { description: 'getGrade(65) returns "D"', test: 'return getGrade(65) === "D"', input: '65', expected: '"D"' },
        { description: 'getGrade(50) returns "F"', test: 'return getGrade(50) === "F"', input: '50', expected: '"F"' },
        { description: 'getGrade(101) returns "invalid"', test: 'return getGrade(101) === "invalid"', input: '101', expected: '"invalid"' },
      ],
      concepts: ['if/else if/else', 'comparison operators', 'return'],
    },
    {
      id: 'ex-04-2',
      title: 'FizzBuzz Array',
      difficulty: 'beginner',
      description: 'Write a function that returns an array of FizzBuzz values from 1 to n.',
      inputSpec: 'n: number',
      outputSpec: 'array — FizzBuzz strings/numbers for 1 through n',
      instructions: `
        <p>Write a function called <code>fizzBuzz</code> that takes a positive integer <code>n</code> and returns an array where each element from 1 to n follows the FizzBuzz rules.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>fizzBuzz(n)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>fizzBuzz(5) → ["1", "2", "Fizz", "4", "Buzz"]</code></div>
        </div>
        <p>Rules: multiples of both 3 and 5 → "FizzBuzz", multiples of 3 → "Fizz", multiples of 5 → "Buzz", all others → the number as a string.</p>
      `,
      starterCode: `// Write a function called fizzBuzz\nfunction fizzBuzz(n) {\n  const result = []\n  // your code here\n  return result\n}`,
      solution: `function fizzBuzz(n) {\n  const result = []\n  for (let i = 1; i <= n; i++) {\n    if (i % 3 === 0 && i % 5 === 0) result.push('FizzBuzz')\n    else if (i % 3 === 0) result.push('Fizz')\n    else if (i % 5 === 0) result.push('Buzz')\n    else result.push(String(i))\n  }\n  return result\n}`,
      hints: [
        'Use a for loop from 1 to n (inclusive: i <= n)',
        'Check for divisibility by both 3 AND 5 first, before checking each separately',
        'Use String(i) or i.toString() to convert the number to a string for non-fizzbuzz values',
      ],
      testCases: [
        { description: 'fizzBuzz(5) returns correct array', test: 'return JSON.stringify(fizzBuzz(5)) === JSON.stringify(["1","2","Fizz","4","Buzz"])', input: '5', expected: '["1","2","Fizz","4","Buzz"]' },
        { description: 'fizzBuzz(15)[14] is "FizzBuzz"', test: 'return fizzBuzz(15)[14] === "FizzBuzz"', input: '15', expected: '"FizzBuzz"' },
        { description: 'fizzBuzz(1) returns ["1"]', test: 'return JSON.stringify(fizzBuzz(1)) === JSON.stringify(["1"])', input: '1', expected: '["1"]' },
        { description: 'fizzBuzz(0) returns []', test: 'return fizzBuzz(0).length === 0', input: '0', expected: '[]' },
      ],
      concepts: ['for loop', 'modulo', 'if/else if/else', 'arrays', 'push'],
    },
    {
      id: 'ex-04-3',
      title: 'Day Type',
      difficulty: 'beginner',
      description: 'Write a function that classifies a day name as "weekend", "weekday", or "invalid".',
      inputSpec: 'day: string (e.g. "Monday")',
      outputSpec: 'string — "weekend", "weekday", or "invalid"',
      instructions: `
        <p>Write a function called <code>dayType</code> that takes a day name (case-insensitive) and returns its classification.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>dayType(day)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>dayType("Saturday") → "weekend"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>dayType("Monday") → "weekday"</code></div>
        </div>
        <p>Weekend: Saturday, Sunday. Weekdays: Monday, Tuesday, Wednesday, Thursday, Friday. Anything else returns "invalid". Normalize by lowercasing the input before comparing.</p>
      `,
      starterCode: `// Write a function called dayType\nfunction dayType(day) {\n  // your code here\n}`,
      solution: `function dayType(day) {\n  const d = day.toLowerCase()\n  if (d === 'saturday' || d === 'sunday') return 'weekend'\n  if (d === 'monday' || d === 'tuesday' || d === 'wednesday' || d === 'thursday' || d === 'friday') return 'weekday'\n  return 'invalid'\n}`,
      hints: [
        'Normalize the input with day.toLowerCase() to handle any casing',
        'Check for weekend days first: Saturday and Sunday',
        'Check for weekdays using || to combine Monday through Friday, then return "invalid" as the default',
      ],
      testCases: [
        { description: 'dayType("Saturday") returns "weekend"', test: 'return dayType("Saturday") === "weekend"', input: '"Saturday"', expected: '"weekend"' },
        { description: 'dayType("sunday") returns "weekend"', test: 'return dayType("sunday") === "weekend"', input: '"sunday"', expected: '"weekend"' },
        { description: 'dayType("Monday") returns "weekday"', test: 'return dayType("Monday") === "weekday"', input: '"Monday"', expected: '"weekday"' },
        { description: 'dayType("friday") returns "weekday"', test: 'return dayType("friday") === "weekday"', input: '"friday"', expected: '"weekday"' },
        { description: 'dayType("Holiday") returns "invalid"', test: 'return dayType("Holiday") === "invalid"', input: '"Holiday"', expected: '"invalid"' },
      ],
      concepts: ['if/else', 'logical OR', 'string methods', 'conditionals'],
    },
    {
      id: 'ex-04-4',
      title: 'Collatz Steps',
      difficulty: 'medium',
      description: 'Write a function that counts the steps to reach 1 via the Collatz sequence.',
      inputSpec: 'n: number (positive integer)',
      outputSpec: 'number — count of steps to reach 1',
      instructions: `
        <p>The Collatz conjecture says that for any positive integer, repeating these steps will eventually reach 1:</p>
        <ul>
          <li>If the number is even, divide it by 2</li>
          <li>If the number is odd, multiply by 3 and add 1</li>
        </ul>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>collatz(n)</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>collatz(6) → 8</code> (6→3→10→5→16→8→4→2→1)</div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>collatz(1) → 0</code> (already at 1, no steps needed)</div>
        </div>
        <p>Return the number of steps taken to reach 1. Use a while loop.</p>
      `,
      starterCode: `// Write a function called collatz\nfunction collatz(n) {\n  // your code here\n}`,
      solution: `function collatz(n) {\n  let steps = 0\n  while (n !== 1) {\n    if (n % 2 === 0) {\n      n = n / 2\n    } else {\n      n = n * 3 + 1\n    }\n    steps++\n  }\n  return steps\n}`,
      hints: [
        'Use a while loop that continues as long as n !== 1',
        'Inside the loop: if n is even (n % 2 === 0) divide by 2, otherwise multiply by 3 and add 1',
        'Increment a steps counter each iteration and return it after the loop',
      ],
      testCases: [
        { description: 'collatz(1) returns 0', test: 'return collatz(1) === 0', input: '1', expected: '0' },
        { description: 'collatz(2) returns 1', test: 'return collatz(2) === 1', input: '2', expected: '1' },
        { description: 'collatz(6) returns 8', test: 'return collatz(6) === 8', input: '6', expected: '8' },
        { description: 'collatz(27) returns 111', test: 'return collatz(27) === 111', input: '27', expected: '111' },
      ],
      concepts: ['while loop', 'modulo', 'conditionals', 'counters', 'algorithms'],
    },
    {
      id: 'ex-04-5',
      title: 'Safe Division',
      difficulty: 'medium',
      description: 'Write a function that divides two numbers, throwing an error for division by zero, and a wrapper that catches it.',
      inputSpec: 'a: number, b: number',
      outputSpec: 'number — a divided by b, or null if b is 0',
      instructions: `
        <p>Write two functions:</p>
        <ul>
          <li><code>safeDiv(a, b)</code>: divides a by b. If b is 0, throws <code>new Error("Division by zero")</code>. Otherwise returns a / b.</li>
          <li><code>tryDiv(a, b)</code>: calls <code>safeDiv</code> inside a try/catch. Returns the result, or <code>null</code> if an error was thrown.</li>
        </ul>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>safeDiv(10, 2) → 5</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>tryDiv(10, 0) → null</code></div>
        </div>
      `,
      starterCode: `// Write functions safeDiv and tryDiv\nfunction safeDiv(a, b) {\n  // your code here\n}\n\nfunction tryDiv(a, b) {\n  // your code here\n}`,
      solution: `function safeDiv(a, b) {\n  if (b === 0) throw new Error('Division by zero')\n  return a / b\n}\n\nfunction tryDiv(a, b) {\n  try {\n    return safeDiv(a, b)\n  } catch (e) {\n    return null\n  }\n}`,
      hints: [
        'In safeDiv, check if b === 0 and throw new Error("Division by zero")',
        'In tryDiv, wrap the safeDiv call in a try block',
        'Return null in the catch block to handle the error gracefully',
      ],
      testCases: [
        { description: 'safeDiv(10, 2) returns 5', test: 'return safeDiv(10, 2) === 5', input: '10, 2', expected: '5' },
        { description: 'safeDiv throws on division by zero', test: 'try { safeDiv(5, 0); return false } catch(e) { return e.message === "Division by zero" }', input: '5, 0', expected: 'throws "Division by zero"' },
        { description: 'tryDiv(10, 2) returns 5', test: 'return tryDiv(10, 2) === 5', input: '10, 2', expected: '5' },
        { description: 'tryDiv(10, 0) returns null', test: 'return tryDiv(10, 0) === null', input: '10, 0', expected: 'null' },
      ],
      concepts: ['try/catch', 'throw', 'Error', 'functions', 'division'],
    },
    {
      id: 'ex-04-6',
      title: 'Parse Simple CSV',
      difficulty: 'hard',
      description: 'Write a function that parses a CSV string into an array of objects using the first line as headers.',
      inputSpec: 'str: string — CSV text with newline-separated rows',
      outputSpec: 'array of objects — one object per data row, keys from header row',
      instructions: `
        <p>Write a function called <code>parseCSV</code> that takes a CSV string and returns an array of objects where the keys come from the first (header) row.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Function:</span> <code>parseCSV(str)</code></div>
          <div class="io-spec-row"><span class="io-label">Example input:</span> <code>"name,age\\nAlice,30\\nBob,25"</code></div>
          <div class="io-spec-row"><span class="io-label">Example output:</span> <code>[{name:"Alice",age:"30"},{name:"Bob",age:"25"}]</code></div>
        </div>
        <p>Steps: split by newline to get rows, split the first row by comma for headers, then for each remaining row split by comma and zip with headers into an object. All values are strings.</p>
      `,
      starterCode: `// Write a function called parseCSV\nfunction parseCSV(str) {\n  // your code here\n}`,
      solution: `function parseCSV(str) {\n  const rows = str.split('\\n')\n  const headers = rows[0].split(',')\n  const result = []\n  for (let i = 1; i < rows.length; i++) {\n    if (!rows[i]) continue\n    const values = rows[i].split(',')\n    const obj = {}\n    for (let j = 0; j < headers.length; j++) {\n      obj[headers[j]] = values[j]\n    }\n    result.push(obj)\n  }\n  return result\n}`,
      hints: [
        'Use str.split("\\n") to get an array of rows, then rows[0].split(",") for the headers',
        'Loop from index 1 through the remaining rows, splitting each by comma to get values',
        'For each row, create an object by iterating through headers and using headers[j] as the key and values[j] as the value',
      ],
      testCases: [
        { description: 'parseCSV returns correct array length', test: 'const r = parseCSV("name,age\\nAlice,30\\nBob,25"); return r.length === 2', input: '"name,age\\nAlice,30\\nBob,25"', expected: 'length 2' },
        { description: 'parseCSV first object has correct name', test: 'const r = parseCSV("name,age\\nAlice,30\\nBob,25"); return r[0].name === "Alice"', input: '"name,age\\nAlice,30\\nBob,25"', expected: 'r[0].name === "Alice"' },
        { description: 'parseCSV first object has correct age', test: 'const r = parseCSV("name,age\\nAlice,30\\nBob,25"); return r[0].age === "30"', input: '"name,age\\nAlice,30\\nBob,25"', expected: 'r[0].age === "30"' },
        { description: 'parseCSV second object has correct values', test: 'const r = parseCSV("name,age\\nAlice,30\\nBob,25"); return r[1].name === "Bob" && r[1].age === "25"', input: '"name,age\\nAlice,30\\nBob,25"', expected: 'r[1].name === "Bob"' },
        { description: 'parseCSV empty body returns empty array', test: 'const r = parseCSV("name,age"); return r.length === 0', input: '"name,age"', expected: '[]' },
      ],
      concepts: ['string methods', 'split', 'for loop', 'objects', 'arrays', 'parsing'],
    },
  ],

  questions: [
    {
      id: 'q-04-1',
      question: 'What is the difference between `if/else if/else` and `switch`?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'switch is faster in all cases; if/else is always slower', correct: false },
        { id: 'b', text: 'switch compares one expression to multiple values; if/else can test different expressions', correct: true },
        { id: 'c', text: 'if/else can only test boolean values; switch can test any type', correct: false },
        { id: 'd', text: 'They are completely interchangeable with no differences', correct: false },
      ],
      explanation: 'switch is ideal when comparing a single variable against multiple possible values (like a day of the week). if/else if is more flexible because each branch can test a completely different condition. switch also requires break statements to prevent fall-through.',
    },
    {
      id: 'q-04-2',
      question: 'What does `break` do inside a for loop?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Pauses the loop for one iteration', correct: false },
        { id: 'b', text: 'Skips the current iteration and moves to the next', correct: false },
        { id: 'c', text: 'Exits the loop entirely and continues after it', correct: true },
        { id: 'd', text: 'Resets the loop counter to 0', correct: false },
      ],
      explanation: '`break` immediately exits the enclosing loop. Execution continues with the statement after the loop. Use it to stop looping early when you have found what you were looking for. `continue` (not break) is used to skip to the next iteration.',
    },
    {
      id: 'q-04-3',
      question: 'What is the difference between a `while` loop and a `do...while` loop?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'while loops can only run a fixed number of times', correct: false },
        { id: 'b', text: 'do...while always executes its body at least once; while checks the condition first', correct: true },
        { id: 'c', text: 'do...while is faster than while', correct: false },
        { id: 'd', text: 'They behave identically', correct: false },
      ],
      explanation: 'A while loop checks its condition before the first iteration, so if the condition is false from the start, the body never runs. A do...while loop executes the body first, then checks the condition, guaranteeing at least one execution.',
    },
    {
      id: 'q-04-4',
      question: 'What is the purpose of `try...catch`?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'To run code in parallel threads', correct: false },
        { id: 'b', text: 'To handle runtime errors gracefully and prevent the program from crashing', correct: true },
        { id: 'c', text: 'To validate function arguments before execution', correct: false },
        { id: 'd', text: 'To catch infinite loops before they happen', correct: false },
      ],
      explanation: 'try...catch lets you handle errors that occur at runtime. Code in the try block is executed; if an error is thrown, execution jumps to the catch block where you can handle it. The finally block (optional) always runs regardless of whether an error occurred.',
    },
    {
      id: 'q-04-5',
      question: 'What does `for...of` iterate over compared to `for...in`?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'for...of iterates over object keys; for...in iterates over array values', correct: false },
        { id: 'b', text: 'They are the same', correct: false },
        { id: 'c', text: 'for...of iterates over iterable values (array elements); for...in iterates over object property names (keys)', correct: true },
        { id: 'd', text: 'for...of only works with strings; for...in only works with objects', correct: false },
      ],
      explanation: '`for...of` iterates over the values in any iterable (arrays, strings, Maps, Sets). `for...in` iterates over the enumerable property names (keys) of an object. Avoid using `for...in` on arrays because it can include inherited properties.',
    },
    {
      id: 'q-04-6',
      question: 'How do you throw a custom error in JavaScript?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'error("message")', correct: false },
        { id: 'b', text: 'raise new Error("message")', correct: false },
        { id: 'c', text: 'throw new Error("message")', correct: true },
        { id: 'd', text: 'throw "message"', correct: false },
      ],
      explanation: 'Use `throw new Error("message")` to throw an error object. While you can technically throw any value (including a string), using `new Error()` is best practice because it creates an Error object with a message property and a stack trace for debugging.',
    },
    {
      id: 'q-04-7',
      question: 'Which of the following are valid JavaScript error types? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'TypeError', correct: true },
        { id: 'b', text: 'ReferenceError', correct: true },
        { id: 'c', text: 'SyntaxError', correct: true },
        { id: 'd', text: 'LogicError', correct: false },
      ],
      explanation: 'JavaScript has several built-in error types: TypeError (wrong type used), ReferenceError (undefined variable used), SyntaxError (invalid code), RangeError (value out of range), and more. There is no LogicError type — logic errors are bugs that do not throw exceptions.',
    },
    {
      id: 'q-04-8',
      question: 'What does `continue` do in a loop?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Exits the loop entirely', correct: false },
        { id: 'b', text: 'Skips the rest of the current iteration and jumps to the next one', correct: true },
        { id: 'c', text: 'Restarts the loop from the beginning', correct: false },
        { id: 'd', text: 'Pauses execution for one millisecond', correct: false },
      ],
      explanation: '`continue` skips the remaining statements in the current loop iteration and moves directly to the next iteration (checking the condition again). Use it to skip specific items without exiting the loop. `break` is used to exit the loop entirely.',
    },
  ],
}
