'use client'
import DifficultScreen from "./components/DifficultScreen";
import FormLinkIdentifier from "./components/FormLinkIdentifier";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Puzzle from "./components/Puzzle";
import Puzzle2 from "./components/Puzzle2";
import Welcome from "./components/Welcome";
import ComoJogar from "./components/ComoJogar";
import { Venceu } from "./components/Venceu";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/jogar" element={<FormLinkIdentifier />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/puzzle" element={<Puzzle2 />} />
        <Route path="/como-jogar" element={<ComoJogar />} />
        <Route path="/venceu" element={<Venceu />} />
      </Routes>
    </Router>
  );
}

