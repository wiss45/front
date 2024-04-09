import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../user/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const { user, authTokens, logoutUser, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user  && authTokens) {
      setUser(jwtDecode(authTokens.accessToken));
    }
  }, [user, authTokens ]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    logoutUser();
    navigate('/login') // Appel de la fonction de déconnexion du contexte d'authentification
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
      Scoutify
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/contact">
                Contact
              </NavLink>
            </li>
            {user ? (
              // Si l'utilisateur est connecté
              <>
                {user.role === "talent" ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/talentProfile">
                        Talent Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : user.role === "scout" ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/scoutProfile">
                        Scout Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/dashboard">
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </>
            ) : (
              // Si l'utilisateur n'est pas connecté
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
