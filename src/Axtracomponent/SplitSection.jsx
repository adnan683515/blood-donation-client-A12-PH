import { Link } from "react-router";
import AuthHook from "../Component/Share/Hooks/AuthHook";




export default function SplitSection() {

    const { user, loading } = AuthHook()
    if (loading) {
        return <div className="flex justify-center items-center">
            <h1>Loading......</h1>
        </div>
    }
    return (
        <section className="w-full bg-white">
            <div className="mx-auto w-[96%] px-4 md:px-6 py-16 md:py-24">
                {/* Wrapper: stack on mobile, split on large screens */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left: Big text block */}


                    {/* Right: 2-column grid with 4 images */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {/* Image 1 */}
                        <div className="aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm">
                            <img
                                src="https://i.ibb.co.com/FqYwVNTY/adrian-sulyok-s-ZO8-ILz-GKcg-unsplash.jpg"
                                alt="Dashboard preview"
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {/* Image 2 */}
                        <div className="aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm">
                            <img
                                src="https://i.ibb.co.com/ZRrspKXN/fotos-Bmcag6s-JMe-A-unsplash.jpg"
                                alt="Code editor"
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {/* Image 3 */}
                        <div className="aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm">
                            <img
                                src="https://i.ibb.co.com/zWyP6ThC/fotos-m-Cqh2a-H6-Cm-U-unsplash.jpg"
                                alt="Design system"
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {/* Image 4 */}
                        <div className="aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm">
                            <img
                                src="https://i.ibb.co.com/8D2KYCCN/nguy-n-hi-p-ufw-C2cmbaa-I-unsplash.jpg"
                                alt="Team collaboration"
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase">Donate</p>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Give Blood, Save Lives
                            <span className="block text-red-600 font-semibold">Be a Hero Today</span>
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg max-w-prose">
                            Every drop counts. By donating blood, you’re giving someone a second chance at life. Join the movement and inspire others to take part in this life‑saving mission.
                        </p>
                        <div className="flex items-center gap-3">
                            <Link to={`${user ? '/donation-requests' : '/login'}`}>
                            <button className="rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm bg-rose-600 text-white hover:opacity-90">
                                Become a Donor
                            </button></Link>
                            <Link to={'/aboutpage'}>
                                <button className="rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm border hover:bg-gray-50">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}