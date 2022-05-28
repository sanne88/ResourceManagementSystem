import {React} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResourceDashboard  from './Containers/ResourceDashboard';
import StaffDashboard from './Containers/StaffDashboard';
import ProjectDashboard  from './Containers/ProjectDashboard';
import Header from './Header';
import Footer from './Footer';

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
