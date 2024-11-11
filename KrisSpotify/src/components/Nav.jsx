import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrentlyPlaying from './CurrentlyPlaying'; // Import the new component

const CLIENT_ID = 'ffc841f483e145f38be3d1bc8a92259f';
const REDIRECT_URI = 'http://localhost:5173/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

const Nav = () => {
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find(elem => elem.startsWith('access_token'))
        .split('=')[1];
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }
    setToken(token);

    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserName(data.display_name); // Set the user's display name
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken('');
    setUserName('');
  };

  return (
    <div>
      <header>
        <h1>Kris's List</h1>
        {token ? (
          <>
            <div>
              <span className="user-name">{userName}</span>
              <button className="btn" onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <a href={loginUrl} rel="noopener noreferrer">
            <button className="btn">Login</button>
          </a>
        )}
      </header>

      {/* Display CurrentlyPlaying component */}
      {token && <CurrentlyPlaying token={token} />}
    </div>
  );
};

export default Nav;
