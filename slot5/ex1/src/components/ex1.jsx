import React from 'react';

export default function Exercise1to5() {
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

  const adults = people.filter(person => person.age >= 18);
  const adultNames = adults.map(person => person.name);
  const adultAges = adults.map(person => person.age);

  return (
    <div className="exercise-container">
      <h1 className="main-title">🚀 JavaScript ES6 Exercises</h1>
      
      {/* Exercise 1 */}
      <div className="exercise-section">
        <h2 className="exercise-title">1️⃣ Exercise 1: Arrow Function</h2>
        <div className="code-display">
          <pre>const double = x =&gt; x * 2;</pre>
          <pre>const isEven = x =&gt; x % 2 === 0;</pre>
        </div>
        <div className="results">
          <p>double(7) = <span className="result">{double(7)}</span></p>
          <p>isEven(10) = <span className="result">{isEven(10).toString()}</span></p>
          <p>isEven(7) = <span className="result">{isEven(7).toString()}</span></p>
        </div>
      </div>

      {/* Exercise 2 */}
      <div className="exercise-section">
        <h2 className="exercise-title">2️⃣ Exercise 2: Rest Parameter</h2>
        <div className="code-display">
          <pre>const sum = (...nums) =&gt; nums.reduce((acc, num) =&gt; isNaN(Number(num)) ? acc : acc + Number(num), 0);</pre>
          <pre>const avg = (...nums) =&gt; /* logic for average */;</pre>
        </div>
        <div className="results">
          <p>sum(1,2,3) = <span className="result">{sum(1,2,3)}</span></p>
          <p>sum(1,'x',4) = <span className="result">{sum(1,'x',4)}</span></p>
          <p>avg(1,2,3,4) = <span className="result">{avg(1,2,3,4)}</span></p>
          <p>avg() = <span className="result">{avg()}</span></p>
        </div>
      </div>

      {/* Exercise 3 */}
      <div className="exercise-section">
        <h2 className="exercise-title">3️⃣ Exercise 3: Destructuring Object</h2>
        <div className="code-display">
          <pre>const person = {JSON.stringify(person, null, 2)}</pre>
          <pre>const {`{ address: { street, city = "Unknown City" } }`} = person;</pre>
        </div>
        <div className="results">
          <p>street: <span className="result">{street}</span></p>
          <p>city: <span className="result">{city}</span></p>
        </div>
      </div>

      {/* Exercise 4 */}
      <div className="exercise-section">
        <h2 className="exercise-title">4️⃣ Exercise 4: Destructuring Array</h2>
        <div className="code-display">
          <pre>const ages = [{ages.join(', ')}];</pre>
          <pre>const [first, , third = 0, ...restAges] = ages;</pre>
        </div>
        <div className="results">
          <p>first: <span className="result">{first}</span></p>
          <p>third: <span className="result">{third}</span></p>
          <p>restAges: <span className="result">[{restAges.join(', ')}]</span></p>
          <p>total of restAges: <span className="result">{total}</span></p>
        </div>
      </div>

      {/* Exercise 5 */}
      <div className="exercise-section">
        <h2 className="exercise-title">5️⃣ Exercise 5: Map + Filter</h2>
        <div className="code-display">
          <pre>const adults = people.filter(person =&gt; person.age &gt;= 18);</pre>
          <pre>const adultNames = adults.map(person =&gt; person.name);</pre>
        </div>
        <div className="results">
          <p>Adults (age ≥ 18): <span className="result">[{adults.map(p => `${p.name}(${p.age})`).join(', ')}]</span></p>
          <p>Adult names: <span className="result">[{adultNames.join(', ')}]</span></p>
          <p>Adult ages: <span className="result">[{adultAges.join(', ')}]</span></p>
        </div>
      </div>

      <div className="completion">
        ✅ Exercises 1-5 completed!
      </div>
    </div>
  );
}