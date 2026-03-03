import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Componentos/Header";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Shop from "./Pages/Shop";
import Card from "./Pages/Card";
import MakeStyle from "./Componentos/MakeStyle";
import Loader from "./Componentos/Loader";
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}
      <Header />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/card" element={<Card />} />
          <Route path="/make" element={<MakeStyle />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;