import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AppUser, UserRole } from '../../ingesta/types/user';
import { MOCK_USERS } from '../../ingesta/mockMultitenant';

// ── Auth Context ────────────────────────────────────────────

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// ── Provider ────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    
    // Simulate auth delay
    await new Promise(res => setTimeout(res, 1200));
    
    // In production: Firebase Auth → get custom claims → build AppUser
    // For prototype: match against mock users
    const matched = MOCK_USERS.find(u => u.email === email);
    
    if (matched) {
      setUser({ ...matched, lastLoginAt: new Date().toISOString() });
    } else {
      // Default: create a demo super_admin for any unmatched email
      setUser({
        uid: 'demo_user',
        email,
        displayName: email.split('@')[0],
        avatarInitials: email.substring(0, 2).toUpperCase(),
        role: 'super_admin' as UserRole,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      });
    }
    
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
