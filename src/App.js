import React from "react";
import "./assets/css/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Nuevo from "./components/Nuevo";
import Editar from "./components/Editar";
import Home from "./components/Home";
import Tabla from "./components/Tabla";
import TablaPautas from "./components/TablaPautas";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const storedResp = localStorage.getItem("token");
  const userResp = localStorage.getItem("user");
  const [modalShow, setModalShow] = React.useState(false);
  //console.log(userResp);
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Nuevo />} />

          <Route element={<ProtectedRoute user={userResp} />}>
            <Route exact path="/user-profile/:id" element={<Editar />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/usuarios" element={<Tabla />} />
            <Route exact path="/pautas" element={<TablaPautas />} />
          </Route>
          
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
