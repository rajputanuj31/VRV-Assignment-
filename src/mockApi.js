import { v4 as uuidv4 } from 'uuid';

let users = [
    { id: uuidv4(), name: 'Alice', role: 'Admin', active: true },
    { id: uuidv4(), name: 'Bob', role: 'User', active: false },
    { id: uuidv4(), name: 'Charlie', role: 'Admin', active: true },
    { id: uuidv4(), name: 'David', role: 'User', active: true },
    { id: uuidv4(), name: 'Eve', role: 'Admin', active: false },
];

let roles = [
    { id: uuidv4(), name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: uuidv4(), name: 'User', permissions: ['read'] },
    { id: uuidv4(), name: 'Guest', permissions: ['read'] },
    { id: uuidv4(), name: 'Manager', permissions: ['read', 'write'] },
];

export const mockApi = {
    // User CRUD operations
    getUsers: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...users]); // Return a copy of users
            }, 500); // Simulate server response time
        });
    },

    addUser: async (user) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!user.name || !user.role) {
                    reject(new Error('Invalid user data. Name and role are required.'));
                } else {
                    const newUser = { ...user, id: uuidv4() };
                    users.push(newUser);
                    resolve(newUser);
                }
            }, 500);
        });
    },

    updateUser: async (updatedUser) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const userIndex = users.findIndex(user => user.id === updatedUser.id);
                if (userIndex === -1) {
                    reject(new Error('User not found.'));
                } else {
                    users[userIndex] = updatedUser;
                    resolve(updatedUser);
                }
            }, 500);
        });
    },

    deleteUser: async (userId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const initialLength = users.length;
                users = users.filter(user => user.id !== userId);
                if (users.length === initialLength) {
                    reject(new Error('User not found.'));
                } else {
                    resolve(userId);
                }
            }, 500);
        });
    },

    // Role CRUD operations
    getRoles: async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...roles]), 500); // Return a copy of roles
        });
    },

    addRole: async (role) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!role.name || !Array.isArray(role.permissions)) {
                    reject(new Error('Invalid role data. Name and permissions are required.'));
                } else {
                    const newRole = { ...role, id: uuidv4() };
                    roles.push(newRole);
                    resolve(newRole);
                }
            }, 500);
        });
    },

    updateRole: async (updatedRole) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const roleIndex = roles.findIndex(role => role.id === updatedRole.id);
                if (roleIndex === -1) {
                    reject(new Error('Role not found.'));
                } else {
                    roles[roleIndex] = updatedRole;
                    resolve(updatedRole);
                }
            }, 500);
        });
    },

    deleteRole: async (roleId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const initialLength = roles.length;
                roles = roles.filter(role => role.id !== roleId);
                if (roles.length === initialLength) {
                    reject(new Error('Role not found.'));
                } else {
                    resolve(roleId);
                }
            }, 500);
        });
    },
};
