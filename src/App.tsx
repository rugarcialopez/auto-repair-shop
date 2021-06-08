import { Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Route path='/' exact>
        <HomePage/>
      </Route>
      <Route path='/login'>
        <p>login</p>
      </Route>
    </Layout>
  );
}

export default App;
