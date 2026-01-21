const BASE_URL = 'https://role-base-hierarchy-nest-js.onrender.com';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const categoriesApi = {
  // Get all categories
  getCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
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
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Create a new category
  createCategory: async (categoryData) => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(categoryData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to create category');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Update an existing category
  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(categoryData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to update category');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to delete category');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};
