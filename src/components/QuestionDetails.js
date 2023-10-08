import "./QuestionDetails.css";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "../index.css";
import { handleAddAnswer } from "../actions/questions";
import { Navigate, useNavigate } from "react-router-dom";

const questionsWithAvatar = (quess, useres) => {
  const questionsWithAvatar = {};

  for (const questionId in quess) {
    if (quess.hasOwnProperty(questionId)) {
      const question = { ...quess[questionId] }; // Clone the original question object
      const authorId = question.author;
      const author = useres[authorId];

      if (author) {
        question.authorInfo = {
          id: author.id,
          name: author.name,
          avatarURL: author.avatarURL,
        };
      }

      questionsWithAvatar[questionId] = question;
    }
  }
  return questionsWithAvatar;
};

const sortQuestionsByTimestamp = (questions) => {
  // Create a new object with sorted questions without modifying the original
  const sortedQuestions = Object.fromEntries(
    Object.entries(questions).sort(([, a], [, b]) => b.timestamp - a.timestamp)
  );

  return sortedQuestions;
};

function QuestionDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(props);
  let optionOneText;
  let optionTwoText;
  let author;
  let avatarUrl;

  if (props.questions && props.questions[id] && props.questions[id].optionOne) {
    optionOneText = props.questions[id].optionOne.text;
  } else {
    optionOneText = "";
    return <Navigate to="/404" />;
  }

  if (props.questions && props.questions[id] && props.questions[id].optionTwo) {
    optionTwoText = props.questions[id].optionTwo.text;
  } else {
    optionTwoText = "";
  }

  if (props.questions && props.questions[id] && props.questions[id].author) {
    author = props.questions[id].author;
  } else {
    author = "";
  }

  if (
    props.questions &&
    props.questions[id] &&
    props.questions[id].authorInfo &&
    props.questions[id].authorInfo.avatarURL
  ) {
    avatarUrl = props.questions[id].authorInfo.avatarURL;
  } else {
    avatarUrl = "";
  }

  let hasVotedForOptionOne;
  let hasVotedForOptionTwo;
  let hasVoted;
  if (
    props.questions &&
    props.questions[id] &&
    props.questions[id].optionOne &&
    props.questions[id].optionOne.votes
  ) {
    hasVotedForOptionOne = props.questions[id].optionOne.votes.includes(
      props.authedUser
    );
  } else {
    hasVotedForOptionOne = false;
  }

  if (
    props.questions &&
    props.questions[id] &&
    props.questions[id].optionOne &&
    props.questions[id].optionTwo.votes
  ) {
    hasVotedForOptionTwo = props.questions[id].optionTwo.votes.includes(
      props.authedUser
    );
  } else {
    hasVotedForOptionTwo = false;
  }

  hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOptionOneClick = (e) => {
    e.preventDefault();
    props.dispatch(
      handleAddAnswer(props.authedUser, props.questions[id].id, "optionOne")
    );
  };

  const handleOptionTwoClick = (e) => {
    e.preventDefault();
    props.dispatch(
      handleAddAnswer(props.authedUser, props.questions[id].id, "optionTwo")
    );
  };

  const calculatePercentage = (option, question) => {
    const totalNoOfVotes =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (question.optionOne.votes.length / totalNoOfVotes) * 100 + " %";
      case "optionTwo":
        return (question.optionTwo.votes.length / totalNoOfVotes) * 100 + " %";
      default:
        return "";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9">Poll by {author}</h1>

      <div className="flex justify-center">
        <img src={avatarUrl} alt="Profile" className="img-width img-height" />
      </div>

      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={handleOptionOneClick}
          disabled={hasVoted}
          className={
            "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
            (hasVotedForOptionOne ? "bg-pink-400" : "")
          }
        >
          <div className={hasVotedForOptionOne ? "chosen" : ""}>
            <p className="font-bold mb-2">{optionOneText}</p>
            {!hasVoted && (
              <p className="underline underline-offset-4 mb-3">Click</p>
            )}
            {hasVoted && (
              <p className="text-xs">
                Votes: {props.questions[id].optionOne.votes.length} (
                {calculatePercentage("optionOne", props.questions[id])})
              </p>
            )}
          </div>
        </button>

        <button
          onClick={handleOptionTwoClick}
          disabled={hasVoted}
          className={
            "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
            (hasVotedForOptionTwo ? "bg-pink-400" : "")
          }
        >
          <p className="font-bold mb-2">{optionTwoText}</p>
          {!hasVoted && (
            <p className="underline underline-offset-4 mb-3">Click</p>
          )}
          {hasVoted && (
            <p className="text-xs">
              Votes: {props.questions[id].optionTwo.votes.length} (
              {calculatePercentage("optionTwo", props.questions[id])})
            </p>
          )}
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  const sortedbyTimestampQuestionsWithAvatar = sortQuestionsByTimestamp(
    questionsWithAvatar(questions, users)
  );
  return {
    questions: sortedbyTimestampQuestionsWithAvatar,
    authedUser: authedUser,
  };
};
export default connect(mapStateToProps)(QuestionDetails);
