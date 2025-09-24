import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendNotification = async () => {
    try {
      const res = await axios.post("http://localhost:5000/twilio/send-sms", { message });
      setStatus(res.data.success ? "✅ Message sent successfully!" : "❌ Failed to send message");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending message");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Send SMS Notification</h1>

      <textarea
        className="border p-2 rounded w-80 mb-4"
        rows="4"
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendNotification}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send Notification
      </button>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}

export default App;
