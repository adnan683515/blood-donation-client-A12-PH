import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_publish_key_payment);

export default function GiveFound({ isOpen, close ,refetch }) {
    return (
        <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>

            <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm transition-opacity duration-300" />


            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-lg rounded-2xl bg-white shadow-2xl  md:p-8 transition-all">

                    <DialogTitle className="text-xl mt-3 font-semibold text-gray-800 mb-2 text-center">
                        💳 Make a Donation

                
                    </DialogTitle>



                    <Elements stripe={stripePromise}>
                        <PaymentForm refetch={refetch} />
                    </Elements>



                </DialogPanel>
            </div>
        </Dialog>
    );
}
