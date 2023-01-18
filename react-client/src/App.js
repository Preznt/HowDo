import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Nav from "./comp/Nav";
import MainPage from "./comp/MainPage";
import MainBar from "./comp/MainBar";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<MainBar />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
