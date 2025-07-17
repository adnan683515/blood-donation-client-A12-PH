import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosSequere from '../Axios/AxiosSequere';
import AuthHook from './Share/Hooks/AuthHook';
import { Bars } from 'react-loader-spinner';
import AxiosHook from './../Axios/AxiosHook';
import { Link } from 'react-router';
import BlogDetails from './BlogDetails';
import DisplayBlog from './DisplayBlog';

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
                {BLogslist.map((blog) => <DisplayBlog key={blog?._id} blog={blog}></DisplayBlog> )}
            </div>
        </div>
    );
};
// 
export default Blog;
