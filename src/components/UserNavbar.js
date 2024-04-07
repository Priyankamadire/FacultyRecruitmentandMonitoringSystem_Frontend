import React, { useContext,useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink,Outlet,useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { ClgContext } from '../App';
import './Navbar.css'
const UserNavbar = () => {
 
 
  const [userData,setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch('http://localhost:5000/aboutpage', {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await res.json();
      setUserData(data);
      console.log(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  
  useEffect(() => {
    callAboutPage();
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
          <li className="nav-item me-3">
            <NavLink className="nav-link active bi bi-house-fill text-light" aria-current="page" to="/userhome" onClick={closeNavbar}>
              Home
            </NavLink>
          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-person-circle text-light" to="/userprofile" onClick={closeNavbar}>
             MY Profile
            </NavLink>
          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-file-earmark-post text-light" to="/jobtable" onClick={closeNavbar}>
              View Jobs
            </NavLink>
          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-person-lines-fill  text-light" to="/contact" onClick={closeNavbar}>
              Contact
            </NavLink>
          </li>
          <li className="nav-item me-3">
          <NavLink className="nav-link bi bi-bell-fill text-light" to={`/notification/${userData.email}`} onClick={closeNavbar}>
  Notification
</NavLink>

          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link  bi bi-arrow-left-circle-fill text-light" to="/logout" onClick={closeNavbar}>
              Logout
            </NavLink>
          </li>
        </>
      );
    };
   
  
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${isNavbarOpen ? 'show' : ''}`}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/userhome" onClick={closeNavbar}>
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

export default UserNavbar;

