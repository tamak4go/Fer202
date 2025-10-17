import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './CounterComponent';
import LightSwitch from './LightSwitch';
import LoginForm from './LoginForm';
import LoginForm2 from './LoginForm2';
import SearchItem from './SearchItem';
import SearchAccount from './SearchAccount';
import RegisterForm from './RegisterForm';

function App() {
  return (
    <div className="App">
      <div className="container my-4">
        <h1 className="text-center mb-4">useState Hook Exercises</h1>
        
        <div className="mb-5">
          <h2 className="text-primary">Exercise 1: Counter Component</h2>
          <CounterComponent />
        </div>

        <div className="mb-5">
          <h2 className="text-primary">Exercise 2: Light Switch</h2>
          <LightSwitch />
        </div>

        <div className="mb-5">
          <h2 className="text-primary">Exercise 3: Login Form</h2>
          <LoginForm />
        </div>

        <div className="mb-5">
          <h2 className="text-primary">Exercise 4: Login Form 2 (Object State)</h2>
          <LoginForm2 />
        </div>

        <div className="mb-5">
          <h2 className="text-primary">Exercise 5: Search Item</h2>
          <SearchItem />
        </div>

        <div className="mb-5">
          <h2 className="text-primary">Exercise 6: Search Account</h2>
          <SearchAccount />
        </div>

        <div className="mb-5">
          <h2 className="text-primary">Exercise 7: Registration Form</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default App;