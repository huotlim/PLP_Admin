import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  const location = useLocation();
  
  console.log('ProtectedRoute - Token exists:', !!token);
  console.log('ProtectedRoute - Current location:', location.pathname);
  
  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    console.log('Token payload:', payload);
    console.log('Token expires at:', new Date(payload.exp * 1000));
    console.log('Current time:', new Date(currentTime * 1000));
    
    if (payload.exp < currentTime) {
      console.log('Token expired, removing and redirecting');
      localStorage.removeItem('access_token');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } catch (error) {
    console.log('Invalid token format, removing and redirecting');
    localStorage.removeItem('access_token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  console.log('Token valid, allowing access');
  return children;
};

export default ProtectedRoute;
