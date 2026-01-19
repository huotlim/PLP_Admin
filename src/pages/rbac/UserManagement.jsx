import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel, Box, Chip
} from '@mui/material';
import MainCard from 'components/MainCard';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

const initialUsers = [
  { id: 1, name: 'ចន តេវ', email: 'john@example.com', roles: ['គ្រប់គ្រង'] },
  { id: 2, name: 'សុភា គីម', email: 'jane@example.com', roles: ['សិស្ស'] },
  { id: 3, name: 'វណ្ណា លី', email: 'bob@example.com', roles: ['គ្រូបង្រៀន', 'បណ្ណាល័យ'] }
];

const availableRoles = [
  'គ្រប់គ្រង',
  'សិស្ស', 
  'អាណាព្យាបាល',
  'អ្នកបញ្ចប់ការសិក្សា',
  'អ្នកគ្រប់គ្រងមុខវិជ្ជា',
  'គ្រូបង្រៀន',
  'អ្នកទទួលបន្ទុកជាការ៉ុម',
  'អ្នកទទួលបន្ទុកកម្មវិធីពេញម៉ោង',
  'អ្នកទទួលបន្ទុកកម្មវិធី កម្រៃ ម៉ោង',
  'អ្នកទទួលបន្ទុកកម្រាលការណាតិករណុង',
  'កំពូលអភិវឌ្ឍន៍ករណាតិ',
  'គ្រូកំពូល ម៉ាថិមេទិក',
  'អ្នកគ្រប់គ្រងមុខវិជ្ជា',
  'ខាកុំពួតរង',
  'នាបកមុខវិជ្ជា',
  'លេខាធិការណាតិ',
  'បុព្វាភិបាល',
  'ប័ណ្ណការណាតិ',
  'នាកកោណាតិ',
  'ICT'
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', roles: [] });

  const handleAssignRole = (user) => {
    setSelectedUser(user);
    setSelectedRoles(user.roles);
    setOpen(true);
  };

  const handleSaveRoles = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, roles: selectedRoles }
        : user
    ));
    setOpen(false);
  };

  const handleAddUser = () => {
    setNewUser({ name: '', email: '', roles: [] });
    setAddUserOpen(true);
  };

  const handleSaveNewUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: Date.now() }]);
      setAddUserOpen(false);
    }
  };

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងអ្នកប្រើប្រាស់">
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleAddUser} sx={khmerFontStyles}>
            បន្ថែមអ្នកប្រើប្រាស់ថ្មី
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={khmerFontStyles}>ឈ្មោះ</TableCell>
                <TableCell sx={khmerFontStyles}>អ៊ីមែល</TableCell>
                <TableCell sx={khmerFontStyles}>តួនាទី</TableCell>
                <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={khmerFontStyles}>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.roles.map(role => (
                      <Chip key={role} label={role} size="small" sx={{ mr: 0.5, ...khmerFontStyles }} />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleAssignRole(user)}
                      sx={khmerFontStyles}
                    >
                      កំណត់តួនាទី
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Existing role assignment dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={khmerFontStyles}>កំណត់តួនាទីសម្រាប់ {selectedUser?.name}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel sx={khmerFontStyles}>តួនាទី</InputLabel>
              <Select
                multiple
                value={selectedRoles}
                onChange={(e) => setSelectedRoles(e.target.value)}
                renderValue={(selected) => selected.join(', ')}
                sx={{
                  '& .MuiSelect-select': khmerFontStyles
                }}
              >
                {availableRoles.map((role) => (
                  <MenuItem key={role} value={role} sx={khmerFontStyles}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
            <Button onClick={handleSaveRoles} variant="contained" sx={khmerFontStyles}>រក្សាទុក</Button>
          </DialogActions>
        </Dialog>

        {/* Add new user dialog */}
        <Dialog open={addUserOpen} onClose={() => setAddUserOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={khmerFontStyles}>បន្ថែមអ្នកប្រើប្រាស់ថ្មី</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="ឈ្មោះ"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              sx={{ 
                mt: 2, 
                mb: 2,
                '& .MuiInputLabel-root': khmerFontStyles,
                '& .MuiInputBase-input': khmerFontStyles
              }}
            />
            <TextField
              fullWidth
              label="អ៊ីមែល"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': khmerFontStyles
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={khmerFontStyles}>តួនាទី</InputLabel>
              <Select
                multiple
                value={newUser.roles}
                onChange={(e) => setNewUser({ ...newUser, roles: e.target.value })}
                renderValue={(selected) => selected.join(', ')}
                sx={{
                  '& .MuiSelect-select': khmerFontStyles
                }}
              >
                {availableRoles.map((role) => (
                  <MenuItem key={role} value={role} sx={khmerFontStyles}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddUserOpen(false)} sx={khmerFontStyles}>បោះបង់</Button>
            <Button onClick={handleSaveNewUser} variant="contained" sx={khmerFontStyles}>បន្ថែមអ្នកប្រើប្រាស់</Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </div>
  );
}
