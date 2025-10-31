// Exercise 6: QuestionBankAdvanced.jsx
// Quiz với tính năng nâng cao: feedback, timer, progress, high score

import React, { useReducer, useEffect } from 'react';
import { Button, Container, Card, Alert, ProgressBar } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// ============================================
// BƯỚC 1: KHỞI TẠO TRẠNG THÁI BAN ĐẦU
// ============================================
const initialState = {
  questions: [
    {
      id: 1,
      question: 'What is the capital of Australia?',
      options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      answer: 'Canberra',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars',
    },
    {
      id: 3,
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
      answer: 'Pacific Ocean',
    },
    {
      id: 4,
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
      answer: 'Leonardo da Vinci',
    },
    {
      id: 5,
      question: 'What is the smallest prime number?',
      options: ['0', '1', '2', '3'],
      answer: '2',
    },
  ],
  currentQuestion: 0,
  selectedOption: '',
  score: 0,
  showScore: false,
  feedback: null, // { isCorrect: true/false, correctAnswer: '...' }
  timeLeft: 10, // Thời gian còn lại (giây)
  highScore: parseInt(localStorage.getItem('quizHighScore')) || 0,
};

// ============================================
// BƯỚC 2: ĐỊNH NGHĨA HÀM REDUCER
// ============================================
function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT_OPTION':
      return { 
        ...state, 
        selectedOption: action.payload,
        feedback: null // Reset feedback khi chọn đáp án mới
      };

    case 'SUBMIT_ANSWER':
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === currentQ.answer;
      
      return {
        ...state,
        feedback: {
          isCorrect,
          correctAnswer: currentQ.answer
        }
      };

    case 'NEXT_QUESTION':
      const newScore = state.feedback?.isCorrect ? state.score + 1 : state.score;
      const nextQuestion = state.currentQuestion + 1;
      const isLastQuestion = nextQuestion >= state.questions.length;
      
      // Cập nhật high score nếu cần
      let newHighScore = state.highScore;
      if (isLastQuestion && newScore > state.highScore) {
        newHighScore = newScore;
        localStorage.setItem('quizHighScore', newScore.toString());
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: nextQuestion,
        selectedOption: '',
        feedback: null,
        showScore: isLastQuestion,
        timeLeft: 10, // Reset timer
        highScore: newHighScore,
      };

    case 'TICK_TIMER':
      if (state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 };
      }
      // Hết giờ -> tự động next
      return quizReducer(state, { type: 'NEXT_QUESTION' });

    case 'RESTART_QUIZ':
      return {
        ...initialState,
        highScore: state.highScore, // Giữ lại high score
      };

    default:
      return state;
  }
}

// ============================================
// COMPONENT CHÍNH
// ============================================
function QuestionBankAdvanced() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { 
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    feedback,
    timeLeft,
    highScore 
  } = state;

  // Timer countdown
  useEffect(() => {
    if (!showScore && !feedback) {
      const timer = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showScore, feedback]);

  // Handlers
  const handleOptionSelect = (option) => {
    if (!feedback) { // Chỉ cho chọn khi chưa submit
      dispatch({ type: 'SELECT_OPTION', payload: option });
    }
  };

  const handleSubmit = () => {
    if (selectedOption && !feedback) {
      dispatch({ type: 'SUBMIT_ANSWER' });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: 'RESTART_QUIZ' });
  };

  // Tính phần trăm hoàn thành
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Style cho timer (đỏ nếu < 5s)
  const timerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: timeLeft < 5 ? '#dc3545' : '#28a745',
    transition: 'color 0.3s ease'
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        {showScore ? (
          // ============================================
          // HIỂN THỊ KẾT QUẢ
          // ============================================
          <div className="text-center">
            <h2 className="mb-4">Quiz Completed! 🎉</h2>
            
            <div className="mb-4">
              <h3>Your Score</h3>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#007bff' }}>
                {score} / {questions.length}
              </div>
              <div style={{ fontSize: '20px', color: '#6c757d' }}>
                ({Math.round((score / questions.length) * 100)}%)
              </div>
            </div>

            {highScore > 0 && (
              <Alert variant="success">
                <strong>🏆 High Score: {highScore} / {questions.length}</strong>
                {score === highScore && score > 0 && (
                  <div className="mt-2">🎊 New Record!</div>
                )}
              </Alert>
            )}

            <Button variant="primary" size="lg" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          // ============================================
          // HIỂN THỊ CÂU HỎI
          // ============================================
          <div>
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <strong>Progress: {currentQuestion + 1}/{questions.length}</strong>
                <span style={timerStyle}>⏱️ {timeLeft}s</span>
              </div>
              <ProgressBar 
                now={progress} 
                label={`${Math.round(progress)}%`}
                variant={timeLeft < 5 ? 'danger' : 'primary'}
              />
            </div>

            {/* Câu hỏi */}
            <h4 className="mb-4">
              Question {questions[currentQuestion].id}:<br />
              {questions[currentQuestion].question}
            </h4>

            {/* Các phương án */}
            <div className="mb-4">
              {questions[currentQuestion].options.map((option, index) => {
                let variant = 'outline-secondary';
                
                // Sau khi submit, hiển thị màu phù hợp
                if (feedback) {
                  if (option === feedback.correctAnswer) {
                    variant = 'success'; // Đáp án đúng màu xanh
                  } else if (option === selectedOption && !feedback.isCorrect) {
                    variant = 'danger'; // Đáp án sai màu đỏ
                  }
                } else if (selectedOption === option) {
                  variant = 'primary'; // Đang chọn
                }

                return (
                  <Button
                    key={index}
                    variant={variant}
                    className="m-2 w-100 text-start"
                    size="lg"
                    onClick={() => handleOptionSelect(option)}
                    disabled={!!feedback} // Disable sau khi submit
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {/* Feedback sau khi submit */}
            {feedback && (
              <Alert variant={feedback.isCorrect ? 'success' : 'danger'} className="mb-3">
                <div className="d-flex align-items-center">
                  {feedback.isCorrect ? (
                    <>
                      <FaCheckCircle size={24} className="me-2" />
                      <strong>Correct! 🎉</strong>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle size={24} className="me-2" />
                      <div>
                        <strong>Incorrect! ❌</strong>
                        <div className="mt-1">
                          The correct answer is: <strong>{feedback.correctAnswer}</strong>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Alert>
            )}

            {/* Buttons */}
            <div className="d-flex gap-2">
              {!feedback ? (
                <Button
                  variant="success"
                  className="w-100"
                  size="lg"
                  disabled={!selectedOption}
                  onClick={handleSubmit}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-100"
                  size="lg"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === questions.length - 1
                    ? 'Finish Quiz'
                    : 'Next Question →'}
                </Button>
              )}
            </div>

            {/* Current Score */}
            <div className="text-center mt-3 text-muted">
              Current Score: {score} | High Score: {highScore}
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBankAdvanced;