import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './user';
import { RootState, AppDispatch } from './store';
import './App.css';


const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [filters, setFilters] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.phone.includes(filters.phone)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div className="main-table">
        <h1>User Management</h1>

        {}
        <div>
          <input
              className="first-input"
              type="text"
              name="name"
              placeholder="Filter by name"
              value={filters.name}
              onChange={handleInputChange}
          />
          <input
              className="second-input"
              type="text"
              name="username"
              placeholder="Filter by username"
              value={filters.username}
              onChange={handleInputChange}
          />
          <input
              className="third-input"
              type="text"
              name="email"
              placeholder="Filter by email"
              value={filters.email}
              onChange={handleInputChange}
          />
          <input
              className="fourth-input"
              type="text"
              name="phone"
              placeholder="Filter by phone"
              value={filters.phone}
              onChange={handleInputChange}
          />
        </div>

        {}
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          </thead>
          <tbody>
          {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default App;
