import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Indels from './pages/Indels';
import Substitutions from './pages/Substitutions';
import AssayInfo from './pages/AssayInfo';
import Layout from "./pages/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
          </Route>
          <Route path="/indels" element={<Layout />}>
            <Route index element={<Indels />}/>
          </Route>
          <Route path="/substitutions" element={<Layout />}>
            <Route index element={<Substitutions />}/>
          </Route>
          <Route path="/assayinfo" element={<Layout />}>
            <Route index element={<AssayInfo />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
