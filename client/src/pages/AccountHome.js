import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';

function AccountHome({ user, logout }) {
  const [catFact, setCatFact] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchCatFact = async () => {
      try {
        const response = await axios.get('https://meowfacts.herokuapp.com/');
        setCatFact(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching cat fact:', error);
      }
    };

    fetchCatFact();
  }, []);

  if (!user) {
    return (
      <Card
        bgcolor="danger"
        header="Error"
        body={
          <>
            <p>No user data available. Please log in again.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Go to Login
            </button>
          </>
        }
      />
    );
  }

  return (
    <>
      <Card
        bgcolor="info"
        header={`Welcome, ${user.name}!`}
        body={
          <>
            <p>Welcome to your account home page.</p>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        }
      />
      <Card
        bgcolor="secondary"
        header="Cat Fact"
        body={
          <p>{catFact}</p>
        }
      />
    </>
  );
}

export default AccountHome;
