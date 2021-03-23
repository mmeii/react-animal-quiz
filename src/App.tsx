import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//components
import QuestionCard from './components/QuestionCard';
//types
import { QuestionState, Difficulty } from './API';
//styles
import { GlobalStyle } from './App.styles';
import { Wrapper } from './App.styles';

export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      //check answer if correct
      const correct = questions[number].correct_answer === answer;

      // add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1);
      }
      // save answer in user answers array
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    //to next if not last
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>ANIMALS QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <h2>
            Let's see how well you know your animals! Click start to begin the quiz!
          </h2>
        ) : null}
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <div>
            <button
              className="start"
              onClick={startQuiz}
            >
              Start
          </button>
          </div>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}

        {loading ? <p>Loading Questions ...</p> : null}

        {!loading && !gameOver && (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver
          && !loading
          && userAnswers.length === number + 1
          && number !== TOTAL_QUESTIONS - 1 ? (
          <button
            className="next"
            onClick={nextQuestion}
          >
            Next Question
          </button>
        ) : null}

      </Wrapper>
    </>
  );
}

export default App;
