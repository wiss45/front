import React from 'react';
import { Link } from 'react-router-dom'; // Importer le composant Link depuis react-router-dom
import './Sidebar.css';

const Sidebar = () => {
  return (
    <>
      <aside>
        <p>Menu</p>
        {/* Utilisation de Link au lieu de a */}
        <Link to="/talents">
          <i className="fa fa-user-o" aria-hidden="true"></i>
          Talents
        </Link>
        <Link to="/scouts">
          <i className="fa fa-laptop" aria-hidden="true"></i>
          Scouts
        </Link>
      </aside>

      <div className="social">
        <a href="https://www.linkedin.com/in/florin-cornea-b5118057/" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-linkedin"></i>
        </a>
      </div>
    </>
  );
};

export default Sidebar;
