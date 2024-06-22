// client/src/pages/AllData.js
import React from 'react';

function AllData({ users }) {
  return (
    <>
      <h1>All Data in Storage</h1>
      <div className="container">
        {users.map((user, index) => (
          <div key={index} className="card mb-3 bg-success" style={{ maxWidth: '18rem' }}>
            <div className="card-header">User Data</div>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">Password: {user.password}</p>
              <p className="card-text">Balance: ${user.balance}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllData;