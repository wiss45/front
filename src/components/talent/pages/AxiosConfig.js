import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../user/AuthContext';
import {useContext} from 'react';



export const useAxios = () => {
  const {authTokens}=useContext(AuthContext);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `${authTokens?.accessToken}`,
  },
});
  axiosInstance.interceptors.request.use(
    async (req) => {
      if (authTokens) {
        console.log(authTokens);
        const user = jwtDecode(authTokens?.accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs(), 'minute') < 0;
        if (!isExpired) {
          req.headers.Authorization = `${authTokens.accessToken}`;
        } else {
          try {
            const response = await axios.post(`${axiosInstance.defaults.baseURL}/refresh`, {
              refresh: authTokens.refresh,
            });
            
            const newAuthTokens = {
              access: response.data.accessToken,
              refresh: response.data.refreshToken,
            };
            localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
            req.headers.Authorization = `${newAuthTokens.accessToken}`;
          } catch (error) {
            console.error("Erreur lors de la récupération d'un nouveau token :", error);
            handleTokenRefreshError(error);
            throw error;
          }
        }
      }
      return req;
    },
    (error) => {
      console.error("Erreur lors de la requête :", error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Erreur dans la réponse :', error?.response?.status);
      console.error('Message :', error?.response?.data);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

const handleTokenRefreshError = (error) => {
  if (error.response && error.response.status === 401) {
    
    console.error("Token de rafraîchissement invalide ou expiré. Déconnexion de l'utilisateur.");
   
    localStorage.removeItem("authTokens");
  
  } else {
 
    console.error("Erreur lors du rafraîchissement du token :", error.message);
 
  
 }
 
};


export default useAxios;