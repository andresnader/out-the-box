// ============================================================
// USER TYPES — Role-based access control
// ============================================================

export type UserRole = 'super_admin' | 'account_manager' | 'client';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  avatarInitials: string;    // e.g. "AN"
  role: UserRole;
  tenantId?: string;          // Only for 'client' role — the tenant they belong to
  managedTenants?: string[];  // Only for 'account_manager' role
  createdAt: string;
  lastLoginAt?: string;
}

// Firebase custom claims shape (set via Cloud Functions)
export interface CustomClaims {
  role: UserRole;
  tenantId?: string;
  managedTenants?: string[];
}

// Helper to determine access level
export const canAccessTenant = (user: AppUser, tenantId: string): boolean => {
  if (user.role === 'super_admin') return true;
  if (user.role === 'account_manager') return user.managedTenants?.includes(tenantId) ?? false;
  if (user.role === 'client') return user.tenantId === tenantId;
  return false;
};

export const isAgencyRole = (role: UserRole): boolean => {
  return role === 'super_admin' || role === 'account_manager';
};
