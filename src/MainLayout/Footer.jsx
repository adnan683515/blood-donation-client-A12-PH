import { FiMail, FiBookOpen, FiInfo, FiSearch } from "react-icons/fi";

export const Footer = () => {
    return (
        <div className="bg-gray-950 text-gray-300">
            <div className="px-4 pt-16 mx-auto md:px-24 lg:px-8">
                <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
                    <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-rose-600 flex items-center gap-2">
                                <FiInfo /> About Us
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Our Story
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Team
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Careers
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-rose-600 flex items-center gap-2">
                                <FiMail /> Contact Us
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Locations
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-rose-600 flex items-center gap-2">
                                <FiBookOpen /> Blogs
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Latest Posts
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Categories
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Archives
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-rose-600 flex items-center gap-2">
                                <FiSearch /> Search
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Search Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-rose-400 transition-colors">
                                        Search Docs
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* New blood icon + text block replacing form */}
                    <div className="md:max-w-md lg:col-span-2 flex flex-col items-center justify-center text-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-16 h-16 text-rose-600 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21c4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v9l3 3"
                            />
                        </svg>
                        <p className="text-rose-400 text-lg font-semibold">
                            Donate blood, save a life. Every drop counts.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
                    <p className="text-sm text-gray-500">
                        © 2025 Blood Donation App. All rights reserved.
                    </p>
                    <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                        {/* Social icons here if needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};
