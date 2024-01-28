'use client'
import DifficultScreen from "./components/DifficultScreen";
import FormLinkIdentifier from "./components/FormLinkIdentifier";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Puzzle from "./components/Puzzle";
import Puzzle2 from "./components/Puzzle2";
import Welcome from "./components/Welcome";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/jogar" element={<FormLinkIdentifier />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/puzzle" element={<Puzzle2 />} />
      </Routes>
    </Router>
  );
}

