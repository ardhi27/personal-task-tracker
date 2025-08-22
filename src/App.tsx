import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DisplayButton from "./DisplayButton";
import InputPage from "./pages/input-task";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
