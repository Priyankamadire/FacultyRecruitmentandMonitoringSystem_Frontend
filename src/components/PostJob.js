import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [admin, setAdmin] = useState({
  
    postavailable: "",
    qualification: "",
    experience: "",
    department: "",
    jobid: "",
    date: ""
  });

  const navigate = useNavigate();

  // Empty dependency array ensures useEffect runs only once

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  const PostData = async (e) => {
    e.preventDefault();
    const { postavailable, qualification, experience, department, jobid, date } = admin;
    try {
      const res = await fetch("https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/postingjob", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
         postavailable, qualification, experience, department, jobid, date
        }),
        credentials: 'include' // Include credentials (cookies) in the request
      });
      if (!res.ok) {
        throw new Error('Failed to post job');
      }
      const data = await res.json();
      if (data.message) {
        window.alert(data.message);
        navigate('/clghome');
      }
    } catch (error) {
      console.error(error);
      window.alert("Failed to post job");
    }
};


  

  return (
    <div>
      <br/>
      <div className="box" style={{ backgroundColor: "#f0f8ff", borderRadius: "10px", maxWidth: "500px", margin: "auto", padding: "10px 20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <form>
          <center>
            <h1 style={{ color: "#007bff" }}>POST A JOB</h1>
          </center>
          {/* <label htmlFor="instname">Institute Name:</label>
          <input type="text" name="instname" id="instname" value={admin.instname} onChange={handleInputs} placeholder="eg: KMIT" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} /> */}

          {/* Other input fields */}
          <label htmlFor="postavailable">Post Available:</label>
                    <input type="text" name="postavailable" id="postavailable" value={admin.postavailable} onChange={handleInputs} placeholder="eg: PPS Lecturer" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="qualification">Qualification Required:</label>
                    <input type="text" name="qualification" id="qualification" value={admin.qualification} onChange={handleInputs} placeholder="eg: MTech" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="experience">Experience Required:</label>
                    <input type="text" name="experience" id="experience" value={admin.experience} onChange={handleInputs} placeholder="eg: 5 yrs" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="department">Department:</label>
                    <input type="text" name="department" id="department" value={admin.department} onChange={handleInputs} placeholder="eg: CSE" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="jobid">JOB ID:</label>
                    <input type="text" name="jobid" id="jobid" value={admin.jobid} onChange={handleInputs} placeholder="eg: 35E" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="date">Last Day to Apply:</label>
                    <input type="date" name="date" id="date" value={admin.date} onChange={handleInputs} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
{/* 
                    <label htmlFor="clgcode">Clg Code:</label>
          <input type="text" name="clgcode" id="clgcode" value={admin.clgcode} onChange={handleInputs} placeholder="eg: KR56" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} /> */}

          <center>
            <button type="submit" name="signup" id="signup" className="btn btn-primary" onClick={PostData} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>POST</button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default PostJob;