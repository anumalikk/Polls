import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { connect } from "react-redux";
import { handleLogout } from "../actions/shared";

const Nav = (props) => {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    props.dispatch(handleLogout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-center space-x-4">
      <Link
        to="/"
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Home
      </Link>
      <Link
        to="/leaderboard"
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Leaderboard
      </Link>
      <Link
        to="/add"
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        New Poll
      </Link>

      <button
        onClick={logout}
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Logout
      </button>
      <span
        className="font-medium px-3 py-2 text-slate-700"
        data-testid="user-information"
      >
        User: {props.authedUserId}
      </span>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUserId: authedUser,
  };
};

export default connect(mapStateToProps)(Nav);
