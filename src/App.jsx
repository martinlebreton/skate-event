import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import Admin from "./pages/Admin";
import Organisateurs from "./pages/Organisateurs";
import OrgDetail from "./pages/OrgDetail";
import Contact from "./pages/Contact";
import TabBar from "./components/ui/TabBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/organisateurs" element={<Organisateurs />} />
        <Route path="/organisateurs/:id" element={<OrgDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <TabBar />
    </BrowserRouter>
  );
}

export default App;
