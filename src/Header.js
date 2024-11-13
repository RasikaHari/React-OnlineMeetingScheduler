// // Header.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Header.css'; // Make sure to create this CSS file for styling

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Add your logout logic here (e.g., clearing tokens, etc.)
//     navigate('/'); // Redirect to the landing page after logout
    
//       localStorage.setItem('isAuthenticated', 'false'); // Or use localStorage.removeItem('isAuthenticated');
    
//   };

//   return (
//     <header className="header">
//       <div className="header-content">
//         <h1 className="logo">Your Logo</h1>
//         <nav className="nav">
//           <button onClick={() => navigate('/profile')} className="nav-button">Profile</button>
//           <button onClick={() => navigate('/meeting-scheduler')} className="nav-button">Schedule</button> {/* Updated to navigate to MeetingSchedulerPage */}
//           <button onClick={() => navigate('/manage')} className="nav-button">Manage</button>
//           <button onClick={handleLogout} className="nav-button">Logout</button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Ensure you have this CSS file for styling

const Header = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false'); // Or use localStorage.removeItem('isAuthenticated');
    navigate('/'); // Redirect to the landing page after logout
  };

  const handleJoinClick = () => {
    setShowPopup(true); // Show the popup when "Join" button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Your Logo</h1>
        <nav className="nav">
          <button onClick={() => navigate('/profile')} className="nav-button">Profile</button>
          <button onClick={handleJoinClick} className="nav-button">Join</button> {/* Join button */}
          <button onClick={() => navigate('/meeting-scheduler')} className="nav-button">Schedule</button>
          <button onClick={() => navigate('/manage')} className="nav-button">Manage</button>
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </nav>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Enter Meeting Code</h2>
            <input type="text" placeholder="Meeting Code" className="popup-input" />
            <button onClick={handleClosePopup} className="close-button">Join</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
