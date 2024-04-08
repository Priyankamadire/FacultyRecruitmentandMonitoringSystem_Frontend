import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'
import { NavLink } from 'react-router-dom';
const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/aboutpage', {
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
      navigate('/login');
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
    <h1>Details of {userData.name}</h1>
    <NavLink to="/updatedeta">
      <button className="btn btn-success bi bi-gear"> Settings</button>
    </NavLink>
  </div>
  <form method='GET'>
    <div className="row">
      <div className="col-md-4">
        <img
          src="https://vectorified.com/images/no-profile-picture-icon-8.jpg"
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
        <h2>Name: {userData.name}</h2>
        <h2>Email: {userData.email}</h2>
        <h2>Qualification: {userData.qualification}</h2>
        <h2>Experience: {userData.experience}</h2>
      </div>
    </div>
  </form>
</div>
    </>
  );
};

export default UserProfile;
