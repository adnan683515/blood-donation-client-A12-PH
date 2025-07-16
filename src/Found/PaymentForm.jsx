import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AxiosSequre from '../Axios/AxiosSequere';
import AuthHook from '../Component/Share/Hooks/AuthHook';
import { Link } from 'react-router';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = AxiosSequre();
    const { user, loading } = AuthHook()
    const [amount, setAmount] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [cardKey, setCardKey] = useState(0); // reset korar jonno

    const resetCardElement = () => {
        setCardKey(prev => prev + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || parseFloat(amount) < 1) {
            toast.error('Please enter a valid donation amount!');
            return;
        }

        setProcessing(true);
        setPaymentError('');
        setPaymentSuccess('');

        try {
            const res = await axiosSecure.post('/create-payment-intent', {
                amount: parseInt(amount) * 100, // cents

            });

            const card = elements.getElement(CardElement);

            const { paymentIntent, error } = await stripe.confirmCardPayment(res.data.clientSecret, {
                payment_method: { card },
            });


            if (error) {
                setPaymentError(error.message);
                toast.error(error.message);
            } else {
                const tranjectionId = paymentIntent?.id
                const info = {
                    name: user?.displayName,
                    email: user?.email,
                    money: parseInt(amount),
                    tranjectionId,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    })
                }

                const result = await axiosSecure.post('/saveDataWhenPayment', info)


                if (result?.data?.insertedId) {
                    setPaymentSuccess('Payment successful! ❤️ Thank you for your donation.');

                    toast.success('Donation Successful!');
                    setAmount('');
                    resetCardElement()
                }

            }
        } catch {
            toast.error('Something went wrong. Please try again.');
        }

        setProcessing(false);
    };

    return (

        <div>
            <section className="bg-gradient-to-b  from-red-50 to-white py-16 px-6 md:px-12">
                <div className=" mx-auto grid md:grid-cols-2 gap-10 items-center">
                    {/* Text Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-rose-600 leading-tight mb-4">
                            Help Us Bring Hope ❤️
                        </h2>
                        <p className="text-gray-700 text-lg mb-6">
                            Many families in our community are struggling to cover their basic needs.
                            Your small donation can make a big difference in someone’s life.
                            Let’s unite to support the poor, the sick, and the helpless.
                        </p>

                        <ul className="text-gray-800 space-y-2 mb-6">
                            <li>✅ Support low-income families</li>
                            <li>✅ Help provide food, shelter, and blood support</li>
                            <li>✅ 100% transparency with your donations</li>
                        </ul>

                        <Link 
                            className="inline-block bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:scale-105 transition">
                            Donate Now 💳
                        </Link>
                    </div>

                    <div className="w-[60%]  mx-auto  bg-white p-6 rounded-2xl shadow-lg">


                        <h2 className="text-2xl font-bold mb-4 text-center text-rose-600">🩸 Donate Blood Fund</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Donation Amount ($)</label>
                                <input
                                    type="number"
                                    value={amount}

                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    placeholder="Enter amount e.g. 10"
                                    min={100}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Card Details</label>
                                <div className="p-3 border rounded-lg border-gray-300">
                                    <CardElement key={cardKey} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!stripe || processing}
                                className={`w-full bg-gradient-to-r from-rose-500 to-red-600 text-white py-2 rounded-lg font-semibold hover:from-rose-600 hover:to-red-700 transition duration-300 ${processing && 'opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                {processing ? 'Processing...' : 'Donate Now'}
                            </button>

                            {paymentError && <p className="text-red-600 text-sm mt-2">{paymentError}</p>}
                            {paymentSuccess && <p className="text-green-600 text-sm mt-2">{paymentSuccess}</p>}
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PaymentForm;
