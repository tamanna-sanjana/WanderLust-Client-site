import { createBrowserRouter } from "react-router";
import Root from "../Pages/FrontEnd/Root";
import Home from "../Pages/FrontEnd/Home";
import AboutUs from "../Components/FrontEnd/AboutUs";
import Contact from "../Components/FrontEnd/Contact";
import Packages from "../Components/FrontEnd/Packages";
import Details from "../Pages/FrontEnd/Details";
import Blogs from "../Components/FrontEnd/Blogs";
import BlogDetails from "../Pages/FrontEnd/BlogDetails";
import Login from "../Pages/Backend/Auth/Login";
import Register from "../Pages/Backend/Auth/Register";
import ErrorPage from "../Pages/Error/ErrorPage";
import AdminDashboard from "../Pages/Backend/Admin/AdminDashboard";
import Admin from "../Components/Backend/Admin/Admin";
import AddUser from "../Components/Backend/Admin/User/AddUser";
import AllUser from "../Components/Backend/Admin/User/AllUser";
import Service from "../Pages/Backend/Admin/Service/service";
import AllServices from "../Pages/Backend/Admin/Service/AllServices";
import AddPackage from "../Pages/Backend/Admin/Package/AddPackage";
import AllPackage from "../Pages/Backend/Admin/Package/AllPackage";
import UserRole from "../Pages/Backend/Admin/Userrole/UserRole";
import AllUserRole from "../Pages/Backend/Admin/Userrole/AllUserRole";
import ModeratorDashboad from "../Pages/Backend/Moderator/ModeratorDashboad";
import AddPackages from "../Pages/Backend/Moderator/Package/AddPackages";
import MyPackage from "../Pages/Backend/Moderator/Package/MyPackage";
import AddBlog from "../Pages/Backend/Moderator/Blog/AddBlog";
import AllBlog from "../Pages/Backend/Moderator/Blog/AllBlog";
import BookHistory from "../Pages/Backend/Moderator/BookHistory";
import UserDashboard from "../Pages/Backend/User/UserDashboard";
import BookHistories from "../Pages/Backend/User/BookHistories";
import PaymentHistory from "../Pages/Backend/User/PaymentHistory";
import UpdateUser from "../Components/Backend/Admin/User/UpdateUser";
import ViewPackage from "../Pages/Backend/Admin/Package/viewPackage";
import EditPackage from "../Pages/Backend/Admin/Package/EditPackage";
import AddGuide from "../Pages/Backend/Moderator/Guide/AddGuide";
import AllGuide from "../Pages/Backend/Moderator/Guide/AllGuide";
import AllGuides from "../Pages/Backend/Admin/Guide/AllGuides";
import PackagePage from "../Pages/FrontEnd/PackagePage";
import ContractPage from "../Pages/FrontEnd/ContractPage";
import About from "../Pages/FrontEnd/About";
import PrivateRoute from "./PrivateRoute";
import BookingSection from "../Pages/FrontEnd/BookingSection";
import Moderator from "../Components/Backend/Moderator/Moderator";
import User from "../Components/Backend/User/UserDash";
import UserDash from "../Components/Backend/User/UserDash";
import Payment from "../Pages/Backend/Moderator/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Root></Root>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "/about", element: <About></About> },
      { path: "/contact", element: <ContractPage></ContractPage> },
      { path: "/packages", element: <PackagePage></PackagePage> },
      { path: "/details/:id", element: <Details></Details> },
      { path: "/book/:id", element: <BookingSection></BookingSection> },
      { path: "/blog", element: <Blogs></Blogs> },
      { path: "/blogdetails/:id", element: <BlogDetails></BlogDetails> },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/admindashboard",
    element: (
      <PrivateRoute>
        <AdminDashboard></AdminDashboard>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Admin></Admin> },
      { path: "/admindashboard/users/add", element: <AddUser></AddUser> },
      { path: "/admindashboard/users/all", element: <AllUser></AllUser> },
      {
        path: "/admindashboard/users/all/edit-user/:id",
        element: <UpdateUser></UpdateUser>,
      },
      { path: "/admindashboard/services/add", element: <Service></Service> },
      {
        path: "/admindashboard/services/all",
        element: <AllServices></AllServices>,
      },
      {
        path: "/admindashboard/packages/add",
        element: <AddPackage></AddPackage>,
      },
      {
        path: "/admindashboard/packages/all",
        element: <AllPackage></AllPackage>,
      },
      {
        path: "/admindashboard/packages/all/viewpackage/:id",
        element: <ViewPackage></ViewPackage>,
      },
      {
        path: "/admindashboard/packages/all/editpackage/:id",
        element: <EditPackage></EditPackage>,
      },
      { path: "/admindashboard/guide/add", element: <AddGuide></AddGuide> },
      { path: "/admindashboard/guide/all", element: <AllGuides></AllGuides> },
      { path: "/admindashboard/blog/add", element: <AddBlog></AddBlog> },
      { path: "/admindashboard/blog/all", element: <AllBlog></AllBlog> },
      { path: "/admindashboard/roles/add", element: <UserRole></UserRole> },
      {
        path: "/admindashboard/roles/all",
        element: <AllUserRole></AllUserRole>,
      },
    ],
  },
  {
    path: "/moderatordashboard",
    element: (
      <PrivateRoute>
        <ModeratorDashboad></ModeratorDashboad>
      </PrivateRoute>
    ),
    children: [
      {
        index:true,element:<Moderator></Moderator>
      },
      {
        path: "/moderatordashboard/package/add",
        element: <AddPackages></AddPackages>,
      },
      {
        path: "/moderatordashboard/package/all",
        element: <MyPackage></MyPackage>,
      },
      { path: "/moderatordashboard/guide/add", element: <AddGuide></AddGuide> },
      { path: "/moderatordashboard/guide/all", element: <AllGuide></AllGuide> },
      {
        path: "/moderatordashboard/package/all/viewpackage/:id",
        element: <ViewPackage></ViewPackage>,
      },
      {
        path: "/moderatordashboard/package/all/editpackage/:id",
        element: <EditPackage></EditPackage>,
      },
      { path: "/moderatordashboard/blog/add", element: <AddBlog></AddBlog> },
      { path: "/moderatordashboard/blog/all", element: <AllBlog></AllBlog> },
      {
        path: "/moderatordashboard/book-history",
        element: <BookHistory></BookHistory>,
      },
      {
        path: "/moderatordashboard/paymentshistory",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/userdashboard",
    element: (
      <PrivateRoute>
        <UserDashboard></UserDashboard>
      </PrivateRoute>
    ),

    children: [
      {index:true,element:<UserDash></UserDash>},
      { path: "book-history", element: <BookHistories></BookHistories> },
      { path: "payment-history", element: <PaymentHistory></PaymentHistory> },
    ],
  },
]);
