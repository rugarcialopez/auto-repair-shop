import { useContext } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import EditUserPage from './pages/EditUserPage';
import HomePage from './pages/HomePage';
import NewUserPage from './pages/NewUserPage';
import NotFoundPage from './pages/NotFoundPage';
import RepairsPage from './pages/RepairsPage';
import UsersPage from './pages/UsersPage';
import AuthContext from './store/auth-context';

function App() {
  const location = useLocation();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  if (location.pathname === '/' && authContext.isLoggedIn) {
    history.push('/repairs');
  }

  if (location.pathname !== '/' && location.pathname !== '/login' && !authContext.isLoggedIn) {
    history.push('/login');
  }

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage/>
        </Route>
        { !authContext.isLoggedIn && <Route path='/login'>
          <AuthPage />
        </Route>}
        { authContext.isLoggedIn && <Route path='/repairs'>
          <RepairsPage />
        </Route>}
        { authContext.isLoggedIn && authContext.role === 'manager' && <Route path='/users/:id'>
          <EditUserPage />
        </Route>}
        { authContext.isLoggedIn && authContext.role === 'manager' && <Route path='/users'>
          <UsersPage />
        </Route>}
        { authContext.isLoggedIn && authContext.role === 'manager' && <Route path='/new-user'>
          <NewUserPage />
        </Route>}
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
