"use client";
import React, { useState, useEffect } from 'react';
import { mockApi } from '../mockApi';

function UserTable({ users, setUsers, roles }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [filterActive, setFilterActive] = useState(false); // Show active users by default

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await mockApi.getUsers();
            setUsers(usersData);
        };
        fetchUsers();
    }, [setUsers]);

    const handleAddUser = () => {
        setCurrentUser({ name: '', role: '', active: true });
        setIsModalOpen(true);
    };

    const handleEditUser = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = async (userId) => {
        await mockApi.deleteUser(userId);
        const updatedUsers = await mockApi.getUsers();
        setUsers(updatedUsers);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleSaveUser = async () => {
        if (!currentUser.name || !currentUser.role) {
            alert('Name and role are required.');
            return;
        }

        const existingUser = users.find(
            user => user.name.toLowerCase() === currentUser.name.toLowerCase() && user.id !== currentUser.id
        );
        if (existingUser) {
            alert('A user with this name already exists. Please choose a different name.');
            return;
        }

        if (currentUser.id) {
            await mockApi.updateUser(currentUser);
        } else {
            await mockApi.addUser(currentUser);
        }
        const updatedUsers = await mockApi.getUsers();
        setUsers(updatedUsers);
        handleModalClose();
    };

    // Search and filter logic
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterActive ? user.active : true; // Show all if not filtering
        return matchesSearch && matchesStatus;
    });

    // Sorting logic
    const sortedUsers = filteredUsers.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-black">User Management</h2>
            <div className="flex mb-4 w-2/3">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <button onClick={handleAddUser} className="bg-[linear-gradient(to_right,#ff7e5f,#feb47b)] text-white px-4 py-2 w-1/3 h-10 rounded hover:opacity-80 transition duration-300 ml-2">
                    Add User
                </button>
            </div>
            <div className="flex mb-4">
                <label className="mr-2">
                    <input
                        type="checkbox"
                        checked={filterActive}
                        onChange={(e) => setFilterActive(e.target.checked)}
                        className="mr-1"
                    />
                    Show Active Users
                </label>
                <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="text-blue-600 hover:text-blue-800">
                    Sort by Name ({sortOrder === 'asc' ? 'Descending' : 'Ascending'})
                </button>
            </div>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border-b p-2 text-black text-left">Name</th>
                        <th className="border-b p-2 text-black text-left">Role</th>
                        <th className="border-b p-2 text-black text-left">Status</th>
                        <th className="border-b p-2 text-black text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.length > 0 ? (
                        sortedUsers.map((user, index) => (
                            <tr key={user.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                <td className="border-b p-2 text-black">{user.name}</td>
                                <td className="border-b p-2 text-black">{user.role}</td>
                                <td className="border-b p-2 text-black">{user.active ? 'Active' : 'Inactive'}</td>
                                <td className="border-b p-2 text-black">
                                    <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Adding/Editing User */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">{currentUser.id ? 'Edit User' : 'Add User'}</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={currentUser.name}
                            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                            className="border p-2 mb-4 w-full"
                        />
                        <select
                            value={currentUser.role}
                            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                            className="border p-2 mb-4 w-full"
                        >
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={currentUser.active}
                                onChange={(e) => setCurrentUser({ ...currentUser, active: e.target.checked })}
                                className="mr-2"
                            />
                            <label>Active</label>
                        </div>
                        <button onClick={handleSaveUser} className="bg-[linear-gradient(to_right,#ff7e5f,#feb47b)] text-white px-4 py-2 rounded hover:opacity-80 transition duration-300 mr-2">
                            Save
                        </button>
                        <button onClick={handleModalClose} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-300">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserTable;
