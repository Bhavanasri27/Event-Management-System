import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", data);

      if (res.data.role === "organiser") {
        nav("/organiser");
      } else {
        nav("/participant");
      }

    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setData({...data, email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setData({...data, password:e.target.value})}/>

      <button onClick={login}>Login</button>

      <p onClick={() => nav("/register")}>Register</p>
    </div>
  );
}