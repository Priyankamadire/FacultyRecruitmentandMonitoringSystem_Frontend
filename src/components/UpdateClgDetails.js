import React from 'react'
import { useState } from 'react';
import './udateDet.css'

const UpdateClgDetails = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [clgcode, setClgCode] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
    const handleNameUpdate = async () => {
      try {
        const response = await fetch('http://localhost:5000/update-clgname', {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({ name }) // Stringify the body data
        });
    
        const data = await response.json(); // Parse the JSON response
        setMessage(data.message);
    
        if (data.success) {
          // If name is updated successfully, update the name in the state
          setName('');
        }
      } catch (error) {
        console.error('Error updating name:', error);
      }
    };
    const handlePhoneUpdate = async () => {
      try {
        const response = await fetch('http://localhost:5000/update-clgphone', {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({ phone }) // Stringify the body data
        });
    
        const data = await response.json(); // Parse the JSON response
        setMessage(data.message);
    
        if (data.success) {
          // If name is updated successfully, update the name in the state
          setPhone('');
        }
      } catch (error) {
        console.error('Error updating name:', error);
      }
    };
  
    const handleEmailUpdate = async () => {
      try {
        const response = await fetch('http://localhost:5000/update-clgemail', {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({ email }) // Use the email variable in the body
        });
    
        if (!response.ok) {
          throw new Error('Failed to update email');
        }
    
        const data = await response.json(); // Parse the JSON response
        setMessage(data.message);
        if (data.success) {
          // If email is updated successfully, update the email in the state
          setEmail('');
        }
      } catch (error) {
        console.error('Error updating email:', error);
        setMessage('Failed to update email');
      }
    };
    
    
    const handleCodeUpdate = async () => {
      try {
          const response = await fetch('http://localhost:5000/update-clgcode', {
            method: "PATCH",
            headers: {
              Accept: 'application/json',
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ clgcode }) // Use the email variable in the body
          });
      
          if (!response.ok) {
            throw new Error('Failed to update code');
          }
      
          const data = await response.json(); // Parse the JSON response
          setMessage(data.message);
          if (data.success) {
            // If email is updated successfully, update the email in the state
            setClgCode('');
            
          }
        } catch (error) {
          console.error('Error updating code:', error);
          setMessage('Failed to update clg');
        }
    };
  
    const handlePasswordUpdate = async () => {
      // try {
      //   const response = await axios.patch('http://localhost:5000/update-password', { currentPassword, newPassword });
      //   setMessage(response.data.message);
      // } catch (error) {
      //   console.error('Error updating password:', error);
      // }
      try {
          const response = await fetch('http://localhost:5000/update-clgpassword', {
            method: "PATCH",
            headers: {
              Accept: 'application/json',
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ currentPassword, newPassword }) // Use the email variable in the body
          });
      
          if (!response.ok) {
            throw new Error('Failed to update email');
          }
      
          const data = await response.json(); // Parse the JSON response
          setMessage(data.message);
          if (data.success) {
            // If email is updated successfully, update the email in the state
            setCurrentPassword('');
            setNewPassword('');
          }
        } catch (error) {
          console.error('Error updating password:', error);
          setMessage('Failed to update password');
        }
    };
  
    return (
    <>
   <br/>

      <div className="container"style={{ flex: '1', paddingRight: '20px' }}>
      <div className="white-box">
        <div className="update-form-container">
          
        <h2>Update Institute Name</h2>
        <div className="input-group">
        
        <input
         type="text"
         className="form-control" 
          placeholder="Enter  Institute name"
           value={name} 
           onChange={(e) => setName(e.target.value)} />
           <button 
              className="btn btn-success"
              onClick={() => { 
                if (name.trim() !== '') { // Check if name is not empty
                  handleNameUpdate(); 
                  setMessage(''); 
                } 
              }}
              disabled={name.trim() === ''} // Disable the button if name is empty
            >
              Update
            </button>
  </div>
        <h2>Update Email</h2>
        <div className="input-group">
        
        <input type="email" 
              className="form-control" 

        placeholder="Enter new email"
         value={email} 
         onChange={(e) => setEmail(e.target.value)}  required  />
        {/* <button onClick={() => {handleEmailUpdate(); window.alert("Email Updated successfully");  }}>Update Email</button> */}
        <button 
              className="btn btn-success"
              onClick={() => { 
                if (email.trim() !== '') { // Check if email is not empty
                  handleEmailUpdate(); 
                  setMessage(''); 
                } 
              }}
              disabled={email.trim() === ''} // Disable the button if email is empty
            >
              Update
            </button>
          </div>
        <h2>Update Phone</h2>
        <div className="input-group">
        <input type="phone" 
              className="form-control" 

        placeholder="Enter new phone"
         value={phone}
          onChange={(e) => setPhone(e.target.value)} />
    <button 
              className="btn btn-success"
              onClick={() => { 
                if (phone.trim() !== '') { // Check if phone is not empty
                  handlePhoneUpdate(); 
                  setMessage(''); 
                } 
              }}
              disabled={phone.trim() === ''} // Disable the button if phone is empty
            >
              Update
            </button>
          </div>
        <h2>Update Institute Code</h2>
        <div className="input-group">

        {/* <input type="text" placeholder="Enter new experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
        <button onClick={handleExperienceUpdate}>Update Experience</button> */}
  <input type="text"
              className="form-control" 

   placeholder="Enter new Institute code" value={clgcode} onChange={(e) => setClgCode(e.target.value)} />
  {/* <button onClick={() => { handleCodeUpdate(); window.alert("Clg code Updated successfully "); }}>Update Clg code</button> */}
  <button 
              className="btn btn-success"
              onClick={() => { 
                if (clgcode.trim() !== '') { // Check if experience is not empty
                  handleCodeUpdate();
                  setMessage(''); 
                } 
              }}
              disabled={clgcode.trim() === ''} // Disable the button if experience is empty
            >
              Update
            </button>
          </div>
        <h2>Update Password</h2>
        <div className="input-group">
        <input type="password"
              className="form-control" 

         placeholder="Enter current password"
          value={currentPassword}
           onChange={(e) => setCurrentPassword(e.target.value)} required  />
        <input type="password" 
              className="form-control" 

         placeholder="Enter new password" 
         value={newPassword} 
         onChange={(e) => setNewPassword(e.target.value)} />
        {/* <button onClick={() =>{handlePasswordUpdate();  window.alert("Password Updated successfully ");}}>Update Password</button> */}
        <button 
              className="btn btn-success"
              onClick={() => { 
                if (currentPassword.trim() !== '' && newPassword.trim() !== '') { // Check if both inputs are not empty
                  handlePasswordUpdate(); 
                  setMessage(''); 
                } 
              }}
              disabled={currentPassword.trim() === '' || newPassword.trim() === ''} // Disable the button if either input is empty
            >
              Update
            </button>
          </div>
        {message && <p>{message}</p>}
        </div></div>
      </div></>
    );
  };
  

export default UpdateClgDetails
