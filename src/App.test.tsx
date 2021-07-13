import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import AuthContext, { AuthProvider } from './store/auth-context';

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
  let fakeFetch: jest.Mock;

  beforeEach(() => {
    fakeFetch = jest.fn();
    window.fetch = fakeFetch;
  });

  afterEach(() => {
    fakeFetch.mockClear();
  });

  test('renders <AuthPage /> for "/login" route', () => {
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

  test('renders <MarkPage /> for "/repairs/mark/:id" route when user is logged in', async () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'user',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    const repair = {
      description: 'Repair 1',
      repairState: 'uncompleted'
    }
    fakeFetch.mockResolvedValueOnce({
      json: async () => ({ repair }),
      ok: true
    });
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/repairs/mark/1"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const markHeading = await screen.findByText(/Mark Repair 1/i);
    expect(markHeading).toBeInTheDocument();
  });

  test('renders <EditRepairPage /> for "/repairs/:id" route when user is logged in and user role is manager', async () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'manager',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    const repair = {
      id: '1',
      description: 'Repair 1',
      date: '2021-07-07',
      time: 11,
      userId: '1',
      repairState: 'uncompleted'
    };
    const users = [
      {
        id: '2',
        fullName: 'Learner One',
        role: 'user'
      },
      {
        id: '3',
        fullName: 'Learner Two',
        role: 'user'
        }
    ];
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ repair }),
      ok: true
    })
    .mockResolvedValueOnce({
      json: async () => ({ users }),
      ok: true
    });
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/repairs/1"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const descriptionTextArea: any = await screen.findByLabelText('description-textarea');
    expect(descriptionTextArea.value).toBe('Repair 1');
  });

  test('renders <RepairsPage /> for "/repairs" route when user is logged in and user role is manager', async () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'manager',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    const repairs = [
      {
        id: '1',
        description: 'Repair 1',
        date: '2021-07-07',
        time: 11,
        userId: '1',
        repairState: 'uncompleted',
      },
      {
        id: '2',
        description: 'Repair 2',
        date: '2021-07-07',
        time: 12,
        userId: '1',
        repairState: 'uncompleted'
      }
    ];
 
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ repairs }),
      ok: true
    })
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/repairs"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const repairOne = await screen.findByText(/Repair 1/i);
    expect(repairOne).toBeInTheDocument();
    const repairTwo = await screen.findByText(/Repair 2/i);
    expect(repairTwo).toBeInTheDocument();
  });

  test('renders <EditUserPage /> for "/users/:id" route when user is logged in and user role is manager', async () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'manager',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    const user = {
      id: '1',
      fullName: 'Learner One',
      role: 'user',
      email: 'learner01@example.com' 
    };
 
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ user }),
      ok: true
    })
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/users/1"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const fullNameInput: any = await screen.findByLabelText('fullName-input');
    expect(fullNameInput.value).toBe('Learner One');
  });

  test('renders <UsersPage /> for "/users" route when user is logged in and user role is manager', async () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'manager',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    const users = [
      {
        id: '2',
        fullName: 'Learner One',
        role: 'user'
      },
      {
        id: '3',
        fullName: 'Learner Two',
        role: 'user'
        }
    ];
 
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ users }),
      ok: true
    })
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/users"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const learnerOne = await screen.findByText(/Learner One/i);
    expect(learnerOne).toBeInTheDocument();
    const learnerTwo = await screen.findByText(/Learner Two/i);
    expect(learnerTwo).toBeInTheDocument();
  });

  test('renders <NewUserPage /> for "/new-user" route when user is logged in and user role is manager', async () => {
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
        <MemoryRouter initialEntries={["/new-user"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const userForm = await screen.findByText(/User Form/i);
    expect(userForm).toBeInTheDocument();
  });

  test('renders <NewRepairPage /> for "/new-repair" route when user is logged in and user role is manager', async () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'manager',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    const users = [
      {
        id: '2',
        fullName: 'Learner One',
        role: 'user'
      },
      {
        id: '3',
        fullName: 'Learner Two',
        role: 'user'
        }
    ];
 
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ users }),
      ok: true
    });
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/new-repair"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const repairForm = await screen.findByText(/Repair Form/i);
    expect(repairForm).toBeInTheDocument();
  });

  test('renders <AuthPage /> when route is not "/" or "/login" and user is not logged in', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/repairs"]}>
          <App />
        </MemoryRouter> 
      </AuthProvider>
    );
    const signIn = screen.getByText(/Sign In/i);
    expect(signIn).toBeInTheDocument();
  });

  test('renders <RepairsPage /> when route is  "/"  and user is logged in', async () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'manager',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    const repairs = [
      {
        id: '1',
        description: 'Repair 1',
        date: '2021-07-07',
        time: 11,
        userId: '1',
        repairState: 'uncompleted',
      },
      {
        id: '2',
        description: 'Repair 2',
        date: '2021-07-07',
        time: 12,
        userId: '1',
        repairState: 'uncompleted'
      }
    ];
 
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ repairs }),
      ok: true
    })
    render(
      <AuthContext.Provider  value={authContextObj}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const repairOne = await screen.findByText(/Repair 1/i);
    expect(repairOne).toBeInTheDocument();
    const repairTwo = await screen.findByText(/Repair 2/i);
    expect(repairTwo).toBeInTheDocument();
  });

  test('renders <NotFoundPage /> when route is  unknown  and user is logged in', () => {
    const authContextObj = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role: 'manager',
      userId: '1',
      isLoggedIn: true,
      login: (token: string, role: string, expirationTime: string, userId: string) => {},
      logout: () => {},
    }
    render(
      <AuthContext.Provider  value={authContextObj}>
        <MemoryRouter initialEntries={["/unknown"]}>
          <App />
        </MemoryRouter> 
      </AuthContext.Provider>
    );
    const pageNotFound = screen.getByText(/Page not found!/i);
    expect(pageNotFound).toBeInTheDocument();
  });

});