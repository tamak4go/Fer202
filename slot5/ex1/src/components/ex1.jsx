// exercises.js - Chạy với: node exercises.js

console.log("🚀 JavaScript ES6 Exercises\n");

// Exercise 1: Arrow function
console.log("1️⃣ Exercise 1: Arrow Function");
const double = x => x * 2;
const isEven = x => x % 2 === 0;

console.log(`double(7) = ${double(7)}`);
console.log(`isEven(10) = ${isEven(10)}`);
console.log(`isEven(7) = ${isEven(7)}\n`);

// Exercise 2: Rest parameter
console.log("2️⃣ Exercise 2: Rest Parameter");
const sum = (...nums) => nums.reduce((acc, num) => isNaN(Number(num)) ? acc : acc + Number(num), 0);
const avg = (...nums) => {
  const validNums = nums.filter(num => !isNaN(Number(num)));
  return validNums.length === 0 ? 0 : (validNums.reduce((acc, num) => acc + Number(num), 0) / validNums.length).toFixed(2);
};

console.log(`sum(1,2,3) = ${sum(1,2,3)}`);
console.log(`sum(1,'x',4) = ${sum(1,'x',4)}`);
console.log(`avg(1,2,3,4) = ${avg(1,2,3,4)}`);
console.log(`avg() = ${avg()}\n`);

// Exercise 3: Destructuring object
console.log("3️⃣ Exercise 3: Destructuring Object");
const person = { name: "John", age: 30, address: { street: "123 Main St" } };
const { address: { street, city = "Unknown City" } } = person;

console.log(`street: ${street}`);
console.log(`city: ${city}\n`);

// Exercise 4: Destructuring array
console.log("4️⃣ Exercise 4: Destructuring Array");
const ages = [33, 12, 20, 16, 66, 45, 18, 25];
const [first, , third = 0, ...restAges] = ages;
const total = restAges.reduce((acc, age) => acc + age, 0);

console.log(`first: ${first}`);
console.log(`third: ${third}`);
console.log(`restAges: [${restAges.join(', ')}]`);
console.log(`total of restAges: ${total}\n`);

// Exercise 5: Map + filter
console.log("5️⃣ Exercise 5: Map + Filter");
const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 16 },
  { name: "David", age: 13 },
  { name: "Eve", age: 22 }
];

const adults = people.filter(person => person.age >= 18);
const adultNames = adults.map(person => person.name);
const adultAges = adults.map(person => person.age);

console.log(`Adults (age >= 18): [${adults.map(p => `${p.name}(${p.age})`).join(', ')}]`);
console.log(`Adult names: [${adultNames.join(', ')}]`);
console.log(`Adult ages: [${adultAges.join(', ')}]`);

console.log("\n✅ All exercises completed!");