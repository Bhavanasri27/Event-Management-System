import React, { useState } from "react";
import axios from "axios";

function Login({ setUser }) {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    const res = await axios.post("http://localhost:5001/api/auth/login", data);

    alert(res.data.msg);

    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/><br/><br/>
      <input type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/><br/><br/>

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;