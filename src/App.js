// Import necessary dependencies from React and React Router DOM
import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import MyProfile from './components/MyProfile';
import Logout from './components/Logout';
import Clgsignup from './components/Clgsignup';
import Clglogin from './components/Clglogin';
import ClgOpen from './components/ClgOpen';
import Clglogout from './components/Clglogout';
import Postjob from './components/PostJob';
import ClgInbox from './components/ClgInbox';
import Vacancies from './components/Vacancies';
import Notification from './components/Notification';
import Inbox from './components/Inbox';
import ApplyJobForm from './components/ApplyJobForm';
import JobTable from './components/JobTable';
import ViewDetailJob from './components/ViewDetailJob';
import ApplicantDetails from './components/ApplicantDetails';
import JobsPosted from './components/JobsPosted';
import AdminJobs from './components/AdminJobs';
import Fackwork from './components/Fackwork';
import Details from './components/Details';
import Workingfac from './components/Workingfac';
import Retawork from './components/Retawork';
import Newwork from './components/Newwork';
import DetailedNotification from './components/DetailedNotification';
import UpdateDetails from './components/UpdateDetails';
import UpdateClgDetails from './components/UpdateClgDetails';
import { initialState,reducer } from './reducer/UseReducer';
import { myState,clgreducer } from './reducer/ClgReducer'
import UserProfile from './components/UserProfile';
import Faqs from './components/Faqs';
import UHome from './components/UHome';
import ClgContacts from './components/ClgContacts';
import ClgProfile from './components/ClgProfile';
import { AuthContext } from './components/AuthContext';
import UserNavbar from './components/UserNavbar';
import ClgNavbar from './components/ClgNavbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import UserHome from './components/UserHome';
import ClgHome from './components/ClgHome';
import Footer from './components/Footer';
import DeleteJob from './components/DeleteJob';
export const UserContext = createContext();
export const ClgContext = createContext();

// Define your App component
const App =()=> {
    
    // Use useReducer to manage state and actions for user and college
    const [state, dispatch] = useReducer(reducer, initialState);
    const [clgstate, clgdispatch] = useReducer(clgreducer, myState);
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.post('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/verify', { token })
                .then(response => {
                    dispatch({ type: "USER", payload: response.data.authenticated });
                })
                .catch(error => {
                    console.error(error);
                    // Handle error (e.g., redirect to login page)
                });
        }
    }, []);

    // Store user authentication status in cookies whenever it changes
    useEffect(() => {
        Cookies.set('userAuth', state.toString());
    }, [state]);
    // Return JSX for your application
    useEffect(() => {
        const token = Cookies.get('clgToken'); // Assuming you use 'clgToken' for college authentication
        if (token) {
            axios.post('https://facultyrecruitmentandmonitoringsystem-41bq.onrender.com/clgverify', { token }) // Adjust the endpoint URL accordingly
                .then(response => {
                    clgdispatch({ type: "CLG", payload: response.data.authenticated });
                })
                .catch(error => {
                    console.error(error);
                    // Handle error (e.g., redirect to college login page)
                });
        }
    }, []);
    
    // Store college authentication status in cookies whenever it changes
    useEffect(() => {
        Cookies.set('clgAuth', clgstate.toString()); // Assuming you store college authentication status as a boolean
    }, [clgstate]);
    
    return (
        <div className="app">
        
        <UserContext.Provider value={{ state, dispatch }}>
            <ClgContext.Provider value={{ clgstate, clgdispatch }}>
              
                    {/* Define routes using React Router's Routes component */}
                    <Routes>
                        {/* Define routes for public pages */}
                        <Route path="/" element={<><Navbar/><Home/></>} />
                        <Route path="about" element={<><Navbar/><About /></>} />
                        <Route path="faqs" element={<><Navbar/><Faqs /></>} />
                        <Route path="login" element={<><Navbar/><Login /></>} />
                        <Route path="clglogin" element={<><Navbar/><Clglogin /></>} />
                        <Route path="signup" element={<><Navbar/><Signup /></>} />
                        <Route path="clgsignup" element={<><Navbar/><Clgsignup /></>} />

                        {/* Define routes for user-specific pages if user is logged in */}
                        { state? (
                            <>
                                <Route path="uhome" element={<><UserNavbar/><UHome /></>} />
                                <Route path="jobtable" element={<><UserNavbar/><JobTable /></>} />
                                <Route path="userprofile" element={<><UserNavbar/><UserProfile /></>} />
                                <Route path="notification/:email" element={<><UserNavbar/><Notification /></>} />
                                <Route path="updatedeta" element={<><UserNavbar/><UpdateDetails /></>} />
                                <Route path="applies/:id" element={<><UserNavbar/><ApplyJobForm /></>} />
                                <Route path="contact" element={<><UserNavbar/><Contact /></>} />
                                <Route path="userhome" element={<><UserNavbar/><UserHome /></>} />
                                <Route path="logout" element={<><UserNavbar/><Logout /></>} />
                                <Route path="viewdetailjob/:id" element={<><UserNavbar/><ViewDetailJob/></>} />
                            </>
                        ) : (
                            <Route path="*" element={<><Navbar/><Home/></>} />
                        )}

                        {/* Define routes for college-specific pages if college is logged in */}
                        { clgstate? (
                            <>
                                <Route path="clgopen" element={<><ClgNavbar/><ClgOpen /></>} />
                                <Route path="clgcont" element={<><ClgNavbar/><ClgContacts /></>} />
                                <Route path="detail" element={<><ClgNavbar/><Details /></>} />
                                <Route path="adminjob" element={<><ClgNavbar/><AdminJobs /></>} />
                                <Route path="applicantdetails/:id" element={<><ClgNavbar/><ApplicantDetails/></>} />
                                <Route path="jobsposted/:instname" element={<><ClgNavbar/><JobsPosted/></>} />
                                <Route path="facwork/:id" element={<><ClgNavbar/><Fackwork/></>} />
                                <Route path="retwork/:id" element={<><ClgNavbar/><Retawork/></>} />
                                <Route path="nework/:id" element={<><ClgNavbar/><Newwork/></>} />
                                <Route path="workdet/:id" element={<><ClgNavbar/><Workingfac/></>} />
                                <Route path="clgdetailsupdate" element={<><ClgNavbar/>< UpdateClgDetails /></>} />
                                <Route path="clglogout" element={<><ClgNavbar/><Clglogout /></>} />
                                <Route path="jobpost" element={<><ClgNavbar/><Postjob /></>} />
                                <Route path="clghome" element={<><ClgNavbar/><ClgHome /></>} />
                                <Route path="clgprofile" element={<><ClgNavbar/>< ClgProfile /></>} />
                                <Route path="delejob/:id" element={<><ClgNavbar/>< DeleteJob /></>} />

                            </>
                        ) : (
                            <Route path="*" element={<><Navbar/><Home/></>} />
                        )}
                    </Routes>
              
            </ClgContext.Provider>
        </UserContext.Provider>
        <Footer/>
        
        </div>
    );
};

export default App;
