// import React,{useEffect,useState} from 'react';
// import './Contact.css'
// const Contact = () => {
//   const [userData,setUserData] = useState({name:"",email:"",phone:"",message:""});
//   const contactsForm = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/contacts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//       });
//       const data = await response.json();
//       if (!data) {
//         console.log('Message not sent');
//       } else {
//         alert('Message sent');
//         setUserData({ name: '', email: '', phone: '', message: '' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to send message');
//     }
//   };
//   const callContact = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/getdata', {
//         method :"GET",
//         headers: {
//           // 'Authorization': `Bearer ${token}`,
//           //  Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         // withCredentials: true
//         credentials: 'include'
//       });
//       const data = await res.json();
//       setUserData({...userData,
//         name:data.name,
//         email:data.email, 
//         phone:data.phone});
//        console.log(data);
//       if (!res.status === 200) { 
//         const error = new Error(res.error);
//         throw error;

//       }
//     } catch (err) {
//       console.error(err);
     
//     }
//   };

//   useEffect(() => {
//     callContact();
//     contactsForm();
//   }, []);
//   const handleInputs = (e)=>{
//     const name = e.target.name;
//     const value = e.target.value;
//     setUserData({...userData,
//       [name]:value
     
//     })
//   }
 
//   return (
//     <>
//       <div className="contact_info">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
//               {/* Phone number */}
//               <div className="contact_info_item d-flex justify-content-start align-items-center">
//                 <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
//                 <div className="contact_info_content">
//                   <div className="contact_info_title">
                   
//                   </div>
//                   <div className="contact_info_text">
//                     +91 9849241792
//                   </div>
//                 </div>
//               </div>
//               {/* Email address */}
//               <div className="contact_info_item d-flex justify-content-start align-items-center">
//                 <img src="https://img.icons8.com/office/24/000000/email.png" alt="email" />
//                 <div className="contact_info_content">
//                   <div className="contact_info_title">
                  
//                   </div>
//                   <div className="contact_info_text">
//                     madirepriyanka01@gmail.com
//                   </div>
//                 </div>
//               </div>
//               {/* Address */}
//               <div className="contact_info_item d-flex justify-content-start align-items-center">
//                 <img src="https://img.icons8.com/office/24/000000/address.png" alt="address" />
//                 <div className="contact_info_content">
//                   <div className="contact_info_title">
                   
//                   </div>
//                   <div className="contact_info_text">
//                     Hyderabad
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="contact_form_container py-5">
//         <div className="contact_form_title">
//           Get in Touch
//         </div>
//         <form id="contact_form" >
//           <div className="contact_form_name d-flex justify-content-between align-items-center">
//             <input type="text" id="contact_form_name" className="contact_form_name input_field"
             
//              value={userData.name}
//              onChange={handleInputs}
//               placeholder="Your name" required />
//             <input type="email" id="contact_form_email" className="contact_form_email input_field"
         
//              value={userData.email}
//              onChange={handleInputs}
//               placeholder="Your Email" required />
              
//             <input type="number" id="contact_form_number" className="contact_form_subject input_field"
          
//              value={userData.phone}
//             onChange={handleInputs}
//              placeholder="phone" required />
//           </div>
//           <div className="contact_form_text mt-5">
//             <textarea className="text_field contact_form_message" name="message" cols="30" rows="10" 
        
//              value={userData.message}
//             onChange={contactForm}
//             placeholder="Message"></textarea>
//           </div>
//           <div className="contact_form_button">
//             <button type="submit" onClick={contactsForm} className="button contact_submit_button">Send Message</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Contact;
import React, { useEffect, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const callContact = async () => {
    try {
      const res = await fetch('http://localhost:5000/getdata', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callContact();
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const contactsForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name:userData.name,
          email:userData.email,
          phone:userData.phone
        })
      });
      const data = await response.json();
      if (!data) {
        console.log('Message not sent');
      } else {
        alert('Message sent');
        setUserData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  };

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_text">
                    +91 9849241792
                  </div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/email.png" alt="email" />
                <div className="contact_info_content">
                  <div className="contact_info_text">
                    madirepriyanka01@gmail.com
                  </div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/address.png" alt="address" />
                <div className="contact_info_content">
                  <div className="contact_info_text">
                    Hyderabad
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact_form_container py-5">
        <div className="contact_form_title">
          Get in Touch
        </div>
        <form id="contact_form" >
        <div className="contact_form_name d-flex justify-content-between align-items-center">
  <input type="text" id="contact_form_name" className="contact_form_name input_field"
    value={userData.name}
    onChange={handleInputs}
    placeholder="Your name" required />
  <input type="email" id="contact_form_email" className="contact_form_email input_field"
    value={userData.email}
    onChange={handleInputs}
    placeholder="Your Email" required />
  <input type="text" id="contact_form_number" className="contact_form_subject input_field"
    value={userData.phone}
    onChange={handleInputs}
    placeholder="phone" required />
</div>

          <div className="contact_form_text mt-5">
            <textarea className="text_field contact_form_message" name="message" cols="30" rows="10"
              value={userData.message}
              onChange={handleInputs}
              placeholder="Message"></textarea>
          </div>
          <div className="contact_form_button">
            <button type="submit" onClick={contactsForm} className="button contact_submit_button">Send Message</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
