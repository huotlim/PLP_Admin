import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, IconButton, Chip, Select, MenuItem, FormControl, InputLabel,
  CircularProgress, Alert, Typography
} from '@mui/material';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { booksApi } from 'api/books';
import { categoriesApi } from 'api/categories';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: '', isbn: '', categoryId: '', totalCopies: 1, availableQuantity: 1
  });

  // Load books and categories from API
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [booksData, categoriesData] = await Promise.all([
        booksApi.getBooks(),
        categoriesApi.getCategories()
      ]);
      
      setBooks(booksData);
      setCategories(categoriesData);
    } catch (err) {
      let errorMessage = 'Failed to load data';
      
      if (err.message.includes('Unauthorized')) {
        errorMessage = 'Session expired. Please login again.';
      }
      
      setError(errorMessage);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = () => {
    setEditingBook(null);
    setFormData({ 
      title: '', 
      author: '', 
      isbn: '', 
      categoryId: '', 
      totalCopies: 1, 
      availableQuantity: 1 
    });
    setOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      categoryId: book.category?.id || '',
      totalCopies: book.totalCopies,
      availableQuantity: book.availableQuantity
    });
    setOpen(true);
  };

  const handleSaveBook = async () => {
    try {
      if (!formData.title || !formData.author || !formData.isbn || !formData.categoryId) {
        setError('Please fill in all required fields');
        return;
      }

      const bookData = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        categoryId: parseInt(formData.categoryId),
        totalCopies: parseInt(formData.totalCopies),
        availableQuantity: parseInt(formData.availableQuantity)
      };

      if (editingBook) {
        await booksApi.updateBook(editingBook.id, bookData);
      } else {
        await booksApi.createBook(bookData);
      }
      
      await loadInitialData(); // Reload data after save
      setOpen(false);
    } catch (err) {
      setError('Failed to save book');
      console.error('Error saving book:', err);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await booksApi.deleteBook(bookId);
      await loadInitialData(); // Reload data after deletion
    } catch (err) {
      setError('Failed to delete book');
      console.error('Error deleting book:', err);
    }
  };

  const getStatusColor = (book) => {
    return book.availableQuantity > 0 ? 'success' : 'warning';
  };

  const getStatusText = (book) => {
    return book.availableQuantity > 0 ? 'មាន' : 'អស់';
  };

  if (loading) {
    return (
      <div style={khmerFontStyles}>
        <MainCard title="ការគ្រប់គ្រងសៀវភៅ">
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        </MainCard>
      </div>
    );
  }

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងសៀវភៅ">
        {error && (
          <Alert severity="error" sx={{ mb: 2, ...khmerFontStyles }}>
            {error}
            <Button 
              size="small" 
              sx={{ mt: 1, ...khmerFontStyles }} 
              onClick={loadInitialData}
            >
              ព្យាយាមម្តងទៀត
            </Button>
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleCreateBook} sx={khmerFontStyles}>
            បន្ថែមសៀវភៅថ្មី
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={khmerFontStyles}>ចំណងជើង</TableCell>
                <TableCell sx={khmerFontStyles}>អ្នកនិពន្ធ</TableCell>
                <TableCell sx={khmerFontStyles}>ISBN</TableCell>
                <TableCell sx={khmerFontStyles}>ប្រភេទ</TableCell>
                <TableCell sx={khmerFontStyles}>ចំនួនសរុប</TableCell>
                <TableCell sx={khmerFontStyles}>ចំនួនអាច</TableCell>
                <TableCell sx={khmerFontStyles}>ស្ថានភាព</TableCell>
                <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell sx={khmerFontStyles}>{book.title}</TableCell>
                  <TableCell sx={khmerFontStyles}>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell sx={khmerFontStyles}>
                    {book.category ? book.category.name : 'មិនកំណត់'}
                  </TableCell>
                  <TableCell>{book.totalCopies}</TableCell>
                  <TableCell>{book.availableQuantity}</TableCell>
                  <TableCell>
                    <Chip 
                      label={getStatusText(book)} 
                      color={getStatusColor(book)} 
                      size="small"
                      sx={khmerFontStyles}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      color="info" 
                      sx={{ mr: 1 }}
                    >
                      <EyeOutlined />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEditBook(book)}
                      sx={{ mr: 1 }}
                    >
                      <EditOutlined />
                    </IconButton>
                    <IconButton 
                      color="error"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={khmerFontStyles}>
            {editingBook ? 'កែសម្រួលសៀវភៅ' : 'បន្ថែមសៀវភៅថ្មី'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
              <TextField
                label="ចំណងជើងសៀវភៅ"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                sx={{
                  '& .MuiInputLabel-root': khmerFontStyles,
                  '& .MuiInputBase-input': khmerFontStyles
                }}
                required
              />
              <TextField
                label="អ្នកនិពន្ធ"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                sx={{
                  '& .MuiInputLabel-root': khmerFontStyles,
                  '& .MuiInputBase-input': khmerFontStyles
                }}
                required
              />
              <TextField
                label="ISBN"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                sx={{
                  '& .MuiInputLabel-root': khmerFontStyles
                }}
                required
              />
              <FormControl required>
                <InputLabel sx={khmerFontStyles}>ប្រភេទ</InputLabel>
                <Select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  sx={{
                    '& .MuiSelect-select': khmerFontStyles
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id} sx={khmerFontStyles}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="ចំនួនសរុប"
                type="number"
                value={formData.totalCopies}
                onChange={(e) => setFormData({ ...formData, totalCopies: parseInt(e.target.value) || 1 })}
                inputProps={{ min: 1 }}
                sx={{
                  '& .MuiInputLabel-root': khmerFontStyles
                }}
              />
              <TextField
                label="ចំនួនអាចប្រើបាន"
                type="number"
                value={formData.availableQuantity}
                onChange={(e) => setFormData({ ...formData, availableQuantity: parseInt(e.target.value) || 1 })}
                inputProps={{ min: 0 }}
                sx={{
                  '& .MuiInputLabel-root': khmerFontStyles
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
            <Button onClick={handleSaveBook} variant="contained" sx={khmerFontStyles}>
              {editingBook ? 'ធ្វើបច្ចុប្បន្នភាព' : 'បន្ថែម'}
            </Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </div>
  );
}
