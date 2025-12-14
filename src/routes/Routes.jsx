import Home from "../pages/Home/Home/Home";
import ErrorPage from "../components/Shared/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import AboutUs from "../pages/NavbarPages/AboutUs";
import Blogs from "../pages/NavbarPages/Blogs";
import DonationRequests from "../pages/NavbarPages/DonationRequests";
import Funding from "../pages/NavbarPages/Funding/Funding";
import Reviews from "../pages/NavbarPages/Reviews";
import Search from "../pages/NavbarPages/Search";
import WhyChoose from "../pages/Home/WhyChoose/WhyChoose";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import DonationRequestDetails from "../pages/Dashboard/Donor/DonationRequestDetails/DonationRequestDetails";
import EditRequest from "../pages/Dashboard/Donor/EditRequest";
import AllBloodDonationRequests from "../pages/Dashboard/Admin/AllBloodDonationRequests";
import BlogDetails from "../pages/NavbarPages/BlogDetails";
import CreateBlog from "../pages/NavbarPages/CreateBlog";
import FundingForm from "../pages/NavbarPages/Funding/FundingForm";
import FundingSuccess from "../pages/NavbarPages/Funding/FundingSuccess";
import FundingCancel from "../pages/NavbarPages/Funding/FundingCancel";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import DonorDashboardHome from "../pages/Dashboard/Donor/DonorDashboardHome";
import VolunteerHome from "../pages/Dashboard/Volunteer/VolunteerHome";
import VolunteerMenu from "../components/Dashboard/Sidebar/Menu/VolunteerMenu";
import UpdateProfile from "../pages/Dashboard/Common/UpdateProfile";

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
        path: "/reviews",
        element: <Reviews />,
        loader: async () => {
          return await fetch("/reviews.json").then((res) => res.json());
        },
      },
      { path: "/donation-requests",
         element: <DonationRequests /> },
      {
        path: "/why-choose",
        element: <WhyChoose />
      },
      {
        path: "/search",
        element: <Search />
      },
      { path: "/blogs", 
        element: <Blogs /> },
      { path: "/blog-details/:id", 
        element: <BlogDetails /> },
      {
        path: "/create-blog",
        element: (
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        ),
      },
      { path: "/about-us",
         element: <AboutUs /> },
      { path: "/funding", 
        element: <Funding /> },
      { path: "/funding-success",
         element: <FundingSuccess /> },
      { path: "/funding-cancel",
         element: <FundingCancel /> },
      {
        path: "/funding/form",
        element: <FundingForm />,
      },
      { path: "/login",
         element: <Login /> },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path : 'admin',
        element: (
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        ),
      },
      {
        path : 'volunteer',
        element: (
          <PrivateRoute>
            <VolunteerMenu />
          </PrivateRoute>
        ),
      },
      {
        path : 'donor',
        element: (
          <PrivateRoute>
            <DonorDashboardHome />
          </PrivateRoute>
        ),
      },
      {

        path : 'update-profile',
        element: (
          <PrivateRoute>
            <UpdateProfile />
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
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            <MyDonationRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "request-details/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-request/:id",
        element: (
          <PrivateRoute>
            <EditRequest />
          </PrivateRoute>
        ),
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
        path: "all-blood-donation-requests",
        element: <AllBloodDonationRequests />,
      },
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "donor-home",
        element: <DonorDashboardHome />,
      },
      {
        path: "volunteer-home",
        element: <VolunteerHome />,
      },
    ],
  },
]);
