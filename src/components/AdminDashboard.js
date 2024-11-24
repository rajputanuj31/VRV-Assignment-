"use client";
import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import RoleManager from './RoleManager';
import { mockApi } from '../mockApi';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [activeTab, setActiveTab] = useState('users');

    const fetchData = async () => {
        try {
            const usersData = await mockApi.getUsers();
            const rolesData = await mockApi.getRoles();
            if (Array.isArray(usersData.data)) {
                setUsers(usersData.data);
            } 
            setRoles(rolesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800">
            <div className="p-4 text-black w-4/5">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-[linear-gradient(to_right,#ff7e5f,#feb47b)] text-white' : 'bg-white text-black'} transition duration-300`}
                    >
                        User Management
                    </button>
                    <button
                        onClick={() => setActiveTab('roles')}
                        className={`px-4 py-2 rounded ${activeTab === 'roles' ? 'bg-[linear-gradient(to_right,#ff7e5f,#feb47b)] text-white' : 'bg-white text-black'} transition duration-300`}
                    >
                        Role Management
                    </button>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    {activeTab === 'users' ? (
                        <UserTable users={users} setUsers={setUsers} roles={roles} />
                    ) : (
                        <RoleManager roles={roles} setRoles={setRoles} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard; 