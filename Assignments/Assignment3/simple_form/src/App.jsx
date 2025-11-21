
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";

function FormPage({ addUser }) {
  const [formData, setFormData] = useState({ name: "", age: "", address: "", contact: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "image" ? URL.createObjectURL(files[0]) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    navigate("/users");
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function UsersPage({ users }) {
  return (
    <div className="users-container">
      <h2>Users List</h2>
      <div className="card-grid">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <img src={user.image} alt="user" />
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            <Link to={`/details/${index}`}><button>View Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserDetails({ users }) {
  const id = window.location.pathname.split("/").pop();
  const user = users[id];

  return (
    <div className="details-container">
      <img src={user.image} alt="user" />
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Address: {user.address}</p>
      <p>Contact: {user.contact}</p>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);
  const addUser = (user) => setUsers([...users, user]);

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Form</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FormPage addUser={addUser} />} />
        <Route path="/users" element={<UsersPage users={users} />} />
        <Route path="/details/:id" element={<UserDetails users={users} />} />
      </Routes>
    </Router>
  );
}


