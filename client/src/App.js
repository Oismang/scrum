import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/auth";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Main from "./pages/main/main";
import Notfound from "./pages/notfound/notfound";
import Project from "./pages/project/project";
import { ProtectedRoutes } from "./components/protectedroutes/protectedroutes";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="auth" element={<Auth />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="app" element={<Main />}>
            <Route path=":projectId" element={<Project />} />
          </Route>
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
