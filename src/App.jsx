import Navbar from "./components/Navbar";
import MemeMachine from "./pages/MemeMachine";
import YoMamasFavMemes from "./pages/YoMamasFavMemes";
import { MemeProvider } from "./context/MemeContext";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <AppProvider>
    <MemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MemeMachine />} />
          <Route path="/yomamasfavmemes" element={<YoMamasFavMemes />} />
        </Routes>
      </Router>
    </MemeProvider>
    </AppProvider>
  );
};

export default App;
