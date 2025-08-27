import { Route, Routes } from "react-router-dom";
// import Branch from "./pages/Branch";
// import CARS from "./pages/CARS/page";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      {/* <Route path="/:id" element={<Branch />} /> */}
      {/* <Route path="cars/:id" element={<CARS />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
