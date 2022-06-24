import {React} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResourceDashboard  from './container/ResourceDashboard';
import StaffDashboard from './container/StaffDashboard';
import ProjectDashboard  from './container/ProjectDashboard';
import Header from './component/Header';
import "./Styles/index.css";
import Footer from './component/Footer';
import useSessionStorage from './hooks/useSessionStorage';
import LoginPage from './container/LoginPage';

function App() {
  const [isAuthenticated, toggleAuthenticationFlag] = useSessionStorage("isAuthenticated");
  const [user, setUser] = useSessionStorage("user");
  const [page, setPage] = useSessionStorage("title");

  const handleLogout = e => {
    
    e.preventDefault();
    toggleAuthenticationFlag(false);
    setUser(null);
    setPage(null);
    window.location = window.location.origin + '/';
  }

  return (
    <div className="App">  
    <Header title={page} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
    <div className='container'> 
    <BrowserRouter>
    <Routes>
      <Route path="/resource" element={<ResourceDashboard  setPage={setPage} user={user}/>} />    
      <Route path="/" element={<LoginPage setPage={setPage} toggleAuthenticationFlag={toggleAuthenticationFlag}
                setUser={setUser} /> } />   
      <Route path="/ProjectDashboard" element={<ProjectDashboard setPage={setPage} />} />
      <Route path="/StaffDashboard" element={<StaffDashboard  setPage={setPage} />} />
    </Routes>
    </BrowserRouter>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
