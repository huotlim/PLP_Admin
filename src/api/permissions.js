const BASE_URL = 'https://role-base-hierarchy-nest-js.onrender.com';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const permissionsApi = {
  // Get all permissions
  getPermissions: async () => {
    try {
      const response = await fetch(`${BASE_URL}/permissions`, {
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
      console.error('Error fetching permissions:', error);
      throw error;
    }
  },

  // Create a new permission
  createPermission: async (permissionData) => {
    try {
      const response = await fetch(`${BASE_URL}/permissions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(permissionData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to create permission');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating permission:', error);
      throw error;
    }
  },

  // Update an existing permission
  updatePermission: async (permissionId, permissionData) => {
    try {
      const response = await fetch(`${BASE_URL}/permissions/${permissionId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(permissionData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to update permission');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating permission:', error);
      throw error;
    }
  },

  // Delete a permission
  deletePermission: async (permissionId) => {
    try {
      const response = await fetch(`${BASE_URL}/permissions/${permissionId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to delete permission');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting permission:', error);
      throw error;
    }
  }
};
