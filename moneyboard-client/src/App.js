import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/App.css';

import Layout from './components/Layout';
import Home from './pages/Public/Home';
import Privacy from './pages/Public/Privacy';
import NotFound from './pages/Public/NotFound';
import UltrapointsInfo from './pages/Public/UltrapointsInfo';

import Workspace from './pages/IfUser/Workspace';

import Register from './pages/IfNotUser/Register';
import Login from './pages/IfNotUser/Login';
import Account from './pages/IfUser/Account/Account';
import AccountEdit from './pages/IfUser/Account/AccountEdit';
import ChangePassword from './pages/IfUser/Account/ChangePassword';

import ProjectCreateStep1 from './pages/IfUser/Project/ProjectCreateStep1';
import ProjectCreateStep2 from './pages/IfUser/Project/ProjectCreateStep2';
import ProjectId from './pages/IfUser/Project/ProjectId';
import ProjectEdit from './pages/IfUser/Project/ProjectEdit';

import Invite from './pages/IfUser/Invite'

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/ultrapoints' element={<UltrapointsInfo />} />
            <Route path='*' element={<NotFound />} />
            {!user && (
              <>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/invite/:projectId' element={<Login />} />
              </>
            )}
            {user && (
              <>
                <Route path='/account' element={<Account />} />
                <Route path='/account/edit' element={<AccountEdit />} />
                <Route path='/security/edit' element={<ChangePassword />} />
                <Route path='/workspace' element={<Workspace />} />
                <Route path='/project/create/0' element={<ProjectCreateStep1 />} />
                <Route path='/project/create/:projectId' element={<ProjectCreateStep2 />} />
                <Route path='/project/:projectId' element={<ProjectId />} />
                <Route path='/project/edit/:projectId' element={<ProjectEdit />} />
                <Route path='/invite/:projectId' element={<Invite />} />
              </>
            )}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;