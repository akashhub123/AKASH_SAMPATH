import axios from "axios";
import { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [credentials, setCredentials] = useState(null);

  const loadCustomers = async (creds) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/customers`, { auth: creds });
      setCustomers(response.data);
    } catch (error) {
      setMessage(`Could not load customers: ${error.response?.status || error.message}`);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setMessage("");
    const creds = { username, password };
    try {
      const response = await axios.get(`${API_BASE_URL}/api/customers`, { auth: creds });
      const isAdmin = username === "admin";
      setCredentials(creds);
      setRole(isAdmin ? "ADMIN" : "USER");
      setCustomers(response.data);
      setLoggedIn(true);
    } catch (error) {
      setMessage(`Login failed: ${error.response?.status || error.message}`);
    }
  };

  const saveCustomer = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/customers`, customer, { auth: credentials });
      setMessage("Customer added successfully.");
      setCustomer({ name: "", email: "", phone: "" });
      loadCustomers(credentials);
    } catch (error) {
      setMessage(`Error: ${error.response?.status || error.message}`);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setCredentials(null);
    setUsername("");
    setPassword("");
    setRole("");
    setCustomers([]);
    setMessage("Logged out.");
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 500, margin: "50px auto", fontFamily: "Arial" }}>
        <h1>Electricity Bill System</h1>
        <h2>Stage 2 - Basic Authentication</h2>
        <form onSubmit={login}>
          <input style={{ width: "100%", padding: 10, marginBottom: 10 }} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input style={{ width: "100%", padding: 10, marginBottom: 10 }} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={{ width: "100%", padding: 10 }}>Login</button>
        </form>
        <p>USER: user / user123</p>
        <p>ADMIN: admin / admin123</p>
        {message && <p>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Electricity Bill Management System</h1>
      <p>Logged in as: <b>{username}</b></p>
      <p>Role: <b>{role}</b></p>
      <button onClick={logout}>Logout</button>
      <hr />
      <h2>Customers</h2>
      {customers.map((c) => <div key={c.id}>{c.id} - {c.name} - {c.email} - {c.phone}</div>)}
      {role === "ADMIN" && (
        <>
          <hr />
          <h2>Admin: Add Customer</h2>
          <input placeholder="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <br /><br />
          <input placeholder="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <br /><br />
          <input placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <br /><br />
          <button onClick={saveCustomer}>Save Customer</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
