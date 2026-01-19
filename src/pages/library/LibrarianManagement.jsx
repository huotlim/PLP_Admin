import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, IconButton, Chip, Avatar
} from '@mui/material';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';

// Khmer font styles
const khmerFontStyle = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontOpticalSizing: 'auto',
  fontWeight: 400,
  fontStyle: 'normal',
  fontVariationSettings: '"wdth" 100'
};

const initialLibrarians = [
  {
    id: 1,
    name: 'លីម ហួត',
    email: 'lim.hout9988@library.com',
    phone: '+855-12-345-678',
    employeeId: 'LIB001',
    status: 'សកម្ម',
    joinDate: '2023-01-15'
  },
//   {
//     id: 2,
//     name: 'សុបិន',
//     email: 'bob@library.com',
//     phone: '+855-12-345-679',
//     employeeId: 'LIB002',
//     status: 'សកម្ម',
//     joinDate: '2023-03-20'
//   },
//   {
//     id: 3,
//     name: 'នារី រត្នី',
//     email: 'carol@library.com',
//     phone: '+855-12-345-680',
//     employeeId: 'LIB003',
//     status: 'អសកម្ម',
//     joinDate: '2022-11-10'
//   }
];

export default function LibrarianManagement() {
  const [librarians, setLibrarians] = useState(initialLibrarians);
  const [open, setOpen] = useState(false);
  const [editingLibrarian, setEditingLibrarian] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    status: 'សកម្ម'
  });

  const handleCreateLibrarian = () => {
    setEditingLibrarian(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      employeeId: '',
      status: 'សកម្ម'
    });
    setOpen(true);
  };

  const handleEditLibrarian = (librarian) => {
    setEditingLibrarian(librarian);
    setFormData({
      name: librarian.name,
      email: librarian.email,
      phone: librarian.phone,
      employeeId: librarian.employeeId,
      status: librarian.status
    });
    setOpen(true);
  };

  const handleSaveLibrarian = () => {
    if (editingLibrarian) {
      setLibrarians(librarians.map(lib => 
        lib.id === editingLibrarian.id 
          ? { ...lib, ...formData }
          : lib
      ));
    } else {
      setLibrarians([...librarians, { 
        ...formData, 
        id: Date.now(),
        joinDate: new Date().toISOString().split('T')[0]
      }]);
    }
    setOpen(false);
  };

  const handleDeleteLibrarian = (librarianId) => {
    setLibrarians(librarians.filter(lib => lib.id !== librarianId));
  };

  const getStatusColor = (status) => {
    return status === 'សកម្ម' ? 'success' : 'error';
  };

  return (
    <MainCard title="ការគ្រប់គ្រងអ្នកបណ្ណាល័យ" sx={khmerFontStyle}>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleCreateLibrarian} sx={khmerFontStyle}>
          បន្ថែមអ្នកបណ្ណាល័យថ្មី
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={khmerFontStyle}>រូបភាព</TableCell>
              <TableCell sx={khmerFontStyle}>ឈ្មោះ</TableCell>
              <TableCell sx={khmerFontStyle}>អ៊ីមែល</TableCell>
              <TableCell sx={khmerFontStyle}>លេខទូរស័ព្ទ</TableCell>
              <TableCell sx={khmerFontStyle}>លេខសម្គាល់បុគ្គលិក</TableCell>
              <TableCell sx={khmerFontStyle}>ថ្ងៃចូលធ្វើការ</TableCell>
              <TableCell sx={khmerFontStyle}>ស្ថានភាព</TableCell>
              <TableCell sx={khmerFontStyle}>សកម្មភាព</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {librarians.map((librarian) => (
              <TableRow key={librarian.id}>
                <TableCell>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <UserOutlined />
                  </Avatar>
                </TableCell>
                <TableCell sx={khmerFontStyle}>{librarian.name}</TableCell>
                <TableCell>{librarian.email}</TableCell>
                <TableCell>{librarian.phone}</TableCell>
                <TableCell>{librarian.employeeId}</TableCell>
                <TableCell>{librarian.joinDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={librarian.status} 
                    color={getStatusColor(librarian.status)} 
                    size="small"
                    sx={khmerFontStyle}
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleEditLibrarian(librarian)}
                    sx={{ mr: 1 }}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDeleteLibrarian(librarian.id)}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={khmerFontStyle}>
          {editingLibrarian ? 'កែប្រែអ្នកបណ្ណាល័យ' : 'បន្ថែមអ្នកបណ្ណាល័យថ្មី'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="ឈ្មោះពេញ"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': khmerFontStyle,
                '& .MuiInputBase-input': khmerFontStyle
              }}
            />
            <TextField
              label="អ៊ីមែល"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': khmerFontStyle
              }}
            />
            <TextField
              label="លេខទូរស័ព្ទ"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': khmerFontStyle
              }}
            />
            <TextField
              label="លេខសម្គាល់បុគ្គលិក"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': khmerFontStyle
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={khmerFontStyle}>បោះបង់</Button>
          <Button onClick={handleSaveLibrarian} variant="contained" sx={khmerFontStyle}>
            {editingLibrarian ? 'ធ្វើបច្ចុប្បន្នភាព' : 'បន្ថែម'} អ្នកបណ្ណាល័យ
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}
