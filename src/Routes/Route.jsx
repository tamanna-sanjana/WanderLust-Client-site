import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root";
import Home from "../Pages/Frontend/Home";
import About from "../Pages/Frontend/About";
import Service from "../Pages/Frontend/Service";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        loader: () => fetch("/service.json"),
        Component: Home,
      },
      { path: "/About", Component: About },
      {
        path: "/Service",
        loader: () => fetch("/service.json"),
        Component: Service,
      },
    ],
  },
]);
