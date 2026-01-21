import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel, Box, Chip,
  CircularProgress, Alert, Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import { usersApi } from 'api/users';
import { rolesApi } from 'api/roles';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', roles: [] });

  // Load users and roles from API
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [usersData, rolesData] = await Promise.all([
        usersApi.getUsers(),
        rolesApi.getRoles()
      ]);
      
      setUsers(usersData);
      setAvailableRoles(rolesData);
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

  const loadUsers = async () => {
    try {
      setError(null);
      const data = await usersApi.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error loading users:', err);
    }
  };

  const handleAssignRole = (user) => {
    setSelectedUser(user);
    // Handle both single role and multiple roles structure
    let userRoleIds = [];
    
    if (user.role) {
      // Single role structure
      userRoleIds = [typeof user.role === 'object' ? user.role.id : user.role];
    } else if (user.roles) {
      // Multiple roles structure
      userRoleIds = user.roles.map(role => 
        typeof role === 'object' ? role.id : role
      );
    }
    
    setSelectedRoles(userRoleIds);
    setOpen(true);
  };

  const handleSaveRoles = async () => {
    try {
      const currentRoleIds = selectedUser.roles ? selectedUser.roles.map(role => 
        typeof role === 'object' ? role.id : role
      ) : [];
      
      // Find roles to add and remove
      const rolesToAdd = selectedRoles.filter(roleId => !currentRoleIds.includes(roleId));
      const rolesToRemove = currentRoleIds.filter(roleId => !selectedRoles.includes(roleId));
      
      // Remove roles first
      for (const roleId of rolesToRemove) {
        await usersApi.removeRole(selectedUser.id, roleId);
      }
      
      // Add new roles
      for (const roleId of rolesToAdd) {
        await usersApi.assignRole(selectedUser.id, roleId);
      }
      
      await loadInitialData(); // Reload all data including users and roles
      setOpen(false);
    } catch (err) {
      setError('Failed to assign roles');
      console.error('Error assigning roles:', err);
    }
  };

  const handleAddUser = () => {
    setNewUser({ email: '', password: '', roles: [] });
    setAddUserOpen(true);
  };

  const handleSaveNewUser = async () => {
    try {
      if (!newUser.email || !newUser.password) {
        setError('Please fill in all required fields');
        return;
      }

      const userData = {
        email: newUser.email,
        password: newUser.password
      };

      const createdUser = await usersApi.createUser(userData);
      
      // Assign roles if any were selected
      if (newUser.roles.length > 0 && createdUser.id) {
        for (const roleId of newUser.roles) {
          await usersApi.assignRole(createdUser.id, roleId);
        }
      }
      
      await loadInitialData(); // Reload all data including users and roles
      setAddUserOpen(false);
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await usersApi.deleteUser(userId);
      await loadInitialData(); // Reload all data after deletion
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  if (loading) {
    return (
      <div style={khmerFontStyles}>
        <MainCard title="ការគ្រប់គ្រងអ្នកប្រើប្រាស់">
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        </MainCard>
      </div>
    );
  }

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងអ្នកប្រើប្រាស់">
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
          <Button variant="contained" onClick={handleAddUser} sx={khmerFontStyles}>
            បន្ថែមអ្នកប្រើប្រាស់ថ្មី
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={khmerFontStyles}>អ៊ីមែល</TableCell>
                <TableCell sx={khmerFontStyles}>តួនាទី</TableCell>
                <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role ? (
                      <Chip 
                        label={typeof user.role === 'object' ? user.role.name : user.role} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5, ...khmerFontStyles }} 
                      />
                    ) : user.roles && user.roles.length > 0 ? (
                      user.roles.map((role, index) => {
                        const roleName = typeof role === 'object' ? role.name : role;
                        return (
                          <Chip key={index} label={roleName} size="small" sx={{ mr: 0.5, mb: 0.5, ...khmerFontStyles }} />
                        );
                      })
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={khmerFontStyles}>
                        មិនមានតួនាទី
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleAssignRole(user)}
                      sx={{ mr: 1, ...khmerFontStyles }}
                    >
                      កំណត់តួនាទី
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                      onClick={() => handleDeleteUser(user.id)}
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

        {/* Role assignment dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={khmerFontStyles}>កំណត់តួនាទីសម្រាប់ {selectedUser?.email}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel sx={khmerFontStyles}>តួនាទី</InputLabel>
              <Select
                multiple
                value={selectedRoles}
                onChange={(e) => setSelectedRoles(e.target.value)}
                renderValue={(selected) => 
                  selected.map(roleId => {
                    const role = availableRoles.find(r => r.id === roleId);
                    return role ? role.name : roleId;
                  }).join(', ')
                }
                sx={{
                  '& .MuiSelect-select': khmerFontStyles
                }}
              >
                {availableRoles.map((role) => (
                  <MenuItem key={role.id} value={role.id} sx={khmerFontStyles}>
                    {role.name}
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
              label="អ៊ីមែល"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              sx={{ 
                mt: 2, 
                mb: 2,
                '& .MuiInputLabel-root': khmerFontStyles
              }}
              required
            />
            <TextField
              fullWidth
              label="លេខសម្ងាត់"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': khmerFontStyles
              }}
              required
            />
            <FormControl fullWidth>
              <InputLabel sx={khmerFontStyles}>តួនាទី (ស្រេចចិត្ត)</InputLabel>
              <Select
                multiple
                value={newUser.roles}
                onChange={(e) => setNewUser({ ...newUser, roles: e.target.value })}
                renderValue={(selected) => 
                  selected.map(roleId => {
                    const role = availableRoles.find(r => r.id === roleId);
                    return role ? role.name : roleId;
                  }).join(', ')
                }
                sx={{
                  '& .MuiSelect-select': khmerFontStyles
                }}
              >
                {availableRoles.map((role) => (
                  <MenuItem key={role.id} value={role.id} sx={khmerFontStyles}>
                    {role.name}
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
