import React from 'react';
import { Route } from 'react-router';
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
