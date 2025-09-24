import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../styles/admindashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/customer/getorders");
      setOrders(res.data.orders);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      {error && <p className="admin-error">{error}</p>}
      <table className="orders-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Order Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;