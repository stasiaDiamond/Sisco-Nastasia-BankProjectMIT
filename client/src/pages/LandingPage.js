// client/src/pages/LandingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

function LandingPage({ login, createAccount }) {
  return (
    <div className="d-flex justify-content-start align-items-start">
      <div className="card-container">
        <CreateAccount createAccount={createAccount} />
      </div>
      <div className="card-container">
        <Login login={login} />
      </div>
    </div>
  );
}

function CreateAccount({ createAccount }) {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setAccountCreated(false);
    };
  }, []);

  const handle = async () => {
    if (name === '' || email === '' || password.length < 8) {
      alert('All fields are required and password must be at least 8 characters long');
      return;
    }

    try {
      await createAccount(name, email, password);
      setShow(false);
      setStatus('Account created successfully');
      setAccountCreated(true);
      setTimeout(() => {
        navigate('/account-home');
      }, 2000); // Delay navigation to allow message display
    } catch (error) {
      console.error('Create account failed', error);
      setStatus('Failed to create account: ' + error.message);
    }
  };

  const isFormValid = name !== '' && email !== '' && password.length >= 8;

  return (
    <div>
      {accountCreated && <h1>Success! Account created</h1>}
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show ? (
          <>
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            /><br />

            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            /><br />

            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            /><br />

            <button
              type="submit"
              className="btn btn-success"
              onClick={handle}
              disabled={!isFormValid}
            >
              Create Account
            </button>
          </>
        ) : (
          <CreateMsg setShow={setShow} />
        )}
      />
    </div>
  );
}

function CreateMsg({ setShow }) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-success"
        onClick={() => setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function Login({ login }) {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      setShow(false);
      navigate('/account-home');
    } catch (error) {
      console.error('Login failed', error);
      setStatus('Login failed!');
    }
  };

  const isFormValid = email !== '' && password !== '';

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? (
        <>
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          /><br />

          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /><br />

          <button
            type="submit"
            className="btn btn-light"
            onClick={handleLogin}
            disabled={!isFormValid}
          >
            Login
          </button>
        </>
      ) : (
        <LoginMsg setShow={setShow} />
      )}
    />
  );
}

function LoginMsg({ setShow }) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

export default LandingPage;
