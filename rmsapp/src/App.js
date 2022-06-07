import {React} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResourceDashboard  from './container/ResourceDashboard';
import StaffDashboard from './container/StaffDashboard';
import ProjectDashboard  from './container/ProjectDashboard';
import Header from './component/Header';
import "./Styles/index.css";
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">  
    <Header/>
    <div className='container'> 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ResourceDashboard/>} />        
      <Route path="/ProjectDashboard" element={<ProjectDashboard />} />
      <Route path="/StaffDashboard" element={<StaffDashboard />} />
    </Routes>
    </BrowserRouter>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
