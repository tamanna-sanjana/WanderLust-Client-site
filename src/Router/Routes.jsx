import {
  createBrowserRouter,
} from "react-router";
import Root from "../Pages/FrontEnd/Root";
import Home from "../Pages/FrontEnd/Home";
import AboutUs from "../Components/FrontEnd/AboutUs";
import Contact from "../Components/FrontEnd/Contact";
import Packages from "../Components/FrontEnd/Packages";
import Details from "../Pages/FrontEnd/Details";
import Blogs from "../Components/FrontEnd/Blogs";
import BlogDetails from "../Pages/FrontEnd/BlogDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        { index:true, element: <Home></Home> },
        {path: "/about", element:<AboutUs></AboutUs>},
        {path: "/contact", element:<Contact></Contact>},
        {path: "/packages", element:<Packages></Packages>},
        {path: "/details", element:<Details></Details>},
        {path: "/blog", element:<Blogs></Blogs>},
        {path: "/blogdetails", element:<BlogDetails></BlogDetails>},


    ]
  },

  
]);