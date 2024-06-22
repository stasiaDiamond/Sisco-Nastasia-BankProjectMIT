import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import AccountHome from './pages/AccountHome';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Balance from './pages/Balance';
import AllData from './pages/AllData';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/account/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/login', { email, password });
      setUser(response.data);
      const usersResponse = await axios.get('http://localhost:5001/account/all');
      setUsers(usersResponse.data);
      navigate('/account-home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const createAccount = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/create-account', { name, email, password });
      setUser(response.data);
      const usersResponse = await axios.get('http://localhost:5001/account/all');
      setUsers(usersResponse.data);
      navigate('/account-home');
    } catch (error) {
      console.error('Create account failed', error);
    }
  };

  return (
    <>
      <NavBar user={user} />
      <div className="container" style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={user ? <AccountHome user={user} logout={logout} /> : <LandingPage login={login} createAccount={createAccount} />} />
          <Route path="/account-home" element={<AccountHome user={user} logout={logout} />} />
          <Route path="/deposit" element={<Deposit user={user} />} />
          <Route path="/withdraw" element={<Withdraw user={user} />} />
          <Route path="/balance" element={<Balance user={user} />} />
          <Route path="/all-data" element={<AllData users={users} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;