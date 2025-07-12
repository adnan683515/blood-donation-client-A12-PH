import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Avatar, Box, Button, MenuItem, Paper, Select, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination,
    TableRow, Typography
} from '@mui/material';
import { Bars } from 'react-loader-spinner';
import AuthHook from '../Share/Hooks/AuthHook';
import AxiosSequere from '../../Axios/AxiosSequere';
import Swal from 'sweetalert2';

const AllUserpage = () => {
    const { user, loading } = AuthHook();
    const axiosSequere = AxiosSequere();

    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { data: allusers = [], isLoading, refetch } = useQuery({
        queryKey: ['allusers', user?.email],
        enabled: user?.email && !loading,
        queryFn: async () => {
            const result = await axiosSequere.get(`/AllUsersData?email=${user?.email}`);
            return result?.data || [];
        }
    });

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleStatusToggle = async (email, newStatus) => {
        await axiosSequere.patch(`/update-user-status/${email}`, { status: newStatus });
        refetch();
    };

    const handleMakeVolunteer = async (userId, email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to make this user a Volunteer?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10b981", // green
            cancelButtonColor: "#ef4444",  // red
            confirmButtonText: "Yes, make Volunteer!",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {


                const result = await axiosSequere.patch(`/userRoleupdate/${userId}/Volunteer`)
                console.log(result)

                if (result?.data?.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: "The user has been promoted to Volunteer.",
                        icon: "success",
                        confirmButtonColor: "#10b981"
                    });
                    refetch()
                }

            }
        });

        refetch();
    };

    const handleMakeDonor = async (email) => {
        await axiosSequere.patch(`/make-donor/${email}`);
        refetch();
    };

    const handleMakeAdmin = async (email) => {
        await axiosSequere.patch(`/make-admin/${email}`);
        refetch();
    };

    const filteredUsers = allusers.filter(user => {
        if (statusFilter === 'all') return true;
        return user.status?.toLowerCase() === statusFilter;
    });

    const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (isLoading || loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <Bars height="50" width="50" color="#ff0000" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                All Users
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Typography fontWeight="medium" sx={{ mb: 1 }}>Filter by Status:</Typography>
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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: 'linear-gradient(to right, black, red)' }}>
                            <TableCell sx={{ color: 'white' }}>Avatar</TableCell>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ color: 'white' }}>Role</TableCell>
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Avatar alt={user.name} src={user.image} />
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-sm font-medium ${user.status === 'Active'
                                            ? 'bg-green-600'
                                            : 'bg-red-600'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Box className="flex justify-center items-center  gap-2 flex-col sm:flex-row">
                                        <Box className='pt-2'>
                                            {user.status === 'Active' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleStatusToggle(user.email, 'Blocked')}
                                                >
                                                    Block
                                                </Button>
                                            )}
                                            {user.status === 'Blocked' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleStatusToggle(user.email, 'Active')}
                                                >
                                                    Active
                                                </Button>
                                            )}

                                        </Box>
                                        {/* Role Switch Buttons */}
                                        <Box className="flex gap-2 justify-center items-center flex-wrap mt-2">
                                            {user.role !== 'Volunteer' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="white"
                                                    onClick={() => handleMakeVolunteer(user?._id, user.email)}
                                                    sx={{
                                                        textTransform: 'none',
                                                        borderRadius: '3px',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    Make Volunteer
                                                </Button>
                                            )}
                                            {user.role !== 'Donor' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleMakeDonor(user.email)}
                                                    sx={{
                                                        textTransform: 'none',
                                                        borderRadius: '8px',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    Make Donor
                                                </Button>
                                            )}
                                            {user.role !== 'Admin' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#222',
                                                        color: '#fff',
                                                        textTransform: 'none',
                                                        borderRadius: '8px',
                                                        fontWeight: 500,
                                                        '&:hover': {
                                                            backgroundColor: '#000',
                                                        }
                                                    }}
                                                    onClick={() => handleMakeAdmin(user.email)}
                                                >
                                                    Make Admin
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {paginatedUsers.length === 0 && (
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
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};

export default AllUserpage;
