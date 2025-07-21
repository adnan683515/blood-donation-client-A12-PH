import React from 'react';

const Contact = () => {
    return (
        <div className=" w-[98%] mx-auto bg-gray-100  text-black py-16 px-4">
            <div className="  flex flex-col md:flex-row items-center justify-between gap-10">

                <div className="md:w-1/2 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-600">Get in Touch</h2>
                    <p className="text-lg ">
                        Have questions, feedback, or want to donate? We'd love to hear from you. Use the form to reach out,
                        and we’ll get back to you as soon as possible.
                    </p>
                    <p className="text-sm ">
                        We’re committed to supporting blood donation efforts across the country. Your voice matters.
                    </p>
                </div>


                <div className="md:w-1/2 w-full bg-white p-6 rounded-lg  text-black">
                    <form className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium mb-1 text-red-600">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                                placeholder="Enter your email"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium mb-1 text-red-600">Contact Number</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                                placeholder="Enter your contact number"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium mb-1 text-red-600">Description</label>
                            <textarea
                                rows="4"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                                placeholder="Write your message"
                            ></textarea>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
