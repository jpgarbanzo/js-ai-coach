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
}
