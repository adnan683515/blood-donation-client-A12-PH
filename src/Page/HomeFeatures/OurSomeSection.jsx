import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import registerBlood from '../../assets/register.svg';
import { Link } from 'react-router';

const MotionLink = motion(Link);

const truncateWords = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
};

export const OurSomeSection = () => {
    return (
        <section className="bg-red-50 p-4 md:p-12">
            <div
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                className="mx-auto space-y-16"
            >
                <ResponsiveLink
                    heading="Love in Every Drop"
                    subheading="When blood unites hearts"
                    infoTitle="The Heart of BloodHub"
                    infoDescription="At BloodHub, we believe every blood donation is an act of love — connecting donors and patients with hope, care, and life. Together, we create a heartbeat of compassion."
                    img="https://i.ibb.co/99yCytSv/heart-6873709-1280.jpg"
                    href="/searchdonor"
                />
                <ResponsiveLink
                    heading="Meet Our Life Savers"
                    subheading="Together, we build a stronger tomorrow"
                    infoTitle="Our Donor Community"
                    infoDescription="Our incredible donors are the real heroes — selflessly saving lives, one drop at a time. Join this inspiring journey of humanity."
                    img="https://i.ibb.co/9kR5yzhQ/volunteers-holding-boxes-containing-donations-charity.jpg"
                    href="/searchdonor"
                />
                <ResponsiveLink
                    heading="Request Blood Now"
                    subheading="Urgent help from donors"
                    infoTitle="Request Blood"
                    infoDescription="Post a blood request and instantly alert available donors near you."
                    img={registerBlood}
                    href="/searchdonor"
                />
                <ResponsiveLink
                    heading="Blood Circulation Explained"
                    subheading="Understand how your heart saves lives"
                    infoTitle="How Blood Circulates"
                    infoDescription="The human heart constantly pumps blood throughout the body, delivering oxygen and nutrients while removing waste. Donated blood helps continue this life-sustaining cycle for patients in need."
                    img="https://i.ibb.co/G4LQ5rm3/ai-generated-8814074-1280.jpg"
                    href="/searchdonor"
                />
            </div>
        </section>
    );
};

const ResponsiveLink = ({ heading, subheading, infoTitle, infoDescription, img, href }) => {
    const [isHovering, setIsHovering] = useState(false);
    const ref = useRef(null);

    return (
        <MotionLink
            to={href}
            ref={ref}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial="initial"
            whileHover="whileHover"
            className="group relative flex flex-col lg:flex-row items-center lg:items-start gap-6  py-10 transition-all duration-500 hover:border-black"
        >
            <img
                src={img}
                alt={heading}
                className="w-full h-48 sm:h-64 lg:w-[30%] lg:h-[40vh] rounded-xl object-cover shadow-md border-2 border-white"
            />

            <div className="flex-1 text-center lg:text-left px-4">
                <motion.span
                    variants={{
                        initial: { x: 0 },
                        whileHover: { x: -10 },
                    }}
                    transition={{
                        type: "spring",
                        staggerChildren: 0.05,
                        delayChildren: 1,
                    }}
                    className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold text-black group-hover:text-red-600 transition"
                >
                    {truncateWords(heading, 5).split("").map((l, i) => (
                        <motion.span
                            key={i}
                            variants={{ initial: { x: 0 }, whileHover: { x: 10 } }}
                            className="inline-block"
                        >
                            {l}
                        </motion.span>
                    ))}
                </motion.span>
                <span className="mt-3 block text-xl sm:text-2xl font-medium text-gray-700 group-hover:text-red-600 transition">
                    {truncateWords(subheading, 5)}
                </span>
            </div>

            {isHovering && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2 z-20 bg-white rounded-2xl shadow-2xl p-6 w-80"
                >
                    <h4 className="text-2xl font-bold text-red-600 mb-2">{infoTitle}</h4>
                    <p className="text-base font-medium text-gray-700 leading-relaxed">
                        {infoDescription}
                    </p>
                </motion.div>
            )}

            <motion.div
                variants={{
                    initial: { x: "25%", opacity: 0 },
                    whileHover: { x: "0%", opacity: 1 },
                }}
                transition={{ type: "spring" }}
                className="z-10 p-4"
            >
                <FiArrowRight className="text-5xl text-black group-hover:text-red-600 transition" />
            </motion.div>
        </MotionLink>
    );
};
