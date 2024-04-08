import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Notifi.css'
const Notification = () => {
  const { email } = useParams(); // Only retrieving the email parameter
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
// 
const [userData,setUserData] = useState({});
const callAboutPage = async () => {
  try {
    const res = await fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/aboutpage', {
      method :"GET",
      headers: {
        // 'Authorization': `Bearer ${token}`,
         Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // withCredentials: true
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
// const show = true;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/myennotification/${email}`, { // Fetching notifications based on email only
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data.notifications);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications. Please try again later.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>  <br/>
    <div className="container-fluid">
  <h1 className="title">Notifications for {userData.name}</h1>
  <ul className="notification-list">
    {notifications.map(notification => (
      <li key={notification._id} className="notification-item">
        <p className="notification-content bi bi-bell-fill text-dark">
          <strong className="user-name">{userData.name}: </strong>
          {notification.message}
        </p>
      </li>
    ))}
  </ul>
</div>

</>
  );
};

export default Notification;