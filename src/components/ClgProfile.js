import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'
import { NavLink } from 'react-router-dom';
const ClgProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/getclgusername', {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setUserData(data);
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
    <br></br>

    <div className="container emp-profile">
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
    <h1>Details of {userData.clgname}</h1>
    <NavLink to="/clgdetailsupdate">
      <button className="btn btn-success bi bi-gear"> Settings</button>
    </NavLink>
  </div>
  <form method='GET'>
    <div className="row">
      <div className="col-md-4">
        <img
          src="https://collegeaftermath.com/wp-content/uploads/2022/09/michael-marsh-U0dBV_QeiYk-unsplash-1-1024x670.jpg"
          alt="Profile"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "50%"
          }}
        />
      </div>
      <div className="col-md-8">
        <br />
        <br />
        <h2>Name: {userData.clgname}</h2>
        <h2>Email: {userData.clgemail}</h2>
        <h2>Code: {userData.clgcode}</h2>
        <h2>Phone: {userData.clgphone}</h2>
      </div>
    </div>
  </form>
</div>
    </>
  );
};

export default ClgProfile;
