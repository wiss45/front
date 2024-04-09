import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Scouts() {
  const [scouts, setScouts] = useState([]);

  useEffect(() => {
    getAllScouts();
  }, []);

  const getAllScouts = () => {
    axios.get('http://localhost:5000/scouts')
      .then((response) => {
        setScouts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching scouts:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/user/${id}`)
      .then((response) => {
        console.log('User deleted:', response.data);
        // Mettre à jour la liste des talents après suppression
        getAllScouts();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              {/* ... Votre en-tête de tableau ici ... */}
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Pays</th>
                  <th>Nationalité</th>
                  <th>Sport</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {scouts.map((scout, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a href="#">
                        {`${scout.firstname} ${scout.lastname}`}
                      </a>
                    </td>
                    <td>{scout.pays}</td>
                    <td>{scout.nationalite}</td>
                    <td>{scout.sport}</td>
                    <td>{scout.role}</td>
                    <td>
                      {/* Bouton de suppression avec onClick */}
                      <a
                        href="#"
                        className="btn btn-danger"
                        title="Delete"
                        data-toggle="tooltip"
                        onClick={() => handleDelete(scout._id)} 
                      >
                        <i className="material-icons">&#xE5C9;</i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scouts;
