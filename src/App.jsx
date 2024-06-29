import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import SignUp from "./pages/auth/signUp";
import LogIn from "./pages/auth/logIn";
import ForgetPassword from "./pages/auth/forget";
import {
  DoAuthentication,
  IsAuthenticated,
  IsProfileCompleted,
  IsProfileCompleting,
} from "./components/lib";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import Profile from "./pages/profile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="" element={<IsAuthenticated />}>
          <Route path="" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>

        <Route path="/" element={<DoAuthentication />}>
          <Route path="" element={<IsProfileCompleted />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="" element={<IsProfileCompleting />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<h1>aboout</h1>} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
