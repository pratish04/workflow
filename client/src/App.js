import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginRegister from "./components/LoginRegister/LoginRegister";
import Projects from "./components/Projects/Projects";
import ProjectView from "./components/ProjectView/ProjectView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginRegister />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/project-view" element={<ProjectView />} />
      </Routes>
    </BrowserRouter>
  );
}
