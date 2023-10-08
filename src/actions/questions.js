import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addAnswerUser, addUserQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const RESET_QUESTIONS = "RESET_QUESTIONS";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function resetQuestions() {
  return {
    type: RESET_QUESTIONS,
  };
}

function addAnswerQuestion(author, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid,
    answer,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddAnswer(authedUser, questionId, answer) {
  return (dispatch) => {
    return saveQuestionAnswer(authedUser, questionId, answer).then(() => {
      dispatch(addAnswerQuestion(authedUser, questionId, answer));

      dispatch(addAnswerUser(authedUser, questionId, answer));
    });
  };
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    return saveQuestion(question).then((question) => {
      
      dispatch(addQuestion(question));

      dispatch(addUserQuestion(question));
    });
  };
}
