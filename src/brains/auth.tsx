import React, { useContext, createContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import crypto from 'crypto';

import { useLocalStorage } from 'brains/hooks';

type AuthStatus = 'admin' | 'normal' | 'guest' | 'none';

type Users = {
  [hash: string]: UserType
};

const users: Users = {
  empty: {
    permissions: 'none',
  },
  guest: {
    permissions: 'guest',
  },
  '8db9264228dc48fbf47535e888c02ae0': {
    permissions: 'admin',
    username: 'Lorenzo',
  },
  '1fa6269f58898f0e809575c9a48747ef': {
    permissions: 'guest',
    username: 'Massi',
  },
  '14db62200d8bf46551aa214accafe1df': {
    permissions: 'guest',
    username: 'Angelina',
  },
  '5d50d22735a7469266aab23fd8aeb536': {
    permissions: 'normal',
    username: 'Brombolina',
  },
};

type UserType = {
  permissions: AuthStatus,
  username?: string,
};

type AuthContextType = {
  user: UserType,
  authenticate: (pin: string) => boolean,
};

export const AuthContext = createContext<AuthContextType>({
  user: users.empty, authenticate: () => false,
});

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage('user', users.empty);

  const authenticate = (pin: string) => {
    const hash = crypto.createHash('md5').update(pin).digest('hex');
    const isValidUser = Object.prototype.hasOwnProperty.call(users, hash);
    if (isValidUser) {
      console.log(`${users[hash].username} logged in as ${users[hash].permissions}`);
      setUser(users[hash]);
    } else {
      console.log('Logout');
      setUser(users.empty);
    }
    return isValidUser;
  };

  return (
    <AuthContext.Provider value={{ user, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
