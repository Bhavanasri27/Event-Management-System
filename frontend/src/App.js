import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Organiser from "./Organiser";
import Participant from "./Participant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ FIRST PAGE */}
        <Route path="/" element={<Register />} />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARDS */}
        <Route path="/organiser" element={<Organiser />} />
        <Route path="/participant" element={<Participant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;