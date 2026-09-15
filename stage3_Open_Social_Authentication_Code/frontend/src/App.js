import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

axios.defaults.withCredentials = true;

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(null);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  const isAdmin = auth?.authorities?.includes("ROLE_ADMIN");

  const loadMe = async (basic = null) => {
    try {
      const config = basic ? { auth: basic } : {};
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`, config);
      setAuth({ ...response.data, basic });
      return response.data;
    } catch {
      setAuth(null);
      return null;
    }
  };

  const loadCustomers = async (basic = auth?.basic) => {
    try {
      const config = basic ? { auth: basic } : {};
      const response = await axios.get(`${API_BASE_URL}/api/customers`, config);
      setCustomers(response.data);
    } catch (error) {
      setMessage(`Could not load customers: ${error.response?.status || error.message}`);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    if (auth) loadCustomers(auth.basic);
  }, [auth]);

  const basicLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = await loadMe({ username, password });
    if (!data) {
      setMessage("Login failed. Try user/user123 or admin/admin123.");
    }
  };

  const googleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
    } catch {}
    setAuth(null);
    setUsername("");
    setPassword("");
    setMessage("Logged out.");
  };

  const saveCustomer = async () => {
    try {
      const config = auth?.basic ? { auth: auth.basic } : {};
      await axios.post(`${API_BASE_URL}/api/customers`, customer, config);
      setMessage("Customer added successfully.");
      setCustomer({ name: "", email: "", phone: "" });
      loadCustomers(auth?.basic);
    } catch (error) {
      setMessage(`Error: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  if (!auth) {
    return (
      <div style={{ maxWidth: 500, margin: "50px auto", fontFamily: "Arial" }}>
        <h1>Electricity Bill System</h1>
        <h2>Login</h2>

        <form onSubmit={basicLogin}>
          <input
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={{ padding: 10, width: "100%" }}>
            Login with Basic Authentication
          </button>
        </form>

        <hr />

        <button onClick={googleLogin} style={{ padding: 10, width: "100%" }}>
          Continue with Google
        </button>

        <p>Basic USER: user / user123</p>
        <p>Basic ADMIN: admin / admin123</p>
        {message && <p>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Electricity Bill Management System</h1>
      <p>
        Logged in as: <b>{auth.name}</b>
      </p>
      <p>
        Role: <b>{isAdmin ? "ADMIN" : "USER"}</b>
      </p>

      <button onClick={logout}>Logout</button>

      <hr />

      <h2>Customers</h2>
      {customers.map((c) => (
        <div key={c.id} style={{ marginBottom: 8 }}>
          {c.id} - {c.name} - {c.email} - {c.phone}
        </div>
      ))}

      {isAdmin && (
        <>
          <hr />
          <h2>Admin: Add Customer</h2>

          <input
            placeholder="Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <br /><br />

          <input
            placeholder="Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />
          <br /><br />

          <input
            placeholder="Phone Number"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
          <br /><br />

          <button onClick={saveCustomer}>Save Customer</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
