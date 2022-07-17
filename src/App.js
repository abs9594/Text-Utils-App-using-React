import './App.css';
import NavBar from './Components/NavBar';
import TextForm from './Components/TextForm';
import Alert from './Components/Alert';
import About from './Components/About';
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light")
  const [alert, setAlert] = useState(null)

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark")
      document.body.style.backgroundColor = "#042743"
      modifyAlert("Dark Mode has been enabled", "success")
    }
    else {
      setMode("light")
      document.body.style.backgroundColor = "white"
      modifyAlert("Dark Mode has been disabled", "success")
    }
  }

  const modifyAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => { setAlert(null) }, 1500)
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar mode={mode} toggleMode={toggleMode} title="TITLE" />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/about" element={<About />}>
          </Route>
          <Route exact path="/" element={<TextForm mode={mode} modifyAlert={modifyAlert} heading="Enter the text to analyze below" />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
