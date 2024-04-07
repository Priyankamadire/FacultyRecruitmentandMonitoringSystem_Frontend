import React, {useEffect,useContext}from 'react'
import { useNavigate } from 'react-router-dom'
import { ClgContext } from '../App';

const Logout = () => {
    const {clgstate,clgdispatch} = useContext(ClgContext);
    const navigate = useNavigate;
    useEffect(()=>{
        fetch('http://localhost:5000/clg-log-out',{
            method:"GET",
            headers : {
                Accept : "appllication/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            clgdispatch({type:"CLG",payload:false})

            navigate('/clglogin',{replace:true});
            if (!res.status === 200) { 
                const error = new Error(res.error);
                throw error;
        
              }
        }).catch((err)=>{
            console.log(err);
        })
    })
  return (
    <>
    <h1>logout page</h1>
    </>
  )
}

export default Logout
