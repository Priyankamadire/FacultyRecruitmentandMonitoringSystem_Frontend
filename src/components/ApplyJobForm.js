import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ApplyJobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [apply, setApply] = useState({
    name:'',
    email:'',
    age:'',
    postavailable: '',
    qualification: '',
    experience: '',
    department: '',
    jobid:'',
    resume: ''
    
  });
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/aboutpage', {
          method :"GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await res.json();
        setUserDetails(data);
        if (!res.ok) { 
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/jobs/${id}`, {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const data = await response.json();
        if (response.ok) {
          setJobDetails(data.job);
          setLoading(false);
          setError(null);
        } 
       
        else {
          throw new Error(data.message || 'Failed to fetch job details');
        }

      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again later.');
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setApply({ ...apply, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name,email, age, postavailable, qualification, experience, department, resume } = apply;
    try {
      const res = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/apply/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name:userDetails.name,
          instname:jobDetails.instname,
          email:userDetails.email,
          age,
          postavailable: jobDetails.postavailable,
          qualification: userDetails.qualification,
          experience: userDetails.experience,
          department: jobDetails.department,
          jobid: jobDetails.jobid,
          resume

        }),
        credentials: 'include'
      });
      const data = await res.json();
     
      if (!res.ok) {
        throw new Error(data.message || 'Failed to apply');
      }
      window.alert(data.message);
      navigate("/jobtable")
      // Redirect to homepage after successful submission
      // window.location.href = '/';
    } catch (error) {
      console.error(error);
      window.alert("Failed to apply");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <br/>
      <div className="box" style={{ backgroundColor: "#f0f8ff", borderRadius: "10px", maxWidth: "500px", margin: "auto", padding: "10px 20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <form>
          <center>
            <h1 style={{ color: "#007bff" }}>Apply for  {jobDetails.instname} JOB</h1>
          </center>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={userDetails.name} onChange={handleInputs} readOnly={true} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <label htmlFor="age">Age:</label>
          <input type="age" name="age" id="age" value={apply.age} onChange={handleInputs} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <label htmlFor="postavailable">Post Available:</label>
          <input type="text" name="postavailable" id="postavailable" value={jobDetails.postavailable} readOnly={true} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <label htmlFor="qualification">Qualification</label>
          <input type="text" name="qualification" id="qualification" value={userDetails.qualification} onChange={handleInputs} placeholder="eg: 5 yrs" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <label htmlFor="experience">Experience</label>
          <input type="text" name="experience" id="experience" value={userDetails.experience} onChange={handleInputs} placeholder="eg: 5 yrs" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <label htmlFor="department">Department</label>
          <input type="text" name="department" id="department" value={jobDetails.department} readOnly={true} onChange={handleInputs} placeholder="eg: CSE" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <label htmlFor="resume">Resume:</label>
          <input type="text" name="resume" id="resume" value={apply.resume} onChange={handleInputs} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <button type="submit" className="btn btn-primary" onClick={PostData} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>POST</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobForm;
