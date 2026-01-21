import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, Chip, Tab, Tabs, Select, MenuItem, FormControl, InputLabel,
  CircularProgress, Alert, Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import { bookBorrowApi } from 'api/bookBorrow';
import { booksApi } from 'api/books';
import { usersApi } from 'api/users';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

export default function BorrowReturn() {
  const [tabValue, setTabValue] = useState(0);
  const [borrowings, setBorrowings] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [borrowData, setBorrowData] = useState({
    bookId: '',
    userId: ''
  });

  // Load data from API
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [borrowingsData, booksData, usersData] = await Promise.all([
        bookBorrowApi.getBorrowings(),
        booksApi.getBooks(),
        usersApi.getUsers()
      ]);
      
      setBorrowings(borrowingsData);
      // Filter books with available quantity > 0
      setAvailableBooks(booksData.filter(book => book.availableQuantity > 0));
      setUsers(usersData);
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

  const handleBorrowBook = async () => {
    try {
      if (!borrowData.bookId || !borrowData.userId) {
        setError('Please select both book and user');
        return;
      }

      const borrowRequest = {
        bookId: parseInt(borrowData.bookId),
        userId: parseInt(borrowData.userId)
      };

      await bookBorrowApi.createBorrowing(borrowRequest);
      await loadInitialData(); // Reload data after borrowing
      setBorrowOpen(false);
      setBorrowData({ bookId: '', userId: '' });
    } catch (err) {
      setError('Failed to create borrowing');
      console.error('Error creating borrowing:', err);
    }
  };

  const handleReturnBook = async (borrowId) => {
    try {
      await bookBorrowApi.returnBook(borrowId);
      await loadInitialData(); // Reload data after returning
    } catch (err) {
      setError('Failed to return book');
      console.error('Error returning book:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'primary';
      case 'OVERDUE': return 'error';
      case 'RETURNED': return 'success';
      default: return 'default';
    }
  };

  const getStatusText = (borrowing) => {
    if (borrowing.status === 'RETURNED') return 'ត្រលប់';
    if (borrowing.status === 'ACTIVE' && new Date(borrowing.dueDate) < new Date()) return 'លើសកំណត់';
    return 'ខ្ចី';
  };

  const isOverdue = (dueDate, status) => {
    return status === 'ACTIVE' && new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div style={khmerFontStyles}>
        <MainCard title="ការគ្រប់គ្រងការខ្ចី និងត្រលប់សៀវភៅ">
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        </MainCard>
      </div>
    );
  }

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងការខ្ចី និងត្រលប់សៀវភៅ">
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

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="សៀវភៅដែលបានខ្ចី" sx={khmerFontStyles} />
            <Tab label="ខ្ចីសៀវភៅថ្មី" sx={khmerFontStyles} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={khmerFontStyles}>ចំណងជើងសៀវភៅ</TableCell>
                  <TableCell sx={khmerFontStyles}>អ្នកខ្ចី</TableCell>
                  <TableCell sx={khmerFontStyles}>ថ្ងៃខ្ចី</TableCell>
                  <TableCell sx={khmerFontStyles}>ថ្ងៃកំណត់ត្រលប់</TableCell>
                  <TableCell sx={khmerFontStyles}>ថ្ងៃត្រលប់</TableCell>
                  <TableCell sx={khmerFontStyles}>ស្ថានភាព</TableCell>
                  <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {borrowings.map((borrowing) => (
                  <TableRow key={borrowing.id}>
                    <TableCell sx={khmerFontStyles}>
                      {borrowing.book ? borrowing.book.title : 'មិនកំណត់'}
                    </TableCell>
                    <TableCell>
                      {borrowing.user ? borrowing.user.email : 'មិនកំណត់'}
                    </TableCell>
                    <TableCell>
                      {new Date(borrowing.borrowDate).toLocaleDateString('km-KH')}
                    </TableCell>
                    <TableCell>
                      {new Date(borrowing.dueDate).toLocaleDateString('km-KH')}
                    </TableCell>
                    <TableCell>
                      {borrowing.returnDate 
                        ? new Date(borrowing.returnDate).toLocaleDateString('km-KH')
                        : 'មិនទាន់ត្រលប់'
                      }
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(borrowing)} 
                        color={getStatusColor(isOverdue(borrowing.dueDate, borrowing.status) ? 'OVERDUE' : borrowing.status)}
                        size="small"
                        sx={khmerFontStyles}
                      />
                    </TableCell>
                    <TableCell>
                      {borrowing.status === 'ACTIVE' && (
                        <Button 
                          variant="contained" 
                          color="success" 
                          size="small"
                          onClick={() => handleReturnBook(borrowing.id)}
                          sx={khmerFontStyles}
                        >
                          ត្រលប់សៀវភៅ
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 2 }}>
            <Button variant="contained" onClick={() => setBorrowOpen(true)} sx={khmerFontStyles}>
              បង្កើតការខ្ចីសៀវភៅថ្មី
            </Button>
          </Box>

          <Dialog open={borrowOpen} onClose={() => setBorrowOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={khmerFontStyles}>ចេញសៀវភៅថ្មី</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <FormControl fullWidth required>
                  <InputLabel sx={khmerFontStyles}>ជ្រើសរើសសៀវភៅ</InputLabel>
                  <Select
                    value={borrowData.bookId}
                    onChange={(e) => setBorrowData({ ...borrowData, bookId: e.target.value })}
                    sx={{
                      '& .MuiSelect-select': khmerFontStyles
                    }}
                  >
                    {availableBooks.map((book) => (
                      <MenuItem key={book.id} value={book.id} sx={khmerFontStyles}>
                        {book.title} - {book.author} (ចំនួនអាច: {book.availableQuantity})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth required>
                  <InputLabel sx={khmerFontStyles}>ជ្រើសរើសអ្នកប្រើប្រាស់</InputLabel>
                  <Select
                    value={borrowData.userId}
                    onChange={(e) => setBorrowData({ ...borrowData, userId: e.target.value })}
                    sx={{
                      '& .MuiSelect-select': khmerFontStyles
                    }}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id} sx={khmerFontStyles}>
                        {user.email}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setBorrowOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
              <Button onClick={handleBorrowBook} variant="contained" sx={khmerFontStyles}>
                ចេញសៀវភៅ
              </Button>
            </DialogActions>
          </Dialog>
        </TabPanel>
      </MainCard>
    </div>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
