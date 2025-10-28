import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
