import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './Notifi.css';

const Notification = () => {
  const navigate = useNavigate();
  const { email } = useParams(); // Only retrieving the email parameter
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/alljobs", {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();

        if (response.ok) {
          setJobs(data.jobs.reverse()); // Reverse the jobs array here
          setLoading(false);
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch jobs');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
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
      }
    };

    callAboutPage();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/myennotification/${email}`, {
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

  const handleApply = (jobId) => {
    // Redirect to the apply page with the job ID
    navigate(`/applies/${jobId}`); // Use navigate here
  };

  return (
    <>
      <br />
      <div className="container-fluid">
        <h1 className="title">Notifications for {userData.name}</h1>
        {jobs.length > 0 && (
          <ul className="notification-list">
            {jobs.map(job => (
              <li key={job.id} className="notification-item">
                <p className="notification-content bi bi-bell-fill text-dark">
                  You have a new job from {job.instname} for {job.postavailable} lecturer. Click here to
                  <NavLink to={`/applies/${job._id}`}> Apply</NavLink>
                </p>
              </li>
            ))}
          </ul>
        )}

        <ul className="notification-list">
          {/* Rendering notifications */}
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
