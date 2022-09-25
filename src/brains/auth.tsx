import React, { useContext, createContext } from 'react';
import MD5 from 'crypto-js/md5';

import { useLocalStorage } from 'brains/hooks';

import pic_me from 'res/profiles/me.jpg';

type AuthStatus = 'admin' | 'normal' | 'guest' | 'none';

type Users = {
  [hash: string]: UserType
};

type UserType = {
  permissions: AuthStatus,
  username?: string,
  picture?: string,
};

const users: Users = {
  'empty': {
    permissions: 'none',
  },
  'guest': {
    permissions: 'guest',
  },
  '8db9264228dc48fbf47535e888c02ae0': {
    permissions: 'admin',
    username: 'Lorenzo',
    picture: pic_me,
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
  'f3086a19f261ac92f72997538aeec807': {
    permissions: 'normal',
    username: 'Zori',
  },
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
    const hash = MD5(pin).toString();
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
