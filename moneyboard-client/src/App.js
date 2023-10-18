import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

import Workspace from './pages/Workspace';

import Register from './pages/Account/Register';
import Login from './pages/Account/Login';
import Account from './pages/Account/Account';
import AccountEdit from './pages/Account/AccountEdit';

import Create from './pages/Project/Create';
import Project from './pages/Project/Project';
import ProjectEdit from './pages/Project/ProjectEdit';

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
                <Route path='/project/create' element={<Create />} />
                <Route path="/project/:projectId" element={<Project />} />
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