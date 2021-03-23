import React from 'react';
//types
import { AnswerObj } from '../App';
//styles
import { CardWrapper, ButtonWrapper } from './QuestionsCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObj | undefined;
    questionNum: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNum, totalQuestions }) => {
    return (
        <CardWrapper>
            <p className="number">
                Question: {questionNum} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            <div>
                {answers.map((answer) => (
                    <ButtonWrapper
                        key={answer}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >
                        <button
                            // !! to convert to boolean value
                            disabled={!!userAnswer}
                            onClick={callback}
                            value={answer}
                        >
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </CardWrapper>
    )
}

export default QuestionCard;
