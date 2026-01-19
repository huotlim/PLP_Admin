// assets
import { UserOutlined, SafetyOutlined, KeyOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined,
  SafetyOutlined,
  KeyOutlined
};

// ==============================|| MENU ITEMS - RBAC ||============================== //

const support = {
  id: 'support',
  title: 'ការគ្រប់គ្រងសិទ្ធិ',
  type: 'group',
  children: [
    {
      id: 'user-management',
      title: 'គ្រប់គ្រងអ្នកប្រើប្រាស់',
      type: 'item',
      url: '/user-management',
      icon: icons.UserOutlined
    },
    {
      id: 'role-management',
      title: 'គ្រប់គ្រងតួនាទី',
      type: 'item',
      url: '/role-management',
      icon: icons.SafetyOutlined
    },
    {
      id: 'permission-management',
      title: 'គ្រប់គ្រងសិទ្ធិ',
      type: 'item',
      url: '/permission-management',
      icon: icons.KeyOutlined
    }
  ]
};

export default support;
