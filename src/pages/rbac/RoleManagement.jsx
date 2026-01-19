import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, Typography, Chip, FormControlLabel, Checkbox
} from '@mui/material';
import MainCard from 'components/MainCard';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

const initialRoles = [
  { id: 1, name: 'គ្រប់គ្រង', description: 'ការចូលប្រើប្រាស់ប្រព័ន្ធពេញលេញ', permissions: ['អាន', 'សរសេរ', 'លុប', 'គ្រប់គ្រងអ្នកប្រើប្រាស់'] },
  { id: 2, name: 'សិស្ស', description: 'សិស្សនិស្សិតសាកលវិទ្យាល័យ', permissions: ['អាន', 'សរសេរ'] },
  { id: 3, name: 'អាណាព្យាបាល', description: 'អាណាព្យាបាលរបស់សិស្ស', permissions: ['អាន'] },
  { id: 4, name: 'អ្នកបញ្ចប់ការសិក្សា', description: 'អ្នកដែលបានបញ្ចប់ការសិក្សា', permissions: ['អាន'] },
  { id: 5, name: 'គ្រូបង្រៀន', description: 'គ្រូបង្រៀនក្នុងសាកលវិទ្យាល័យ', permissions: ['អាន', 'សរសេរ', 'កែសម្រួល'] },
  { id: 6, name: 'អ្នកគ្រប់គ្រងមុខវិជ្ជា', description: 'អ្នកគ្រប់គ្រងមុខវិជ្ជាសិក្សា', permissions: ['អាន', 'សរសេរ', 'កែសម្រួល', 'គ្រប់គ្រងមុខវិជ្ជា'] },
  { id: 7, name: 'អ្នកគ្រប់គ្រងបណ្ណាល័យ ក្រុម ២០២៤', description: 'អ្នកគ្រប់គ្រងបណ្ណាល័យសម្រាប់ក្រុម២០២៤', permissions: ['អាន', 'សរសេរ', 'គ្រប់គ្រងបណ្ណាល័យ'] },
  { id: 8, name: 'អ្នកគ្រប់គ្រងបណ្ណាល័យកម្រាលការ', description: 'អ្នកគ្រប់គ្រងបណ្ណាល័យកម្រាលការងារ', permissions: ['អាន', 'សរសេរ', 'គ្រប់គ្រងបណ្ណាល័យ'] },
  { id: 9, name: 'កម្មករក្រុម អនុវត្ត', description: 'កម្មករក្រុមអនុវត្តន៍', permissions: ['អាន', 'សរសេរ'] },
  { id: 10, name: 'ឧបករណ៍ព័ត៌មាន', description: 'បុគ្គលិកផ្នែកកម្មវិធី', permissions: ['អាន', 'សរសេរ', 'គ្រប់គ្រងកម្មវិធី'] },
  { id: 11, name: 'នាយកដ្ឋាន', description: 'នាយកដ្ឋានសាកលវិទ្យាល័យ', permissions: ['អាន', 'សរសេរ', 'កែសម្រួល', 'គ្រប់គ្រងដ្ឋាន'] },
  { id: 12, name: 'បណ្ណាល័យ', description: 'បុគ្គលិកបណ្ណាល័យ', permissions: ['អាន', 'សរសេរ', 'គ្រប់គ្រងបណ្ណាល័យ'] },
  { id: 13, name: 'ICT', description: 'បុគ្គលិកផ្នែកបច្ចេកវិទ្យាព័ត៌មាន', permissions: ['អាន', 'សរសេរ', 'កែសម្រួល', 'គ្រប់គ្រងប្រព័ន្ធ'] }
];

const allPermissions = [
  'អាន', 'សរសេរ', 'លុប', 'កែសម្រួល', 'គ្រប់គ្រងអ្នកប្រើប្រាស់', 
  'គ្រប់គ្រងបណ្ណាល័យ', 'គ្រប់គ្រងមុខវិជ្ជា', 'គ្រប់គ្រងដ្ឋាន', 
  'គ្រប់គ្រងកម្មវិធី', 'គ្រប់គ្រងប្រព័ន្ធ'
];

export default function RoleManagement() {
  const [roles, setRoles] = useState(initialRoles);
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', permissions: [] });

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
    setOpen(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData(role);
    setOpen(true);
  };

  const handleSaveRole = () => {
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id ? { ...formData, id: editingRole.id } : role
      ));
    } else {
      setRoles([...roles, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handlePermissionChange = (permission) => {
    const newPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: newPermissions });
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងតួនាទី">
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleCreateRole} sx={khmerFontStyles}>
            បង្កើតតួនាទីថ្មី
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={khmerFontStyles}>ឈ្មោះតួនាទី</TableCell>
                <TableCell sx={khmerFontStyles}>ការពិពណ៌នា</TableCell>
                <TableCell sx={khmerFontStyles}>សិទ្ធិ</TableCell>
                <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell sx={khmerFontStyles}>{role.name}</TableCell>
                  <TableCell sx={khmerFontStyles}>{role.description}</TableCell>
                  <TableCell>
                    {role.permissions.map(permission => (
                      <Chip key={permission} label={permission} size="small" sx={{ mr: 0.5, mb: 0.5, ...khmerFontStyles }} />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleEditRole(role)}
                      sx={{ mr: 1, ...khmerFontStyles }}
                    >
                      កែសម្រួល
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                      onClick={() => handleDeleteRole(role.id)}
                      sx={khmerFontStyles}
                    >
                      លុប
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={khmerFontStyles}>
            {editingRole ? 'កែសម្រួលតួនាទី' : 'បង្កើតតួនាទីថ្មី'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="ឈ្មោះតួនាទី"
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
                mb: 2,
                '& .MuiInputLabel-root': khmerFontStyles,
                '& .MuiInputBase-input': khmerFontStyles
              }}
            />
            <Typography variant="subtitle2" sx={{ mb: 1, ...khmerFontStyles }}>សិទ្ធិ:</Typography>
            {allPermissions.map(permission => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                }
                label={permission}
                sx={{ display: 'block', ...khmerFontStyles }}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
            <Button onClick={handleSaveRole} variant="contained" sx={khmerFontStyles}>រក្សាទុក</Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </div>
  );
}
