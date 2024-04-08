import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { ClgContext } from '../App';
// clgemail, clgphone, clgcode,
const Clglogin = () => {
    const {clgstate,clgdispatch} = useContext(ClgContext);
    const navigate = useNavigate();
    const [clgemail, setEmail] = useState('kmit@gmail.com');
    const [clgcode,setCode] = useState('kmit2007');
    const [password, setPassword] = useState('kmit1234');


    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/clg-signin', {
                clgemail,
                clgcode,
                password
            }, {
                withCredentials: true // Including credentials in the request
            });
            
            const data = res.data;
            if (res.status === 400 || !data) {
                window.alert("Invalid credentials");
            } else {
                clgdispatch({type:"CLG",payload:true})
            // console.log(mystate);

                window.alert("Login success");
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Include token in headers
                navigate("/clgopen");
            }
        } catch (error) {
            console.error(error);
            window.alert("An error occurred. Please try again.");
        }
    }
    return (
        <>
            <section className="sign-in">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className="signin-form">
                            <h2 className="form-title">Login</h2>
                            <form method='POST' className="form-group">
                                <div className="form-group">
                                    <label htmlFor="clgemail">
                                        <i className="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="clgemail" id="clgemail" autoComplete="off"
                                        value={clgemail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="clgemail" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="clgcode">
                                        <i className="zmdi zmdi-slideshow materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="clgcode" id="clgcode" autoComplete="off"
                                        value={clgcode}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="clgcode" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock materials-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="password" />
                                </div>

                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        value="Login"
                                        onClick={loginUser}
                                    />
                                </div>
                            </form>

                            <div className="signin-image">
                                <p>Don't have an account?<NavLink to="/clgsignup">Register</NavLink></p>
                                {/* <figure>
                                    <img src="https://static.vecteezy.com/system/resources/previews/004/578/780/original/girl-putting-up-sign-for-plan-schedule-free-vector.jpg" alt="signin" />
                                </figure> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Clglogin;
 