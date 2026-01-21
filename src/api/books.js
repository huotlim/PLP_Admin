const BASE_URL = 'https://role-base-hierarchy-nest-js.onrender.com';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const booksApi = {
  // Get all books
  getBooks: async () => {
    try {
      const response = await fetch(`${BASE_URL}/book`, {
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
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Create a new book
  createBook: async (bookData) => {
    try {
      const response = await fetch(`${BASE_URL}/book`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to create book');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  // Update an existing book
  updateBook: async (bookId, bookData) => {
    try {
      const response = await fetch(`${BASE_URL}/book/${bookId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to update book');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  // Delete a book
  deleteBook: async (bookId) => {
    try {
      const response = await fetch(`${BASE_URL}/book/${bookId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to delete book');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
};
