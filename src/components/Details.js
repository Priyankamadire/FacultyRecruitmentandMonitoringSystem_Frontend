import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Detail.css'
const Details = () => {
  const [collegeId, setCollegeId] = useState('');
  const navigate = useNavigate();

  const callHomePage = async () => {
    try {
      const res = await fetch('http://localhost:5000/getclgusername', {
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
      setCollegeId(data._id); // Assuming _id is the property containing the college ID
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  const handleClick = () => {
    // Redirect to the Facwork component with college ID (_id) as a parameter
    navigate(`/facwork/${collegeId}`);

  };
  const handleONClick = () => {
    // Redirect to the Facwork component with college ID (_id) as a parameter
    navigate(`/retwork/${collegeId}`);

  };
  const handlElick = () => {
    // Redirect to the Facwork component with college ID (_id) as a parameter
    navigate(`/nework/${collegeId}`);

  };
  
  return (
    <>
    <br/>
    <div className="container-fluid">
      <div className="card-container">
        <div className="card">  <center>
          <h2>Check and Add Working Faculty Details</h2>
        
          <button className="btn btn-primary" onClick={handleClick}>Check</button>

          </center>
        </div>
      </div>
    <br/>

  
      <div className="card-container">
        <div className="card">
        <center>
          <h2>Check and Add Retired Faculty Details</h2>
          <button className="btn btn-primary" onClick={handleONClick}>Check</button>  </center>
        </div>
      </div>
    <br/>

  
      <div className="card-container">
        <div className="card">  <center>
          <h2>Check and Add Newly Joined Faculty Details</h2>
          <button className="btn btn-primary" onClick={handlElick}>Check</button>  </center>
        </div>
      </div>
    </div>
    </>
  );
  
  
};

export default Details;
