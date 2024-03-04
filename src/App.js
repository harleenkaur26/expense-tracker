import { Login } from 'components/Login';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Tracker } from './pages/Tracker';
import { ToastContainer } from 'react-toastify';
// Styles
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { dark } = useSelector((state) => state.ui);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (dark) body.classList.add('dark');
    else body.classList.remove('dark');
  }, [dark]);

  return (
    <div id='print' className={dark ? 'dark' : ''} style={{ margin: '1rem' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Tracker />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/login' element={authenticated ? <Navigate to='/' /> : <Login />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
