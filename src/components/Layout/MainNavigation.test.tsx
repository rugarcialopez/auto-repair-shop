import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext, { AuthProvider } from '../../store/auth-context';
import MainNavigation from './MainNavigation';

describe('Main Navigation', () => {
  test('renders login Nav link if user is not logged in', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <MainNavigation />
        </BrowserRouter> 
      </AuthProvider>
    );
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });

  test('renders repairs, users and logout Nav links if user is logged in and role is manager', () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'manager',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    render(
      <AuthContext.Provider value={authContextObj}>
        <BrowserRouter>
          <MainNavigation />
        </BrowserRouter> 
      </AuthContext.Provider>
    );
    const repairsElement = screen.getByText(/repairs/i);
    expect(repairsElement).toBeInTheDocument();
    const usersElement = screen.getByText(/users/i);
    expect(usersElement).toBeInTheDocument();
    const logoutElement = screen.getByText(/logout/i);
    expect(logoutElement).toBeInTheDocument();
  });

  test('renders repairs and logout Nav links if user is logged in and role is usesr', () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'user',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    render(
      <AuthContext.Provider value={authContextObj}>
        <BrowserRouter>
          <MainNavigation />
        </BrowserRouter> 
      </AuthContext.Provider>
    );
    const repairsElement = screen.getByText(/repairs/i);
    expect(repairsElement).toBeInTheDocument();
    const usersElement = screen.queryByText(/users/i);
    expect(usersElement).not.toBeInTheDocument();
    const logoutElement = screen.getByText(/logout/i);
    expect(logoutElement).toBeInTheDocument();
  });
});