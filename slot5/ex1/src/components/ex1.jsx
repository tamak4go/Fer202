import React from 'react';

const ExercisesComponent = () => {
  // Exercise 1: Arrow function
  const double = x => x * 2;
  const isEven = x => x % 2 === 0;

  // Exercise 2: Rest parameter
  const sum = (...nums) => nums.reduce((acc, num) => isNaN(Number(num)) ? acc : acc + Number(num), 0);
  const avg = (...nums) => {
    const validNums = nums.filter(num => !isNaN(Number(num)));
    return validNums.length === 0 ? 0 : (validNums.reduce((acc, num) => acc + Number(num), 0) / validNums.length).toFixed(2);
  };

  // Exercise 3: Destructuring object
  const person = { name: "John", age: 30, address: { street: "123 Main St" } };
  const { address: { street, city = "Unknown City" } } = person;

  // Exercise 4: Destructuring array
  const ages = [33, 12, 20, 16, 66, 45, 18, 25];
  const [first, , third = 0, ...restAges] = ages;
  const total = restAges.reduce((acc, age) => acc + age, 0);

  // Exercise 5: Map + filter
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">JavaScript ES6 Exercises</h1>
      
      {/* Exercise 1 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">🔥 Exercise 1: Arrow Function</h2>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
          <div className="mb-2">const double = x => x * 2;</div>
          <div className="mb-4">const isEven = x => x % 2 === 0;</div>
          <div className="text-green-600">
            <div>double(7) = {double(7)}</div>
            <div>isEven(10) = {isEven(10).toString()}</div>
            <div>isEven(7) = {isEven(7).toString()}</div>
          </div>
        </div>
      </div>

      {/* Exercise 2 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">🔥 Exercise 2: Rest Parameter</h2>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
          <div className="mb-2">const sum = (...nums) => nums.reduce((acc, num) => isNaN(Number(num)) ? acc : acc + Number(num), 0);</div>
          <div className="mb-4">const avg = (...nums) => ...</div>
          <div className="text-green-600">
            <div>sum(1,2,3) = {sum(1,2,3)}</div>
            <div>sum(1,'x',4) = {sum(1,'x',4)}</div>
            <div>avg(1,2,3,4) = {avg(1,2,3,4)}</div>
            <div>avg() = {avg()}</div>
          </div>
        </div>
      </div>

      {/* Exercise 3 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">🔥 Exercise 3: Destructuring Object</h2>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
          <div className="mb-2">const person = {JSON.stringify(person, null, 2).split('\n').slice(0,1).join('')}...{JSON.stringify(person, null, 2).split('\n').slice(-1).join('')}</div>
          <div className="mb-4">const {`{ address: { street, city = "Unknown City" } }`} = person;</div>
          <div className="text-green-600">
            <div>street: {street}</div>
            <div>city: {city}</div>
          </div>
        </div>
      </div>

      {/* Exercise 4 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">🔥 Exercise 4: Destructuring Array</h2>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
          <div className="mb-2">const ages = [{ages.join(', ')}];</div>
          <div className="mb-4">const [first, , third = 0, ...restAges] = ages;</div>
          <div className="text-green-600">
            <div>first: {first}</div>
            <div>third: {third}</div>
            <div>restAges: [{restAges.join(', ')}]</div>
            <div>total of restAges: {total}</div>
          </div>
        </div>
      </div>

      {/* Exercise 5 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">🔥 Exercise 5: Map + Filter</h2>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
          <div className="mb-2">Original people:</div>
          <div className="mb-4 text-gray-600">
            {people.map((p, index) => (
              <div key={index}>{`{ name: "${p.name}", age: ${p.age} }`}</div>
            ))}
          </div>
          <div className="mb-2">Filtered teens (13-19 years old):</div>
          <div className="text-green-600">
            {teens.map((teen, index) => (
              <div key={index}>{teen}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-purple-500">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">🎮 Interactive Demo</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Try Arrow Functions:</h3>
            <div className="bg-purple-50 p-3 rounded">
              <div>double(5) = {double(5)}</div>
              <div>double(12) = {double(12)}</div>
              <div>isEven(8) = {isEven(8).toString()}</div>
              <div>isEven(9) = {isEven(9).toString()}</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Try Rest Parameters:</h3>
            <div className="bg-purple-50 p-3 rounded">
              <div>sum(10,20,30) = {sum(10,20,30)}</div>
              <div>sum(5,'abc',15,20) = {sum(5,'abc',15,20)}</div>
              <div>avg(10,20,30,40) = {avg(10,20,30,40)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">
        🚀 Modern JavaScript (ES6+) Features Demonstration
      </div>
    </div>
  );
};

export default ex1;