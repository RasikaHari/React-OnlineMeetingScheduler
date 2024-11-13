// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import './LandingPage.css';

// const SchedulingPage = () => {
//   const navigate = useNavigate(); // Instantiate useNavigate
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     reenterPassword: '',
//   });

//   const [showLogin, setShowLogin] = useState(false);
//   const [loginMessage, setLoginMessage] = useState('');
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (showLogin) {
//       // Login logic
//       try {
//         const response = await fetch(`http://localhost:3000/users?email=${formData.email}&password=${formData.password}`);
//         const data = await response.json();

//         if (data.length > 0) {
//           setLoginMessage('Login successful!');
//           const user = data[0]; // Get the user data
//           navigate('/dashboard', { state: { user } }); // Pass user data
//         } else {
//           setLoginMessage('Invalid email or password.');
//         }
//       } catch (error) {
//         console.error('Error logging in:', error);
//         setLoginMessage('Login failed.');
//       }
//     } else {
//       // Sign-up logic
//       if (formData.password !== formData.reenterPassword) {
//         alert("Passwords do not match!");
//         return;
//       }
//       // Save the user details in db.json
//       try {
//         const response = await fetch('http://localhost:3000/users', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             email: formData.email,
//             phone: formData.phone,
//             password: formData.password,
//           }),
//         });

//         if (response.ok) {
//           alert("Registration successful! You can now log in.");
//           setShowLogin(true);
//         }
//       } catch (error) {
//         console.error('Error registering:', error);
//       }
//     }
//     // Clear form data after submission
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       password: '',
//       reenterPassword: '',
//     });
//   };

//   const handleLoginToggle = () => {
//     setShowLogin(prevShowLogin => !prevShowLogin);
//     setLoginMessage(''); // Reset login message
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       password: '',
//       reenterPassword: '',
//     });
//   };

//   return (
//     <div className="scheduling-page">
//       {/* Form Section */}
//       <div className="form-container">
//         <div className="left-section">
//           <h2>Easy scheduling platform for everyone</h2>
//           <p>Eliminate the hassle of managing unwanted emails by using an online scheduling platform.</p>
//           <ul>
//             <li>Register Now and Get Your Free Forever Plan!</li>
//             <li>Share meetings with a single, convenient link.</li>
//             <li>Integrate and manage payments for your meetings.</li>
//             <li>Sync with your preferred calendar for scheduling process.</li>
//             <li>Customize your meeting settings and calendar views.</li>
//           </ul>
//         </div>

//         <form className="right-section" onSubmit={handleSubmit}>
//           <h3>{showLogin ? 'Login to Your Account' : 'Grab your free plan'}</h3>

//           {!showLogin && ( // Show only for signup
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}

//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required={!showLogin} // Phone is required only for signup
//             />
//           </div>

//           {!showLogin && ( // Show only for signup
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="reenterPassword"
//                 placeholder="Re-enter Password"
//                 value={formData.reenterPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}

//           {showLogin && ( // Show only for login
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}

//           <button type="submit">{showLogin ? 'Login' : 'Submit'}</button>

//           <div className="login-toggle">
//             <p>
//               {showLogin ? "If you're not registered, " : "If you're already registered, "}
//               <span onClick={handleLoginToggle} className="login-link">
//                 {showLogin ? 'Register here' : 'Log in'}
//               </span>
//             </p>
//           </div>

//           {loginMessage && <p className="login-message">{loginMessage}</p>} {/* Display login message */}
//         </form>
//       </div>

//       {/* KPI and Features Section */}
//       <div className="features-container">
//         <h2>Bookings Helps You To Achieve</h2>

//         <div className="kpi-cards">
//           <div className="kpi-card">
//             <h3>62%</h3>
//             <p>Partner Engagement</p>
//           </div>
//           <div className="kpi-card">
//             <h3>5x</h3>
//             <p>Scheduling Meetings</p>
//           </div>
//           <div className="kpi-card">
//             <h3>49%</h3>
//             <p>Increase in Retention</p>
//           </div>
//           <div className="kpi-card">
//             <h3>68%</h3>
//             <p>Faster with Links</p>
//           </div>
//         </div>

//         <h2>Features of our platform</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <h3>Custom booking pages</h3>
//             <p>Create custom meeting types, set availability, and more.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Team-based scheduling</h3>
//             <p>Schedule team meetings with ease and collaboration.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Sync your calendar</h3>
//             <p>Sync with Google Calendar, Outlook, and more.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Share schedule links</h3>
//             <p>Create meetings based on your availability. Share your booking link so others can schedule with one click.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Accept payments</h3>
//             <p>Collect deposits or full payments upfront when customers schedule any type of appointment.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Easy customization</h3>
//             <p>Customize dates, colors, and availability to match your brand, making the interface easy and interactive.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Automated reminders</h3>
//             <p>Send automatic email or SMS reminders to clients to reduce no-shows.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Integrations</h3>
//             <p>Connect with your favorite tools like Zoom, Slack, and CRM software for seamless workflow.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Analytics dashboard</h3>
//             <p>Get insights on meeting patterns and client engagement with detailed analytics.</p>
//           </div>
//         </div>
//       </div>

//       {/* Optimized scheduling for teams */}
//       <div className="additional-features">
//         <h2>Optimized scheduling for all types of teams</h2>
//         <div className="team-types">
//           <button onClick={() => {}}>Marketing</button>
//           <button onClick={() => {}}>Education</button>
//           <button onClick={() => {}}>Consultancy</button>
//           <button onClick={() => {}}>Finance</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchedulingPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const SchedulingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    reenterPassword: '',
  });

  const [showLogin, setShowLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showLogin) {
      // Login logic
      try {
        const response = await fetch(`http://localhost:3000/users?email=${formData.email}&password=${formData.password}`);
        const data = await response.json();
        if (data.length > 0) {
          setLoginMessage('Login successful!');
          const user = data[0]; // Get the user data
          localStorage.setItem('isAuthenticated', 'true'); // Set isAuthenticated in localStorage
          navigate('/dashboard', { state: { user } }); // Pass user data
        } else {
          setLoginMessage('Invalid email or password.');
        }
        
        
      } catch (error) {
        console.error('Error logging in:', error);
        setLoginMessage('Login failed.');
      }
    } else {
      // Sign-up logic
      if (formData.password !== formData.reenterPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Save the user details in db.json
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        });

        if (response.ok) {
          alert("Registration successful! You can now log in.");
          setShowLogin(true);
        }
      } catch (error) {
        console.error('Error registering:', error);
      }
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      reenterPassword: '',
    });
  };

  const handleLoginToggle = () => {
    setShowLogin(prevShowLogin => !prevShowLogin);
    setLoginMessage('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      reenterPassword: '',
    });
  };

  return (
    <div className="scheduling-page">
      <div className="form-container">
        <div className="left-section">
          <h2>Easy scheduling platform for everyone</h2>
          <p>Eliminate the hassle of managing unwanted emails by using an online scheduling platform.</p>
          <ul>
            <li>Register Now and Get Your Free Forever Plan!</li>
            <li>Share meetings with a single, convenient link.</li>
            <li>Integrate and manage payments for your meetings.</li>
            <li>Sync with your preferred calendar for scheduling process.</li>
            <li>Customize your meeting settings and calendar views.</li>
          </ul>
        </div>

        <form className="right-section" onSubmit={handleSubmit}>
          <h3>{showLogin ? 'Login to Your Account' : 'Grab your free plan'}</h3>

          {!showLogin && (
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required={!showLogin}
            />
          </div>

          {!showLogin && (
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="reenterPassword"
                placeholder="Re-enter Password"
                value={formData.reenterPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {showLogin && (
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit">{showLogin ? 'Login' : 'Submit'}</button>

          <div className="login-toggle">
            <p>
              {showLogin ? "If you're not registered, " : "If you're already registered, "}
              <span onClick={handleLoginToggle} className="login-link">
                {showLogin ? 'Register here' : 'Log in'}
              </span>
            </p>
          </div>

          {loginMessage && <p className="login-message">{loginMessage}</p>}
        </form>
      </div>

      <div className="features-container">
        <h2>Bookings Helps You To Achieve</h2>
        <div className="kpi-cards">
          <div className="kpi-card"><h3>62%</h3><p>Partner Engagement</p></div>
          <div className="kpi-card"><h3>5x</h3><p>Scheduling Meetings</p></div>
          <div className="kpi-card"><h3>49%</h3><p>Increase in Retention</p></div>
          <div className="kpi-card"><h3>68%</h3><p>Faster with Links</p></div>
        </div>
        <h2>Features of our platform</h2>
        <div className="feature-cards">
          <div className="feature-card"><h3>Custom booking pages</h3><p>Create custom meeting types, set availability, and more.</p></div>
          <div className="feature-card"><h3>Team-based scheduling</h3><p>Schedule team meetings with ease and collaboration.</p></div>
          <div className="feature-card"><h3>Sync your calendar</h3><p>Sync with Google Calendar, Outlook, and more.</p></div>
          <div className="feature-card"><h3>Share schedule links</h3><p>Create meetings based on your availability. Share your booking link so others can schedule with one click.</p></div>
          <div className="feature-card"><h3>Accept payments</h3><p>Collect deposits or full payments upfront when customers schedule any type of appointment.</p></div>
          <div className="feature-card"><h3>Easy customization</h3><p>Customize dates, colors, and availability to match your brand, making the interface easy and interactive.</p></div>
          <div className="feature-card"><h3>Automated reminders</h3><p>Send automatic email or SMS reminders to clients to reduce no-shows.</p></div>
          <div className="feature-card"><h3>Integrations</h3><p>Connect with your favorite tools like Zoom, Slack, and CRM software for seamless workflow.</p></div>
          <div className="feature-card"><h3>Analytics dashboard</h3><p>Get insights on meeting patterns and client engagement with detailed analytics.</p></div>
        </div>
      </div>

      <div className="additional-features">
        <h2>Optimized scheduling for all types of teams</h2>
        <div className="team-types">
          <button onClick={() => {}}>Marketing</button>
          <button onClick={() => {}}>Education</button>
          <button onClick={() => {}}>Consultancy</button>
          <button onClick={() => {}}>Finance</button>
        </div>
      </div>
    </div>
  );
};

export default SchedulingPage;
