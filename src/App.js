import "./App.css";
import "./index.css";
import React from "react";
import Nav from "./components/nav";
import Dashboard from "./components/Dashboard";
import { Route, Routes, useLocation } from "react-router-dom";
import QuestionDetails from "./components/QuestionDetails";
import LeaderBoard from "./components/LeaderBoard";
import NewPoll from "./components/NewPoll";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";

function App() {
  const location = useLocation();

  // Conditionally render the <Nav /> component based on the route
  const renderNav = location.pathname !== "/login";

  return (
    <div className="App">
      {renderNav && <Nav />}

      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateRoute>
              <QuestionDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          exact
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        />
        <Route path="/404" exact element={<PageNotFound />} />
      </Routes>
    </div>
  );
}



export default App;
