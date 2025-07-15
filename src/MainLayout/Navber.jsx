import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../assets/logo (3).png';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AuthHook from '../Component/Share/Hooks/AuthHook';
import { ScaleLoader } from 'react-spinners';
import Button from '@mui/material/Button';
import { Bars } from 'react-loader-spinner';
import { FaArrowLeft } from 'react-icons/fa';
const Navber = () => {
    const { user } = AuthHook();
    const [anchorEl, setAnchorEl] = useState(null);
    const { handleLogout, loading } = AuthHook()
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        // TODO: Add your logout logic here
        handleLogout()
            .then(() => {
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
        handleClose();
    };

    const centerLinks = (
        <>
            <li>
                <NavLink to="/donation-requests">All Donation requests</NavLink>
            </li>
            <li>
                <NavLink to="/Blogpage">Blogs</NavLink>
            </li>
            <li>
                <NavLink to="/">Founding</NavLink>
            </li>
        </>
    );

    return (
        <>
            <div className="navbar  bg-gray-950 sm:px-4 text-white ">
                <div className="navbar-start">
                    <div className="">
                        <div className="drawer lg:hidden block ">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content border">
                                {/* Page content here */}
                                <label htmlFor="my-drawer" className="  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </label>
                            </div>
                            <div className="drawer-side z-60 overflow-hidden w-[80%]">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">hi</label>
                                <ul className="menu  relative min-h-full bg-gray-950 text-white w-80 p-4">
                                    {/* Sidebar content here */}
                                    {
                                        centerLinks
                                    }
                                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay absolute  right-15">
                                        <FaArrowLeft style={{ color: 'white' }} size={20} />
                                    </label>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className='hidden border  lg:block w-[9%] cursor-pointer'>
                        <Link to={'/'}>
                            <img className='w-full' src={logo} alt="Logo" />
                        </Link>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {centerLinks}
                    </ul>
                </div>

                <div className="navbar-end flex gap-2">
                    {
                        loading ? <Bars
                            height="30"
                            width="30"
                            color="#ffffff" // white color
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /> : user ? (
                            <>
                                <IconButton onClick={handleClick} size="small">
                                    <Avatar
                                        sx={{ width: 50, height: 50 }}
                                        className="bg-white"
                                        alt={user.displayName || "User"}
                                        src={user.photoURL}
                                    />
                                </IconButton>
                                <Menu

                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 3,
                                        sx: { mt: 1.5 }
                                    }}
                                >
                                    <MenuItem component={Link} to="/profile">Profile</MenuItem>
                                    <MenuItem component={Link} to="/deshboard">Dashboard</MenuItem>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link to={'/login'} className="px-5 py-1 bg-[var(--primary-color)] text-white rounded-sm ">Login</Link>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Navber;
