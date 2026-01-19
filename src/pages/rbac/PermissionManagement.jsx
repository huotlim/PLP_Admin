import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, Chip, Button, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField
} from '@mui/material';
import MainCard from 'components/MainCard';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

const initialPermissions = [
  { id: 1, name: 'អាន', description: 'មើលខ្លឹមសារ', category: 'ខ្លឹមសារ' },
  { id: 2, name: 'សរសេរ', description: 'បង្កើត និង កែសម្រួលខ្លឹមសារ', category: 'ខ្លឹមសារ' },
  { id: 3, name: 'លុប', description: 'លុបខ្លឹមសារ', category: 'ខ្លឹមសារ' },
  { id: 4, name: 'កែសម្រួល', description: 'កែសម្រួលព័ត៌មាន', category: 'ខ្លឹមសារ' },
  { id: 5, name: 'គ្រប់គ្រងអ្នកប្រើប្រាស់', description: 'គ្រប់គ្រងគណនីអ្នកប្រើប្រាស់', category: 'គ្រប់គ្រងអ្នកប្រើ' },
  { id: 6, name: 'គ្រប់គ្រងបណ្ណាល័យ', description: 'គ្រប់គ្រងប្រព័ន្ធបណ្ណាល័យ', category: 'បណ្ណាល័យ' },
  { id: 7, name: 'គ្រប់គ្រងមុខវិជ្ជា', description: 'គ្រប់គ្រងមុខវិជ្ជាសិក្សា', category: 'ការសិក្សា' },
  { id: 8, name: 'គ្រប់គ្រងដ្ឋាន', description: 'គ្រប់គ្រងនាយកដ្ឋាន', category: 'រដ្ឋបាល' },
  { id: 9, name: 'គ្រប់គ្រងកម្មវិធី', description: 'គ្រប់គ្រងកម្មវិធីសិក្សា', category: 'ការសិក្សា' },
  { id: 10, name: 'គ្រប់គ្រងប្រព័ន្ធ', description: 'គ្រប់គ្រងប្រព័ន្ធ ICT', category: 'បច្ចេកវិទ្យា' }
];

const rolePermissions = {
  'គ្រប់គ្រង': ['អាន', 'សរសេរ', 'លុប', 'កែសម្រួល', 'គ្រប់គ្រងអ្នកប្រើប្រាស់', 'គ្រប់គ្រងបណ្ណាល័យ', 'គ្រប់គ្រងមុខវិជ្ជា', 'គ្រប់គ្រងដ្ឋាន', 'គ្រប់គ្រងកម្មវិធី', 'គ្រប់គ្រងប្រព័ន្ធ'],
  'សិស្ស': ['អាន', 'សរសេរ'],
  'អាណាព្យាបាល': ['អាន'],
  'អ្នកបញ្ចប់ការសិក្សា': ['អាន'],
  'គ្រូបង្រៀន': ['អាន', 'សរសេរ', 'កែសម្រួល'],
  'អ្នកគ្រប់គ្រងមុខវិជ្ជា': ['អាន', 'សរសេរ', 'កែសម្រួល', 'គ្រប់គ្រងមុខវិជ្ជា'],
  'អ្នកគ្រប់គ្រងបណ្ណាល័យ ក្រុម ២០២៤': ['អាន', 'សរសេរ', 'គ្រប់គ្រងបណ្ណាល័យ'],
  'អ្នកគ្រប់គ្រងបណ្ណាល័យកម្រាលការ': ['អាន', 'សរសេរ', 'គ្រប់គ្រងបណ្ណាល័យ'],
  'កម្មករក្រុម អនុវត្ត': ['អាន', 'សរសេរ'],
  'ឧបករណ៍ព័ត៌មាន': ['អាន', 'សរសេរ', 'គ្រប់គ្រងកម្មវិធី'],
  'នាយកដ្ឋាន': ['អាន', 'សរសេរ', 'កែសម្រួល', 'គ្រប់គ្រងដ្ឋាន'],
  'បណ្ណាល័យ': ['អាន', 'សរសេរ', 'គ្រប់គ្រងបណ្ណាល័យ'],
  'ICT': ['អាន', 'សរសេរ', 'កែសម្រួល', 'គ្រប់គ្រងប្រព័ន្ធ']
};

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [open, setOpen] = useState(false);
  const [newPermission, setNewPermission] = useState({ name: '', description: '', category: '' });

  const getRolesWithPermission = (permissionName) => {
    return Object.entries(rolePermissions)
      .filter(([role, perms]) => perms.includes(permissionName))
      .map(([role]) => role);
  };

  const handleAddPermission = () => {
    setNewPermission({ name: '', description: '', category: '' });
    setOpen(true);
  };

  const handleSavePermission = () => {
    if (newPermission.name && newPermission.description && newPermission.category) {
      setPermissions([...permissions, { ...newPermission, id: Date.now() }]);
      setOpen(false);
    }
  };

  const handleDeletePermission = (permissionId) => {
    setPermissions(permissions.filter(p => p.id !== permissionId));
  };

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងសិទ្ធិ">
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 2, ...khmerFontStyles }}>
            គ្រប់គ្រងសិទ្ធិប្រព័ន្ធ និង មើលតួនាទីណាដែលមានសិទ្ធិចូលប្រើ។
          </Typography>
          <Button variant="contained" onClick={handleAddPermission} sx={khmerFontStyles}>
            បន្ថែមសិទ្ធិថ្មី
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={khmerFontStyles}>សិទ្ធិ</TableCell>
                <TableCell sx={khmerFontStyles}>ការពិពណ៌នា</TableCell>
                <TableCell sx={khmerFontStyles}>ប្រភេទ</TableCell>
                <TableCell sx={khmerFontStyles}>កំណត់ទៅតួនាទី</TableCell>
                <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={khmerFontStyles}>
                      {permission.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={khmerFontStyles}>{permission.description}</TableCell>
                  <TableCell>
                    <Chip label={permission.category} size="small" variant="outlined" sx={khmerFontStyles} />
                  </TableCell>
                  <TableCell>
                    {getRolesWithPermission(permission.name).map(role => (
                      <Chip key={role} label={role} size="small" sx={{ mr: 0.5, ...khmerFontStyles }} />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                      onClick={() => handleDeletePermission(permission.id)}
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
          <DialogTitle sx={khmerFontStyles}>បន្ថែមសិទ្ធិថ្មី</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="ឈ្មោះសិទ្ធិ"
              value={newPermission.name}
              onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
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
              value={newPermission.description}
              onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': khmerFontStyles,
                '& .MuiInputBase-input': khmerFontStyles
              }}
            />
            <TextField
              fullWidth
              label="ប្រភេទ"
              value={newPermission.category}
              onChange={(e) => setNewPermission({ ...newPermission, category: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': khmerFontStyles,
                '& .MuiInputBase-input': khmerFontStyles
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
            <Button onClick={handleSavePermission} variant="contained" sx={khmerFontStyles}>បន្ថែមសិទ្ធិ</Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </div>
  );
}
