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
  empty: {
    permissions: 'none',
  },
  [process.env.REACT_APP_ACCESS_CODE_Guest!]: {
    permissions: 'guest',
    username: 'guest',
  },
  [process.env.REACT_APP_ACCESS_CODE_Me!]: {
    permissions: 'admin',
    username: 'Lorenzo',
    picture: pic_me,
  },
  [process.env.REACT_APP_ACCESS_CODE_Massi!]: {
    permissions: 'guest',
    username: 'Massi',
  },
  [process.env.REACT_APP_ACCESS_CODE_Brombolina!]: {
    permissions: 'normal',
    username: 'Brombolina',
  },
  [process.env.REACT_APP_ACCESS_CODE_Zori!]: {
    permissions: 'normal',
    username: 'Zori',
  },
  [process.env.REACT_APP_ACCESS_CODE_Ramzy!]: {
    permissions: 'normal',
    username: 'Ramzy',
  },
  [process.env.REACT_APP_ACCESS_CODE_Apurv!]: {
    permissions: 'normal',
    username: 'Apurv',
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
