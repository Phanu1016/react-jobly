import React, { useState, useEffect } from 'react';
import JoblyApi from "./api/api";
import jwt from "jsonwebtoken";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import LoadingSpinner from "./common/LoadingSpinner";
import UserContext from "./routes/auth/UserContext";
import Navigation from "./routes/navigation/NavBar";
import RouteList from "./routes/navigation/Routes";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [appId, setAppId] = useState(new Set([]));
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currUser = await JoblyApi.getCurrentUser(username);
          setCurrUser(currUser);
          setAppId(new Set(currUser.applications));
          } catch (err) {
          console.error("problem loading user info", err);
          setCurrUser(null);
        }
      }
      setIsLoaded(true); 
    }

    // Loading wheel while loading
    setIsLoaded(false);
    getCurrentUser();
  }, [token]);

  // Sign out a user and remove token
  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  // Sign up user and login/set token
  async function signup(signupData) {
    try{ 
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err};
    }
  }

  // Login user and set token
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err};
    }
  }

  // Helper to check if has applied job(s)
  function hasAppliedToJob(id) {
    return appId.has(id);
  }

  // Helper to apply a job for a user
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;

    JoblyApi.applyToJob(currUser.username, id);
    setAppId(new Set([...appId, id]));
  }

  // Loading wheel while fetching
  if (!isLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser: currUser, setCurrUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Navigation logout={logout} />
          <RouteList login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;