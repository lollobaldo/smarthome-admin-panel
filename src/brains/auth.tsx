import React, { useState, useContext, createContext, useEffect } from 'react';

import crypto from 'crypto';

type AuthStatus = 'admin' | 'normal' | 'guest' | 'none';

type Users = {
  [hash: string]: {
    type: AuthStatus,
    user: string,
  }
};

const users: Users = {
  '8db9264228dc48fbf47535e888c02ae0': {
    type: 'admin',
    user: 'Lorenzo',
  },
  '1fa6269f58898f0e809575c9a48747ef': {
    type: 'guest',
    user: 'Massi',
  },
  '14db62200d8bf46551aa214accafe1df': {
    type: 'guest',
    user: 'Angelina',
  },
  '5d50d22735a7469266aab23fd8aeb536': {
    type: 'normal',
    user: 'Brombolina',
  },
};

type AuthContextType = {
  auth: AuthStatus,
  user?: string,
  useAuthenticate: (pin: string) => boolean,
};

export const AuthContext = createContext<AuthContextType>({
  auth: 'none', user: '', useAuthenticate: () => false,
});

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [status, setStatus] = useState<AuthStatus>('none');
  const [user, setUser] = useState<string>('');
  console.log(status);

  useEffect(() => {
    console.log(status);
  }, [status]);

  const useAuthenticate = (pin: string) => {
    const hash = crypto.createHash('md5').update(pin).digest('hex');
    const isValidUser = Object.prototype.hasOwnProperty.call(users, hash);
    useEffect(() => {
      if (isValidUser) {
        console.log(`${users[hash].user} logged in as ${users[hash].type}`);
        setStatus(users[hash].type);
        setUser(users[hash].user);
      } else {
        setStatus('none');
        setUser('');
      }
    }, [isValidUser, hash]);
    // console.log(user, status);
    return isValidUser;
  };

  return (
    <AuthContext.Provider value={{ auth: status, user, useAuthenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
