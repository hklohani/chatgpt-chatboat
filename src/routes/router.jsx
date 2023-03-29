import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../error-page";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/chat" replace />,
  },
  {
    path: "/chat",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat/:id",
    element: <Chat />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);
export default router;
