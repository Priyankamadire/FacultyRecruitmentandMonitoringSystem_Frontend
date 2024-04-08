import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate(); // Call useNavigate as a function

  useEffect(() => {
    fetch('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/log-out', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((res) => {
      dispatch({type:"USER",payload:false})

      navigate('/login',{replace:true});
      if (!res.status === 200) { 
          const error = new Error(res.error);
          throw error;
  
        }
  }).catch((err)=>{
      console.log(err);
  })
})
   // Empty dependency array to run the effect only once

  return (
    <>
      <h1>logout page</h1>
    </>
  );
};

export default Logout;
