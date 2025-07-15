import React from 'react';

const GridSeciton = () => {
    const images = [
        "https://i.ibb.co/8gYPsNx4/pexels-rdne-6646918.jpg",
        "https://i.ibb.co/spYPG2fP/pexels-franco30-12193105.jpg",
        "https://i.ibb.co/93NJw4v6/pexels-puwadon-sang-ngern-2168173-5340267.jpg",
        "https://i.ibb.co/Dgs4gMwr/pexels-rsapmech-12820058.jpg"
    ];

    return (
        <div className="w-[98%] mx-auto px-4 py-12 flex  flex-col md:flex-row-reverse items-center gap-8">

            {/* Left side: Title & Description */}
            <div className="md:w-1/2 space-y-5">
                <h1 className="text-4xl font-bold text-red-600">
                    Donate Blood, Save Lives
                </h1>
                <p className="text-gray-700 text-lg">
                    Be a GridSeciton by donating blood. Join our community of volunteers who help save lives every day. Your contribution makes a difference — give hope, give blood, and help those in need.
                </p>
            </div>

            {/* Right side: Images Grid */}
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Blood Donation ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                ))}
            </div>

        </div>
    );
};

export default GridSeciton;
