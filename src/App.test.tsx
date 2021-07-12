import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter, Router, useHistory } from 'react-router-dom';
import { AuthProvider } from './store/auth-context';

describe('Welcome page', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </AuthProvider>
    );
  });

  test('renders welcome page', () => {
    const welcomeHeading = screen.getByText(/Welcome to auto show repair/i);
    expect(welcomeHeading).toBeInTheDocument();
  });

  test('renders login link', () => {
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
  });

});


describe('Routes', () => {
  test('renders <AuthForm /> component for "/login" route', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <App />
        </MemoryRouter> 
      </AuthProvider>
    );
    const signInHeading = screen.getByText(/Sign In/i);
    expect(signInHeading).toBeInTheDocument();
  });
});