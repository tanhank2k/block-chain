import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { AppRouter } from "./router/route";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function App() {
  return (
    <div className="App">
      <Router>
        <AppRouter/>
      </Router>
    </div>
  );
}

export default App;
