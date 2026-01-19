import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, Chip, Tab, Tabs, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import MainCard from 'components/MainCard';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

const borrowedBooks = [
  {
    id: 1,
    bookTitle: 'ការណែនាំអំពី Algorithms',
    borrowerName: 'ចន តេវ',
    borrowerEmail: 'john@example.com',
    borrowDate: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'ខ្ចី'
  },
  {
    id: 2,
    bookTitle: 'ប្រលោមលោក អាមេរិកាំង',
    borrowerName: 'សុភា គីម',
    borrowerEmail: 'jane@example.com',
    borrowDate: '2024-01-20',
    dueDate: '2024-02-20',
    status: 'លើសកំណត់'
  }
];

const availableBooks = [
  { id: 1, title: 'ប្រវត្តិសាស្ត្រ និងពេលវេលា', author: 'ស្ទីវ ហាគីង' },
  { id: 3, title: 'កូដស្អាត', author: 'រ៉ូបឺត ម៉ាទីន' },
  { id: 4, title: 'អ្នកចាប់បាល', author: 'ជេ.ឌី. សាលីនជឺរ' }
];

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BorrowReturn() {
  const [tabValue, setTabValue] = useState(0);
  const [borrowed, setBorrowed] = useState(borrowedBooks);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [borrowData, setBorrowData] = useState({
    bookId: '',
    borrowerName: '',
    borrowerEmail: '',
    dueDate: ''
  });

  const handleBorrowBook = () => {
    const selectedBook = availableBooks.find(book => book.id == borrowData.bookId);
    if (selectedBook && borrowData.borrowerName && borrowData.borrowerEmail && borrowData.dueDate) {
      const newBorrow = {
        id: Date.now(),
        bookTitle: selectedBook.title,
        borrowerName: borrowData.borrowerName,
        borrowerEmail: borrowData.borrowerEmail,
        borrowDate: new Date().toISOString().split('T')[0],
        dueDate: borrowData.dueDate,
        status: 'Borrowed'
      };
      setBorrowed([...borrowed, newBorrow]);
      setBorrowOpen(false);
      setBorrowData({ bookId: '', borrowerName: '', borrowerEmail: '', dueDate: '' });
    }
  };

  const handleReturnBook = (borrowId) => {
    setBorrowed(borrowed.filter(item => item.id !== borrowId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ខ្ចី': return 'primary';
      case 'លើសកំណត់': return 'error';
      case 'ត្រលប់': return 'success';
      default: return 'default';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងការខ្ចី និងត្រលប់សៀវភៅ">
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
                  <TableCell sx={khmerFontStyles}>ឈ្មោះអ្នកខ្ចី</TableCell>
                  <TableCell sx={khmerFontStyles}>អ៊ីមែលអ្នកខ្ចី</TableCell>
                  <TableCell sx={khmerFontStyles}>ថ្ងៃខ្ចី</TableCell>
                  <TableCell sx={khmerFontStyles}>ថ្ងៃកំណត់ត្រលប់</TableCell>
                  <TableCell sx={khmerFontStyles}>ស្ថានភាព</TableCell>
                  <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {borrowed.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={khmerFontStyles}>{item.bookTitle}</TableCell>
                    <TableCell sx={khmerFontStyles}>{item.borrowerName}</TableCell>
                    <TableCell>{item.borrowerEmail}</TableCell>
                    <TableCell>{item.borrowDate}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={isOverdue(item.dueDate) ? 'លើសកំណត់' : item.status} 
                        color={getStatusColor(isOverdue(item.dueDate) ? 'លើសកំណត់' : item.status)}
                        size="small"
                        sx={khmerFontStyles}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="small"
                        onClick={() => handleReturnBook(item.id)}
                        sx={khmerFontStyles}
                      >
                        ត្រលប់សៀវភៅ
                      </Button>
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
                <FormControl fullWidth>
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
                        {book.title} - {book.author}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="ឈ្មោះអ្នកខ្ចី"
                  value={borrowData.borrowerName}
                  onChange={(e) => setBorrowData({ ...borrowData, borrowerName: e.target.value })}
                  sx={{
                    '& .MuiInputLabel-root': khmerFontStyles,
                    '& .MuiInputBase-input': khmerFontStyles
                  }}
                />
                <TextField
                  label="អ៊ីមែលអ្នកខ្ចី"
                  type="email"
                  value={borrowData.borrowerEmail}
                  onChange={(e) => setBorrowData({ ...borrowData, borrowerEmail: e.target.value })}
                  sx={{
                    '& .MuiInputLabel-root': khmerFontStyles
                  }}
                />
                <TextField
                  label="ថ្ងៃកំណត់ត្រលប់"
                  type="date"
                  value={borrowData.dueDate}
                  onChange={(e) => setBorrowData({ ...borrowData, dueDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiInputLabel-root': khmerFontStyles
                  }}
                />
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
