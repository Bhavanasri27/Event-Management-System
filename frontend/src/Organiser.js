import axios from "axios";
import { useState } from "react";

export default function Organiser() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: ""
  });

  const [code, setCode] = useState("");

  // ✅ Use deployed backend URL
  const API = "http://localhost:5000";

  const createEvent = async () => {
    try {
      const res = await axios.post(`${API}/api/create-event`, form);
      setCode(res.data.code);
    } catch (err) {
      console.log(err);
      alert("Error creating event");
    }
  };

  return (
    <div>
      <h2>Organiser</h2>

      <input
        placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        type="date"
        onChange={e => setForm({ ...form, date: e.target.value })}
      />

      <input
        type="time"
        onChange={e => setForm({ ...form, time: e.target.value })}
      />

      <input
        placeholder="Venue"
        onChange={e => setForm({ ...form, venue: e.target.value })}
      />

      <button onClick={createEvent}>Generate Code</button>

      {code && <h3>Code: {code}</h3>}
    </div>
  );
}