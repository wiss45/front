import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '../AuthContext';
import './Login.css';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
 
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await loginUser(event);
      toast.success('Connexion réussie !');
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
      setErrorMessage(error.message);
      navigate('/login');
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2 class="text-center text-dark mt-5">Login Form</h2>
          <div class="text-center mb-5 text-dark"> Welcome To Scoutify</div>
          <div class="card my-5">
            <form onSubmit={handleSubmit} class="card-body cardbody-color p-lg-5">
              <div class="text-center">
                <img
                  src="https://img.freepik.com/photos-premium/journee-internationale-du-sport-6-avril_10221-18936.jpg"
                  class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  
                  placeholder="email"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  placeholder="Mot de Passe"
                  required
                />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                  Login
                </button>
              </div>
              <div id="emailHelp" class="form-text text-center mb-5 text-dark">
                Not Registered?{' '}
                <a href="/registre" class="text-dark fw-bold">
                  Créer un compte
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
