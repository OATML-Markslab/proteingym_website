import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Download from './pages/Download';
import Layout from "./pages/Layout";
import Benchmarks from './pages/Benchmarks';
import About from './pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
          </Route>
          <Route path="/benchmarks" element={<Layout />}>
            <Route index element={<Benchmarks />}/>
          </Route>
          <Route path="/download" element={<Layout />}>
            <Route index element={<Download />}/>
          </Route>
          {/* <Route path="/about" element={<Layout />}>
            <Route index element={<About />}/>
          </Route> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
