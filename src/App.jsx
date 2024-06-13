import { BrowserRouter, Routes , Route } from 'react-router-dom';
import 'tw-elements';
import { useState, useEffect } from 'react';
import Home from './pages/homePage';
import Login from './pages/loginPage';
import Register from './pages/registerPage';
import Loader from './components/Loader';
import UserProfile from './pages/userProfilePage';
import PageInfo from './pages/infoPage';
import ServicePage from './pages/servicesPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ Home }/>
        <Route path="/Login" Component={ Login }/>
        <Route path="/Register" Component={ Register }/>
        <Route path="/Profile" Component={ UserProfile }/>
        <Route path="/PageInfo" Component={PageInfo} />
        <Route path="/Services" Component={ServicePage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
