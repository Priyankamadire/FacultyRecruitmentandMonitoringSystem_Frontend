import React, { useState, useEffect } from 'react';

const UHome = () => {
  const [userName, setUserName] = useState('');
  
  const callHomePage = async () => {
    try {
      const res = await fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/getusername', {
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
      setUserName(data.name);
     
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []); // Empty dependency array since we only want to run once on component mount

  return (
    <div className="home-page">
      <div className="home-div">
        <p className="pt-5">Welcome</p>
        <br />
        <h1>{userName}</h1>
        <h1>{ 'happy to see u back' }</h1>
      </div>
    </div>
  );
};

export default UHome;
