import React, { useState, useContext } from 'react';
import AuthContext from '../../user/AuthContext';
import axios from 'axios';

const CreateTalent = () => {
  const [cv, setCv] = useState([]);
  const [photoProfile, setPhotoProfile] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [statut, setStatut] = useState('');
  const { user, authTokens } = useContext(AuthContext); // Utilisation du contexte

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      
      formData.append('cv', cv);
      formData.append('photoProfile', photoProfile[0]);
      formData.append('photos', photos);
      formData.append('videos', videos);
      
      formData.append('userId', user._id);
      
      // Utilisation du jeton d'authentification du contexte
      const token = authTokens ? authTokens.accessToken : '';

      const response = await axios.post('http://localhost:5000/addtalent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Talent created successfully:', response.data);
      } else {
        console.error('Error creating talent:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating talent:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={(e) => setCv(e.target.files)} />
      <input type="file" onChange={(e) => setPhotoProfile(e.target.files)} />
      <input type="file" multiple onChange={(e) => setPhotos(e.target.files)} />
      <input type="file" multiple onChange={(e) => setVideos(e.target.files)} />
      <button type="submit">Create Talent</button>
      <div className="form-group">
  <label>Statut :</label>
  <select
   
    value={statut}
    onChange={(e) => setStatut(e.target.value)}
    required
  >
    <option value="actif">Actif</option>
    <option value="inactif">Inactif</option>
    <option value="en negotiation">En Négociation</option>
  </select>
</div>
    </form>
  );
};

export default CreateTalent;
