import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Layout from './components/Layout';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Workspace from './pages/Workspace';
import Account from './pages/Account';


function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/privacy' element={<Privacy />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/workspace' element={<Workspace />} />
              <Route path='/account' element={<Account />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;