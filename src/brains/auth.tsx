import React, { useContext, createContext } from 'react';
import MD5 from 'crypto-js/md5';

import { useLocalStorage } from 'brains/hooks';

import pic_me from 'res/profiles/me.jpg';

const AUTH_URL = '.netlify/functions/auth';

const profilePics: { [username: string]: string } = {
  Lorenzo: pic_me,
};

type AuthStatus = 'admin' | 'normal' | 'guest' | 'none';

type UserType = {
  permissions: AuthStatus,
  username: string,
  picture?: string,
};

type Tokens = {
  mqtt: string,
  influxDb: string,
};

type AuthInfo = {
  user: UserType,
  tokens: Tokens,
};

type AuthContextType = {
  auth: AuthInfo,
  authenticate: (pin: string) => Promise<boolean>,
};

const emptyAuth: AuthInfo = {
  user: {
    permissions: 'none',
    username: 'Guest',
  },
  tokens: { mqtt: '', influxDb: '' },
};

export const AuthContext = createContext<AuthContextType>({
  auth: emptyAuth, authenticate: async () => false,
});

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useLocalStorage('auth', emptyAuth);

  const authenticate = async (pin: string) => {
    const hash = MD5(pin).toString();
    try {
      // const isValidUser = await request(url);
      const response = await fetch(`${AUTH_URL}?authCode=${hash}`);
      if (!response.ok) {
        return false;
      }
      const authUser = await response.json() as AuthInfo;
      console.log(`${authUser.user.username} logged in as ${authUser.user.permissions}`);
      authUser.user.picture = profilePics[authUser.user.username] || undefined;
      setAuth(authUser);
      return true;
    } catch (error) {
      console.error(error);
    }
    setAuth(emptyAuth);
    return false;
  };

  return (
    <AuthContext.Provider value={{ auth, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
