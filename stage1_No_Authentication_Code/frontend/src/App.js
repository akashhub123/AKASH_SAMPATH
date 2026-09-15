import axios from "axios";
import { useState } from "react";

const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

function App() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const saveCustomer = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/customers`,
        customer
      );

      console.log(response.data);

      alert("Customer Added Successfully");

      setCustomer({
        name: "",
        email: "",
        phone: ""
      });

    } catch (error) {
      console.error(error);

      console.log(error.response?.data);

      alert(
        "Error: " +
        JSON.stringify(error.response?.data || error.message)
      );
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Customer Registration</h1>

      <input
        type="text"
        placeholder="Name"
        value={customer.name}
        onChange={(e) =>
          setCustomer({
            ...customer,
            name: e.target.value
          })
        }
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={customer.email}
        onChange={(e) =>
          setCustomer({
            ...customer,
            email: e.target.value
          })
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Phone Number"
        value={customer.phone}
        onChange={(e) =>
          setCustomer({
            ...customer,
            phone: e.target.value
          })
        }
      />

      <br />
      <br />

      <button onClick={saveCustomer}>
        Save Customer
      </button>
    </div>
  );
}

export default App;