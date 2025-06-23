import {
  createBrowserRouter,
} from "react-router";
import Root from "../Pages/FrontEnd/Root";
import Home from "../Pages/FrontEnd/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        { index:true, element: <Home></Home> },
    ]
  },
]);