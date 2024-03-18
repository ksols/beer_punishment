import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import Root from "./components/Root";
import MyLogin from "./pages/login";
import Straffer from "./pages/straffer";
import Logg from "./pages/test_logg";
import AdminPage from "./pages/admin_site";
import {
  RouterProvider,
  BrowserRouter,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <MyLogin /> },
      { path: "/straffer", element: <Straffer /> },
      { path: "/logg", element: <Logg /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
