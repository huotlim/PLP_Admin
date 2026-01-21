import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, Typography, Chip, FormControlLabel, Checkbox,
  CircularProgress, Alert
} from '@mui/material';
import MainCard from 'components/MainCard';
import { rolesApi } from 'api/roles';
import { permissionsApi } from 'api/permissions';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', permissions: [] });
  const [currentUser, setCurrentUser] = useState(null);

  // Load roles, permissions and current user from API
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load roles, permissions, and current user info
      const [rolesData, permissionsData, userData] = await Promise.all([
        rolesApi.getRoles(),
        permissionsApi.getPermissions(),
        rolesApi.getCurrentUser()
      ]);
      
      setRoles(rolesData);
      setAvailablePermissions(permissionsData);
      setCurrentUser(userData.user);
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

  const loadRoles = async () => {
    try {
      setError(null);
      const data = await rolesApi.getRoles();
      setRoles(data);
    } catch (err) {
      setError('Failed to load roles');
      console.error('Error loading roles:', err);
    }
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
    setOpen(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    // Convert permission objects/names to IDs for the form
    const selectedPermissionIds = role.permissions 
      ? role.permissions.map(permission => {
          // Handle if permission is an object with id property
          if (typeof permission === 'object' && permission.id) {
            return permission.id;
          }
          // Handle if permission is a string (name)
          if (typeof permission === 'string') {
            const perm = availablePermissions.find(p => p.name === permission);
            return perm ? perm.id : null;
          }
          return null;
        }).filter(id => id !== null)
      : [];
    
    setFormData({
      name: role.name,
      description: role.description,
      permissions: selectedPermissionIds
    });
    setOpen(true);
  };

  const handleSaveRole = async () => {
    try {
      const roleData = {
        name: formData.name,
        description: formData.description
      };
      
      // Add parent ID when creating new role (use current user's role ID)
      if (!editingRole && currentUser?.role?.id) {
        roleData.parentId = currentUser.role.id;
      }
      
      let savedRole;
      if (editingRole) {
        savedRole = await rolesApi.updateRole(editingRole.id, roleData);
        // Assign permissions to existing role
        if (formData.permissions.length > 0) {
          await rolesApi.assignPermissions(editingRole.id, formData.permissions);
        }
      } else {
        savedRole = await rolesApi.createRole(roleData);
        // Assign permissions to new role
        if (formData.permissions.length > 0 && savedRole.id) {
          await rolesApi.assignPermissions(savedRole.id, formData.permissions);
        }
      }
      
      await loadInitialData(); // Reload all data after save
      setOpen(false);
    } catch (err) {
      setError('Failed to save role');
      console.error('Error saving role:', err);
    }
  };

  const handlePermissionChange = (permissionId) => {
    const newPermissions = formData.permissions.includes(permissionId)
      ? formData.permissions.filter(id => id !== permissionId)
      : [...formData.permissions, permissionId];
    setFormData({ ...formData, permissions: newPermissions });
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await rolesApi.deleteRole(roleId);
      await loadRoles(); // Reload roles after delete
    } catch (err) {
      setError('Failed to delete role');
      console.error('Error deleting role:', err);
    }
  };

  if (loading) {
    return (
      <div style={khmerFontStyles}>
        <MainCard title="ការគ្រប់គ្រងតួនាទី">
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        </MainCard>
      </div>
    );
  }

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងតួនាទី">
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

        {/* Display current user role info */}
        {currentUser && (
          <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={khmerFontStyles}>
              តួនាទីបច្ចុប្បន្ន: {currentUser.role.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={khmerFontStyles}>
              អ្នកអាចបង្កើតតួនាទីកូនសម្រាប់តួនាទីនេះ
            </Typography>
          </Box>
        )}
        
        <Box sx={{ mb: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleCreateRole} 
            sx={khmerFontStyles}
            disabled={!currentUser?.role?.id}
          >
            បង្កើតតួនាទីថ្មី
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={khmerFontStyles}>ឈ្មោះតួនាទី</TableCell>
                <TableCell sx={khmerFontStyles}>ការពិពណ៌នា</TableCell>
                <TableCell sx={khmerFontStyles}>តួនាទីមេ</TableCell>
                <TableCell sx={khmerFontStyles}>សិទ្ធិ</TableCell>
                <TableCell sx={khmerFontStyles}>សកម្មភាព</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell sx={khmerFontStyles}>{role.name}</TableCell>
                  <TableCell sx={khmerFontStyles}>{role.description}</TableCell>
                  <TableCell sx={khmerFontStyles}>
                    {role.parent ? role.parent.name : 'មិនមាន'}
                  </TableCell>
                  <TableCell>
                    {role.permissions && role.permissions.length > 0 ? (
                      role.permissions.map((permission, index) => {
                        // Handle if permission is an object
                        const permissionName = typeof permission === 'object' ? permission.name : permission;
                        return (
                          <Chip 
                            key={index} 
                            label={permissionName} 
                            size="small" 
                            sx={{ mr: 0.5, mb: 0.5, ...khmerFontStyles }} 
                          />
                        );
                      })
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={khmerFontStyles}>
                        មិនមានសិទ្ធិ
                      </Typography>
                    )}
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
            {!editingRole && currentUser && (
              <Alert severity="info" sx={{ mb: 2, ...khmerFontStyles }}>
                តួនាទីថ្មីនេះនឹងក្លាយជាកូនរបស់: {currentUser.role.name}
              </Alert>
            )}
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
            {availablePermissions.map(permission => (
              <FormControlLabel
                key={permission.id}
                control={
                  <Checkbox
                    checked={formData.permissions.includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                  />
                }
                label={`${permission.name} - ${permission.description}`}
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
