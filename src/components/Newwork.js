import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
// name,workedpost,instituteid,qualification,department,retairedyear,phone,email
const Newwork = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState({
    name: '',
    workingpost: '',
    newinstituteid: '',
    qualification: '',
    department: '',
    year: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredProducts = products.filter(product => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return searchTerms.every(term =>
      Object.values(product).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/nofaculty/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        setProducts(data.facultyDetails); // Update the products state with fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/nfaculty/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin),
        credentials: 'include'
      });
  
      if (!res.ok) {
        throw new Error('Failed to post data');
      }
  
      // Refresh the data after posting
      const updatedData = await res.json();
      setProducts(updatedData.facultyDetails); // Update products with the updated data
      setAdmin({
        name: '',
        workingpost: '',
        newinstituteid: '',
        qualification: '',
        department: '',
        year: '',
        phone: '',
        email: ''
      });
  
      // Reload the page to reflect the updated data
      window.location.reload();
  
      alert('Faculty details uploaded successfully');
    } catch (error) {
      console.error('Error posting faculty details:', error);
      alert('Error posting faculty details. Please try again later.');
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
      <br/>
      <div>
      <strong>
        <center>
        <em>
          <h2>
          Details of Faculty who have joined  in the Institute Recently
            </h2></em>
        </center>
      </strong>

        
        <div className="table-responsive">
          <table className="table table-striped" style={{ width: '100%' }}>
            <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
              <tr>
                <th>NAME</th>
                <th>WORKING_POST</th>
                <th>NEW INSTITUTE_ID</th>
                <th>QUALIFICATION</th>
                <th>DEPARTMENT</th>
                <th>JOINED YEAR</th>
                <th>MOBILE NUMBER</th>
                <th>MAIL_ID</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: '#fff' }}>
            {filteredProducts.map(product => (
                  <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.workingpost}</td>
                  <td>{product.newinstituteid}</td>
                  <td>{product.qualification}</td>
                  <td>{product.department}</td>
                  <td>{product.year}</td>
                  <td>{product.phone}</td>
                  <td>{product.email}</td>
                </tr>
              ))}
              <tr>
                <td><input type="string" name="name" id="name" value={admin.name} onChange={handleInputs} /></td>
                <td><input type="string" name="workingpost" id="workingpost" value={admin.workingpost} onChange={handleInputs} /></td>
                <td><input type="string" name="newinstituteid" id="newinstituteid" value={admin.newinstituteid} onChange={handleInputs} /></td>
                <td><input type="string" name="qualification" id="qualification" value={admin.qualification} onChange={handleInputs} /></td>
                <td><input type="string" name="department" id="department" value={admin.department} onChange={handleInputs} /></td>
                <td><input type="string" name="year" id="year" value={admin.year} onChange={handleInputs} /></td>
                <td><input type="number" name="phone" id="phone" value={admin.phone} onChange={handleInputs} /></td>
                <td><input type="string" name="email" id="email" value={admin.email} onChange={handleInputs} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <button className="btn btn-secondary table-submit" onClick={PostData}>
          POST
        </button>
      </div>
      <Outlet />
    </div>
  );
  
};

export default Newwork;
