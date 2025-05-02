import { createBrowserRouter } from "react-router";

import Home from "../pages/private/home";
import Layout from "../components/layout";

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
]);

export default router;