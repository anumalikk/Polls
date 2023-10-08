import "./Dashboard.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import "../index.css";
import { sortQuestionsByTimestamp } from "../utils/helpers";
import { questionsWithAvatar } from "../utils/helpers";

import DashboardCard from "./DashboardCard";



function Dashboard(props) {
  const [showUnansweredQuestions, setShowUnansweredQuestions] = useState(true);

  const handleToggleView = (e) => {
    e.preventDefault();
    setShowUnansweredQuestions(!showUnansweredQuestions);
  };

  const buttonText = showUnansweredQuestions
    ? "View Answered Questions"
    : "View New/Unanswered Questions";

  return (
    <div className="App">
      <button
        className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
        onClick={handleToggleView}
      >
        {buttonText}
      </button>
      {showUnansweredQuestions === true ? (
        <div>
          <h1 data-testid="h1-heading">New/Unanswered Questions:</h1>
          <DashboardCard dataToShowonDashboard="Unanswered Questions" />
        </div>
      ) : (
        <div>
          <h1>Answered Questions:</h1>
          <DashboardCard dataToShowonDashboard="Answered Questions" />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ questions, users }) => {
  const sortedbyTimestampQuestionsWithAvatar = sortQuestionsByTimestamp(
    questionsWithAvatar(questions, users)
  );
  return {
    questions: sortedbyTimestampQuestionsWithAvatar,
  };
};

export default connect(mapStateToProps)(Dashboard);
