import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavFooter/Navbar';
import Hero from './components/NavFooter/Hero';
import Footer from './components/NavFooter/Footer';
import Sidebar from './components/NavFooter/Sidebar';
import Home from './components/user/pages/Home';
import Contact from './components/user/pages/Contact';
import About from './components/user/pages/About';
import Registre from './components/user/pages/Registre';
import Login from './components/user/pages/Login';
import Message from './components/user/pages/Message';
import AddTalentProfile from './components/talent/pages/AddTalentProfile';
import TalentProfile from './components/talent/pages/TalentProfile';
import AddScoutProfile from './components/scout/pages/AddScoutProfile';

import ScoutProfile from './components/scout/pages/ScoutProfile';
import Scouts from './components/admin/Scouts';
import Talents from './components/admin/Talents';
import UpdateUser from './components/user/pages/UpdateUser';
import { AuthProvider } from './components/user/AuthContext';
import PrivateRoute, { TalentsPrivateRoutes, ScoutsPrivateRoutes, AdminsPrivateRoutes } from './components/user/pages/PrivateRoutes';
import Layout from './components/NavFooter/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faPhoneAlt, faEnvelope, faMapMarkerAlt);
library.add(fab);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          
          <br />
          <br />
          <br />

          <Routes>
            
             
                <Route path="/addtalentprofile" element={<div><Navbar /><AddTalentProfile /></div>} />
                <Route path="/talentprofile" element={<div><Navbar /><TalentProfile /></div>} />
                
                <Route path="/updateuser" element={<div> <Navbar /><Hero /><UpdateUser /> <Footer /> </div>} />
              
                <Route path="/addscoutprofile" element={<div><Navbar /><AddScoutProfile /></div>} />
                
                <Route path="/scoutprofile" element={<div><Navbar /><ScoutProfile /></div>} />
                <Route path="/messagerie" element={<div><Navbar /><Message/></div>} />
                

             
                <Route path="/dashboard" element={<div><Navbar /><Sidebar /><Footer /></div>} />
                <Route path="/talents" element={<div><Layout><Talents /></Layout></div>} />
                <Route path="/scouts" element={<div><Layout><Scouts /></Layout></div>} />
             
                <Route path="/" element={<div><Navbar /> <Hero /> <Home /><Footer /></div>} />
                <Route path="/contact" element={<div><Navbar /> <Hero /> <Contact /><Footer /></div>} />
                <Route path="/about" element={<div> <Navbar /> <Hero /><About /> <Footer /> </div>} />
                <Route path="/registre" element={<div> <Navbar /><Hero /><Registre /> <Footer /> </div>} />
                <Route path="/login" element={<div><Navbar /> <Hero /><Login /><Footer /></div>} />
                </Routes>

          
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
