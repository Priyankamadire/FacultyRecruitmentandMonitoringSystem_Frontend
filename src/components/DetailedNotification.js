import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailedNotification = () => {
  const { email, jobid } = useParams(); // Retrieve email and jobid from URL parameters
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/myynotification/${email}/${jobid}`, {
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
  }, [email, jobid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Detailed Notifications for {email} - Job ID: {jobid}</h1>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>
            <strong>Email:</strong> {notification.email}<br />
            <strong>Message:</strong> {notification.message}<br />
            <strong>Status:</strong> {notification.status}<br />
            <strong>Job ID:</strong> {notification.jobid}<br />
            <strong>Created At:</strong> {new Date(notification.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailedNotification;
