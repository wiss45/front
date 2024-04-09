import React, { useState, useContext , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../user/AuthContext';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';
const ScoutProfile = () => {
  const { user } = useContext(AuthContext);
 
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate('/updateuser');
  };
  

  const[results , setResults] = useState("");

  
 

  return (
    <div className="profile">
    
      <div className="container">
        <div className="main-body">
        <div className="search-bar-container">
        <SearchBar setResults={setResults} /> 
        <SearchResultsList results={results}/>
       </div>
       
     
 
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={user.photoProfile} alt="User" className="rounded-circle" width="150" />
                      
                    
                    <div className="mt-3">
                      <h4>{user.firstname} {user.lastname}</h4>
                      <p className="text-secondary mb-1">{user.role}</p>
                      <p className="text-muted font-size-sm">{user.ville}, {user.pays}</p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="col-md-8">
              {/* Basic Info Card */}
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">N° Tél</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date de Naissance</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {new Date(user.dateNaissance).toISOString().slice(0.10)}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Age</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.age}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Nationalité</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.nationalite}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Sport</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.sport}
                    </div>
                  </div>
                  <hr />
                 
                </div>
              </div>
                {/* CV Section */}
                <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">CV</h5>
                  <img src={user.cv} className="card-img-top" alt="CV" />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutProfile;
