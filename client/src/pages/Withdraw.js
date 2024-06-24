import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

function Withdraw({ user }) {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (user) {
      axios.get(`${API_URL}/account/all`).then(response => {
        const currentUser = response.data.find(u => u.email === user.email);
        if (currentUser) {
          setBalance(currentUser.balance);
        }
      }).catch(error => {
        console.error('Error fetching balance:', error);
        setStatus('Error fetching balance');
      });
    }
  }, [user]);

  const handleWithdraw = async () => {
    setStatus('');

    const withdrawAmount = Number(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert('Amount must be a positive number');
      return;
    }
    if (withdrawAmount > balance) {
      alert('Insufficient funds');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/withdraw`, { email: user.email, amount: withdrawAmount });
      setBalance(response.data.balance);
      setStatus(`Withdrawal successful! Your new balance is: $${response.data.balance}`);
      setShow(false);
    } catch (error) {
      console.error('Withdrawal failed', error);
      setStatus('Withdrawal failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <Card
      bgcolor="success"
      header={`Greetings, ${user.name}!`}
      status={status}
      body={show ? (
        <>
          <label>Current Balance: {balance !== null ? `$${balance}` : 'Fetching balance...'}</label><br />

          <label>Amount to Withdraw:</label>
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
            onClick={handleWithdraw}
            disabled={amount === ''}
          >
            Withdraw
          </button>
        </>
      ) : (
        <WithdrawMsg setShow={setShow} setStatus={setStatus} status={status} balance={balance} />
      )}
    />
  );
}

function WithdrawMsg({ setShow, setStatus, status, balance }) {
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
        Withdraw again
      </button>
    </>
  );
}

export default Withdraw;
