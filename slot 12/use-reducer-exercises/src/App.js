import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import 3 components chính
import LoginFormWithReducer from './components/LoginFormWithReducer';
import SignUpFormWithReducer from './components/SignUpFormWithReducer';
import QuestionBankAdvanced from './components/QuestionBankAdvanced';

function App() {
  return (
    <div className="App">
      <div className="container my-5">
        <h1 className="text-center mb-5 text-primary">
          🎯 Lab 4: useReducer Hook Exercises
        </h1>
        
        {/* Exercise 3: Login Form */}
        <div className="mb-5">
          <div className="p-3 bg-light rounded">
            <h2 className="text-success">✅ Exercise 3: Login Form</h2>
            <p className="text-muted">Form đăng nhập với validation</p>
          </div>
          <LoginFormWithReducer />
        </div>

        <hr className="my-5" />

        {/* Exercise 4: Sign Up Form */}
        <div className="mb-5">
          <div className="p-3 bg-light rounded">
            <h2 className="text-success">✅ Exercise 4: Sign Up Form</h2>
            <p className="text-muted">Form đăng ký với validation phức tạp, Modal & Toast</p>
          </div>
          <SignUpFormWithReducer />
        </div>

        <hr className="my-5" />

        {/* Exercise 6: Question Bank Advanced */}
        <div className="mb-5">
          <div className="p-3 bg-light rounded">
            <h2 className="text-success">✅ Exercise 6: Quiz Advanced</h2>
            <p className="text-muted">
              Quiz với: ✓ Feedback đúng/sai ✓ Progress bar ✓ Timer countdown ✓ High Score
            </p>
          </div>
          <QuestionBankAdvanced />
        </div>
      </div>
    </div>
  );
}

export default App;