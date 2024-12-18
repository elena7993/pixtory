import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import GeneratePhoto from "./pages/generation/GeneratePhoto";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<GeneratePhoto />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
