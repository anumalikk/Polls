export const RECEIVE_USERS = "RECEIVE_USERS";
export const RESET_USERS = "RESET_USERS";
export const ADD_ANSWER_USER = "ADD_ANSWER_USER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addAnswerUser(authedUser, qid, answer) {
  return {
      type: ADD_ANSWER_USER,
      authedUser,
      qid,
      answer,
  };
}

export function resetUsers() {
  return {
    type: RESET_USERS,
    
  };
}

export function addUserQuestion({author, id}) {
  return {
      type: ADD_USER_QUESTION,
      author,
      qid: id,
  };
}