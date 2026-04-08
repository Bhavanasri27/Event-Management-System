import axios from "axios";
import { useState } from "react";

export default function Participant() {
  const [code, setCode] = useState("");
  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/event/${code}`);
      setEvent(res.data);
    } catch {
      alert("Invalid Code");
    }
  };

  return (
    <div>
      <h2>Participant</h2>

      <input placeholder="Enter Code" onChange={e => setCode(e.target.value)}/>
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