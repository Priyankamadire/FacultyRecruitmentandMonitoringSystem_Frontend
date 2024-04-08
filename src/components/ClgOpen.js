import React, { useState, useEffect } from 'react';

const ClgOpen = () => {
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
    }, []); // Empty dependency array since we only want to run once on component mount
  
    return (
      <div className="home-page">
        <div className="home-div">
          {/* <p className="pt-5">Welcome</p> */}
          <br />
          <h1>{userName}</h1>
          <h1>Welcome to page</h1>
        </div>
      </div>
    );
};


export default ClgOpen
