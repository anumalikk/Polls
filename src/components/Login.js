import "../App.css";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import "../index.css";
import React, { useState } from "react";

import { handleInitialDataForLogin } from "../actions/shared";


function Login(props) {  
  const userNames = ["sarahedo", "tylermcginnis", "mtsamis", "zoshikanlu"];
  // Initialize a state variable to keep track of the selected user
  const [selectedUser, setSelectedUser] = useState("");

  if (props.loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    props.dispatch(handleInitialDataForLogin(selectedUser));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9" data-testid="login-h1">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Select a user:
            <select value={selectedUser} onChange={handleUserChange}>
              <option value="">Select a user</option>
              {userNames.map((userName, index) => (
                <option key={userName} value={userName}>
                  {userName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            data-testid="submit"
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users: users,
    loggedIn: !!authedUser,
  };
};

export default connect(mapStateToProps)(Login);
