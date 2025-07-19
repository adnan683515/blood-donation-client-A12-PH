import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Avatar, Box, Button, MenuItem, Paper, Select, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination,
    TableRow, Typography
} from '@mui/material';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

import AuthHook from '../Share/Hooks/AuthHook';
import AxiosSequere from '../../Axios/AxiosSequere';

const AllUserpage = () => {
    const { user, loading } = AuthHook();
    const axiosSequere = AxiosSequere();

    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['allusers', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSequere.get(`/AllUsersData?email=${user?.email}`);
            return res?.data || [];
        }
    });

    const handleStatusToggle = async (id, newStatus) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You want to ${newStatus === 'Blocked' ? 'block' : 'activate'} this user?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: newStatus === 'Blocked' ? '#ef4444' : '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: `Yes, ${newStatus}`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSequere.patch(`/userRoleupdate/${id}/${newStatus}`);
                refetch();
                Swal.fire('Success!', `User status updated to ${newStatus}`, 'success');
            }
        });
    };

    const handleRoleChange = async (endpoint, userIdOrEmail, roleName) => {
        Swal.fire({
            title: `Make ${roleName}?`,
            text: `Do you want to promote this user to ${roleName}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#ef4444",
            confirmButtonText: `Yes, make ${roleName}`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSequere.patch(`/${endpoint}/${userIdOrEmail}/${roleName}`);
                if (res?.data?.modifiedCount || res?.data?.acknowledged) {
                    Swal.fire({
                        title: "Success!",
                        text: `User promoted to ${roleName}`,
                        icon: "success",
                        confirmButtonColor: "#10b981",
                    });
                    refetch();
                }
            }
        });
    };

    const filteredUsers = allUsers.filter(u =>
        statusFilter === 'all' ? true : u.status?.toLowerCase() === statusFilter
    );

    const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (isLoading || loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Bars height="50" width="50" color="#ff0000" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <Box sx={{ p: 3 }}>

            <Box className="mb-6 bg-gradient-to-r from-red-100 to-white p-6 rounded-2xl  border border-red-200">
                <Typography variant="h4" fontWeight="bold" color="red" gutterBottom>
                    👥 Manage All Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    As an admin, you can <strong>promote roles</strong>, <strong>block users</strong>, or <strong>change their status</strong>.
                </Typography>
            </Box>


            <Box sx={{ mb: 2 }}>
                <Typography fontWeight="medium" sx={{ mb: 1 }}>
                    Filter by Status:
                </Typography>
                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    size="small"
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>
                </Select>
            </Box>


            <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
                <Table>
                    <TableHead >
                        <TableRow sx={{
                            background: 'linear-gradient(to right, #e11d48, #dc2626)',
                        }}>
                            <TableCell sx={{ color: 'white' }}>Avatar</TableCell>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ color: 'white' }}>Role</TableCell>
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell><Avatar alt={user.name} src={user.image} /></TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <span className="capitalize font-semibold">{user.role}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-white text-sm font-medium ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}>
                                            {user.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Box className="flex flex-col sm:flex-row justify-center items-center gap-2 flex-wrap">
                                        
                                            <Button
                                                size="small"
                                                variant="contained"
                                                sx={{
                                                    width: 130,
                                                    textTransform: 'none',
                                                    fontWeight: 500,
                                                    backgroundColor: user.status === 'Active' ? '#dc2626' : '#16a34a',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: user.status === 'Active' ? '#b91c1c' : '#15803d'
                                                    }
                                                }}
                                                onClick={() => handleStatusToggle(user._id, user.status === 'Active' ? 'Blocked' : 'Active')}
                                            >
                                                {user.status === 'Active' ? 'Block' : 'Activate'}
                                            </Button>

                                        
                                            {user.role !== 'Volunteer' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    sx={{
                                                        width: 130,
                                                        textTransform: 'none',
                                                        fontWeight: 500,
                                                        backgroundColor: '#334155',
                                                        color: '#fff',
                                                        '&:hover': { backgroundColor: '#1e293b' }
                                                    }}
                                                    onClick={() => handleRoleChange('userRoleupdate', user._id, 'Volunteer')}
                                                >
                                                    Make Volunteer
                                                </Button>
                                            )}
                                            {user.role !== 'Donor' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    sx={{
                                                        width: 130,
                                                        textTransform: 'none',
                                                        fontWeight: 500,
                                                        background: 'linear-gradient(to right, #e11d48, #dc2626)', 
                                                        color: 'white',
                                                        '&:hover': {
                                                            background: 'linear-gradient(to right, #be123c, #b91c1c)', 
                                                        },
                                                    }}
                                                    onClick={() => handleRoleChange('userRoleupdate', user._id, 'Donor')}
                                                >
                                                    Make Donor
                                                </Button>
                                            )}
                                            {user.role !== 'Admin' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    sx={{
                                                        width: 130,
                                                        textTransform: 'none',
                                                        fontWeight: 500,
                                                        backgroundColor: '#222',
                                                        color: '#fff',
                                                        '&:hover': { backgroundColor: '#000' }
                                                    }}
                                                    onClick={() => handleRoleChange('userRoleupdate', user._id, 'Admin')}
                                                >
                                                    Make Admin
                                                </Button>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>
        </Box>
    );
};

export default AllUserpage;
