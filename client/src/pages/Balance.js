// client/src/pages/Balance.js
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Balance({ user }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:5001/account/all').then(response => {
        const currentUser = response.data.find(u => u.email === user.email);
        if (currentUser) {
          setBalance(currentUser.balance);
        }
      }).catch(error => {
        console.error('Error fetching user balance:', error);
      });
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      bgcolor="info"
      header={`Greetings, ${user.name}!`}
      status=""
      body={
        <div>
          <p>Current balance: {balance !== null ? `$${balance}` : 'Fetching balance...'}</p>
        </div>
      }
    />
  );
}

export default Balance;
