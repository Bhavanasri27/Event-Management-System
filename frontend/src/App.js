import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", time: "" });
  const [code, setCode] = useState("");
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) setUser(u);
  }, []);

  // ✅ BOOK EVENT
  const bookEvent = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/events", {
        ...form,
        venue: "Main Auditorium"
      });

      alert("Event Code: " + res.data.code);
    } catch (err) {
      alert("Booking Error");
      console.log(err);
    }
  };

  // ✅ GET EVENT
  const getEvent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/events/${code}`
      );

      if (res.data.msg) {
        alert(res.data.msg);
        setEvent(null);
      } else {
        setEvent(res.data);
      }
    } catch (err) {
      alert("Invalid Code");
    }
  };

  // 🔴 NOT LOGGED IN
  if (!user) {
    return (
      <div>
        <h1>Event Management System</h1>
        <Register />
        <Login setUser={setUser} />
      </div>
    );
  }

  // 🟢 LOGGED IN
  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome {user.name} ({user.role})</h2>

      <button onClick={() => {
        localStorage.removeItem("user");
        setUser(null);
      }}>
        Logout
      </button>

      <h3>Admin Contact</h3>
      <p>Email: admin@gmail.com</p>
      <p>Phone: 9876543210</p>

      {/* ORGANIZER */}
      {user.role === "organizer" && (
        <div>
          <h3>Book Event</h3>

          <input placeholder="Title"
            onChange={(e)=>setForm({...form,title:e.target.value})}/><br/><br/>

          <input type="date"
            onChange={(e)=>setForm({...form,date:e.target.value})}/><br/><br/>

          <input type="time"
            onChange={(e)=>setForm({...form,time:e.target.value})}/><br/><br/>

          <button onClick={bookEvent}>Book Slot</button>
        </div>
      )}

      {/* PARTICIPANT */}
      {user.role === "participant" && (
        <div>
          <h3>Enter Event Code</h3>

          <input onChange={(e)=>setCode(e.target.value)} /><br/><br/>
          <button onClick={getEvent}>View Event</button>

          {event && (
            <div>
              <p>Title: {event.title}</p>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Venue: {event.venue}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;