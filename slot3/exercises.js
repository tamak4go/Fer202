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
const ages = [33, 12, 20, 16];
const [first, , third = 0, ...restAges] = ages;

console.log(`first: ${first}`);
console.log(`third: ${third}`);
console.log(`restAges: [${restAges.join(', ')}]\n`);

// Exercise 5: Map + filter
console.log("5️⃣ Exercise 5: Map + Filter");
const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 16 },
  { name: "David", age: 13 },
  { name: "Eve", age: 22 }
];

const teens = people
  .filter(person => person.age >= 13 && person.age <= 19)
  .map(person => `${person.name} (${person.age})`);

teens.forEach(teen => console.log(teen));
console.log();

// Exercise 6: Sort + slice
console.log("6️⃣ Exercise 6: Sort + Slice");
const companies = [
  { name: "Google", category: "Tech", start: 1998, end: 2020 },
  { name: "Apple", category: "Tech", start: 1976, end: 2015 },
  { name: "Facebook", category: "Social", start: 2004, end: 2018 },
  { name: "Amazon", category: "E-commerce", start: 1994, end: 2010 },
  { name: "Microsoft", category: "Tech", start: 1975, end: 2012 }
];

const top3 = [...companies]
  .sort((a, b) => a.end - b.end)
  .slice(0, 3)
  .map(company => `${company.name} - ${company.end}`);

top3.forEach(company => console.log(company));
console.log();

// Exercise 7: Spread vs rest
console.log("7️⃣ Exercise 7: Spread vs Rest");
const company0New = { ...companies[0], start: companies[0].start + 1 };
const concatAll = (...arrays) => arrays.reduce((result, arr) => [...result, ...arr], []);

console.log(`Original: ${JSON.stringify(companies[0])}`);
console.log(`New: ${JSON.stringify(company0New)}`);
console.log(`concatAll([1,2],[3],[4,5]): [${concatAll([1,2],[3],[4,5]).join(', ')}]\n`);

// Exercise 8: Reduce nâng cao
console.log("8️⃣ Exercise 8: Reduce nâng cao");
const agesList = [15, 22, 18, 30, 16, 25, 13, 19, 28];

const stats = agesList.reduce((acc, age) => ({
  total: acc.total + age,
  min: Math.min(acc.min, age),
  max: Math.max(acc.max, age)
}), { total: 0, min: Infinity, max: -Infinity });

const buckets = agesList.reduce((acc, age) => {
  if (age >= 13 && age <= 19) acc.teen++;
  else if (age >= 20) acc.adult++;
  return acc;
}, { teen: 0, adult: 0 });

console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log(`Buckets: { teen: ${buckets.teen}, adult: ${buckets.adult} }`);

console.log("\n✅ Hoàn thành tất cả exercises!");