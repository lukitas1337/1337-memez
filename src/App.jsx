import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MemeMachine from "./pages/MemeMachine";
import YomamasFavMemes from "./pages/YomamasFavMemes"; // Import the new component
import { MemeProvider } from "./context/MemeContext";

const App = () => {
  return (
    <>
      <MemeProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Route for MemeMachine */}
            <Route path="/" element={<MemeMachine />} />

            {/* Route for YomamasFavMemes */}
            <Route path="/yomamasfavmemes" element={<YomamasFavMemes />} />
          </Routes>
        </Router>
      </MemeProvider>
    </>
  );
};

export default App;
