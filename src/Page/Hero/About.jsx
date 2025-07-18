export const About = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center bg-white px-6 md:px-20 py-16 gap-12 text-gray-900">

            {/* Left Side: Big Image collage */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                <img
                    src="https://i.ibb.co/nM8f4LSm/pexels-liza-summer-6348119.jpg"
                    alt="Blood donation"
                    className="rounded-lg object-cover h-48 md:h-60 w-full shadow-md"
                />
                <img
                    src="https://i.ibb.co/j9dLQcJS/pexels-helen1-5801746.jpg"
                    alt="Helping hands"
                    className="rounded-lg object-cover h-48 md:h-60 w-full shadow-md"
                />
                <img
                    src="https://i.ibb.co/ZzSsZkBR/pexels-cottonbro-6565744.jpg"
                    alt="Community care"
                    className="rounded-lg object-cover h-48 md:h-60 w-full shadow-md"
                />
                <img
                    src="https://i.ibb.co/svzp4Kvy/pexels-rdne-6646894.jpg"
                    alt="Blood donation drive"
                    className="rounded-lg object-cover h-48 md:h-60 w-full shadow-md"
                />
            </div>

            {/* Right Side: Text content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h1 className="text-4xl font-extrabold text-rose-700 mb-6">
                    About Our Blood Donation Mission
                </h1>
                <p className="text-lg leading-relaxed mb-4">
                    We believe every drop counts and can save countless lives. Our mission is to
                    create a strong community of donors who are committed to giving life and hope
                    to those in need. Through compassion, education, and action, we strive to
                    eliminate blood shortages and bring health to every corner of our world.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    Join us in this vital cause to make a difference. Together, we can ensure that
                    no patient is left waiting for the gift of life. Your blood donation is more
                    than just a donation — it’s a chance to be a real-life hero.
                </p>
                <p className="text-lg leading-relaxed">
                    Become a part of the movement that saves lives every day. Donate blood, spread
                    awareness, and inspire others to join the cause.
                </p>
            </div>
        </div>
    );
};
