// client/src/pages/AccountHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

function AccountHome({ user, logout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
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
  );
}

export default AccountHome;
