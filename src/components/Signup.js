import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        qualification:"",
        experience:"",
        password: "",
        cpassword: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, phone, qualification,experience, password, cpassword } = user;
        try {
            const res = await axios.post("https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/register", {
                name, email, phone,qualification,experience, password, cpassword
            },
            {
                withCredentials: true // Including credentials in the request
            });
            const data = res.data;
            if (data.status === 422 || !data) {
                window.alert("invalid");
                console.log("invalid");
            } else {
                window.alert("success");
                console.log("success");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            window.alert("An error occurred. Please try again.");
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Register</h2>
                            <form method='POST' className="form-group">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" autoComplete="off"
                                        value={user.name} onChange={handleInputs}
                                        placeholder="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="email" id="email" autoComplete="off"
                                        value={user.email} onChange={handleInputs}
                                        placeholder="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="phone" id="phone" autoComplete="off"
                                        value={user.phone} onChange={handleInputs}
                                        placeholder="phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="qualification">
                                        <i className="zmdi zmdi-slideshow materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="qualification" id="qualification" autoComplete="off"
                                        value={user.qualification} onChange={handleInputs}
                                        placeholder="qualification" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="experience">
                                        <i className="zmdi zmdi-slideshow materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="experience" id="experience" autoComplete="off"
                                        value={user.experience} onChange={handleInputs}
                                        placeholder="experience" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock materials-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={user.password} onChange={handleInputs}
                                        placeholder="password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock materials-icons-name"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                        value={user.cpassword} onChange={handleInputs}
                                        placeholder="cpassword" />
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        name="signup"
                                        id="signup"
                                        className="form-submit"
                                        value="Register"
                                        onClick={PostData}
                                    />
                                </div>
                            </form>
                            <div className="signup-image">
                                <p>Already have an account?<NavLink to="/login">Login</NavLink></p>
                                {/* <figure>
                                    <img src="https://static.vecteezy.com/system/resources/previews/004/578/780/original/girl-putting-up-sign-for-plan-schedule-free-vector.jpg" alt="signup" />
                                </figure> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Signup;
