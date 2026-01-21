import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, IconButton, Chip, CircularProgress, Alert, Typography
} from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { categoriesApi } from 'api/categories';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Load categories from API
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriesApi.getCategories();
      setCategories(data);
    } catch (err) {
      let errorMessage = 'Failed to load categories';
      
      if (err.message.includes('Unauthorized')) {
        errorMessage = 'Session expired. Please login again.';
      }
      
      setError(errorMessage);
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveCategory = async () => {
    try {
      if (!formData.name || !formData.description) {
        setError('Please fill in all required fields');
        return;
      }

      if (editingCategory) {
        await categoriesApi.updateCategory(editingCategory.id, formData);
      } else {
        await categoriesApi.createCategory(formData);
      }
      
      await loadCategories(); // Reload categories after save
      setOpen(false);
    } catch (err) {
      setError('Failed to save category');
      console.error('Error saving category:', err);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await categoriesApi.deleteCategory(categoryId);
      await loadCategories(); // Reload categories after deletion
    } catch (err) {
      setError('Failed to delete category');
      console.error('Error deleting category:', err);
    }
  };

  if (loading) {
    return (
      <div style={khmerFontStyles}>
        <MainCard title="ការគ្រប់គ្រងប្រភេទសៀវភៅ">
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        </MainCard>
      </div>
    );
  }

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងប្រភេទសៀវភៅ">
        {error && (
          <Alert severity="error" sx={{ mb: 2, ...khmerFontStyles }}>
            {error}
            <Button 
              size="small" 
              sx={{ mt: 1, ...khmerFontStyles }} 
              onClick={loadCategories}
            >
              ព្យាយាមម្តងទៀត
            </Button>
          </Alert>
        )}

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
                <TableCell sx={khmerFontStyles}>កាលបរិច្ឆេទបង្កើត</TableCell>
                <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell sx={khmerFontStyles}>{category.name}</TableCell>
                  <TableCell sx={khmerFontStyles}>{category.description}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(category.createdAt).toLocaleDateString('km-KH')}
                    </Typography>
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
              required
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
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
            <Button onClick={handleSaveCategory} variant="contained" sx={khmerFontStyles}>
              {editingCategory ? 'ធ្វើបច្ចុប្បន្នភាព' : 'បន្ថែម'}
            </Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </div>
  );
}
