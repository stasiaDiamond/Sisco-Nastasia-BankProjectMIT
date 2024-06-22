// client/src/pages/Withdraw.js
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Withdraw({ user }) {
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
      const response = await axios.post('http://localhost:5001/api/withdraw', { email: user.email, amount: withdrawAmount });
      setBalance(response.data.balance);
      setStatus(`Withdrawal successful! Your new balance is: $${response.data.balance}`);
      setShow(false);
    } catch (error) {
      console.error('Withdrawal failed', error);
      setStatus('Withdrawal failed');
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
        <WithdrawMsg setShow={setShow} setStatus={setStatus} status={status} />
      )}
    />
  );
}

function WithdrawMsg({ setShow, setStatus, status }) {
  return (
    <>
      <h5>Success</h5>
      <p>{status}</p>
      <button
        type="submit"
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
