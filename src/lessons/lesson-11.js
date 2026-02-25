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
}
