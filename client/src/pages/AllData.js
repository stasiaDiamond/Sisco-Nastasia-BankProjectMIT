import React from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

function AllData({ users, fetchUsers }) {
  const handleDeleteUser = async (email) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await axios.delete(`${API_URL}/api/delete-user/${email}`);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  return (
    <>
      <h1>All Users Data</h1>
      <div className="container">
        {users.map((user) => (
          <div key={user._id} className="card mb-3 bg-light" style={{ maxWidth: '18rem' }}>
            <div className="card-header">User Data</div>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">Password: {user.password}</p>
              <p className="card-text">Balance: ${user.balance}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteUser(user.email)}
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllData;
