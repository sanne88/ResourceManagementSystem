import {React} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResourceDashboard  from './container/ResourceDashboard';
import StaffDashboard from './container/StaffDashboard';
import ProjectDashboard  from './container/ProjectDashboard';
import Header from './container/Header';
import Footer from './container/Footer';

function App() {
  return (
    <div className="App">  
    <Header/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ResourceDashboard/>} />        
      <Route path="/ProjectDashboard" element={<ProjectDashboard />} />
      <Route path="/StaffDashboard" element={<StaffDashboard />} />
    </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
  );
}

export default App;
