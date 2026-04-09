import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register.jsx";
import Login from "./features/auth/pages/Login.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Protected from "./features/auth/components/protected.jsx";
import Interview from "./features/interview/pages/Interview.jsx";
import History from "../src/features/interview/pages/History.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/interview/:interviewId",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),
  },
  {
    path: "/history",
    element: <Protected><History/></Protected>,
  },
]);
