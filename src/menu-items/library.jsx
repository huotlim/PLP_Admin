// assets
import { 
  BookOutlined, 
  AppstoreOutlined, 
  SwapOutlined, 
  TeamOutlined 
} from '@ant-design/icons';

// icons
const icons = {
  BookOutlined,
  AppstoreOutlined,
  SwapOutlined,
  TeamOutlined
};

// ==============================|| MENU ITEMS - LIBRARY MANAGEMENT ||============================== //

const library = {
  id: 'library',
  title: 'ការគ្រប់គ្រងបណ្ណាល័យ',
  type: 'group',
  children: [
    {
      id: 'category-management',
      title: 'ប្រភេទសៀវភៅ',
      type: 'item',
      url: '/category-management',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'book-management',
      title: 'គ្រប់គ្រងសៀវភៅ',
      type: 'item',
      url: '/book-management',
      icon: icons.BookOutlined
    },
    {
      id: 'borrow-return',
      title: 'ខ្ចី & ត្រលប់',
      type: 'item',
      url: '/borrow-return',
      icon: icons.SwapOutlined
    },
    {
      id: 'librarian-management',
      title: 'អ្នកបណ្ណាល័យ',
      type: 'item',
      url: '/librarian-management',
      icon: icons.TeamOutlined
    }
  ]
};

export default library;
