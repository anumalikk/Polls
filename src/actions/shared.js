import { getInitialData } from "../utils/api";
import { receiveUsers, resetUsers } from "./users";
import { receiveQuestions, resetQuestions } from "./questions";
import { setAuthedUser, logoutAuthedUser } from "./authedUser";

export function handleInitialDataForLogin(authedUser) {
  return (dispatch) => {    
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      console.log(users);
      console.log(questions);      
      dispatch(receiveQuestions(questions));      
      dispatch(setAuthedUser(authedUser));      
    });
  };
}

export function handleLogout() {
  return (dispatch) => {
    dispatch(logoutAuthedUser());
    dispatch(resetQuestions());
    dispatch(resetUsers());
  };
}

