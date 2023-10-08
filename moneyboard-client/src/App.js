import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import axios from 'axios';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;