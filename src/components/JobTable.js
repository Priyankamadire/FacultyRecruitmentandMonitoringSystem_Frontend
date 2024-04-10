import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './JobTable.css';

const JobTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/jobs", {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();

        if (response.ok) {
          setJobs(data.jobs);
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

  const handleApply = (jobId) => {
    // Redirect to the apply page with the job ID
    navigate(`/applies/${jobId}`); // Use navigate here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (jobs.length === 0) {
    return <div>No jobs found</div>;
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter(product => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return searchTerms.every(term =>
      Object.values(product).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  });

  // Reverse the filteredJobs array
  const reversedJobs = filteredJobs.reverse();

  return (
    <div>
      <center><strong><h1>All Jobs</h1></strong></center>
      <br />

      <form className="d-flex" style={{ width: '100%' }}>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: '100%' }}
        />
      </form>

      <div className="job-listing">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Institute</th>
                <th>Post Available</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Department</th>
                <th>Job ID</th>
                <th>Last Date to Apply</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reversedJobs.map(job => (
                <tr key={job._id}>
                  <td>{job.instname}</td>
                  <td>{job.postavailable}</td>
                  <td>{job.qualification}</td>
                  <td>{job.experience}</td>
                  <td>{job.department}</td>
                  <td>{job.jobid}</td>
                  <td>{job.date}</td>
                  <td>
                    <button className="apply-btn" onClick={() => handleApply(job._id)}>Apply</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
