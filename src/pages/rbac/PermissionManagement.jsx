import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, Chip, Button, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, CircularProgress, Alert
} from '@mui/material';
import MainCard from 'components/MainCard';
import { permissionsApi } from 'api/permissions';
import { rolesApi } from 'api/roles';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [newPermission, setNewPermission] = useState({ name: '', description: '', category: '' });

  // Load permissions and roles from API
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [permissionsData, rolesData] = await Promise.all([
        permissionsApi.getPermissions(),
        rolesApi.getRoles()
      ]);
      
      setPermissions(permissionsData);
      setRoles(rolesData);
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

  const loadPermissions = async () => {
    try {
      setError(null);
      const data = await permissionsApi.getPermissions();
      setPermissions(data);
    } catch (err) {
      setError('Failed to load permissions');
      console.error('Error loading permissions:', err);
    }
  };

  const getRolesWithPermission = (permissionName) => {
    return roles
      .filter(role => role.permissions && role.permissions.includes(permissionName))
      .map(role => role.name);
  };

  const handleAddPermission = () => {
    setEditingPermission(null);
    setNewPermission({ name: '', description: '', category: '' });
    setOpen(true);
  };

  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setNewPermission({
      name: permission.name,
      description: permission.description,
      category: permission.category || ''
    });
    setOpen(true);
  };

  const handleSavePermission = async () => {
    try {
      if (!newPermission.name || !newPermission.description) {
        setError('Please fill in all required fields');
        return;
      }

      if (editingPermission) {
        await permissionsApi.updatePermission(editingPermission.id, newPermission);
      } else {
        await permissionsApi.createPermission(newPermission);
      }
      
      await loadPermissions();
      setOpen(false);
    } catch (err) {
      setError('Failed to save permission');
      console.error('Error saving permission:', err);
    }
  };

  const handleDeletePermission = async (permissionId) => {
    try {
      await permissionsApi.deletePermission(permissionId);
      await loadPermissions();
    } catch (err) {
      setError('Failed to delete permission');
      console.error('Error deleting permission:', err);
    }
  };

  if (loading) {
    return (
      <div style={khmerFontStyles}>
        <MainCard title="ការគ្រប់គ្រងសិទ្ធិ">
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        </MainCard>
      </div>
    );
  }

  return (
    <div style={khmerFontStyles}>
      <MainCard title="ការគ្រប់គ្រងសិទ្ធិ">
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
                    {permission.category ? (
                      <Chip label={permission.category} size="small" variant="outlined" sx={khmerFontStyles} />
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={khmerFontStyles}>
                        មិនកំណត់
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {getRolesWithPermission(permission.name).map(role => (
                      <Chip key={role} label={role} size="small" sx={{ mr: 0.5, mb: 0.5, ...khmerFontStyles }} />
                    ))}
                    {getRolesWithPermission(permission.name).length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={khmerFontStyles}>
                        មិនមានតួនាទី
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleEditPermission(permission)}
                      sx={{ mr: 1, ...khmerFontStyles }}
                    >
                      កែសម្រួល
                    </Button>
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
          <DialogTitle sx={khmerFontStyles}>
            {editingPermission ? 'កែសម្រួលសិទ្ធិ' : 'បន្ថែមសិទ្ធិថ្មី'}
          </DialogTitle>
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
              required
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
              required
            />
            <TextField
              fullWidth
              label="ប្រភេទ (ស្រេចចិត្ត)"
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
            <Button onClick={handleSavePermission} variant="contained" sx={khmerFontStyles}>
              {editingPermission ? 'រក្សាទុក' : 'បន្ថែមសិទ្ធិ'}
            </Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </div>
  );
}
