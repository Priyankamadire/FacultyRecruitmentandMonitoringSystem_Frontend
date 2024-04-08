import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewDetailJob = () => {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("ViewDetailJob component mounting...");
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
                } else {
                    throw new Error(data.message || 'Failed to fetch job details');
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
                setError('Failed to fetch job details. Please try again later.');
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Job Details</h2>
            <p><strong>Institution:</strong> {jobDetails.instname}</p>
            <p><strong>Post Available:</strong> {jobDetails.postavailable}</p>
            <p><strong>Qualification Required:</strong> {jobDetails.qualification}</p>
            <p><strong>Experience Required:</strong> {jobDetails.experience}</p>
            <p><strong>Department:</strong> {jobDetails.department}</p>
            <p><strong>Job ID:</strong> {jobDetails.jobid}</p>
            <p><strong>Date:</strong> {jobDetails.date}</p>
        </div>
    );
};

export default ViewDetailJob;
