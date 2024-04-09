import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Scouts() {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    getAllTalents();
  }, []);

  const getAllTalents = () => {
    axios.get('http://localhost:5000/talents')
      .then((response) => {
        setTalents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching talents:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/user/${id}`)
      .then((response) => {
        console.log('User deleted:', response.data);
        
        getAllTalents();
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
                {talents.map((talent, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a href="#">
                        {`${talent.firstname} ${talent.lastname}`}
                      </a>
                    </td>
                    <td>{talent.pays}</td>
                    <td>{talent.nationalite}</td>
                    <td>{talent.sport}</td>
                    <td>{talent.role}</td>
                    <td>
                      {/* Bouton de suppression avec onClick */}
                      <a
                        href="#"
                        className="btn btn-danger"
                        title="Delete"
                        data-toggle="tooltip"
                        onClick={() => handleDelete(talent._id)} // Appeler handleDelete avec l'ID du talent
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
