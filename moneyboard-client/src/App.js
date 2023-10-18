import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import Home from './pages/Public/Home';
import Privacy from './pages/Public/Privacy';
import NotFound from './pages/Public/NotFound';

import Workspace from './pages/IfUser/Workspace';

import Register from './pages/IfNotUser/Register';
import Login from './pages/IfNotUser/Login';
import Account from './pages/IfUser/Account/Account';
import AccountEdit from './pages/IfUser/Account/AccountEdit';

import ProjectCreateStep1 from './pages/IfUser/Project/ProjectCreateStep1';
import ProjectCreateStep2 from './pages/IfUser/Project/ProjectCreateStep2';
import ProjectId from './pages/IfUser/Project/ProjectId';
import ProjectEdit from './pages/IfUser/Project/ProjectEdit';


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
                <Route path='/project/create/step/1' element={<ProjectCreateStep1 />} />
                <Route path='/project/create/step/2' element={<ProjectCreateStep2 />} />
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