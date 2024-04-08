
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ApplicantDetails = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState({});
  const [token, setToken] = useState('');
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseApplicants = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/applicants/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const responseData = await responseApplicants.json();
        if (!responseApplicants.ok) {
          throw new Error(responseData.error || 'Failed to fetch applicants');
        }
        setApplicants(responseData.applications);

        const responseJobDetails = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/clgjobs/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const jobDetailsData = await responseJobDetails.json();
        if (!responseJobDetails.ok) {
          throw new Error(jobDetailsData.error || 'Failed to fetch job details');
        }
        setJobDetails(jobDetailsData.job);

        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const tokenFromCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt_token\s*=\\s*([^;]*).*$)|^.*$/, "$1");
    setToken(tokenFromCookie);
  }, []);

  const handleHireOrReject = async (email, action) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to ${action} this applicant?`);
      if (!confirmed) return;

      const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/${action}/${email}/${id}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: action === 'hire' ? `Congratulations! Your application has been accepted by ${jobDetails.instname} for ${jobDetails.postavailable}` :
            `We regret to inform you that your application has been rejected by ${jobDetails.instname} for ${jobDetails.postavailable}`,
          status: action
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} applicant`);
      }

      // Remove the hired or rejected applicant from the list
      const updatedApplicants = applicants.filter(applicant => applicant.email !== email);
      setApplicants(updatedApplicants);

      // Delete the applicant if hired or rejected
      await handleDelete(email);
    } catch (error) {
      console.error(`Error ${action}ing applicant:`, error);
    }
  };

  const handleDelete = async (email) => {
    try {
      const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/applicants/${id}/${email}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete applicant');
      }
    } catch (error) {
      console.error('Error deleting applicant:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredProducts = applicants.filter(product => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return searchTerms.every(term =>
      Object.values(product).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  });
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
      <h1 className="text-center">Applicants for Job Post {jobDetails.postavailable} at {jobDetails.instname}</h1>
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-custom"> {/* Set thead color */}
            <tr>
              <th>Name</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Resume Link</th>
              <th>Hire</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody className="tbody-white"> {/* Set tbody color */}
            
                  {filteredProducts.map(applicant => (
                  <tr key={applicant._id}>
                <td>{applicant.name}</td>
                <td>{applicant.qualification}</td>
                <td>{applicant.experience}</td>
                <td><a href={applicant.resume} target="_blank" rel="noopener noreferrer">Resume</a></td>
                <td><button className="btn btn-success" onClick={() => handleHireOrReject(applicant.email, 'hire')}>Hire</button></td> {/* Green button */}
                <td><button className="btn btn-danger" onClick={() => handleHireOrReject(applicant.email, 'reject')}>Reject</button></td> {/* Red button */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default ApplicantDetails;
