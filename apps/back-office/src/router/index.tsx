import { createBrowserRouter } from "react-router";

import Layout from "../components/layout";

import Home from "../pages/private/home";
import Login from "../pages/login";
import ForgotPassword from "../pages/forgot-password";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> }
      ]
    },
    {
      path: "/employee",
      element: <Layout />,
      children: [
        { path: "register", element: <Home /> }
      ]
    },
    {
      path: "/",
      children: [
        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },
      ]
    }
]);

export default router;