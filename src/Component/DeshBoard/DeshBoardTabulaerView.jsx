import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from '@mui/material';
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import AxiosSecure from './../../Axios/AxiosSequere';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';


function Row({ row, handleStatus, role }) {
    const [open, setOpen] = React.useState(false);
    const axiosSecure = AxiosSecure();

    const { data: donor = {} } = useQuery({
        queryKey: ['confirmedDonor', row?._id],
        queryFn: async () => {
            const result = await axiosSecure.get(`/confirmedReq/${row?._id}`);
            return result?.data;
        },
        enabled: !!row?._id,
    });


    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.recipientName}</TableCell>
                <TableCell>{row.bloodGroup}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.timeFix}</TableCell>
                <TableCell>
                    {row.status === 'inprogress' ? (
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={(e) => handleStatus(e.target, row._id)}
                                className="px-4 py-1 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200"
                            >
                                Done
                            </button>
                            <button
                                onClick={(e) => handleStatus(e.target, row._id)}
                                className="px-4 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <span className="capitalize font-medium">{row.status}</span>
                        </div>
                    )}
                </TableCell>
                <TableCell>
                    <div className="flex gap-2 justify-center">
                        {
                            (role === 'Donor') && (
                                <Link to={`/deshboard/UpdateDonationRequest/${row?._id}`}>
                                    <button
                                        onClick={(e) => handleStatus(e.target, row?._id)}
                                        className="px-3 py-1 bg-gray-100 text-black rounded-md font-semibold"
                                    >
                                        Edit
                                    </button>
                                </Link>
                            )
                        }
                    
                        <button onClick={(e) => handleStatus(e.target, row?._id)} className="px-3 py-1 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition">Delete</button>
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                margin: 1,
                                padding: 2,
                                backgroundColor: '#f9fafb',
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                boxShadow: 1,
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                                🔍 Request Details
                            </Typography>
                            <Table size="small">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Requester Name</TableCell>
                                        <TableCell>{row.requesterName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Requester Email</TableCell>
                                        <TableCell>{row.requesterEmail}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Hospital</TableCell>
                                        <TableCell>{row.hospital}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell>
                                            {row.address}, {row.upazila}, {row.finalZila}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Message</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" whiteSpace="pre-line">
                                                {row.message}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {donor?.name && (
                                <>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ color: 'green', fontWeight: 'bold', marginTop: '16px' }}
                                    >
                                        ✅ Donor Information
                                    </Typography>
                                    <Table size="small">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Donor Name</TableCell>
                                                <TableCell>{donor.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Donor Email</TableCell>
                                                <TableCell>{donor.email}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        recipientName: PropTypes.string.isRequired,
        bloodGroup: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        timeFix: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        requesterName: PropTypes.string,
        requesterEmail: PropTypes.string,
        hospital: PropTypes.string,
        address: PropTypes.string,
        upazila: PropTypes.string,
        finalZila: PropTypes.string,
        message: PropTypes.string,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    handleStatus: PropTypes.func,
    role: PropTypes.string
};

// Main Component
export default function DeshBoardTabulaerView({ DonationRequest = [], handleStatus, role }) {
    // Ensure DonationRequest is always an array
    const safeRows = Array.isArray(DonationRequest) ? DonationRequest : [];



    return (
        <TableContainer className="relative overflow-hidden" component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead
                    sx={{
                        background: 'linear-gradient(to right, #e11d48, #dc2626)',
                    }}
                >
                    <TableRow>
                        <TableCell sx={{ color: 'white' }} />
                        <TableCell sx={{ color: 'white' }}>Recipient</TableCell>
                        <TableCell sx={{ color: 'white' }}>Blood Group</TableCell>
                        <TableCell sx={{ color: 'white' }}>Date</TableCell>
                        <TableCell sx={{ color: 'white' }}>Time</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Status</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {safeRows.length > 0 ? (
                        safeRows.map((row, index) => (
                            <Row handleStatus={handleStatus} role={role} key={row._id || index} row={row} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <Typography>No donation requests found.</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

DeshBoardTabulaerView.propTypes = {
    DonationRequest: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object, // fallback
    ]),
    handleStatus: PropTypes.func,
};
