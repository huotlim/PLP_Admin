import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, IconButton, Chip, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

const initialBooks = [
  { 
    id: 1, 
    title: 'ប្រលោមលោក អាមេរិកាំង', 
    author: 'អ៊ឹម ចាន់ណា', 
    isbn: '978-0-7432-7356-5',
    category: 'ប្រលោមលោក',
    status: 'មាន',
    copies: 3
  },
  { 
    id: 2, 
    title: 'ការណែនាំអំពី Algorithms', 
    author: 'ថូម៉ាស់ កម៉ែន', 
    isbn: '978-0-262-03384-8',
    category: 'បច្ចេកវិទ្យា',
    status: 'ខ្ចី',
    copies: 2
  },
  { 
    id: 3, 
    title: 'ប្រវត្តិសាស្ត្រ និងពេលវេលា', 
    author: 'ស្ទីវ ហាគីង', 
    isbn: '978-0-553-38016-3',
    category: 'វិទ្យាសាស្ត្រ',
    status: 'មាន',
    copies: 4
  }
];

const categories = ['ប្រលោមលោក', 'វិទ្យាសាស្ត្រ', 'ប្រវត្តិសាស្ត្រ', 'បច្ចេកវិទ្យា', 'ជីវប្រវត្តិ'];

export default function BookManagement() {
  const [books, setBooks] = useState(initialBooks);
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: '', isbn: '', category: '', copies: 1
  });

  const handleCreateBook = () => {
    setEditingBook(null);
    setFormData({ title: '', author: '', isbn: '', category: '', copies: 1 });
    setOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      copies: book.copies
    });
    setOpen(true);
  };

  const handleSaveBook = () => {
    if (editingBook) {
      setBooks(books.map(book => 
        book.id === editingBook.id 
          ? { ...book, ...formData, status: book.status }
          : book
      ));
    } else {
      setBooks([...books, { 
        ...formData, 
        id: Date.now(), 
        status: 'Available'
      }]);
    }
    setOpen(false);
  };

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const getStatusColor = (status) => {
    return status === 'មាន' ? 'success' : 'warning';
  };

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងសៀវភៅ">
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
                <TableCell sx={khmerFontStyles}>ចំនួនក្បាល</TableCell>
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
                  <TableCell sx={khmerFontStyles}>{book.category}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    <Chip 
                      label={book.status} 
                      color={getStatusColor(book.status)} 
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
              />
              <TextField
                label="អ្នកនិពន្ធ"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                sx={{
                  '& .MuiInputLabel-root': khmerFontStyles,
                  '& .MuiInputBase-input': khmerFontStyles
                }}
              />
              <TextField
                label="ISBN"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                sx={{
                  '& .MuiInputLabel-root': khmerFontStyles
                }}
              />
              <FormControl>
                <InputLabel sx={khmerFontStyles}>ប្រភេទ</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  sx={{
                    '& .MuiSelect-select': khmerFontStyles
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category} sx={khmerFontStyles}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="ចំនួនក្បាល"
                type="number"
                value={formData.copies}
                onChange={(e) => setFormData({ ...formData, copies: parseInt(e.target.value) })}
                inputProps={{ min: 1 }}
                sx={{
                  '& .MuiInputLabel-root': khmerFontStyles
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
            <Button onClick={handleSaveBook} variant="contained" sx={khmerFontStyles}>
              {editingBook ? 'ធ្វើបច្ចុប្បន្នភាព' : 'បន្ថែម'} សៀវភៅ
            </Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </div>
  );
}
