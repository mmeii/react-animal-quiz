import { randomArray } from './utils';

//setup type from api response
export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

//add answers string to Question
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=27`;
    const data = await (await fetch(endpoint)).json();
    console.log(data);
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: randomArray([
                ...question.incorrect_answers,
                question.correct_answer
            ])
        }
    ))
}