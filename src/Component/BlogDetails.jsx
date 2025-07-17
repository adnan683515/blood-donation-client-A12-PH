import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BlogDetails = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['blogsDetails', id],
        enabled: !!id,
        queryFn: async () => {
            const result = await axios.get(`https://a12-blood-server.vercel.app/showBlogDetails/${id}`);
            return result.data;
        },
    });

    if (isLoading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="mx-auto mt-10 p-5 grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg">
        
            <div>
                <img
                    src={data?.thumbnail}
                    alt="Blog Thumbnail"
                    className="w-full h-auto rounded-xl shadow-md"
                />
            </div>

      
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">{data?.title}</h1>
                <p className="text-sm text-gray-500">Published on: {new Date(data?.createdAt).toLocaleDateString()}</p>
                <p className="text-lg text-gray-700">{data?.plainText}</p>

                <div className="pt-4 space-y-1">
                    <p><span className="font-semibold text-gray-600">Author:</span> {data?.name}</p>
                    <p><span className="font-semibold text-gray-600">Status:</span> {data?.status}</p>
                    <p><span className="font-semibold text-gray-600">Role:</span> {data?.role}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
