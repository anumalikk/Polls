import {
  ADD_ANSWER_USER,
  RECEIVE_USERS,
  ADD_USER_QUESTION,
  RESET_USERS,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.qid),
        },
      };
    case RESET_USERS:
      return {};
    default:
      return state;
  }
}
