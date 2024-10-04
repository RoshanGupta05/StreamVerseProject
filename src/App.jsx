import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch/:id" element={<Watch />} /> {/* Corrected route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
