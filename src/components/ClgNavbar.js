import React, { useContext,useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink,Outlet,useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { ClgContext } from '../App';
import './Navbar.css'
const ClgNavbar = () => {
  const [userName, setUserName] = useState('');
  
  // const show = true;
const callHomePage = async () => {
  try {
    const res = await fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/getclgusername', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Sending cookies with the request
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    setUserName(data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  callHomePage();
}, []);
 




  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const { state } = useContext(UserContext);
  const { clgstate } = useContext(ClgContext);

  const RenderMenu = () => {
   
      return (
        <>
          <li className="nav-item  me-3">
            <NavLink className="nav-link active bi bi-house-fill text-light" aria-current="page" to="/clghome" onClick={closeNavbar}>
              Home
            </NavLink>
          </li>
         
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-file-post text-light" to="/jobpost" onClick={closeNavbar}>
              Post Job
            </NavLink>
          </li>
          {/* to={`/notification/${userData.email}`} */}
          {/* to="/jobsposted/:instname" */}
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-people-fill text-light"  to={`/jobsposted/${userName.clgname}`} onClick={closeNavbar}>
              View Applications
            </NavLink>
          </li>
          <li>
          <NavLink className="nav-link bi bi-buildings-fill text-light" to="/clgprofile" onClick={closeNavbar}>
             Institute Profile
            </NavLink>
          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link  bi bi-card-checklist  text-light" to="/detail" onClick={closeNavbar}>
              FacultyDetails
            </NavLink>
          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-person-lines-fill  text-light" to="/clgcont" onClick={closeNavbar}>
             Contact Us
            </NavLink>
          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-arrow-left-circle-fill text-light" to="/clglogout" onClick={closeNavbar}>
              Logout
            </NavLink>
          </li>
        </>
      );
    } 
 
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${isNavbarOpen ? 'show' : ''}`}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/clghome" onClick={closeNavbar}>
            <img
              src="https://icon-library.com/images/faculty-icon/faculty-icon-17.jpg"
              alt="Logo"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          </NavLink>
          <button
            className="navbar-toggler btn btn-light"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="menubar">
            <ul className="navbar-nav ms-auto">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  ); 
  
  
  
};

export default ClgNavbar;

