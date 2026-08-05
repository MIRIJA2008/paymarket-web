import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '../store/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: UserRole;
}

/**
 * Bloque l'accès à ses enfants si l'utilisateur n'est pas connecté.
 * Si un `role` est fourni, redirige aussi les utilisateurs connectés
 * mais du mauvais type de compte (ex: un client qui tente /merchant/dashboard).
 */
export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location, role }} replace />;
  }

  if (role && user.role !== role) {
    const fallback = user.role === 'merchant' ? '/merchant/dashboard' : '/customer';
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};
