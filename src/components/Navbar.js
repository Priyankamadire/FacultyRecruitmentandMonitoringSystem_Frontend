import React, { useContext,useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink,Outlet,useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { ClgContext } from '../App';
import './Navbar.css'
const Navbar = () => {
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
    setUserName(data.clgname);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  callHomePage();
}, []);
 
  const [userData,setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/aboutpage', {
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
          <li className="nav-item nav-item me-3">
            <NavLink className="nav-link active bi bi-house-fill text-light" aria-current="page" to="/" onClick={closeNavbar}>
              Home
            </NavLink>
          </li>
          <li className="nav-item nav-item me-3">
            <NavLink className="nav-link bi bi-info-circle-fill  text-light" to="/about" onClick={closeNavbar}>
              About
            </NavLink>
          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-file-earmark-post text-light" to="/vacancies" onClick={closeNavbar}>
              Vacancies
            </NavLink>
          </li>
          <li className="nav-item nav-item me-3">
            <NavLink className="nav-link bi bi-patch-question-fill  text-light" to="/faqs" onClick={closeNavbar}>
              FAQs
            </NavLink>
          </li>
          <li className="nav-item nav-item me-3">
            <NavLink className="nav-link bi bi-box-arrow-in-right text-light" to="/login" onClick={closeNavbar}>
              Login
            </NavLink>
          </li>
          <li className="nav-item nav-item me-3">
            <NavLink className="nav-link bi bi-box-arrow-in-right text-light" to="/clglogin" onClick={closeNavbar}>
              INSTITUTE LOGIN
            </NavLink>
          </li>
        </>
      );
    
  };
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${isNavbarOpen ? 'show' : ''}`}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" onClick={closeNavbar}>
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

export default Navbar;

