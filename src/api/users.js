const BASE_URL = 'https://role-base-hierarchy-nest-js.onrender.com';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function for better error handling
const handleResponse = async (response, operation) => {
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    console.error(`${operation} failed:`, {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    
    if (response.status === 401) {
      throw new Error('Unauthorized. Please login again.');
    }
    
    throw new Error(`${operation} failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json().catch(() => ({}));
};

export const usersApi = {
  // Get all users
  getUsers: async () => {
    try {
      console.log('Fetching users...');
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: getAuthHeaders(),
        mode: 'cors',
      });
      
      const data = await handleResponse(response, 'Get users');
      console.log('Users fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to create user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update an existing user
  updateUser: async (userId, userData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to update user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to delete user');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Assign single role to user
  assignRole: async (userId, roleId) => {
    try {
      console.log(`Assigning role ${roleId} to user ${userId}...`);
      const response = await fetch(`${BASE_URL}/users/${userId}/role/${roleId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      
      const data = await handleResponse(response, 'Assign role');
      console.log('Role assigned successfully:', data);
      return data;
    } catch (error) {
      console.error('Error assigning role:', error);
      throw error;
    }
  },

  // Assign multiple roles to user (sequential calls)
  assignRoles: async (userId, roleIds) => {
    try {
      console.log(`Assigning roles [${roleIds.join(', ')}] to user ${userId}...`);
      const results = [];
      for (const roleId of roleIds) {
        const result = await usersApi.assignRole(userId, roleId);
        results.push(result);
      }
      console.log('All roles assigned successfully');
      return results;
    } catch (error) {
      console.error('Error assigning roles:', error);
      throw error;
    }
  },

  // Remove role from user
  removeRole: async (userId, roleId) => {
    try {
      console.log(`Removing role ${roleId} from user ${userId}...`);
      const response = await fetch(`${BASE_URL}/users/${userId}/role/${roleId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      await handleResponse(response, 'Remove role');
      console.log('Role removed successfully');
      return true;
    } catch (error) {
      console.error('Error removing role:', error);
      throw error;
    }
  }
};
