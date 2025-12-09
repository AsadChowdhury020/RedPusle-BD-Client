import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPlant from "../pages/Dashboard/Seller/AddPlant";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import AboutUs from "../pages/NavbarPages/AboutUs";
import Blogs from "../pages/NavbarPages/Blogs";
import DonationRequests from "../pages/NavbarPages/DonationRequests";
import Funding from "../pages/NavbarPages/Funding";
import Reviews from "../pages/NavbarPages/Reviews";
import Search from "../pages/NavbarPages/Search";
import WhyChoose from "../pages/Home/WhyChoose/WhyChoose";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/plant/:id",
        element: <PlantDetails />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
        loader: async () => {
          return await fetch("/reviews.json").then((res) => res.json());
        },
      },
      {
        path: "/why-choose",
        element: <WhyChoose />,
        // loader: () => {
        //   return fetch("./whyChoose.json");
        // },
        // loader: () => fetch("/whyChoose.json").then((res) => res.json()),
      },
      {
        path: "/search",
        element: <Search />,
        loader: async () => {
          const districtsData = await fetch("/districts.json").then((res) =>
            res.json()
          );
          const upazilasData = await fetch("/upazilas.json").then((res) =>
            res.json()
          );

          return { districtsData, upazilasData };
        },
      },
      { path: "/login", element: <Login /> },
      {
        path: "/signup",
        element: <SignUp />,
        loader: async () => {
          const districtsData = await fetch("/districts.json").then((res) =>
            res.json()
          );
          const upazilasData = await fetch("/upazilas.json").then((res) =>
            res.json()
          );

          return { districtsData, upazilasData };
        },
      },
    ],
  },

  { path: "/about-us", element: <AboutUs /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/donation-requests", element: <DonationRequests /> },
  { path: "/funding", element: <Funding /> },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-plant",
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <CreateDonationRequest />
          </PrivateRoute>
        ),
        loader: async () => {
          const districtsData = await fetch("/districts.json").then((res) =>
            res.json()
          );
          const upazilasData = await fetch("/upazilas.json").then((res) =>
            res.json()
          );

          return { districtsData, upazilasData };
        },
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
