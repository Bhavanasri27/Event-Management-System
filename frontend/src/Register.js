import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    role: "organiser"
  });

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", data);
      alert("Registered Successfully");
      nav("/login"); // go to login after register
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <select onChange={e => setData({ ...data, role: e.target.value })}>
        <option value="organiser">Organiser</option>
        <option value="participant">Participant</option>
      </select>

      <button onClick={register}>Register</button>

      <p onClick={() => nav("/login")}>Already have account? Login</p>
    </div>
  );
}