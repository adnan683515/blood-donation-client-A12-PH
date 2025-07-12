// DashboardLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import { FaBars } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import AuthHook from '../Share/Hooks/AuthHook';
import toast from 'react-hot-toast';
import AxiosSecure from '../../Axios/AxiosSequere';
import RoleHook from '../Share/Hooks/RoleHook';


const DashboardLayout = () => {

    const { handleLogout } = AuthHook()
    const [role, setRole] = useState(null)
    const navigate = useNavigate()
    const logout = () => {

        handleLogout()
            .then(() => {
                toast.error('Logout !')
                navigate('/login')
            })
            .catch((errr) => {
                console.log(errr)
            })
    }
    const [res, roleLoading] = RoleHook()
    useEffect(() => {
        setRole(res)
    }, [res, roleLoading])



    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <div className="drawer lg:drawer-open">
                {/* Drawer Toggle */}
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                {/* Page Content */}
                <div className="drawer-content flex flex-col">
                    {/* Top Navbar for small screens */}
                    <div className="w-full bg-black text-white flex items-center justify-between px-4 py-3 lg:hidden">
                        <h2 className="text-lg font-semibold">Dashboard</h2>
                        <label htmlFor="dashboard-drawer" className="cursor-pointer">
                            <FaBars size={24} />
                        </label>
                    </div>

                    {/* Main Content */}
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu relative p-4 w-64 min-h-full bg-gray-950 text-white space-y-2">

                        <li>
                            <Link to="/deshboard" className="hover:bg-red-600 rounded px-3 py-2">Dashboard</Link>
                        </li>
                        {
                            !roleLoading && role === 'Donor' && <li>
                                <Link to="/deshboard/createdonationrequest" className="hover:bg-red-600 rounded px-3 py-2">Donation Request</Link>
                            </li>
                        }
                        <li>
                            <Link to="/deshboard/profile" className="hover:bg-red-600 rounded px-3 py-2">My Profile</Link>
                        </li>

                        {
                            !roleLoading && role === 'Admin' && <li>
                                <Link to="/deshboard/all-users" className="hover:bg-red-600 rounded px-3 py-2">All User Page</Link>
                            </li>
                        }
                        {
                            !roleLoading && role === 'Donor' && <li>
                                <Link to="/deshboard/my-donation-requests" className="hover:bg-red-600 rounded px-3 py-2">My Donation Requests </Link>
                            </li>
                        }
                        <li>
                            <Link to="/" className="hover:bg-red-600 rounded px-3 py-2">Back to Home</Link>
                        </li>

                        <li className='absolute bg-gradient-to-r from-black to-red-600 bottom-5 flex'>
                            <button onClick={logout} className="px-4  shadow-md rounded-md bg-transparent text-white hover:text-gray-300">
                                <span className='text-xl text-white'>Logout</span> <FiLogOut style={{ color: 'white' }} size={24} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
