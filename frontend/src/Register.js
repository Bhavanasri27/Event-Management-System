import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({
    name: "", email: "", password: "", role: "participant"
  });

  const register = async () => {
    const res = await axios.post("http://localhost:5001/api/auth/register", data);
    alert(res.data.msg);
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/><br/><br/>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/><br/><br/>
      <input placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/><br/><br/>

      <select onChange={e=>setData({...data,role:e.target.value})}>
        <option value="participant">Participant</option>
        <option value="organizer">Organizer</option>
      </select><br/><br/>

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;