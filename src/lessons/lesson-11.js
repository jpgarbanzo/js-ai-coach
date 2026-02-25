export default {
  id: '11',
  title: 'Classes',
  description: 'Master object-oriented programming with classes, inheritance, and encapsulation',
  icon: '🎓',
  slides: [
    {
      id: 'slide-11-1',
      title: 'What Are Classes?',
      content: `
        <p>Classes are <strong>templates</strong> for creating objects with the same structure and behavior:</p>
        <div class="code-block">// Without classes — repetitive object literals
const user1 = {
  name: "Alice", age: 25,
  greet() { console.log(\`Hi, I'm \${this.name}\`); }
};
const user2 = {
  name: "Bob", age: 30,
  greet() { console.log(\`Hi, I'm \${this.name}\`); }
};

// With a class — reusable template
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(\`Hi, I'm \${this.name}\`);
  }
}

const user1 = new User("Alice", 25);
const user2 = new User("Bob", 30);</div>
        <p>Classes reduce repetition and make it easy to create many objects with the same shape and methods.</p>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-11-2',
      title: 'Class Syntax: Constructor and Methods',
      content: `
        <p>A class body contains the <code>constructor</code> and any number of methods:</p>
        <div class="code-block">class Person {
  // constructor runs automatically when you call new Person(...)
  constructor(name, age) {
    this.name = name; // instance property
    this.age = age;
  }

  // instance method
  introduce() {
    return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
  }

  haveBirthday() {
    this.age++;
    console.log(\`Happy birthday! Now \${this.age}.\`);
  }
}

const alice = new Person("Alice", 25);
const bob   = new Person("Bob", 30);

console.log(alice.introduce()); // "Hello, I'm Alice and I'm 25 years old."
bob.haveBirthday();             // "Happy birthday! Now 31."</div>
        <p><strong>Key keywords:</strong></p>
        <ul>
          <li><code>class</code> — declares the class</li>
          <li><code>constructor</code> — initializes instance properties</li>
          <li><code>this</code> — refers to the current object instance</li>
          <li><code>new</code> — creates a new instance from the class</li>
        </ul>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-11-1',
        title: 'Build a BankAccount Class',
        description: 'Create a class with a constructor and instance methods.',
        instructions: `
          <p>Create a class called <code>BankAccount</code> that:</p>
          <ul>
            <li>Has a <code>constructor(owner, balance)</code> that sets <code>this.owner</code> and <code>this.balance</code></li>
            <li>Has a <code>deposit(amount)</code> method that adds to the balance and returns the new balance</li>
            <li>Has a <code>withdraw(amount)</code> method that subtracts from the balance if sufficient funds exist, and returns the new balance. If <code>amount > this.balance</code>, return the string <code>"Insufficient funds"</code> (do not change balance)</li>
            <li>Has a <code>getBalance()</code> method that returns the current balance</li>
          </ul>
          <p>Example:</p>
          <pre>const acc = new BankAccount("Alice", 100);
acc.deposit(50);   // returns 150
acc.withdraw(30);  // returns 120
acc.withdraw(200); // returns "Insufficient funds"</pre>
        `,
        starterCode: `// Write your class here
class BankAccount {
  constructor(owner, balance) {
    // Set this.owner and this.balance
  }

  deposit(amount) {
    // Add amount to balance, return new balance
  }

  withdraw(amount) {
    // Subtract if funds available, else return "Insufficient funds"
  }

  getBalance() {
    // Return current balance
  }
}`,
        solution: `class BankAccount {
  constructor(owner, balance) {
    this.owner = owner
    this.balance = balance
  }

  deposit(amount) {
    this.balance += amount
    return this.balance
  }

  withdraw(amount) {
    if (amount > this.balance) {
      return "Insufficient funds"
    }
    this.balance -= amount
    return this.balance
  }

  getBalance() {
    return this.balance
  }
}`,
        hints: [
          'In the constructor, assign: this.owner = owner; this.balance = balance',
          'deposit adds to this.balance: this.balance += amount; return this.balance',
          'withdraw checks: if (amount > this.balance) return "Insufficient funds"; otherwise subtract and return',
        ],
        testCases: [
          {
            description: 'deposit increases balance',
            test: `const acc = new BankAccount("Alice", 100); return acc.deposit(50) === 150`,
            input: 'new BankAccount("Alice", 100), deposit(50)',
            expected: '150',
          },
          {
            description: 'withdraw returns new balance',
            test: `const acc = new BankAccount("Alice", 100); acc.deposit(50); return acc.withdraw(30) === 120`,
            input: 'withdraw(30) after balance is 150',
            expected: '120',
          },
          {
            description: 'withdraw returns "Insufficient funds" when too low',
            test: `const acc = new BankAccount("Alice", 100); return acc.withdraw(200) === "Insufficient funds"`,
            input: 'withdraw(200) with balance 100',
            expected: '"Insufficient funds"',
          },
          {
            description: 'balance unchanged after failed withdraw',
            test: `const acc = new BankAccount("Alice", 100); acc.withdraw(200); return acc.getBalance() === 100`,
            input: 'balance after failed withdraw',
            expected: '100',
          },
          {
            description: 'getBalance returns current balance',
            test: `const acc = new BankAccount("Bob", 500); acc.deposit(100); return acc.getBalance() === 600`,
            input: 'getBalance after deposit',
            expected: '600',
          },
        ],
        difficulty: 'beginner',
        concepts: ['class', 'constructor', 'methods', 'this', 'new'],
      },
    },
    {
      id: 'slide-11-3',
      title: 'Getters and Setters',
      content: `
        <p>Getters and setters control how properties are read and written:</p>
        <div class="code-block">class Product {
  constructor(name, price) {
    this.name = name;
    this._price = price; // convention: _ suggests "internal"
  }

  // getter — read as a property, not a method call
  get price() {
    return \`$\${this._price.toFixed(2)}\`;
  }

  // setter — validate before storing
  set price(newPrice) {
    if (newPrice < 0) {
      console.error("Price cannot be negative");
      return;
    }
    this._price = newPrice;
  }

  // computed getter — no backing property needed
  get priceWithTax() {
    return \`$\${(this._price * 1.16).toFixed(2)}\`;
  }
}

const laptop = new Product("Laptop", 999.99);
console.log(laptop.price);        // "$999.99" (getter called)
console.log(laptop.priceWithTax); // "$1159.99"
laptop.price = 1200;              // setter called, valid
laptop.price = -50;               // error: cannot be negative</div>
      `,
      hasExercise: false,
    },
    {
      id: 'slide-11-4',
      title: 'Static Methods and Properties',
      content: `
        <p>Static members belong to the class itself, not to instances:</p>
        <div class="code-block">class MathUtils {
  static PI = 3.14159;

  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }

  static circleArea(radius) {
    return MathUtils.PI * radius * radius;
  }
}

// Call on the class — no new needed
console.log(MathUtils.add(5, 3));          // 8
console.log(MathUtils.circleArea(10));     // 314.159
console.log(MathUtils.PI);                 // 3.14159

// Static methods are not available on instances
const m = new MathUtils();
// m.add(1, 2); // TypeError

// Common use: factory methods
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  static createAdmin(name) {
    return new User(name, "admin");
  }
}
const admin = User.createAdmin("Alice"); // User { name: "Alice", role: "admin" }</div>
        <p><strong>Use cases:</strong> utility functions, constants, factory methods that create class instances.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-11-2',
        title: 'Temperature Converter Class',
        description: 'Create a class with static utility methods.',
        instructions: `
          <p>Create a class called <code>Temperature</code> with only <strong>static</strong> methods:</p>
          <ul>
            <li><code>static toFahrenheit(celsius)</code> — converts Celsius to Fahrenheit: <code>(celsius * 9/5) + 32</code></li>
            <li><code>static toCelsius(fahrenheit)</code> — converts Fahrenheit to Celsius: <code>(fahrenheit - 32) * 5/9</code></li>
            <li><code>static describe(celsius)</code> — returns a string describing the temperature:
              <ul>
                <li><code>"freezing"</code> if celsius &lt; 0</li>
                <li><code>"cold"</code> if celsius &lt; 15</li>
                <li><code>"warm"</code> if celsius &lt; 25</li>
                <li><code>"hot"</code> otherwise</li>
              </ul>
            </li>
          </ul>
          <p>Round results to 2 decimal places using <code>Math.round(value * 100) / 100</code>.</p>
        `,
        starterCode: `// Write your class here
class Temperature {
  static toFahrenheit(celsius) {
    // celsius to fahrenheit
  }

  static toCelsius(fahrenheit) {
    // fahrenheit to celsius
  }

  static describe(celsius) {
    // return "freezing", "cold", "warm", or "hot"
  }
}`,
        solution: `class Temperature {
  static toFahrenheit(celsius) {
    return Math.round((celsius * 9 / 5 + 32) * 100) / 100
  }

  static toCelsius(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5 / 9) * 100) / 100
  }

  static describe(celsius) {
    if (celsius < 0) return "freezing"
    if (celsius < 15) return "cold"
    if (celsius < 25) return "warm"
    return "hot"
  }
}`,
        hints: [
          'All three methods need the static keyword: static toFahrenheit(celsius) { ... }',
          'For toFahrenheit: return Math.round((celsius * 9 / 5 + 32) * 100) / 100',
          'For describe, use if/else chains comparing celsius to 0, 15, and 25',
        ],
        testCases: [
          {
            description: 'Temperature.toFahrenheit(0) returns 32',
            test: `return Temperature.toFahrenheit(0) === 32`,
            input: '0',
            expected: '32',
          },
          {
            description: 'Temperature.toFahrenheit(100) returns 212',
            test: `return Temperature.toFahrenheit(100) === 212`,
            input: '100',
            expected: '212',
          },
          {
            description: 'Temperature.toCelsius(32) returns 0',
            test: `return Temperature.toCelsius(32) === 0`,
            input: '32',
            expected: '0',
          },
          {
            description: 'Temperature.toCelsius(212) returns 100',
            test: `return Temperature.toCelsius(212) === 100`,
            input: '212',
            expected: '100',
          },
          {
            description: 'Temperature.describe(-5) returns "freezing"',
            test: `return Temperature.describe(-5) === "freezing"`,
            input: '-5',
            expected: '"freezing"',
          },
          {
            description: 'Temperature.describe(10) returns "cold"',
            test: `return Temperature.describe(10) === "cold"`,
            input: '10',
            expected: '"cold"',
          },
          {
            description: 'Temperature.describe(20) returns "warm"',
            test: `return Temperature.describe(20) === "warm"`,
            input: '20',
            expected: '"warm"',
          },
          {
            description: 'Temperature.describe(35) returns "hot"',
            test: `return Temperature.describe(35) === "hot"`,
            input: '35',
            expected: '"hot"',
          },
        ],
        difficulty: 'beginner',
        concepts: ['static methods', 'class', 'utility functions', 'conditionals'],
      },
    },
    {
      id: 'slide-11-5',
      title: 'Inheritance with extends and super',
      content: `
        <p>Classes can inherit from other classes using <code>extends</code>:</p>
        <div class="code-block">// Base class (parent)
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    return \`\${this.name} is eating.\`;
  }
  describe() {
    return \`\${this.name}, age \${this.age}\`;
  }
}

// Derived class (child) — inherits from Animal
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age); // must call parent constructor first
    this.breed = breed;
  }
  bark() {
    return \`\${this.name} says: Woof!\`;
  }
  // override parent method
  describe() {
    return super.describe() + \`, breed: \${this.breed}\`;
  }
}

const dog = new Dog("Max", 3, "Labrador");
console.log(dog.eat());      // "Max is eating."   (inherited)
console.log(dog.bark());     // "Max says: Woof!"  (own method)
console.log(dog.describe()); // "Max, age 3, breed: Labrador"</div>
        <p><code>super()</code> calls the parent class constructor. <code>super.method()</code> calls a parent method from an override.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-11-3',
        title: 'Shape Hierarchy',
        description: 'Use inheritance to build a class hierarchy for geometric shapes.',
        instructions: `
          <p>Create two classes:</p>
          <p><strong>Base class <code>Shape</code>:</strong></p>
          <ul>
            <li><code>constructor(color)</code> that sets <code>this.color</code></li>
            <li>Method <code>describe()</code> that returns <code>"A [color] shape"</code></li>
          </ul>
          <p><strong>Derived class <code>Rectangle</code> extends Shape:</strong></p>
          <ul>
            <li><code>constructor(color, width, height)</code> — calls <code>super(color)</code>, sets <code>this.width</code> and <code>this.height</code></li>
            <li>Getter <code>area</code> that returns <code>width * height</code></li>
            <li>Getter <code>perimeter</code> that returns <code>2 * (width + height)</code></li>
            <li>Override <code>describe()</code> to return <code>"A [color] rectangle (WxH)"</code> e.g. <code>"A red rectangle (4x5)"</code></li>
          </ul>
        `,
        starterCode: `// Write your classes here
class Shape {
  constructor(color) {
    // set this.color
  }

  describe() {
    // return "A [color] shape"
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    // call super, set width and height
  }

  get area() {
    // return width * height
  }

  get perimeter() {
    // return 2 * (width + height)
  }

  describe() {
    // return "A [color] rectangle ([width]x[height])"
  }
}`,
        solution: `class Shape {
  constructor(color) {
    this.color = color
  }

  describe() {
    return \`A \${this.color} shape\`
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color)
    this.width = width
    this.height = height
  }

  get area() {
    return this.width * this.height
  }

  get perimeter() {
    return 2 * (this.width + this.height)
  }

  describe() {
    return \`A \${this.color} rectangle (\${this.width}x\${this.height})\`
  }
}`,
        hints: [
          'In Rectangle\'s constructor, call super(color) before accessing this',
          'Getters use the get keyword: get area() { return this.width * this.height }',
          'The describe() override can use a template literal: `A ${this.color} rectangle (${this.width}x${this.height})`',
        ],
        testCases: [
          {
            description: 'Shape.describe() returns correct string',
            test: `const s = new Shape("blue"); return s.describe() === "A blue shape"`,
            input: 'new Shape("blue")',
            expected: '"A blue shape"',
          },
          {
            description: 'Rectangle.area returns width * height',
            test: `const r = new Rectangle("red", 4, 5); return r.area === 20`,
            input: 'new Rectangle("red", 4, 5)',
            expected: '20',
          },
          {
            description: 'Rectangle.perimeter returns 2*(w+h)',
            test: `const r = new Rectangle("red", 4, 5); return r.perimeter === 18`,
            input: 'new Rectangle("red", 4, 5)',
            expected: '18',
          },
          {
            description: 'Rectangle.describe() overrides Shape.describe()',
            test: `const r = new Rectangle("red", 4, 5); return r.describe() === "A red rectangle (4x5)"`,
            input: 'new Rectangle("red", 4, 5)',
            expected: '"A red rectangle (4x5)"',
          },
          {
            description: 'Rectangle inherits color from Shape',
            test: `const r = new Rectangle("green", 3, 6); return r.color === "green"`,
            input: 'new Rectangle("green", 3, 6)',
            expected: 'color "green"',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['extends', 'super', 'inheritance', 'getters', 'method overriding'],
      },
    },
    {
      id: 'slide-11-6',
      title: 'Private Fields (#)',
      content: `
        <p>Private class fields use the <code>#</code> prefix and are inaccessible outside the class:</p>
        <div class="code-block">class User {
  #password; // declare private field

  constructor(username, password) {
    this.username = username; // public
    this.#password = password; // private
  }

  verifyPassword(attempt) {
    return attempt === this.#password;
  }

  changePassword(oldPass, newPass) {
    if (this.verifyPassword(oldPass)) {
      this.#password = newPass;
      return "Password changed successfully";
    }
    return "Incorrect password";
  }
}

const user = new User("alice@example.com", "secret123");
console.log(user.username);           // "alice@example.com" (public)
// console.log(user.#password);       // SyntaxError — truly private
console.log(user.verifyPassword("secret123")); // true</div>
        <p><strong>Convention vs. reality:</strong> <code>_property</code> with an underscore is only a naming convention — it is still publicly accessible. <code>#field</code> is enforced by the language and throws an error if accessed from outside.</p>
      `,
      hasExercise: true,
      exercise: {
        id: 'ex-11-4',
        title: 'Counter with Private State',
        description: 'Use a private field to encapsulate the internal state of a counter.',
        instructions: `
          <p>Create a class called <code>Counter</code> that:</p>
          <ul>
            <li>Has a <strong>private field</strong> <code>#count</code> initialized to <code>0</code></li>
            <li><code>constructor(start = 0)</code> — sets <code>#count</code> to <code>start</code></li>
            <li><code>increment()</code> — increases <code>#count</code> by 1, returns the new value</li>
            <li><code>decrement()</code> — decreases <code>#count</code> by 1, returns the new value</li>
            <li><code>reset()</code> — resets <code>#count</code> to the original <code>start</code> value, returns <code>0</code></li>
            <li>Getter <code>value</code> — returns the current <code>#count</code></li>
          </ul>
          <p>The internal count must be inaccessible from outside the class.</p>
        `,
        starterCode: `// Write your class here
class Counter {
  #count;

  constructor(start = 0) {
    // initialize #count
  }

  increment() {
    // increase #count and return new value
  }

  decrement() {
    // decrease #count and return new value
  }

  reset() {
    // reset to start value, return 0
  }

  get value() {
    // return current #count
  }
}`,
        solution: `class Counter {
  #count
  #start

  constructor(start = 0) {
    this.#count = start
    this.#start = start
  }

  increment() {
    return ++this.#count
  }

  decrement() {
    return --this.#count
  }

  reset() {
    this.#count = this.#start
    return 0
  }

  get value() {
    return this.#count
  }
}`,
        hints: [
          'Declare private fields at the top of the class body: #count; #start',
          'In the constructor, assign: this.#count = start; this.#start = start',
          'increment() returns ++this.#count; decrement() returns --this.#count',
        ],
        testCases: [
          {
            description: 'Counter starts at default 0',
            test: `const c = new Counter(); return c.value === 0`,
            input: 'new Counter()',
            expected: '0',
          },
          {
            description: 'Counter starts at given value',
            test: `const c = new Counter(10); return c.value === 10`,
            input: 'new Counter(10)',
            expected: '10',
          },
          {
            description: 'increment() returns new value',
            test: `const c = new Counter(); return c.increment() === 1`,
            input: 'increment after 0',
            expected: '1',
          },
          {
            description: 'decrement() returns new value',
            test: `const c = new Counter(5); return c.decrement() === 4`,
            input: 'decrement after 5',
            expected: '4',
          },
          {
            description: 'reset() returns 0 and resets to start',
            test: `const c = new Counter(5); c.increment(); c.increment(); c.reset(); return c.value === 5`,
            input: 'reset after increments',
            expected: 'value back to 5',
          },
          {
            description: '#count is not accessible from outside',
            test: `const c = new Counter(3); try { return c['#count'] === undefined || c['#count'] === null; } catch(e) { return true; }`,
            input: 'try to access #count',
            expected: 'private — not accessible',
          },
        ],
        difficulty: 'intermediate',
        concepts: ['private fields', '#', 'encapsulation', 'getters', 'class'],
      },
    },
  ],

  exercises: [
    {
      id: 'ex-11-1',
      title: 'Rectangle Class',
      difficulty: 'beginner',
      description: 'Create a Rectangle class with area and perimeter methods.',
      inputSpec: 'constructor(w: number, h: number)',
      outputSpec: 'Rectangle instance with area() and perimeter() methods',
      instructions: `
        <p>Implement a <code>Rectangle</code> class that stores width and height and provides methods to calculate area and perimeter.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Class:</span> <code>Rectangle</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>new Rectangle(4, 5).area() → 20</code></div>
        </div>
        <p>Methods: <code>area()</code> returns width * height; <code>perimeter()</code> returns 2 * (width + height). Store width and height as instance properties in the constructor.</p>
      `,
      starterCode: `// Write a class called Rectangle\nclass Rectangle {\n  constructor(w, h) {\n    // your code here\n  }\n\n  area() {\n    // your code here\n  }\n\n  perimeter() {\n    // your code here\n  }\n}`,
      solution: `class Rectangle {\n  constructor(w, h) {\n    this.w = w\n    this.h = h\n  }\n\n  area() {\n    return this.w * this.h\n  }\n\n  perimeter() {\n    return 2 * (this.w + this.h)\n  }\n}`,
      hints: [
        'In the constructor, assign this.w = w and this.h = h',
        'area() returns this.w * this.h',
        'perimeter() returns 2 * (this.w + this.h)',
      ],
      testCases: [
        { description: 'area() returns width * height', test: 'return new Rectangle(4, 5).area() === 20', input: 'new Rectangle(4, 5)', expected: '20' },
        { description: 'perimeter() returns 2*(w+h)', test: 'return new Rectangle(4, 5).perimeter() === 18', input: 'new Rectangle(4, 5)', expected: '18' },
        { description: 'area works with square', test: 'return new Rectangle(3, 3).area() === 9', input: 'new Rectangle(3, 3)', expected: '9' },
        { description: 'each instance is independent', test: 'const a = new Rectangle(2, 3); const b = new Rectangle(10, 10); return a.area() === 6 && b.area() === 100', input: 'two instances', expected: '6 and 100' },
      ],
      concepts: ['class', 'constructor', 'methods', 'this', 'arithmetic'],
    },
    {
      id: 'ex-11-2',
      title: 'Stack Class',
      difficulty: 'beginner',
      description: 'Implement a Stack data structure using a class.',
      inputSpec: 'Stack class (no constructor arguments needed)',
      outputSpec: 'Stack instance with push, pop, peek, isEmpty, and size getter',
      instructions: `
        <p>Implement a <code>Stack</code> class that follows the Last-In-First-Out (LIFO) principle.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Class:</span> <code>Stack</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>const s = new Stack(); s.push(1); s.push(2); s.pop() → 2</code></div>
        </div>
        <p>Methods: <code>push(val)</code> adds to the top; <code>pop()</code> removes and returns the top value (or <code>undefined</code> if empty); <code>peek()</code> returns the top without removing it (or <code>undefined</code>); <code>isEmpty()</code> returns a boolean. Add a <code>size</code> getter that returns the number of items.</p>
      `,
      starterCode: `// Write a class called Stack\nclass Stack {\n  constructor() {\n    // your code here\n  }\n\n  push(val) {\n    // your code here\n  }\n\n  pop() {\n    // your code here\n  }\n\n  peek() {\n    // your code here\n  }\n\n  isEmpty() {\n    // your code here\n  }\n\n  get size() {\n    // your code here\n  }\n}`,
      solution: `class Stack {\n  constructor() {\n    this._items = []\n  }\n\n  push(val) {\n    this._items.push(val)\n  }\n\n  pop() {\n    return this._items.pop()\n  }\n\n  peek() {\n    return this._items[this._items.length - 1]\n  }\n\n  isEmpty() {\n    return this._items.length === 0\n  }\n\n  get size() {\n    return this._items.length\n  }\n}`,
      hints: [
        'Store items in an internal array: this._items = []',
        'push() appends to the array; pop() removes from the end',
        'peek() returns the last element without removing it: this._items[this._items.length - 1]',
      ],
      testCases: [
        { description: 'pop() returns last pushed value', test: 'const s = new Stack(); s.push(1); s.push(2); return s.pop() === 2', input: 'push(1), push(2), pop()', expected: '2' },
        { description: 'peek() returns top without removing', test: 'const s = new Stack(); s.push(5); return s.peek() === 5 && s.size === 1', input: 'push(5), peek()', expected: '5 and size still 1' },
        { description: 'isEmpty() returns true on new stack', test: 'return new Stack().isEmpty() === true', input: 'new Stack()', expected: 'true' },
        { description: 'size getter tracks item count', test: 'const s = new Stack(); s.push("a"); s.push("b"); return s.size === 2', input: 'push twice', expected: '2' },
        { description: 'pop() returns undefined when empty', test: 'return new Stack().pop() === undefined', input: 'pop on empty stack', expected: 'undefined' },
      ],
      concepts: ['class', 'constructor', 'methods', 'getters', 'arrays', 'stack data structure'],
    },
    {
      id: 'ex-11-3',
      title: 'Counter Class',
      difficulty: 'beginner',
      description: 'Build a Counter class with increment, decrement, reset, and a value getter.',
      inputSpec: 'constructor(start?: number) — default start is 0',
      outputSpec: 'Counter instance with increment(), decrement(), reset(), and value getter',
      instructions: `
        <p>Implement a <code>Counter</code> class that tracks a numeric count with a configurable starting value.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Class:</span> <code>Counter</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>const c = new Counter(5); c.increment(); c.value → 6</code></div>
        </div>
        <p><code>increment()</code> increases the count by 1; <code>decrement()</code> decreases it by 1; <code>reset()</code> returns the count to the original start value; <code>value</code> is a getter that returns the current count.</p>
      `,
      starterCode: `// Write a class called Counter\nclass Counter {\n  constructor(start = 0) {\n    // your code here\n  }\n\n  increment() {\n    // your code here\n  }\n\n  decrement() {\n    // your code here\n  }\n\n  reset() {\n    // your code here\n  }\n\n  get value() {\n    // your code here\n  }\n}`,
      solution: `class Counter {\n  constructor(start = 0) {\n    this._start = start\n    this._count = start\n  }\n\n  increment() {\n    this._count++\n  }\n\n  decrement() {\n    this._count--\n  }\n\n  reset() {\n    this._count = this._start\n  }\n\n  get value() {\n    return this._count\n  }\n}`,
      hints: [
        'Store both the start value and the current count: this._start = start; this._count = start',
        'increment() and decrement() modify this._count by ±1',
        'reset() assigns this._count = this._start to return to the original value',
      ],
      testCases: [
        { description: 'starts at default 0', test: 'return new Counter().value === 0', input: 'new Counter()', expected: '0' },
        { description: 'starts at given value', test: 'return new Counter(10).value === 10', input: 'new Counter(10)', expected: '10' },
        { description: 'increment() increases value', test: 'const c = new Counter(); c.increment(); return c.value === 1', input: 'increment once', expected: '1' },
        { description: 'decrement() decreases value', test: 'const c = new Counter(5); c.decrement(); return c.value === 4', input: 'decrement from 5', expected: '4' },
        { description: 'reset() returns to start', test: 'const c = new Counter(3); c.increment(); c.increment(); c.reset(); return c.value === 3', input: 'increment twice then reset', expected: '3' },
      ],
      concepts: ['class', 'constructor', 'default parameters', 'methods', 'getters', 'this'],
    },
    {
      id: 'ex-11-4',
      title: 'Animal and Dog Inheritance',
      difficulty: 'medium',
      description: 'Extend an Animal base class with a Dog subclass that overrides speak() and adds fetch().',
      inputSpec: 'Animal(name: string), Dog extends Animal',
      outputSpec: 'Dog instance with inherited name, overridden speak(), and new fetch() method',
      instructions: `
        <p>Implement two classes:</p>
        <p><strong>Base class <code>Animal</code>:</strong> constructor takes <code>name</code> and sets <code>this.name</code>. Has a <code>speak()</code> method returning <code>"..."</code>.</p>
        <p><strong>Derived class <code>Dog</code> extends Animal:</strong> constructor calls <code>super(name)</code>. Overrides <code>speak()</code> to return <code>"Woof! I'm [name]"</code>. Adds <code>fetch()</code> returning <code>"[name] fetches the ball"</code>.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>new Dog("Rex").speak() → "Woof! I'm Rex"</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>new Dog("Rex").fetch() → "Rex fetches the ball"</code></div>
        </div>
      `,
      starterCode: `// Write your classes here\nclass Animal {\n  constructor(name) {\n    // your code here\n  }\n\n  speak() {\n    // return "..."\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name) {\n    // your code here\n  }\n\n  speak() {\n    // return "Woof! I'm [name]"\n  }\n\n  fetch() {\n    // return "[name] fetches the ball"\n  }\n}`,
      solution: `class Animal {\n  constructor(name) {\n    this.name = name\n  }\n\n  speak() {\n    return '...'\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name) {\n    super(name)\n  }\n\n  speak() {\n    return \`Woof! I'm \${this.name}\`\n  }\n\n  fetch() {\n    return \`\${this.name} fetches the ball\`\n  }\n}`,
      hints: [
        'Animal constructor: this.name = name; speak() returns "..."',
        'Dog constructor must call super(name) before using this',
        'Dog speak() uses a template literal: `Woof! I\'m ${this.name}`; fetch() uses: `${this.name} fetches the ball`',
      ],
      testCases: [
        { description: 'Animal.speak() returns "..."', test: 'return new Animal("Cat").speak() === "..."', input: 'new Animal("Cat")', expected: '"..."' },
        { description: 'Dog.speak() returns overridden message', test: 'return new Dog("Rex").speak() === "Woof! I\'m Rex"', input: 'new Dog("Rex")', expected: '"Woof! I\'m Rex"' },
        { description: 'Dog.fetch() returns fetch message', test: 'return new Dog("Buddy").fetch() === "Buddy fetches the ball"', input: 'new Dog("Buddy")', expected: '"Buddy fetches the ball"' },
        { description: 'Dog inherits name from Animal', test: 'return new Dog("Max").name === "Max"', input: 'new Dog("Max")', expected: '"Max"' },
        { description: 'Dog is an instance of Animal', test: 'return new Dog("X") instanceof Animal', input: 'instanceof check', expected: 'true' },
      ],
      concepts: ['extends', 'super', 'inheritance', 'method overriding', 'instanceof'],
    },
    {
      id: 'ex-11-5',
      title: 'BankAccount with Private Balance',
      difficulty: 'medium',
      description: 'Create a BankAccount class with a private #balance field, deposit/withdraw methods, a balance getter, and a static factory.',
      inputSpec: 'constructor(initialBalance: number)',
      outputSpec: 'BankAccount instance — deposit, withdraw, balance getter, static fromJSON',
      instructions: `
        <p>Implement a <code>BankAccount</code> class that uses a private field for security.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Class:</span> <code>BankAccount</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>const acc = new BankAccount(100); acc.deposit(50); acc.balance → 150</code></div>
        </div>
        <p>Requirements: <code>#balance</code> is a private field; <code>deposit(amt)</code> adds to balance; <code>withdraw(amt)</code> throws <code>Error("Insufficient funds")</code> if <code>amt > #balance</code>, otherwise subtracts; <code>balance</code> is a getter returning <code>#balance</code>; <code>static fromJSON({balance})</code> factory creates a new instance.</p>
      `,
      starterCode: `// Write a class called BankAccount\nclass BankAccount {\n  #balance\n\n  constructor(initialBalance) {\n    // your code here\n  }\n\n  deposit(amt) {\n    // your code here\n  }\n\n  withdraw(amt) {\n    // throws if insufficient, otherwise subtracts\n  }\n\n  get balance() {\n    // your code here\n  }\n\n  static fromJSON(data) {\n    // create a new BankAccount from { balance } object\n  }\n}`,
      solution: `class BankAccount {\n  #balance\n\n  constructor(initialBalance) {\n    this.#balance = initialBalance\n  }\n\n  deposit(amt) {\n    this.#balance += amt\n  }\n\n  withdraw(amt) {\n    if (amt > this.#balance) throw new Error('Insufficient funds')\n    this.#balance -= amt\n  }\n\n  get balance() {\n    return this.#balance\n  }\n\n  static fromJSON(data) {\n    return new BankAccount(data.balance)\n  }\n}`,
      hints: [
        'Declare #balance at the top of the class, initialize it in the constructor',
        'withdraw throws: if (amt > this.#balance) throw new Error("Insufficient funds")',
        'fromJSON is static: static fromJSON({ balance }) { return new BankAccount(balance) }',
      ],
      testCases: [
        { description: 'deposit increases balance', test: 'const acc = new BankAccount(100); acc.deposit(50); return acc.balance === 150', input: 'deposit(50) from 100', expected: '150' },
        { description: 'withdraw decreases balance', test: 'const acc = new BankAccount(100); acc.withdraw(30); return acc.balance === 70', input: 'withdraw(30) from 100', expected: '70' },
        { description: 'withdraw throws when insufficient', test: 'const acc = new BankAccount(50); try { acc.withdraw(100); return false } catch(e) { return e.message === "Insufficient funds" }', input: 'withdraw(100) from 50', expected: 'throws "Insufficient funds"' },
        { description: 'fromJSON creates instance with correct balance', test: 'const acc = BankAccount.fromJSON({ balance: 250 }); return acc.balance === 250', input: 'fromJSON({balance:250})', expected: '250' },
        { description: '#balance is not directly accessible', test: 'const acc = new BankAccount(100); return acc["#balance"] === undefined', input: 'access #balance externally', expected: 'undefined' },
      ],
      concepts: ['private fields', '#', 'getters', 'static methods', 'factory pattern', 'throw'],
    },
    {
      id: 'ex-11-6',
      title: 'EventEmitter Class',
      difficulty: 'hard',
      description: 'Implement an EventEmitter class with on, off, emit, and once methods.',
      inputSpec: 'EventEmitter class with on(event, listener), off(event, listener), emit(event, ...args), once(event, listener)',
      outputSpec: 'EventEmitter instance that manages event subscriptions and dispatches events',
      instructions: `
        <p>Implement a classic <code>EventEmitter</code> class that allows subscribing to, emitting, and unsubscribing from named events.</p>
        <div class="io-spec">
          <div class="io-spec-row"><span class="io-label">Class:</span> <code>EventEmitter</code></div>
          <div class="io-spec-row"><span class="io-label">Example:</span> <code>const e = new EventEmitter(); e.on("click", fn); e.emit("click", 42)</code></div>
        </div>
        <p>Methods: <code>on(event, listener)</code> registers a listener; <code>off(event, listener)</code> removes a specific listener; <code>emit(event, ...args)</code> calls all listeners for the event with the given args; <code>once(event, listener)</code> registers a listener that automatically removes itself after firing once.</p>
      `,
      starterCode: `// Write a class called EventEmitter\nclass EventEmitter {\n  constructor() {\n    // your code here\n  }\n\n  on(event, listener) {\n    // your code here\n  }\n\n  off(event, listener) {\n    // your code here\n  }\n\n  emit(event, ...args) {\n    // your code here\n  }\n\n  once(event, listener) {\n    // your code here\n  }\n}`,
      solution: `class EventEmitter {\n  constructor() {\n    this._events = {}\n  }\n\n  on(event, listener) {\n    if (!this._events[event]) this._events[event] = []\n    this._events[event].push(listener)\n  }\n\n  off(event, listener) {\n    if (!this._events[event]) return\n    this._events[event] = this._events[event].filter(l => l !== listener)\n  }\n\n  emit(event, ...args) {\n    if (!this._events[event]) return\n    this._events[event].forEach(l => l(...args))\n  }\n\n  once(event, listener) {\n    const wrapper = (...args) => {\n      listener(...args)\n      this.off(event, wrapper)\n    }\n    this.on(event, wrapper)\n  }\n}`,
      hints: [
        'Store listeners in an object keyed by event name: this._events = {}',
        'on() pushes the listener into the array for that event; off() filters it out by reference equality',
        'once() creates a wrapper function that calls the listener then calls this.off() to remove itself',
      ],
      testCases: [
        { description: 'on() registers a listener that fires on emit()', test: 'const e = new EventEmitter(); let called = false; e.on("x", () => { called = true }); e.emit("x"); return called', input: 'on then emit', expected: 'listener called' },
        { description: 'emit() passes arguments to listeners', test: 'const e = new EventEmitter(); let val; e.on("data", v => { val = v }); e.emit("data", 42); return val === 42', input: 'emit with arg 42', expected: '42 received' },
        { description: 'off() removes the listener', test: 'const e = new EventEmitter(); let n = 0; const fn = () => n++; e.on("x", fn); e.off("x", fn); e.emit("x"); return n === 0', input: 'on, off, then emit', expected: 'listener not called' },
        { description: 'once() listener fires exactly once', test: 'const e = new EventEmitter(); let n = 0; e.once("x", () => n++); e.emit("x"); e.emit("x"); return n === 1', input: 'emit twice after once()', expected: 'n === 1' },
        { description: 'multiple listeners for same event all fire', test: 'const e = new EventEmitter(); let n = 0; e.on("x", () => n++); e.on("x", () => n++); e.emit("x"); return n === 2', input: 'two listeners, one emit', expected: 'n === 2' },
      ],
      concepts: ['classes', 'event emitter pattern', 'closures', 'higher-order functions', 'filter', 'forEach'],
    },
  ],

  questions: [
    {
      id: 'q-11-1',
      question: 'What is the primary difference between class syntax and the older constructor function approach?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Classes create truly different objects; constructor functions create plain objects', correct: false },
        { id: 'b', text: 'Class syntax is syntactic sugar over prototypal inheritance — it is cleaner to write but works the same way under the hood', correct: true },
        { id: 'c', text: 'Classes cannot inherit from other classes; constructor functions can', correct: false },
        { id: 'd', text: 'Constructor functions are faster because they skip the prototype chain', correct: false },
      ],
      explanation: 'ES6 classes are syntactic sugar over JavaScript\'s existing prototype-based inheritance. Under the hood, a class creates the same prototype chain as a constructor function. Classes provide cleaner syntax, mandatory new-keyword enforcement, and built-in support for super, but the runtime behavior is identical.',
    },
    {
      id: 'q-11-2',
      question: 'What does the constructor method do in a class?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'It defines static methods on the class', correct: false },
        { id: 'b', text: 'It runs automatically when new ClassName() is called and is used to initialize instance properties', correct: true },
        { id: 'c', text: 'It runs once when the file is loaded, not when instances are created', correct: false },
        { id: 'd', text: 'It is optional and has no special behavior in a class', correct: false },
      ],
      explanation: 'The constructor is a special method called automatically each time new ClassName() is invoked. It sets up instance-specific properties on the newly created object (referenced as this). If no constructor is defined, a default empty one is used automatically.',
    },
    {
      id: 'q-11-3',
      question: 'What is the difference between an instance method and a static method?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Instance methods use arrow function syntax; static methods use regular function syntax', correct: false },
        { id: 'b', text: 'Instance methods are called on objects (instances); static methods are called on the class itself and do not have access to "this" as an instance', correct: true },
        { id: 'c', text: 'Static methods are private; instance methods are public', correct: false },
        { id: 'd', text: 'They are identical — "static" is just a naming convention', correct: false },
      ],
      explanation: 'Instance methods live on the prototype and are called via an object: myObj.method(). Static methods are attached to the class constructor itself and called via the class: MyClass.method(). Static methods are useful for utility functions and factory methods that don\'t need per-instance state.',
    },
    {
      id: 'q-11-4',
      question: 'How do you define a getter in a class, and how is it accessed?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'With the get keyword before the method name; accessed as a property (no parentheses)', correct: true },
        { id: 'b', text: 'With the getter keyword; accessed by calling it like a method: obj.getterName()', correct: false },
        { id: 'c', text: 'Getters are defined in the constructor with this.getX = () => x', correct: false },
        { id: 'd', text: 'With an @ decorator; no special access syntax needed', correct: false },
      ],
      explanation: 'Getters use the get keyword: get fullName() { return this.first + " " + this.last; }. They are accessed without parentheses — obj.fullName — as if they were a regular property. This lets you compute a value on access without exposing the underlying storage.',
    },
    {
      id: 'q-11-5',
      question: 'When extending a class, what must you do before using "this" in the subclass constructor?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Call Object.assign(this, parent)', correct: false },
        { id: 'b', text: 'Call super() to invoke the parent constructor', correct: true },
        { id: 'c', text: 'Call parent.constructor()', correct: false },
        { id: 'd', text: 'Nothing special is needed — this is automatically available', correct: false },
      ],
      explanation: 'In a derived class (one using extends), you must call super() before accessing this in the constructor. This is because the parent constructor is responsible for setting up the object. If you try to access this before super(), JavaScript throws a ReferenceError.',
    },
    {
      id: 'q-11-6',
      question: 'What does super.method() do inside a subclass?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Creates a new instance of the parent class', correct: false },
        { id: 'b', text: 'Calls the method defined on the parent class, even if the subclass overrides it', correct: true },
        { id: 'c', text: 'Deletes the parent method from the prototype chain', correct: false },
        { id: 'd', text: 'Copies the parent method to the child class', correct: false },
      ],
      explanation: 'super.method() calls the parent class\'s version of a method. This is useful when overriding a method but still wanting to include the parent\'s behavior: e.g., describe() { return super.describe() + ", more info"; }',
    },
    {
      id: 'q-11-7',
      question: 'What makes private class fields (#) different from the underscore naming convention (_)?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Both are enforced by the JavaScript engine; they differ only in syntax', correct: false },
        { id: 'b', text: 'Private fields (#) are enforced by the language and cannot be accessed outside the class; underscore (_) is only a naming convention with no enforcement', correct: true },
        { id: 'c', text: 'Underscore fields are removed from the object after construction; # fields persist', correct: false },
        { id: 'd', text: 'They behave identically at runtime — the difference is only cosmetic', correct: false },
      ],
      explanation: 'The underscore prefix (_name) is a community convention signaling "treat this as private" but it is fully accessible from outside the class. Private fields (#name) are a language feature: any attempt to access them outside the class body throws a SyntaxError or TypeError, providing true encapsulation.',
    },
    {
      id: 'q-11-8',
      question: 'Which of the following about method overriding in JavaScript classes are true? (Select all that apply)',
      multiSelect: true,
      options: [
        { id: 'a', text: 'A subclass method with the same name as a parent method automatically overrides it', correct: true },
        { id: 'b', text: 'You can call the parent\'s version using super.methodName()', correct: true },
        { id: 'c', text: 'You must explicitly declare override with the "override" keyword', correct: false },
        { id: 'd', text: 'Overriding changes the parent class method for all other subclasses', correct: false },
      ],
      explanation: 'JavaScript uses prototypal lookup: when a method is called on an instance, the engine finds the first match in the prototype chain. If a subclass defines the same method name, it "shadows" the parent version. You can still call the parent version via super.method(). There is no override keyword in standard JavaScript, and overriding does not affect other classes.',
    },
    {
      id: 'q-11-9',
      question: 'What does the instanceof operator check?',
      multiSelect: false,
      options: [
        { id: 'a', text: 'Whether a value is of a specific primitive type (like typeof)', correct: false },
        { id: 'b', text: 'Whether an object was created using a specific class or constructor, by checking the prototype chain', correct: true },
        { id: 'c', text: 'Whether a method exists on an object', correct: false },
        { id: 'd', text: 'Whether two objects have the same properties', correct: false },
      ],
      explanation: 'instanceof checks whether the prototype of a constructor appears anywhere in the prototype chain of an object. So dog instanceof Animal is true even if dog was created with a Dog class that extends Animal. It traverses the chain, not just the immediate constructor.',
    },
  ],
}
