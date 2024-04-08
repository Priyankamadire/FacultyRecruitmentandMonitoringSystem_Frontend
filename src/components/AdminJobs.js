import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminJobs = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate(`/jobsposted/${userName}`);
  };

  useEffect(() => {
    callHomePage();
  }, []); // Fetch institution name only once when component mounts

  return (
    <div>
      <button onClick={handleClick}>Go to Jobs Posted</button>
    </div>
  );
};

export default AdminJobs;
