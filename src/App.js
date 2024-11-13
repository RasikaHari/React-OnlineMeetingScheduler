
// import SchedulingPage from './LandingPage';
// import MeetingSchedulerPage from './MeetingSchedulerPage';

// function App() {
//   return (
//     <div className="App">
//       {/* <SchedulingPage/> */}
//       <MeetingSchedulerPage/>
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SchedulingPage from './LandingPage'; // Adjust the import based on your file structure
// import Dashboard from './Dashboard'; // Adjust the import based on your file structure
// import MeetingSchedulerPage from './MeetingSchedulerPage'; // Import the MeetingSchedulerPage
// import './App.css'; // Optional: Include your global styles
// import ManageMeetingsPage from './ManageMeetingsPage';

// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<SchedulingPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/meeting-scheduler" element={<MeetingSchedulerPage />} /> {/* New route */}
//           <Route path="/manage" element={<ManageMeetingsPage />} />
//           <Route path="/profile" element={<Dashboard/>} />
//           {/* Add more routes as needed */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SchedulingPage from './LandingPage';
import Dashboard from './Dashboard';
import MeetingSchedulerPage from './MeetingSchedulerPage';
import ManageMeetingsPage from './ManageMeetingsPage';
import './App.css';

// Helper function to check authentication
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected route component
const ProtectedRoute = ({ element: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SchedulingPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/meeting-scheduler" element={<ProtectedRoute element={MeetingSchedulerPage} />} />
          <Route path="/manage" element={<ProtectedRoute element={ManageMeetingsPage} />} />
          <Route path="/profile" element={<ProtectedRoute element={Dashboard} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
