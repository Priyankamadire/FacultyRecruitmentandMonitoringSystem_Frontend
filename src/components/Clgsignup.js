import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
// clgname, clgemail, clgphone, clgcode, password, cpassword
const Clgsignup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        clgname: "",
        clgemail: "",
        clgphone: "",
        clgcode:"",
        password: "",
        cpassword: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { clgname, clgemail, clgphone, clgcode, password, cpassword } = user;
        try {
            const res = await axios.post("https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/clg-register", {
                clgname, clgemail, clgphone, clgcode, password, cpassword
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
                navigate("/clglogin");
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
                                    <label htmlFor="clgname">
                                        <i className="zmdi zmdi-account materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="clgname" id="clgname" autoComplete="off"
                                        value={user.clgname} onChange={handleInputs}
                                        placeholder="clgname" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="clgemail">
                                        <i className="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="clgemail" id="clgemail" autoComplete="off"
                                        value={user.clgemail} onChange={handleInputs}
                                        placeholder="clgemail" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="clgphone">
                                        <i className="zmdi zmdi-phone-in-talk materials-icons-name"></i>
                                    </label>
                                    <input type="number" name="clgphone" id="clgphone" autoComplete="off"
                                        value={user.clgphone} onChange={handleInputs}
                                        placeholder="clgphone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="clgcode">
                                        <i className="zmdi zmdi-slideshow materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="clgcode" id="clgcode" autoComplete="off"
                                        value={user.clgcode} onChange={handleInputs}
                                        placeholder="clgcode" />
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
                                <p>Already have an account?<NavLink to="/clglogin">Login</NavLink></p>
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

export default Clgsignup;
