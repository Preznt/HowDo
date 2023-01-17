import logo from "./logo.svg";
import "./css/App.css";
import "./css/index.css";
import Nav from "./comp/Nav";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Nav />
    </div>
  );
}

export default App;
