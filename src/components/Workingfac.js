// WorkingFac.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Workingfac = () => {
  const { collegeId } = useParams();
  const [facultyDetails, setFacultyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/wofaculty/${collegeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch faculty details');
        }
        const data = await response.json();
        setFacultyDetails(data.facultyDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching faculty details:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchFacultyDetails();
  }, [collegeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Faculty Details</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>WORKING_POST</th>
                <th>INSTITUTE_ID</th>
                <th>QUALIFICATION</th>
                <th>DEPARTMENT</th>
                <th>JOINED YEAR</th>
                <th>MOBILE NUMBER</th>
                <th>MAIL_ID</th>
                 {/* name, workingpost, instituteid, qualification, department, year, phone, email  */}
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {facultyDetails.map((faculty, index) => (
            <tr key={index}>
              <td>{faculty.name}</td>
              <td>{faculty.workingpost}</td>
              <td>{faculty.instituteid}</td>
              <td>{faculty.qualification}</td>
              <td>{faculty.department}</td>
              <td>{faculty.year}</td>
              <td>{faculty.phone}</td>
              <td>{faculty.email}</td>


              {/* Add more table cells for other details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workingfac;
