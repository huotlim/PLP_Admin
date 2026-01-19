import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, IconButton, Chip
} from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

const initialCategories = [
  { id: 1, name: 'ប្រលោមលោក', description: 'វរណកម្មប្រលោមលោក និងរឿងនិទាន', bookCount: 245 },
  { id: 2, name: 'វិទ្យាសាស្ត្រ', description: 'សៀវភៅវិទ្យាសាស្ត្រ និងការស្រាវជ្រាវ', bookCount: 156 },
  { id: 3, name: 'ប្រវត្តិសាស្ត្រ', description: 'សៀវភៅប្រវត្តិសាស្ត្រ និងឯកសារ', bookCount: 89 },
  { id: 4, name: 'បច្ចេកវិទ្យា', description: 'កុំព្យូទ័រ និងបច្ចេកវិទ្យា', bookCount: 178 }
];

export default function CategoryManagement() {
  const [categories, setCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description });
    setOpen(true);
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: formData.name, description: formData.description }
          : cat
      ));
    } else {
      setCategories([...categories, { 
        ...formData, 
        id: Date.now(), 
        bookCount: 0 
      }]);
    }
    setOpen(false);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងប្រភេទសៀវភៅ">
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleCreateCategory} sx={khmerFontStyles}>
            បន្ថែមប្រភេទថ្មី
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={khmerFontStyles}>ឈ្មោះប្រភេទ</TableCell>
                <TableCell sx={khmerFontStyles}>ការពិពណ៌នា</TableCell>
                <TableCell sx={khmerFontStyles}>ចំនួនសៀវភៅ</TableCell>
                <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell sx={khmerFontStyles}>{category.name}</TableCell>
                  <TableCell sx={khmerFontStyles}>{category.description}</TableCell>
                  <TableCell>
                    <Chip label={category.bookCount} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEditCategory(category)}
                      sx={{ mr: 1 }}
                    >
                      <EditOutlined />
                    </IconButton>
                    <IconButton 
                      color="error"
                      onClick={() => handleDeleteCategory(category.id)}
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
          <DialogTitle sx={khmerFontStyles}>
            {editingCategory ? 'កែសម្រួលប្រភេទ' : 'បន្ថែមប្រភេទថ្មី'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="ឈ្មោះប្រភេទ"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ 
                mt: 2, 
                mb: 2,
                '& .MuiInputLabel-root': khmerFontStyles,
                '& .MuiInputBase-input': khmerFontStyles
              }}
            />
            <TextField
              fullWidth
              label="ការពិពណ៌នា"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': khmerFontStyles,
                '& .MuiInputBase-input': khmerFontStyles
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
            <Button onClick={handleSaveCategory} variant="contained" sx={khmerFontStyles}>
              {editingCategory ? 'ធ្វើបច្ចុប្បន្នភាព' : 'បន្ថែម'} ប្រភេទ
            </Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </div>
  );
}
