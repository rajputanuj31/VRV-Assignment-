"use client";
import React, { useState } from 'react';
import { mockApi } from '../mockApi';

function RoleManager({ roles, setRoles }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState({ name: '', permissions: [] });
    const [permissions, setPermissions] = useState({
        read: false,
        write: false,
        delete: false,
    });

    const handleAddRole = () => {
        setCurrentRole({ name: '', permissions: { ...permissions } });
        setIsModalOpen(true);
    };

    const handleEditRole = (role) => {
        setCurrentRole(role);
        setPermissions(role.permissions);
        setIsModalOpen(true);
    };

    const handleDeleteRole = async (roleId) => {
        await mockApi.deleteRole(roleId);
        const updatedRoles = await mockApi.getRoles();
        setRoles(updatedRoles);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentRole({ name: '', permissions: [] });
        setPermissions({ read: false, write: false, delete: false });
    };

    const handleSaveRole = async () => {
        if (!currentRole.name) {
            alert('Role name is required.');
            return;
        }

        const existingRole = roles.find(
            role => role.name.toLowerCase() === currentRole.name.toLowerCase() && role.id !== currentRole.id
        );
        if (existingRole) {
            alert('A role with this name already exists. Please choose a different name.');
            return;
        }

        if (currentRole.id) {
            await mockApi.updateRole({ ...currentRole, permissions });
        } else {
            await mockApi.addRole({ ...currentRole, permissions });
        }
        const updatedRoles = await mockApi.getRoles();
        setRoles(updatedRoles);
        handleModalClose();
    };

    // Handle permission toggling
    const togglePermission = (permission) => {
        if (currentRole.permissions.includes(permission)) {
            setCurrentRole({
                ...currentRole,
                permissions: currentRole.permissions.filter(p => p !== permission),
            });
        } else {
            setCurrentRole({
                ...currentRole,
                permissions: [...currentRole.permissions, permission],
            });
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Role Management</h2>
            <button
                onClick={handleAddRole}
                className="bg-[linear-gradient(to_right,#ff7e5f,#feb47b)] text-white px-4 py-2 rounded hover:opacity-80 transition duration-300 mb-4"
            >
                Add Role
            </button>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border-b p-2 text-black text-left">Role Name</th>
                        <th className="border-b p-2 text-black text-left">Permissions</th>
                        <th className="border-b p-2 text-black text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <tr key={role.id} className="hover:bg-gray-50">
                                <td className="border-b p-2 text-black">{role.name}</td>
                                <td className="border-b p-2 text-black">{role.permissions.join(', ')}</td>
                                <td className="border-b p-2 text-black">
                                    <button onClick={() => handleEditRole(role)} className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <button onClick={() => handleDeleteRole(role.id)} className="text-red-600 hover:text-red-800 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">
                                No roles found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Adding/Editing Role */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">{currentRole.id ? 'Edit Role' : 'Add Role'}</h3>
                        <input
                            type="text"
                            placeholder="Role Name"
                            value={currentRole.name}
                            onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                            className="border p-2 mb-4 w-full"
                        />
                        <div className="mb-4">
                            <h4 className="font-semibold">Permissions:</h4>
                            {['read', 'write', 'delete'].map((perm) => (
                                <label key={perm} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={currentRole.permissions.includes(perm)}
                                        onChange={() => togglePermission(perm)}
                                        className="mr-2"
                                    />
                                    {perm.charAt(0).toUpperCase() + perm.slice(1)}
                                </label>
                            ))}
                        </div>
                        <button onClick={handleSaveRole} className="bg-[linear-gradient(to_right,#ff7e5f,#feb47b)] text-white px-4 py-2 rounded hover:opacity-80 transition duration-300 mr-2">
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

export default RoleManager;
