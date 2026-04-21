import type { ReactNode } from 'react';
import type { UserRole } from '../../ingesta/types/user';
import { useAuth } from './AuthContext';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  fallback?: ReactNode;
}

/**
 * AuthGuard — Protects routes based on authentication and role.
 * 
 * Usage:
 *   <AuthGuard allowedRoles={['super_admin', 'account_manager']}>
 *     <AdminPanel />
 *   </AuthGuard>
 */
export const AuthGuard = ({ children, allowedRoles, fallback }: AuthGuardProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return fallback ?? null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return fallback ?? (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card p-12 text-center max-w-md animate-fade-in">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-extrabold text-surface-900 dark:text-white mb-2">
            Acceso Restringido
          </h3>
          <p className="text-surface-500 text-sm font-medium">
            No tienes permisos para acceder a esta sección. 
            Contacta al administrador de tu agencia.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
