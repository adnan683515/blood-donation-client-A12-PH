import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import AuthHook from './Share/Hooks/AuthHook'
import AxiosSecure from '../Axios/AxiosSequere'


export default function RequestConfirmModal({ isOpen, close, refetch, id }) {

    const { user } = AuthHook()
   
    const axiosSequre = AxiosSecure()
    const handleConfirmed = async (e) => {
        e.preventDefault()
        const result = await axiosSequre.patch(`/donationRequestUpdate/${id}/inprogress`)
 
        if (result?.data?.modifiedCount) {
            const saveDonorInformation = { DonationRequest: id, name: user?.displayName, email: user?.email }
       
            const response = await axiosSequre.post('/confirmedReq', saveDonorInformation)

            refetch()
            close()
        }

    }

    return (
        <>

            <Dialog open={isOpen} as="div" className="relative z-20 focus:outline-none bg-white" onClose={close}>
                <div className="fixed inset-0 z-10  overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="sm:w-[50%]  shadow-lg rounded-xl  sm:p-6 backdrop-blur-2xl p-2 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >

                            <form onSubmit={handleConfirmed} className="mt-2 p-6 bg-white rounded-xl shadow-lg space-y-4">
                                {/* Top Text */}
                                <h2 className="sm:text-xl font-semibold text-green-600 sm:text-center">
                                    Confirm Your Blood Donation
                                </h2>

                                {/* Donor Name */}
                                <div>
                                    <label htmlFor="donorName" className="block text-gray-700 font-medium mb-1">
                                        Donor Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="donorName"
                                        value={user?.displayName}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                </div>

                                {/* Donor Email */}
                                <div>
                                    <label htmlFor="donorEmail" className="block text-gray-700 font-medium mb-1">
                                        Donor Email:
                                    </label>
                                    <input
                                        type="text"
                                        id="donorEmail"
                                        value={user?.email}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                </div>

                                {/* Confirm Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
                                    >
                                        ✅ Confirm Donation

                                    </button>
                                </div>
                            </form>


                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}