import "../App.css";
import "../index.css";
import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { sortQuestionsByTimestamp } from "../utils/helpers";
import { questionsWithAvatar } from "../utils/helpers";


function DashboardCard(props) {
  const filteredUAQuestions = Object.keys(props.questions).filter(
    (questionId) => {
      const question = props.questions[questionId];
      const optionOneVotes = question.optionOne.votes;
      const optionTwoVotes = question.optionTwo.votes;

      return props.dataToShowonDashboard === "Unanswered Questions"
        ? !optionOneVotes.includes(props.authedUser) &&
            !optionTwoVotes.includes(props.authedUser)
        : optionOneVotes.includes(props.authedUser) ||
            optionTwoVotes.includes(props.authedUser);
    }
  );

  // Define the URL to navigate to
  let urlToRedirect;
  
  const authorTimestampQuestionIdsForUAQuestions = filteredUAQuestions.map(
    (questionId) => {
      urlToRedirect = `/questions/${questionId}`;
      const question = props.questions[questionId];
      const avatarURL = props.questions[questionId]?.authorInfo?.avatarURL;
      return (
        <div key={questionId}>
          <Link className="anchor-text" to={urlToRedirect}>
            <div className="m-3 p-2 rounded-xl shadow-md hover:shadow-xl transition bg-zinc-300 max-w-sm mx-auto flex items-center space-x-4">
              <div className="shrink-0">
                <img className="h-12 w-12" src={avatarURL} alt="Author" />
              </div>
              <div>
                <div className="text-xl font-medium text-black">
                  {question.author}
                </div>
                <p className="text-xs italic">
                  {formatDate(question.timestamp)}
                </p>
                <p className="underline underline-offset-4">Show</p>
              </div>
            </div>
          </Link>
        </div>
      );
    }
  );

  return <div>{authorTimestampQuestionIdsForUAQuestions}</div>;
}

const mapStateToProps = ({ questions, users, authedUser }, ownProps) => {
  const sortedbyTimestampQuestionsWithAvatar = sortQuestionsByTimestamp(
    questionsWithAvatar(questions, users)
  );
  return {
    questions: sortedbyTimestampQuestionsWithAvatar,
    authedUser,
    dataToShowonDashboard: ownProps.dataToShowonDashboard,
  };
};

export default connect(mapStateToProps)(DashboardCard);
