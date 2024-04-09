import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../user/AuthContext';
import axiosInstance, { configureAxiosInterceptors }  from './AxiosConfig';
import axios from 'axios';
const TalentProfile = () => {
  const { user } = useContext(AuthContext);
  const [media, setMedia] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const navigate = useNavigate();

  configureAxiosInterceptors();

  const handleMediaChange = (event) => {
    setMedia(event.target.files[0]);
  };

  const uploadMedia = async () => {
    const formData = new FormData();
    formData.append('file', media);
    formData.append('userId', user.id);

    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).accessToken;
      console.log(token);
      
      const res = await axiosInstance.post('addmedia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
         
        },
      });
      console.log("hani hne");
      
   
      if (res.status === 200) {
        setUploadStatus('Le média a été téléchargé avec succès !');
      
      } else {
        setUploadStatus('Une erreur s\'est produite lors du téléchargement du média.');
      }

     
      setMedia(null);
    } catch (error) {
      console.error(error);
      setUploadStatus('Une erreur s\'est produite lors du téléchargement du média.');
    }
  };

  const handleUpdateClick = () => {
    navigate('/updateuser');
  };
  return (
    <div className="profile">
      <div className="container">
        <div className="main-body">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
              <li className="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav>

         
          <div className="row gutters-sm">
            {/* Left Column */}
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                  <img src={user.photoProfile} alt="User" className="rounded-circle" width="150" />
                  
                  <div className="mt-3">
                      <h4>{user.firstname} {user.lastname}</h4>
                      <p className="text-secondary mb-1">{user.role}</p>

                      <p className="text-muted font-size-sm">{user.ville} , {user.pays}</p>
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
                      {user.dateNaissance}
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


              <div className="row mt-4">
            <div className="col-md-6">
              <input type="file"  onChange={handleMediaChange} />
              <button onClick={uploadMedia} className="btn btn-primary mt-2">
                Télécharger Media
              </button>
            </div>
            
          </div>

      
              {/* Videos Section */}
              {user.videos && user.videos.length > 0 && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Vidéos</h5>
                    <div className="row">
                      {user.videos.map((video, index) => (
                        <div className="col-md-4" key={index}>
                          <div className="card">
                            <div className="card-body">
                              <h6 className="card-subtitle mb-2 text-muted">Video {index + 1}</h6>
                              <video width="100%" height="auto" controls>
                                <source src={video.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Photos Section */}
              {user.photos && user.photos.length > 0 && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Photos</h5>
                    <div className="row">
                      {user.photos.map((photo, index) => (
                        <div className="col-md-4" key={index}>
                          <div className="card">
                            <img src={photo.url} className="card-img-top" alt={`Photo ${index + 1}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
