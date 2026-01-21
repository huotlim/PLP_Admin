const BASE_URL = 'https://role-base-hierarchy-nest-js.onrender.com';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const rolesApi = {
  // Get current user info
  getCurrentUser: async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: getAuthHeaders(),
        mode: 'cors',
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // Get all roles
  getRoles: async () => {
    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        method: 'GET',
        headers: getAuthHeaders(),
        mode: 'cors',
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  // Create a new role
  createRole: async (roleData) => {
    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(roleData),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to create role');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  },

  // Update an existing role
  updateRole: async (roleId, roleData) => {
    try {
      const response = await fetch(`${BASE_URL}/roles/${roleId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(roleData),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to update role');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  },

  // Delete a role
  deleteRole: async (roleId) => {
    try {
      const response = await fetch(`${BASE_URL}/roles/${roleId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to delete role');
      }
      return true;
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  },

  // Assign permissions to role
  assignPermissions: async (roleId, permissionIds) => {
    try {
      const response = await fetch(`${BASE_URL}/roles/${roleId}/permissions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ permissionIds }),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to assign permissions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error assigning permissions:', error);
      throw error;
    }
  },
};
