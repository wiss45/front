import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi'; // Import Joi for validation
import './AddScoutProfile.css';
import { useNavigate } from 'react-router-dom';

const TalentForm = () => {
  const navigate = useNavigate();
  
  
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  
  const [photosProfile, setPhotosProfile] = useState([]);
 

  const [click, setClick] = useState(false);
  const [added, setAdded] = useState(null);
  const [error, setError] = useState(null);

  const schemaValidation = Joi.object({
 
    ville: Joi.string().required(),
    pays: Joi.string().required(),
    age: Joi.number().required(),
    phone: Joi.number().required(),
    photosProfile: Joi.array().items(Joi.string()).min(1).max(10)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = schemaValidation.validate({
     
      ville,
      pays,
      age,
      phone,
      photosProfile,
     
    }, { abortEarly: false });

    if (validation.error) {
      setError(validation.error.details.map(err => err.message).join(", "));
      return;
    }

    setClick(true);
    setAdded(null);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/addscout', {
       
        ville,
        pays,
        age,
        phone,
      
        photosProfile,
       
      });
      console.log(response.data);
      setAdded('User Added!');
    
      setVille('');
      setPays('');
      setAge('');
      setPhone('');
     
      setPhotosProfile([]);
     
      navigate('/scoutprofile');
    } catch (error) {
      console.error('Error creating talent:', error);
      setError(error.response?.data?.message || 'Erreur');
    } finally {
      setClick(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {added && <div className="alert alert-success">{added}</div>}

      
      <div className="form-group">
        <label>Ville :</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Pays:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Pays"
          value={pays}
          onChange={(e) => setPays(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Age :</label>
        <input
          type="text"
          className="form-control"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
     
      <div className="form-group">
        <label >Phone :</label>
        <input
          type="number"
          className="form-control"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
   
     
    
      <div className="form-group">
        <label >Photo de Profile :</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setPhotosProfile([...photosProfile, e.target.value])}
          required
        />
      </div>
    

      <br />
      <button type="submit" className="btn btn-primary" disabled={click} >
        Ajouter Profile
      </button>
    </form>
  );
};

export default TalentForm;