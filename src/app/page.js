import React from 'react';
import Link from 'next/link';

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800">
            <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md">
                <h1 className="text-4xl font-extrabold mb-4">Welcome to MyApp</h1>
                <p className="text-lg mb-6">Your one-stop solution for managing users and roles efficiently.</p>
                <Link href="/admin">
                    <button className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-black px-6 py-3 rounded-full hover:opacity-80 transition duration-300">
                        Get Started
                    </button>
                </Link>
            </div>
            <div className="mt-10">
                <h2 className="text-3xl font-bold mb-2">Features</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>✔ User Management</li>
                    <li>✔ Role Management</li>
                    <li>✔ Dynamic Permissions</li>
                    <li>✔ Easy Navigation</li>
                </ul>
            </div>
        </div>
    );
}

export default HomePage;
