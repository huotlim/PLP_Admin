const BASE_URL = 'https://role-base-hierarchy-nest-js.onrender.com';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const bookBorrowApi = {
  // Get all book borrowings
  getBorrowings: async () => {
    try {
      const response = await fetch(`${BASE_URL}/book-borrow`, {
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
      console.error('Error fetching borrowings:', error);
      throw error;
    }
  },

  // Create a new book borrowing
  createBorrowing: async (borrowData) => {
    try {
      const response = await fetch(`${BASE_URL}/book-borrow`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(borrowData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to create borrowing');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating borrowing:', error);
      throw error;
    }
  },

  // Return a book
  returnBook: async (borrowId) => {
    try {
      const response = await fetch(`${BASE_URL}/book-borrow/${borrowId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: 'RETURNED' }),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to return book');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error returning book:', error);
      throw error;
    }
  }
};
