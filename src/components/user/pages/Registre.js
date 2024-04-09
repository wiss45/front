import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import './Registre.css'; // Assuming you have a CSS file for styling

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    ville: '',
    age: '',
    phone: '',
    dateNaissance: '',
    nationalite: '',
    sport: '',
    role: '',
    cv: null ,
    photoProfile:null,
  });


  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setIsLoading(true);
    setErrorMessage(null);
  
 
    const formDataToSend = new FormData();
  
    formDataToSend.append('firstname', formData.firstname);
    formDataToSend.append('lastname', formData.lastname);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('ville', formData.ville);
    formDataToSend.append('pays', formData.pays);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('dateNaissance', formData.dateNaissance);
    formDataToSend.append('nationalite', formData.nationalite);
    formDataToSend.append('sport', formData.sport);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('cv', formData.cv);
    formDataToSend.append('photoProfile', formData.photoProfile);
  try {
      const response = await axios.post('http://localhost:5000/registre',formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Registration successful:', response.data);
      alert('Registration successful! Please check your email for confirmation.');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred during registration.');
      } else {
        setErrorMessage('Network error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className="form-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="form-container">
              <h3 className="title">Register</h3>
              <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prénom"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom"
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
                  <label>Mot de Passe</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mot de Passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <h4 className="sub-title">Information Personnel</h4>
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
                  <label>Pays</label>
                  <input type="text"
                    className="form-control"
                    placeholder="Pays"
                    name="pays"
                    value={formData.pays}
                    onChange={handleChange}/>
                        </div>
                        <div class="form-group">
                            <label>Age</label>
                            <input type="number" class="form-control" placeholder="Age"   name="age" value={formData.age}
                    onChange={handleChange} />
                        </div>
                        <div class="form-group">
                            <label>N° Téléphone</label>
                            <input type="text" class="form-control" placeholder="N° Téléphone"   name="phone" value={formData.phone}
                    onChange={handleChange}/>
                        </div>
                       
                        <div class="form-group">
                            <label>Date de Naissance</label>
                            <input type="date" class="form-control"   name="dateNaissance"  value={formData.dateNaissance}
                    onChange={handleChange}/>
                        </div>
                        <div class="form-group">
                            <label>Nationalité</label>
                            <input type="text" class="form-control"   name="nationalite"  value={formData.nationalite}
                    onChange={handleChange}/>
                        </div>
                        <div class="form-group">
                            <label>Sport</label>
                            <input type="text" class="form-control" placeholder="Sport"   name="sport"  value={formData.sport}
                    onChange={handleChange}/>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <select class="form-control"    name="role" value={formData.role}
                    onChange={handleChange}>
                      <option value="">Select Role</option>
                                
                                <option value="talent">Talent</option>
                                <option value="scout">Scout</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>CV</label>
                            <input type="file" class="form-control"    name="cv"  onChange={handleFileChange}/>
                        </div>
                        <div class="form-group">
                            <label>Photo de Profile</label>
                            <input type="file" class="form-control"    name="photoProfile"  onChange={handleFileChange}/>
                        </div>
                        {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                        <div class="check-terms">
                            <input type="checkbox" class="checkbox"/>
                            <span class="check-label">I agree to the terms</span>
                        </div>
                        <span class="signin-link">Already have an account? Click here to <a href="/login">Login</a></span>
                        <button  type="submit" class="btn signup" disabled={isLoading} >Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default RegisterForm;
