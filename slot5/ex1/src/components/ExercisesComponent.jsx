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

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#2c3e50',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const exerciseBoxStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    padding: '25px',
    marginBottom: '25px',
    border: '1px solid #e1e8ed',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  const exerciseTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#3498db',
    borderBottom: '2px solid #ecf0f1',
    paddingBottom: '8px'
  };

  const codeBlockStyle = {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    borderRadius: '8px',
    fontFamily: '"Fira Code", "Courier New", monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    overflow: 'auto'
  };

  const outputStyle = {
    color: '#27ae60',
    backgroundColor: '#d5f4e6',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '10px',
    border: '1px solid #27ae60'
  };

  const codeLineStyle = {
    marginBottom: '8px',
    opacity: '0.9'
  };

  const keywordStyle = {
    color: '#e74c3c',
    fontWeight: 'bold'
  };

  const stringStyle = {
    color: '#f39c12'
  };

  const commentStyle = {
    color: '#7f8c8d',
    fontStyle: 'italic'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🚀 JavaScript ES6 Exercises</h1>
      
      {/* Exercise 1 */}
      <div style={exerciseBoxStyle}>
        <h2 style={exerciseTitleStyle}>1️⃣ Exercise 1: Arrow Function</h2>
        <div style={codeBlockStyle}>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> double = x =&gt; x * 2;
          </div>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> isEven = x =&gt; x % 2 === 0;
          </div>
        </div>
        <div style={outputStyle}>
          <div>✅ double(7) = {double(7)}</div>
          <div>✅ isEven(10) = {isEven(10).toString()}</div>
          <div>✅ isEven(7) = {isEven(7).toString()}</div>
        </div>
      </div>

      {/* Exercise 2 */}
      <div style={exerciseBoxStyle}>
        <h2 style={exerciseTitleStyle}>2️⃣ Exercise 2: Rest Parameter</h2>
        <div style={codeBlockStyle}>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> sum = (...nums) =&gt; nums.reduce((acc, num) =&gt; 
          </div>
          <div style={codeLineStyle}>
            &nbsp;&nbsp;isNaN(Number(num)) ? acc : acc + Number(num), 0);
          </div>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> avg = (...nums) =&gt; {`{...}`};
          </div>
        </div>
        <div style={outputStyle}>
          <div>✅ sum(1,2,3) = {sum(1,2,3)}</div>
          <div>✅ sum(1,'x',4) = {sum(1,'x',4)}</div>
          <div>✅ avg(1,2,3,4) = {avg(1,2,3,4)}</div>
          <div>✅ avg() = {avg()}</div>
        </div>
      </div>

      {/* Exercise 3 */}
      <div style={exerciseBoxStyle}>
        <h2 style={exerciseTitleStyle}>3️⃣ Exercise 3: Destructuring Object</h2>
        <div style={codeBlockStyle}>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> person = {`{`}
          </div>
          <div style={codeLineStyle}>
            &nbsp;&nbsp;name: <span style={stringStyle}>"John"</span>, age: 30,
          </div>
          <div style={codeLineStyle}>
            &nbsp;&nbsp;address: {`{ street: `}<span style={stringStyle}>"123 Main St"</span> {`}`}
          </div>
          <div style={codeLineStyle}>
            {`};`}
          </div>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> {`{ address: { street, city = "Unknown City" } }`} = person;
          </div>
        </div>
        <div style={outputStyle}>
          <div>✅ street: {street}</div>
          <div>✅ city: {city}</div>
        </div>
      </div>

      {/* Exercise 4 */}
      <div style={exerciseBoxStyle}>
        <h2 style={exerciseTitleStyle}>4️⃣ Exercise 4: Destructuring Array</h2>
        <div style={codeBlockStyle}>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> ages = [{ages.join(', ')}];
          </div>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> [first, , third = 0, ...restAges] = ages;
          </div>
        </div>
        <div style={outputStyle}>
          <div>✅ first: {first}</div>
          <div>✅ third: {third}</div>
          <div>✅ restAges: [{restAges.join(', ')}]</div>
        </div>
      </div>

      {/* Exercise 5 */}
      <div style={exerciseBoxStyle}>
        <h2 style={exerciseTitleStyle}>5️⃣ Exercise 5: Map + Filter</h2>
        <div style={codeBlockStyle}>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> people = [
          </div>
          {people.map((p, index) => (
            <div key={index} style={codeLineStyle}>
              &nbsp;&nbsp;{`{ name: `}<span style={stringStyle}>"{p.name}"</span>, age: {p.age} {`}`}{index < people.length - 1 ? ',' : ''}
            </div>
          ))}
          <div style={codeLineStyle}>];</div>
          <div style={codeLineStyle}>
            <span style={commentStyle}>// Filter teens (13-19) and map to formatted strings</span>
          </div>
          <div style={codeLineStyle}>
            <span style={keywordStyle}>const</span> teens = people.filter(...).map(...);
          </div>
        </div>
        <div style={outputStyle}>
          <div style={{fontWeight: 'bold', marginBottom: '8px'}}>🎯 Teenagers (13-19 years old):</div>
          {teens.map((teen, index) => (
            <div key={index}>✅ {teen}</div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{
        ...exerciseBoxStyle,
        backgroundColor: '#e8f5e8',
        borderLeft: '5px solid #27ae60'
      }}>
        <h2 style={{...exerciseTitleStyle, color: '#27ae60'}}>🎉 Summary</h2>
        <div style={{fontSize: '16px', lineHeight: '1.6', color: '#2c3e50'}}>
          <p>✅ <strong>Arrow Functions:</strong> Concise function syntax</p>
          <p>✅ <strong>Rest Parameters:</strong> Handle variable number of arguments</p>
          <p>✅ <strong>Object Destructuring:</strong> Extract nested properties with defaults</p>
          <p>✅ <strong>Array Destructuring:</strong> Extract values with rest operator</p>
          <p>✅ <strong>Array Methods:</strong> Chain filter() and map() for data processing</p>
        </div>
      </div>
    </div>
  );
};

export default ExercisesComponent;