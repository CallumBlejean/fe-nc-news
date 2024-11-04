import "./App.css";
import Header from "./Components/Header";
import Articles from "./Components/Articles";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Articles" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
