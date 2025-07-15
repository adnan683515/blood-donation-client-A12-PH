
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import AuthHook from '../Share/Hooks/AuthHook';
import AxiosSequere from '../../Axios/AxiosSequere';
import { Bars } from 'react-loader-spinner';
import DeshBoardTabulaerView from '../DeshBoard/DeshBoardTabulaerView';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import RoleHook from '../Share/Hooks/RoleHook';

const AllRequestPageAdmin = () => {

    const { user, loading } = AuthHook()
    const axiosSequre = AxiosSequere()
    const [role, roleLoading] = RoleHook()
    const [showperpage, setShowperpage] = useState(6)
    const [currentPage,setCurrentPage] = useState(1)

    const { data: AllRequestList = [], isLoading, refetch } = useQuery({
        queryKey: ['alldonationRequestList', user?.email],
        enabled: user?.email && !loading,
        queryFn: (async () => {
            const result = await axiosSequre.get(`/allRequestList/${user?.email}/${showperpage}/${currentPage}`)
            return result?.data
        })

    })
    const totalPages = Math.ceil(AllRequestList?.length / showperpage)
    const pages = [...Array(totalPages)].map((_, i) => i + 1)
    


    const handleStatus = async (e, id) => {

        const action = e.innerText
        if (action === 'Edit' || action === 'Delete') {
            if (action === 'Delete') {
                if (role !== 'Admin') {
                    toast.error("Delete Only Admin")
                    return
                }

                Swal.fire({
                    title: "Are you sure?",
                    text: "This donation request will be permanently deleted. You won't be able to undo this action!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, delete it!",
                }).then(async (result) => {
                    if (result.isConfirmed) {

                        const result = await axiosSequre.delete(`/deleteRequest/${id}`)
                        if (result?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }

                    }
                });

            }
            return
        }


        try {
            const result = await axiosSequre.patch(`/donationRequestUpdate/${id}/${e.innerText}`);
            if (result?.data?.modifiedCount) {
                e.innerText === 'Done'
                    ? toast.success("Donation Request Successfully Done")
                    : toast.error("Donation Request Cancel!");
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handlePage = (pageNumber)=>{
        setCurrentPage(pageNumber)
        // refetch()
    }


    if (loading || isLoading || roleLoading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <Bars height="50" width="50" color="#ff0000" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }


    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <span>📋</span>
                    All Donation Requests <span className="text-red-600">({AllRequestList?.length})</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Below is a list of all donation requests submitted by users. You can view, filter, or manage them from here.
                </p>
            </div>

            {Array.isArray(AllRequestList) && AllRequestList.length > 0 && (
                <div className='relative overflow-hidden mt-10'>
                    <DeshBoardTabulaerView role={role} handleStatus={handleStatus} DonationRequest={AllRequestList} />
                </div>
            )}


            <div className='flex justify-center mt-5 items-center'>
                <div className='flex gap-2 flex-wrap'>
                    {
                        pages?.map((numberOfpage) => <button  onClick={(e)=>handlePage(e.target.innerText)} className='bg-red-300 rounded-full px-4 border py-2 ' key={numberOfpage} > {numberOfpage} </button>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllRequestPageAdmin;