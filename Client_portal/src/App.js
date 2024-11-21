import "./App.css";
import Home from "./Home/Home";
import Client from "./Client_panel/pages/ClientMain/Client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Client_panel/pages/SignUp/SignUp";
import Test from "./Client_panel/components/Test/Test.jsx";
import Admin from "./Admin_panel/pages/Admin/Admin.jsx";
import ProtectedRoute from "./Client_panel/components/Test/ProtectedRoute.js";
import ClientStatus from "./Client_panel/pages/ClientStatus/ClientStatus.jsx";
import Developer from "./Developer_pannel/Developer.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Client />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projects" element={<ClientStatus />} />
        <Route path="/developer" element={<Developer />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
