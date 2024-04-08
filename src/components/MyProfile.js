import React, { useState, useEffect } from 'react';

const Myprofile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/myprofile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <h1>My Profile</h1>
      
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Experience: {profile.experience}</p>
          <p>Qualification: {profile.qualification}</p>

          {/* Add other profile details here */}
        </div>
      
    </div>
  );
};

export default Myprofile;
