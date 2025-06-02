'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authority: string;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authority, setAuthority] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseBrowser.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const getInitialUser = async () => {
      const {
        data: { user },
      } = await supabaseBrowser.auth.getUser();
      setUser(user || null);
      setLoading(false);
    };

    getInitialUser();
    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAuthority = async () => {
      if (!user) {
        setAuthority('');
        return;
      }

      try {
        const { data, error } = await supabaseBrowser.from('authority_log').select('authority:auth_id(auth_name, auth_code)').eq('user_id', user.id).single();

        if (error || !data?.authority) {
          setAuthority('');
          setIsAdmin(false);
        } else {
          const authName = data.authority.auth_name || '';
          const authCode = data.authority.auth_code || '';
          setAuthority(authName);
          setIsAdmin(authCode === 'ADMIN' || authCode === 'SUPER_ADMIN');
        }
      } catch (error) {
        console.error('권한 조회 오류:', error);
        setAuthority('');
        setIsAdmin(false);
      }
    };

    fetchAuthority();
  }, [user]);

  return <AuthContext.Provider value={{ user, loading, authority, isAdmin }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthProvider 내에서 사용해주세요');
  return context;
};
