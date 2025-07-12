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
                Component: DonerForm
            }, {
                path: '/deshboard/profile',
                Component: MyProfile
            }, {
                path: '/deshboard/my-donation-requests',
                Component: MyDonationRequest
            },{
                path:'/deshboard/all-users',
                Component : AllUserpage
            }
        ]
    }
    , {
        path: "/**",
        element: <h1>eroro page</h1>
    }
])