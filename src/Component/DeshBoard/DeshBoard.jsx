import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import { FaBars, FaTachometerAlt, FaUserFriends, FaUserCircle, FaHandsHelping, FaArrowCircleLeft, FaHeartbeat } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import AuthHook from '../Share/Hooks/AuthHook';
import toast from 'react-hot-toast';
import RoleHook from '../Share/Hooks/RoleHook';

const DashboardLayout = () => {
    const { handleLogout } = AuthHook();
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const logout = () => {
        handleLogout()
            .then(() => {
                toast.error('Logged out!');
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    const [res, roleLoading] = RoleHook();
    useEffect(() => {
        setRole(res);
    }, [res, roleLoading]);

    return (
        <div className="min-h-screen bg-gray-100 text-black">
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                {/* Page Content */}
                <div className="drawer-content flex flex-col">
                    {/* Top Navbar for Mobile */}
                    <div className="w-full bg-gray-900 text-white flex items-center justify-between px-4 py-3 lg:hidden">
                        <h2 className="text-lg font-semibold">Dashboard</h2>
                        <label htmlFor="dashboard-drawer" className="cursor-pointer">
                            <FaBars size={24} />
                        </label>
                    </div>

                    {/* Outlet for main pages */}
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar Menu */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu space-y-2 p-4 w-64 min-h-full bg-gradient-to-b from-gray-950 to-gray-800 text-white">

                        {/* Sidebar header / Title */}
                        <li className="flex items-center gap-3 mb-6 px-3 py-2 border-b border-gray-700 select-none">
                         
                            <span className="text-xl font-bold">Blood Donation</span>
                        </li>

                        <li>
                            <Link to="/deshboard" className="flex items-center gap-3 hover:bg-red-600 rounded px-3 py-2">
                                <FaTachometerAlt /> Dashboard
                            </Link>
                        </li>

                        {!roleLoading && (role === 'Donor' || role === 'Volunteer') && (
                            <li>
                                <Link
                                    to="/deshboard/createdonationrequest"
                                    className="flex items-center gap-3 hover:bg-red-600 rounded px-3 py-2"
                                >
                                    <FaHandsHelping /> Donation Request
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/deshboard/profile" className="flex items-center gap-3 hover:bg-red-600 rounded px-3 py-2">
                                <FaUserCircle /> My Profile
                            </Link>
                        </li>

                        {!roleLoading && (
                            <>
                                {role === 'Admin' && (
                                    <li>
                                        <Link to="/deshboard/all-users" className="flex items-center gap-3 hover:bg-red-600 rounded px-3 py-2">
                                            <FaUserFriends /> All Users
                                        </Link>
                                    </li>
                                )}

                                {(role === 'Admin' || role === 'Volunteer') && (
                                    <>
                                        <li>
                                            <Link to="/deshboard/allRequestList" className="flex items-center gap-3 hover:bg-red-600 rounded px-3 py-2">
                                                <FaUserFriends /> All Request Page
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/deshboard/content-management" className="flex items-center gap-3 hover:bg-red-600 rounded px-3 py-2">
                                                <FaUserFriends /> Content Management
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        )}


                        {!roleLoading && role === 'Donor' && (
                            <li>
                                <Link to="/deshboard/my-donation-requests" className="flex items-center gap-3 hover:bg-red-600 rounded px-3 py-2">
                                    <FaHandsHelping /> My Donations
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link to="/" className="flex items-center gap-3 hover:bg-red-600 rounded px-3 py-2">
                                <FaArrowCircleLeft /> Back to Home
                            </Link>
                        </li>

                        {/* Logout Button */}
                        <li className="absolute bottom-5 left-4 right-4 bg-gradient-to-r from-black to-red-600 rounded shadow-md">
                            <button onClick={logout} className="w-full flex justify-between items-center px-4 py-2 text-white hover:text-gray-300">
                                <span className="text-lg">Logout</span>
                                <FiLogOut size={20} />
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
