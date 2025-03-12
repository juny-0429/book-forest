'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();
      if (error) {
        console.error('Error getting user:', error.message);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabaseBrowser.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
