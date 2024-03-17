import React, { useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import UserContext from "../auth/UserContext";

function RouteList({ login, signup }) {
    const { currentUser } = useContext(UserContext);
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/companies" element={currentUser ? <CompanyList /> : <Navigate to="/login" />} />
                <Route path="/companies/:handle" element={currentUser ? <CompanyDetail /> : <Navigate to="/login" />} />
                <Route path="/jobs" element={currentUser ? <JobList /> : <Navigate to="/login" />} />
                <Route path="/profile" element={currentUser ? <ProfileForm /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}

export default RouteList;