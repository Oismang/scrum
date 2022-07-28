import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth/auth";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Main from "./pages/main/main";
import Notfound from "./pages/notfound/notfound";
import Project from "./pages/project/project";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="auth" element={<Auth />} />
        <Route path="app" element={<Main />}>
          <Route path=":projectID" element={<Project />} />
        </Route>
  
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
