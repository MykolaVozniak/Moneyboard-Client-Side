import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import Home from './pages/Public/Home';
import Privacy from './pages/Public/Privacy';
import NotFound from './pages/Public/NotFound';

import Workspace from './pages/User/Workspace';

import Register from './pages/NotUser/Register';
import Login from './pages/NotUser/Login';
import Account from './pages/User/Account/Account';
import AccountEdit from './pages/User/Account/AccountEdit';

import ProjectCreate from './pages/User/Project/ProjectCreate';
import ProjectId from './pages/User/Project/ProjectId';
import ProjectEdit from './pages/User/Project/ProjectEdit';

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='*' element={<NotFound />} />
            {!user && (
              <>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </>
            )}
            {user && (
              <>
                <Route path='/account' element={<Account />} />
                <Route path='/account/edit' element={<AccountEdit />} />
                <Route path='/workspace' element={<Workspace />} />
                <Route path='/project/create' element={<ProjectCreate />} />
                <Route path="/project/:projectId" element={<ProjectId />} />
                <Route path='/project/edit' element={<ProjectEdit />} />
              </>
            )}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;