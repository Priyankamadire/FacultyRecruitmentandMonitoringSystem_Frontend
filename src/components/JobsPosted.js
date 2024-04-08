import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const JobsPosted = () => {
  const [searchQuery, setSearchQuery] = useState('');
    const { instname } = useParams(); // Accessing the instname parameter from the URL
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('jwt_token');

                const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/clgs/clgjobs/${instname}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const data = await response.json();
                setJobs(data.jobs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, [instname]);
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
    const filteredProducts = jobs.filter(product => {
      const searchTerms = searchQuery.toLowerCase().split(" ");
      return searchTerms.every(term =>
        Object.values(product).some(value =>
          value.toString().toLowerCase().includes(term)
        )
      );
    });
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/clgjobs/${id}`, {
                    method: 'GET',
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json'
                    },
                    credentials: 'include'
                });
    
                const data = await response.json();
                if (response.ok) {
                    // Assuming `jobid` is a property of `data.job`
                    setUser(data.job);
                } else {
                    throw new Error(data.error || 'Failed to fetch job details');
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };
    
        fetchJobDetails();
    }, [id]);
    

    return (
        <div className="container-fluid">
          <br/>
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
          <h2 className="text-center">Jobs Posted by {instname}</h2>
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-dark"> {/* Set thead color */}
                <tr>
                  <th>Job ID</th>
                  <th>Post Available</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Department</th>
                  <th>View Applicant Details</th>
                </tr>
              </thead>
              <tbody className="tbody-white"> {/* Set tbody color */}
               
                     {filteredProducts.map(job => (
                  <tr key={job._id}>
                    <td>{job.jobid}</td>
                    <td>{job.postavailable}</td>
                    <td>{job.qualification}</td>
                    <td>{job.experience}</td>
                    <td>{job.department}</td>
                    <td><NavLink to={`/applicantdetails/${job._id}`}>VIEW</NavLink></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      
};

export default JobsPosted;
