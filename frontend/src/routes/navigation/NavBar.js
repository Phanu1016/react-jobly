import React, {useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

/** Nav Bar for the site that shows up on top of every page
 * 
 * also shows different things depending on if a user is logged in or not
 */
function NavBar({logout}) {
    const {currentUser} = useContext(UserContext);
    function loggedIn() {
        return (
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <NavLink className="nav-link" to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className="nav-link" to="/jobs">
                        Jobs
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log Out {currentUser.first_name || currentUser.username}
                    </Link>
                </li>
            </ul>
        )
    }

    function loggedOut() {
        return (
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        )
    }

    return (
        <nav className="NavBar navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Jobly
            </Link>
            {currentUser ? loggedIn() : loggedOut()}
        </nav>
    )
}

export default NavBar;