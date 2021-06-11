import { useContext } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import RepairsPage from './pages/RepairsPage';
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
      <Route path='/' exact>
        <HomePage/>
      </Route>
      { !authContext.isLoggedIn && <Route path='/login'>
        <AuthPage />
      </Route>}
      { authContext.isLoggedIn && <Route path='/repairs'>
        <RepairsPage />
      </Route>}
    </Layout>
  );
}

export default App;
