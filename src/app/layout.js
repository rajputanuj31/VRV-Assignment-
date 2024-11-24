import React from 'react';
import Navbar from '../components/Navbar';
import './globals.css'; // Ensure global styles are imported

export const metadata = {
    title: 'RoleMaster', // Set your app title here
    description: 'A comprehensive solution for managing users and roles efficiently.', // Set your app description here
};

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main className="">{children}</main>
            </body>
        </html>
    );
}
