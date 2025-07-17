import React from 'react';
import { Link } from 'react-router';

const DisplayBlog = ({blog}) => {
    return (
        <Link to={`/details/${blog?._id}`}>
            <div

                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
                <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                />

                <div className="p-4 flex flex-col flex-1">
                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 text-sm flex-1">{blog.plainText?.slice(0, 100)}...</p>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <div>
                            <p>By: <span className="font-medium">{blog.name}</span></p>
                            <p className="text-xs">{blog.email}</p>
                        </div>
                        <div className="text-right">
                            <p>{blog.createdAt}</p>
                            <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                                {blog.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DisplayBlog;