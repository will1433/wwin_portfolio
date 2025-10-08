import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Admin from "./admin/Admin";
import Login from "./admin/Login";
import ErrorPage from "./ErrorPage";
import NotFound from "./NotFound";

const router = createBrowserRouter(
  [
    { path: "/", element: <App /> },
    { path: "/login", element: <Login /> },
    { path: "/admin", element: <Admin /> },
    { path: "*", element: <NotFound /> },   // catch-all
  ],
  {
    // root-level error boundary so you never see the default “Hey developer 👋”
    errorElement: <ErrorPage />,
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
