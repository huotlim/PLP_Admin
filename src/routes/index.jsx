import { createBrowserRouter } from 'react-router-dom';

// project imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ProtectedRoute from 'components/auth/ProtectedRoute';

// ==============================|| ROUTING RENDER ||============================== //

// Wrap MainRoutes with ProtectedRoute
const ProtectedMainRoutes = {
  ...MainRoutes,
  element: <ProtectedRoute>{MainRoutes.element}</ProtectedRoute>,
  children: MainRoutes.children.map((child) => ({
    ...child,
    // All children routes are also protected since they're nested under the protected parent
  })),
};

const router = createBrowserRouter(
  [ProtectedMainRoutes, LoginRoutes],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
