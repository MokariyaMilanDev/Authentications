import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./styles/app.css";
import Home from "./pages/Home";
import User from "./pages/protectd/User";

function App() {
  return (
    <section className="app">
      <h1 className="app-heading">Hello, Authentiation</h1>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>

        {/* Protected route */}
        <Route path="/:username" element={<User />}></Route>
      </Routes>
    </section>
  );
}

export default App;
