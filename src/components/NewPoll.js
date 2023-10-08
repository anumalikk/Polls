import "../App.css";
import "../index.css";
import React, { useState } from "react";

import { handleAddQuestion } from "../actions/questions";
import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";

function NewPoll(props) {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleFirstOptionChange = (e) => {
    setFirstOption(e.target.value);
  };

  const handleSecondOptionChange = (e) => {
    setSecondOption(e.target.value);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      optionOneText: firstOption,
      optionTwoText: secondOption,
      author: props.authedUser,
    };
    props.dispatch(handleAddQuestion(newQuestion));
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9">New Poll</h1>
      <h2>Would You Rather</h2>

      <form onSubmit={handleQuestionSubmit}>
        <div className="mt-3">
          <label
            htmlFor="firstOption"
            data-testid="Option1Label"
            className="block text-sm font-medium text-slate-700"
          >
            First Option
          </label>
          <div className="mt-1">
            <input
              value={firstOption}
              onChange={handleFirstOptionChange}
              type="text"
              name="firstOption"
              id="firstOption"
              data-testid="Option1"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="secondOption"
            data-testid="Option2Label"
            className="block text-sm font-medium text-slate-700"
          >
            Second Option
          </label>
          <div className="mt-1">
            <input
              value={secondOption}
              onChange={handleSecondOptionChange}
              type="text"
              name="secondOption"
              id="secondOption"
              data-testid="Option2"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            data-testid="submit-poll"
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
