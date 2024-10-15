import Navbar from "./components/Navbar"
import MemeMachine from "./pages/MemeMachine"
import {MemeProvider} from "./context/MemeContext"

const App = () => {
  return (
    <>
    <MemeProvider>
      <MemeMachine />
    </MemeProvider>
    </>
  )
}

export default App
