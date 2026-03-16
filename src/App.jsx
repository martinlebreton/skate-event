import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import Admin from "./pages/Admin";
import Organisateurs from "./pages/Organisateurs";
import TabBar from "./components/TabBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/organisateurs" element={<Organisateurs />} />
      </Routes>
      <TabBar />
    </BrowserRouter>
  );
}

export default App;
