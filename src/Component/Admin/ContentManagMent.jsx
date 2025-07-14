import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { ImageUpload } from './../Share/ImageUpload';
import AuthHook from './../Share/Hooks/AuthHook';
import { Bars } from 'react-loader-spinner';
import RoleHook from '../Share/Hooks/RoleHook';
import AxiosSequere from '../../Axios/AxiosSequere';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ContentManagement = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = AuthHook();
    const [role, roleLoading] = RoleHook();
    const axiosSequre = AxiosSequere();

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typing your blog content...'
    }), [placeholder]);

    const { data: allDarftBlogs = [], refetch: darftRefetch } = useQuery({
        queryKey: ['blogs', 'drafft'],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await axiosSequre.get(`/blogpost?statustype=Draft`);
            return result?.data;
        },
    });

    const { data: allPublishtBlogs = [], refetch: publisRefecth } = useQuery({
        queryKey: ['blogsPublish', 'Publish'],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await axiosSequre.get(`/blogpost?statustype=Publish`);
            return result?.data;
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const plainText = new DOMParser().parseFromString(content, 'text/html').body.textContent || '';
        if (!imageFile) {
            setError('📸 Please select a thumbnail image!');
            setLoading(false);
            return;
        }
        if (!plainText) {
            setError('Content is required!');
            setLoading(false);
            return;
        }

        try {
            const uploadedImageUrl = await ImageUpload(imageFile);

            const blogData = {
                title,
                name: user?.displayName,
                email: user?.email,
                thumbnail: uploadedImageUrl,
                plainText,
                status: 'Draft',
                role,
                createdAt: new Date().toISOString().split('T')[0],
            };
            const result = await axiosSequre.post('/addBlog', blogData);
            if (result?.data?.insertedId) {
                setTitle('');
                setContent('');
                setImageFile('');
                darftRefetch();
                toast.success('Your blog has been added to Drafts!');
            }
        } catch (err) {
            console.error('Image Upload Error:', err.message);
            setError('Failed to upload image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async (id, status) => {
        const result = await axiosSequre.patch(`/blogStatusUpdate/${id}/${status}`);
        if (result?.data?.modifiedCount) {
            darftRefetch();
            publisRefecth();
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await axiosSequre.delete(`blogDelete/${id}`);
                if (result?.data?.deletedCount) {
                    publisRefecth();
                    darftRefetch();
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                }
            }
        });
    };

    if (!user || roleLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Bars height="50" width="50" color="#ff0000" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Page Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3 border-b-4 border-red-600 inline-block pb-2">
                    📰 Blog Management
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Easily create, draft, and publish your blogs with a beautiful editor and smooth management.
                </p>
            </div>

            {/* Create Blog Form */}
            <div className="bg-white border border-red-500 rounded-xl shadow-lg p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">✍️ Create a New Blog</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Blog Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 outline-none"
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Thumbnail Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Blog Content</label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1}
                                onBlur={(newContent) => setContent(newContent)}
                                onChange={() => { }}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-600 font-medium">{error}</p>}
                    {loading && <p className="text-yellow-500">Uploading image & submitting blog...</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition disabled:opacity-60"
                    >
                        🚀 {loading ? 'Submitting...' : 'Save to Draft'}
                    </button>
                </form>
            </div>

            {/* Draft Blogs */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-red-600 pb-2 mb-6">📝 Draft Blogs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {allDarftBlogs?.length ? (
                        allDarftBlogs.map((item) => (
                            <div key={item._id} className="border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition bg-white">
                                {item.thumbnail && (
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                                )}
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-600">
                                    <span><strong>Author:</strong> {item.name || 'Unknown'}</span>
                                    <span><strong>Role:</strong> {item.role || 'N/A'}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">Created on: {new Date(item.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-700 text-sm mb-5">
                                    {item.plainText.length > 150 ? `${item.plainText.slice(0, 150)}...` : item.plainText}
                                </p>
                                {role === 'Admin' && (
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={(e) => handlePublish(item._id, 'Publish')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded shadow"
                                        >
                                            Publish
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded shadow"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No draft blogs found.</p>
                    )}
                </div>
            </section>

            {/* Published Blogs */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-red-600 pb-2 mb-6">✅ Published Blogs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {allPublishtBlogs?.length ? (
                        allPublishtBlogs.map((item) => (
                            <div key={item._id} className="border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition bg-white">
                                {item.thumbnail && (
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                                )}
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-600">
                                    <span><strong>Author:</strong> {item.name || 'Unknown'}</span>
                                    <span><strong>Role:</strong> {item.role || 'N/A'}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">Created on: {new Date(item.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-700 text-sm mb-5">
                                    {item.plainText.length > 150 ? `${item.plainText.slice(0, 150)}...` : item.plainText}
                                </p>
                                {role === 'Admin' && (
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => handlePublish(item._id, 'Draft')}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 text-sm rounded shadow"
                                        >
                                            Unpublish
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded shadow"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No published blogs found.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ContentManagement;
