import React, { createContext, useState,  useEffect  } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
  let [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  let loginUser = async (e) => {
    setLoading(true);
    toast.loading('Veuillez patienter...');
    e.preventDefault();

    try {
      let response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
      });
      let data = await response.json();

      if (response?.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.accessToken));
        localStorage.setItem('authTokens', JSON.stringify(data));
        toast.success('Connexion réussie !');
        setIsLoggedIn(true);
      } else if (response?.status === 401) {
        toast.error("L'email ou le mot de passe est incorrect !");
      } else {
        // Gestion des erreurs
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
    }

    setLoading(false);
  };



let logoutUser = () => {
  setAuthTokens(null)
  setUser(null)
  setIsLoggedIn(false)
  localStorage.removeItem('authTokens')
  navigate('/login')
}

let contextData = {
  user: user,
  authTokens: authTokens,
  setAuthTokens: setAuthTokens,
  setUser: setUser,
  loginUser: loginUser,
  logoutUser: logoutUser,
  isLoggedIn: isLoggedIn,
  setIsLoggedIn: setIsLoggedIn,


}


useEffect(() => {
  if (authTokens) {
      setUser(jwtDecode(authTokens.accessToken))

  }
  setLoading(false)

}, [authTokens, loading])

return (
  <AuthContext.Provider value={contextData} >
    {children}
  </AuthContext.Provider>
)
}