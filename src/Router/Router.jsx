import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";

import Login from "../Page/Auth/Login";
import SignUP from "../Page/Auth/SignUP";
import Home from "../Page/Home";
import SearchDoner from "../Component/SearchDoner";
import DeshBoard from "../Component/DeshBoard/DeshBoard";
import Welcome from "../Component/DeshBoard/Welcome";
import PrivetRouter from "./PrivetRouter";
import DonerForm from "../Component/Doner/DonerForm";
import MyProfile from "../Component/Share/MyProfile";
import AllDonationRequest from "../Component/AllDonationRequest";
import DonationRequestDetails from "../Component/DonationRequestDetails";
import MyDonationRequest from "../Component/Doner/MyDonationRequest";
import AllUserpage from "../Component/Admin/AllUserpage";
import AllRequestPageAdmin from "../Component/Admin/AllRequestPageAdmin";
import ContentManagMent from "../Component/Admin/ContentManagMent";
import Error from "../Component/NotFound";
import AdminPrivetRouter from "./AdminPrivetRouter";
import ErrorPage from "../Component/NotFound";
import NotFound from "../Component/NotFound";
import DonorPrivetRouter from "./DonorPrivetRouter";
import AdminAndVolunTeer from "./AdminAndVolunTeer";
import Blog from "../Component/Blog";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/signup',
                Component: SignUP
            }, {
                path: "/searchdonor",
                Component: SearchDoner
            }, {
                path: '/donation-requests',
                Component: AllDonationRequest
            },
            {
                path: '/donation-requests/:id',
                element: <PrivetRouter>
                    <DonationRequestDetails></DonationRequestDetails>
                </PrivetRouter>
            }, {
                path: "/errorpage",
                Component: NotFound
            }, {
                path: '/Blogpage',
                Component: Blog
            }
        ]
    },
    {
        path: "/deshboard",
        element: <PrivetRouter>
            <DeshBoard></DeshBoard>
        </PrivetRouter>,
        children: [
            {
                path: "/deshboard",
                Component: Welcome
            },
            {
                path: '/deshboard/createdonationrequest',
                element: <DonorPrivetRouter>
                    <DonerForm></DonerForm>
                </DonorPrivetRouter>
            }, {
                path: '/deshboard/profile',
                Component: MyProfile
            }, {
                path: '/deshboard/my-donation-requests',
                Component: MyDonationRequest
            }, {
                path: '/deshboard/all-users',
                element: <AdminPrivetRouter>
                    <AllUserpage></AllUserpage>
                </AdminPrivetRouter>
            }, {
                path: '/deshboard/allRequestList',
                element: <AdminAndVolunTeer>
                    <AllRequestPageAdmin></AllRequestPageAdmin>
                </AdminAndVolunTeer>
            }, {
                path: '/deshboard/content-management',
                element: <AdminAndVolunTeer>
                    <ContentManagMent></ContentManagMent>
                </AdminAndVolunTeer>
            }
        ]
    }
    , {
        path: "/*",
        element: <div className="h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-semibold text-gray-700">Error page — Not Found</h1>
        </div>
    }
])