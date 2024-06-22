// client/src/pages/Deposit.js
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Deposit({ user }) {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:5001/account/all').then(response => {
        const currentUser = response.data.find(u => u.email === user.email);
        if (currentUser) {
          setBalance(currentUser.balance);
        }
      });
    }
  }, [user]);

  const handleDeposit = async () => {
    setStatus('');

    const depositAmount = Number(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert('Amount must be a positive number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/deposit', { email: user.email, amount: depositAmount });
      setBalance(response.data.balance);
      setStatus(`Deposit successful! Your new balance is: $${response.data.balance}`);
      setShow(false);
    } catch (error) {
      console.error('Deposit failed', error);
      setStatus('Deposit failed');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      bgcolor="warning"
      header={`Greetings, ${user.name}!`}
      status={status}
      body={show ? (
        <>
          <label>Current Balance: {balance !== null ? `$${balance}` : 'Fetching balance...'}</label><br />
          <label>Amount to Deposit:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          /><br />

          <button
            type="button"
            className="btn btn-light"
            onClick={handleDeposit}
            disabled={amount === ''}
          >
            Deposit
          </button>
        </>
      ) : (
        <DepositMsg setShow={setShow} setStatus={setStatus} status={status} balance={balance} />
      )}
    />
  );
}

function DepositMsg({ setShow, setStatus, status, balance }) {
  return (
    <>
      <h5>Success</h5>
      <p>{status}</p>
      <label>Current Balance: {balance !== null ? `$${balance}` : 'Fetching balance...'}</label><br />
      <button
        type="button"
        className="btn btn-light"
        onClick={() => {
          setShow(true);
          setStatus('');
        }}
      >
        Make Another Deposit
      </button>
    </>
  );
}

export default Deposit;
