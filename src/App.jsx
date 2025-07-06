import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import List from "./pages/List";
import Sql from "./pages/Sql";
import Layout from "./pages/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="list" element={<List />} />
        <Route path="sql" element={<Sql />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
