"use client";
import React from 'react';
import Link from 'next/link';

function Navbar() {
    return (
        <nav className="bg-[#001f3f] p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-lg font-bold hover:text-blue-200 transition duration-300">
                RoleMaster
                </Link>

                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="text-white hover:text-blue-200 transition duration-300">Home</Link>
                    <Link href="/admin" className="text-white hover:text-blue-200 transition duration-300">Admin Dashboard</Link>
                    {/* Add more links as needed */}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-white">Menu</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 