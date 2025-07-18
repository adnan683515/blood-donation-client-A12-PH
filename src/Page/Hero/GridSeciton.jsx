export const GridSection = () => {
    const sections = [
        {
            img: "https://i.ibb.co/dJK26B8Q/earth-4861456-1280.jpg",
            title: "A single drop can create an ocean of hope.",
            desc: `Your blood donation can save multiple lives. 
      Be the reason for someone's second chance. 
      Every donation matters in the fight against blood shortages.`,
            imgLeft: true,
        },
        {
            img: "https://i.ibb.co/8gYPsNx4/pexels-rdne-6646918.jpg",
            title: "Every drop counts. Be the reason someone lives.",
            desc: `Join our community of donors and help create a world full of hope and health. 
      Your contribution could bring light in someone's darkest hour. 
      Together, we can make a difference one drop at a time.`,
            imgLeft: false,
        },
    ];

    return (
        <div className="px-4 py-16 mx-auto md:px-24 lg:px-8 lg:py-20 bg-white text-gray-900">
            {sections.map(({ img, title, desc, imgLeft }, index) => (
                <div
                    key={index}
                    className={`flex flex-col ${imgLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                        } items-center gap-8 mb-16`}
                >

                    <div className="w-full lg:w-1/2 h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={img}
                            alt={title}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>


                    <div className="w-full lg:w-1/2 bg-rose-50 rounded-lg p-10  flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-rose-700 mb-6">{title}</h2>
                        <p className="text-rose-900 text-lg leading-relaxed whitespace-pre-line">
                            {desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
