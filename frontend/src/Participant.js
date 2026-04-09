import axios from "axios";
import { useState } from "react";

export default function Participant() {
  const [code, setCode] = useState("");
  const [event, setEvent] = useState(null);

  // ✅ Use deployed backend URL
  const API = "https://event-management-system-2-el82.onrender.com";

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${API}/api/event/${code}`);
      setEvent(res.data);
    } catch (err) {
      console.log(err);
      alert("Invalid Code");
    }
  };

  return (
    <div>
      <h2>Participant</h2>

      <input
        placeholder="Enter Code"
        onChange={e => setCode(e.target.value)}
      />

      <button onClick={fetchEvent}>Submit</button>

      {event && (
        <div>
          <h3>{event.title}</h3>
          <p>{event.date}</p>
          <p>{event.time}</p>
          <p>{event.venue}</p>
        </div>
      )}
    </div>
  );
}