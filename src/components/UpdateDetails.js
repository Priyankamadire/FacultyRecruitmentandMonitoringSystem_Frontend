// import React, { useState } from 'react';
// import axios from 'axios';

// const UpdateDetails = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [experience, setExperience] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

//   const handleNameUpdate = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/update-name', {
//         method: "PATCH",
//         headers: {
//           Accept: 'application/json',
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         credentials: 'include',
//         body: JSON.stringify({ name }) // Stringify the body data
//       });
  
//       const data = await response.json(); // Parse the JSON response
//       setMessage(data.message);
  
//       if (data.success) {
//         // If name is updated successfully, update the name in the state
//         setName('');
//       }
//     } catch (error) {
//       console.error('Error updating name:', error);
//     }
//   };
//   const handlePhoneUpdate = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/update-phone', {
//         method: "PATCH",
//         headers: {
//           Accept: 'application/json',
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         credentials: 'include',
//         body: JSON.stringify({ phone }) // Stringify the body data
//       });
  
//       const data = await response.json(); // Parse the JSON response
//       setMessage(data.message);
  
//       if (data.success) {
//         // If name is updated successfully, update the name in the state
//         setPhone('');
//       }
//     } catch (error) {
//       console.error('Error updating name:', error);
//     }
//   };

//   const handleEmailUpdate = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/update-email', {
//         method: "PATCH",
//         headers: {
//           Accept: 'application/json',
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email }) // Use the email variable in the body
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update email');
//       }
  
//       const data = await response.json(); // Parse the JSON response
//       setMessage(data.message);
//       if (data.success) {
//         // If email is updated successfully, update the email in the state
//         setEmail('');
//       }
//     } catch (error) {
//       console.error('Error updating email:', error);
//       setMessage('Failed to update email');
//     }
//   };
  
  
//   const handleExperienceUpdate = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/update-experience', {
//           method: "PATCH",
//           headers: {
//             Accept: 'application/json',
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           credentials: 'include',
//           body: JSON.stringify({ experience }) // Use the email variable in the body
//         });
    
//         if (!response.ok) {
//           throw new Error('Failed to update email');
//         }
    
//         const data = await response.json(); // Parse the JSON response
//         setMessage(data.message);
//         if (data.success) {
//           // If email is updated successfully, update the email in the state
//           setExperience('');
          
//         }
//       } catch (error) {
//         console.error('Error updating experience:', error);
//         setMessage('Failed to update experience');
//       }
//   };

//   const handlePasswordUpdate = async () => {
//     // try {
//     //   const response = await axios.patch('http://localhost:5000/update-password', { currentPassword, newPassword });
//     //   setMessage(response.data.message);
//     // } catch (error) {
//     //   console.error('Error updating password:', error);
//     // }
//     try {
//         const response = await fetch('http://localhost:5000/update-password', {
//           method: "PATCH",
//           headers: {
//             Accept: 'application/json',
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           credentials: 'include',
//           body: JSON.stringify({ currentPassword, newPassword }) // Use the email variable in the body
//         });
    
//         if (!response.ok) {
//           throw new Error('Failed to update email');
//         }
    
//         const data = await response.json(); // Parse the JSON response
//         setMessage(data.message);
//         if (data.success) {
//           // If email is updated successfully, update the email in the state
//           setCurrentPassword('');
//           setNewPassword('');
//         }
//       } catch (error) {
//         console.error('Error updating password:', error);
//         setMessage('Failed to update password');
//       }
//   };

//   return (
//     <div>
//       <h2>Update Name</h2>
//       <input type="text" placeholder="Enter new name" value={name} onChange={(e) => setName(e.target.value)} />
//       <button onClick={handleNameUpdate}>Update Name</button>

//       <h2>Update Email</h2>
//       <input type="email" placeholder="Enter new email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <button onClick={handleEmailUpdate}>Update Email</button>
//       <h2>Update Phone</h2>
//       <input type="phone" placeholder="Enter new phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
//       <button onClick={handlePhoneUpdate}>Update Phone</button>

//       <h2>Update Experience</h2>
//       {/* <input type="text" placeholder="Enter new experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
//       <button onClick={handleExperienceUpdate}>Update Experience</button> */}
// <input type="text" placeholder="Enter new experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
// <button onClick={handleExperienceUpdate}>Update Experience</button>

//       <h2>Update Password</h2>
//       <input type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
//       <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//       <button onClick={handlePasswordUpdate()}>Update Password</button>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default UpdateDetails;
import React, { useState } from 'react';
import axios from 'axios';
import './udateDet.css'
const UpdateDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  const handleNameUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-name', {
        method: "PATCH",
        headers: {
          Accept: 'application/json',
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ name })
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        setName('');
      }
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };
  const handlePhoneUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-phone', {
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
      const response = await fetch('http://localhost:5000/update-email', {
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
  
  
  const handleExperienceUpdate = async () => {
    try {
        const response = await fetch('http://localhost:5000/update-experience', {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({ experience }) // Use the email variable in the body
        });
    
        if (!response.ok) {
          throw new Error('Failed to update email');
        }
    
        const data = await response.json(); // Parse the JSON response
        setMessage(data.message);
        if (data.success) {
          // If email is updated successfully, update the email in the state
          setExperience('');
          
        }
      } catch (error) {
        console.error('Error updating experience:', error);
        setMessage('Failed to update experience');
      }
  };

  // Similar handle functions for other updates...

  const handlePasswordUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-password', {
        method: "PATCH",
        headers: {
          Accept: 'application/json',
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
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
   {/* <div  className="container">
    <div className="box-model" style={{ backgroundColor: 'rgba(255, 255, 153, 0.5)' }}> */}
    <div className="container"style={{ flex: '1', paddingRight: '20px' }}>
      <div className="white-box">
        <div className="update-form-container">
          <h2>Update Name</h2>
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter new name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
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
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter new email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required // Add the required attribute
            />
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
            <input 
              type="tel" 
              className="form-control" 
              placeholder="Enter new phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required // Add the required attribute
            />
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
  
          <h2>Update Experience</h2>
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter new experience" 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)} 
              required // Add the required attribute
            />
            <button 
              className="btn btn-success"
              onClick={() => { 
                if (experience.trim() !== '') { // Check if experience is not empty
                  handleExperienceUpdate(); 
                  setMessage(''); 
                } 
              }}
              disabled={experience.trim() === ''} // Disable the button if experience is empty
            >
              Update
            </button>
          </div>
  
          <h2>Update Password</h2>
          <div className="input-group">
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter current password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              required // Make current password input required
            />
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter new password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required // Make new password input required
            />
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
   <br/>

  
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
   
   
   </>
  );
  
};

export default UpdateDetails;
