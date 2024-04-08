import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Cookies from 'js-cookie';
import {useAuth} from './AuthContext';
import { UserContext } from '../App';
// import { useAuth } from './AuthContext';
const Login = () => {
    const cursiveStyle = {
        fontFamily: 'cursive',
      };
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('kavya@gmail.com');
    const [password, setPassword] = useState('karthik');
    // const { login } = useAuth();
    // console.log(login);
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            // const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // const token = localStorage.getItem('token');
            const res = await axios.post('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/signin', {
                email,
                password
            }, {
                withCredentials: true
            });
    
            const data = res.data;
            if (res.status === 400 || !data) {
                window.alert("Invalid credentials");
            } else {
                // const newToken = response.data.token;
    
                // // Call the login function from the useAuth hook to update authentication status
                // await login(newToken);
    
                // // Set token and user ID in cookies
                // document.cookie = `token=${data.token};expires=Thu, 01 Jan 2027 00:00:00;path=/;`;
                // document.cookie = `Id=${response.data.user._id};expires=Thu, 01 Jan 2027 00:00:00;path=/;`;
            dispatch({type:"USER",payload:true})
            console.log(state);
            // dispatch({ type: "USER", payload: true });
                window.alert("Login success");
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Include token in headers
                navigate("/uhome"); // Redirect to home page
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
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="email" id="email" autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email" />
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

                            <div className="signin-image text-dark" >
                                <p>Don't have an account?<NavLink to="/signup">Register</NavLink></p>
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

export default Login;
