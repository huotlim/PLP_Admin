import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - RBAC pages
const UserManagement = Loadable(lazy(() => import('pages/rbac/UserManagement')));
const RoleManagement = Loadable(lazy(() => import('pages/rbac/RoleManagement')));
const PermissionManagement = Loadable(lazy(() => import('pages/rbac/PermissionManagement')));

// render - Library pages
const CategoryManagement = Loadable(lazy(() => import('pages/library/CategoryManagement')));
const BookManagement = Loadable(lazy(() => import('pages/library/BookManagement')));
const BorrowReturn = Loadable(lazy(() => import('pages/library/BorrowReturn')));
const LibrarianManagement = Loadable(lazy(() => import('pages/library/LibrarianManagement')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'user-management',
      element: <UserManagement />
    },
    {
      path: 'role-management',
      element: <RoleManagement />
    },
    {
      path: 'permission-management',
      element: <PermissionManagement />
    },
    {
      path: 'category-management',
      element: <CategoryManagement />
    },
    {
      path: 'book-management',
      element: <BookManagement />
    },
    {
      path: 'borrow-return',
      element: <BorrowReturn />
    },
    {
      path: 'librarian-management',
      element: <LibrarianManagement />
    }
  ]
};

export default MainRoutes;
