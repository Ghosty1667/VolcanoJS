import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import VolcanoList from "./pages/VolcanoList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Volcanoes from "./pages/Volcanoes"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/VolcanoList" element={<VolcanoList />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Volcanoes" element={<Volcanoes />} />
    </Routes>

  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
