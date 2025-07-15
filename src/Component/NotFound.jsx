import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-64 h-64 text-red-600 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9v.008H10v-.008a.75.75 0 011.5 0v.008h.25a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75v-6a.75.75 0 01.75-.75h.25zm1.75 6v-6"
                />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="6"
                    fill="currentColor"
                    fontWeight="bold"
                >
                    404
                </text>
            </svg>

            <h1 className="text-6xl font-extrabold text-red-600 tracking-widest">404</h1>
            <h2 className="text-2xl mt-4 mb-2 text-gray-700">Oops! Page Not Found</h2>
            <p className="text-gray-500 mb-6 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <a
                href="/"
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
                Go Back Home
            </a>
        </div>
    );
};

export default NotFound;
