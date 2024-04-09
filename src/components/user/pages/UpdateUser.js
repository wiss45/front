import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import './UpdateUser.css';

const UpdateUser = () => {
  const { user, authTokens, setAuthTokens } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    _id: user.id, 
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    email: user.email || '',
    password: user.password || '',
    ville: user.ville || '',
    age: user.age || '',
    phone: user.phone || '',
    dateNaissance: new Date(user.dateNaissance).toISOString().slice(0.10)|| '',
    nationalite: user.nationalite || '',
    sport: user.sport || '',
    
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/update/user/${formData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${authTokens.accessToken}`,
        },
      });

      console.log('Update successful:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      // Handle API errors
      if (error.response) {
        if (error.response.status === 401 && error.response.data.message === 'Token expired') {
          // Refresh the access token
          try {
            const refreshResponse = await axios.post('http://localhost:5000/refresh', {
              refreshToken: authTokens.refreshToken,
            });

            const newAccessToken = refreshResponse.data.accessToken;
            setAuthTokens({
              accessToken: newAccessToken,
              refreshToken: authTokens.refreshToken,
            });

            
            const retryResponse = await axios.patch(`http://localhost:5000/update/user/${formData._id}`, formData, {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });

            console.log('Retry Update successful:', retryResponse.data);
            alert('Profile updated successfully!');
          } catch (refreshError) {
            console.error('Refresh token error:', refreshError);
            setErrorMessage('Error updating profile. Please try again later.');
          }
        } else {
          setErrorMessage(error.response.data.message || 'An error occurred during update.');
        }
      } else {
        setErrorMessage('Network error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    await handleUpdate();
  };

  return (
    <div className="form-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="form-container">
              <h3 className="title">Update Profile</h3>
              <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <h4 className="sub-title">Personal Information</h4>
                <div className="form-group">
                  <label>Ville</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ville"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>N° Téléphone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="N° Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Date de Naissance</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Nationalite</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nationalite"
                    value={formData.nationalite}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Sport</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                  />
                </div>

                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                <button type="submit" className="btn btn-success" disabled={isLoading}>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
