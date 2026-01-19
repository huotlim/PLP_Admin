import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import MainCard from 'components/MainCard';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';
import PermissionManagement from './PermissionManagement';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function RBACPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <MainCard title="Role-Based Access Control">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="User Management" />
          <Tab label="Role Management" />
          <Tab label="Permissions" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <UserManagement />
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <RoleManagement />
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <PermissionManagement />
      </TabPanel>
    </MainCard>
  );
}
