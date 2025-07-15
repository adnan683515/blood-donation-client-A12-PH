import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosSequere from '../Axios/AxiosSequere';
import AuthHook from './Share/Hooks/AuthHook';
import { Bars } from 'react-loader-spinner';
import AxiosHook from './../Axios/AxiosHook';

const Blog = () => {
    const baseURl = AxiosHook()
    const { data: BLogslist = [], isLoading } = useQuery({
        queryKey: ['all-blogs'],
        queryFn: async () => {
            const result = await baseURl.get(`/blogpost?statustype=Publish`);
            return result?.data;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Bars height="50" width="50" color="#e11d48" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">📚 All Published Blogs</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BLogslist.map((blog) => (
                    <div
                        key={blog._id}
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
                ))}
            </div>
        </div>
    );
};

export default Blog;
