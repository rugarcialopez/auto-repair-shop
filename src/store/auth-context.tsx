import React, { useEffect, useState } from 'react';

let logoutTimer: NodeJS.Timeout;

type AuthContextObj = {
  token: string,
  role: string,
  isLoggedIn: boolean,
  login: (token: string, role: string, expirationTime: string) => void,
  logout: () => void
};

const calculateRemainingTime = (expirationTime: string): number => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const AuthContext = React.createContext<AuthContextObj>({
  token: '',
  role: '',
  isLoggedIn: false,
  login: (token: string, role: string, expirationTime: string) => {},
  logout: () => {},
});

export const AuthProvider: React.FC = (props) => {
  let storedToken = localStorage.getItem('token');
  let storedRole = localStorage.getItem('role');
  let storedExpirationDate = localStorage.getItem('duration');
  if (!storedToken) {
    storedToken = '';
  }
  if (!storedRole) {
    storedRole = '';
  }
  let remainingTime = storedExpirationDate ? calculateRemainingTime(storedExpirationDate) : 0;

  const [token, setToken] = useState(storedToken); 
  const [role, setRole] = useState(storedRole);

  useEffect(() => {
    if (remainingTime > 3600) {
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('expirationTime');
    }
  }, [remainingTime]);

  const loginHandler = (token: string, role: string, expirationTime: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    setRole(role);
    localStorage.setItem('role', role);
    localStorage.setItem('duration', expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  }

  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('token');
    setRole('');
    localStorage.removeItem('role');
    localStorage.removeItem('duration');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }

  const authValue: AuthContextObj = {
    token: token,
    role: role,
    isLoggedIn: token !== '',
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;