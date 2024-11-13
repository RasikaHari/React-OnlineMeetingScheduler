// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import './ManageMeetings.css';

// const ManageMeetingsPage = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [editMeeting, setEditMeeting] = useState(null); // To handle the edit mode
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Fetch meetings from db.json
//   useEffect(() => {
//     fetchMeetings();
//   }, []);

//   const fetchMeetings = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/meetings');
//       setMeetings(response.data);
//     } catch (error) {
//       console.error("Error fetching meetings:", error);
//     }
//   };

//   // Delete a meeting by ID
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/meetings/${id}`);
//       setMeetings(meetings.filter((meeting) => meeting.id !== id));
//     } catch (error) {
//       console.error("Error deleting meeting:", error);
//     }
//   };

//   // Start editing a meeting
//   const startEdit = (meeting) => {
//     setEditMeeting({ ...meeting }); // Set the selected meeting as the one being edited
//   };

//   // Handle field changes while editing
//   const handleFieldChange = (e) => {
//     const { name, value } = e.target;
//     setEditMeeting({ ...editMeeting, [name]: value });
//   };

//   // Update a meeting
//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:3000/meetings/${editMeeting.id}`, editMeeting);
//       fetchMeetings(); // Refresh the list after update
//       setEditMeeting(null); // Exit edit mode
//     } catch (error) {
//       console.error("Error updating meeting:", error);
//     }
//   };

//   // Go back to Dashboard
//   const goBack = () => {
//     navigate('/dashboard'); // Navigate to Dashboard
//   };

//   return (
//     <div className="manage-meetings-container">
//       {/* Back arrow section */}
//       <div className="back-arrow" onClick={goBack} style={{ cursor: 'pointer', marginBottom: '20px' }}>
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
//           <path d="M15 18l-6-6 6-6v12z" />
//         </svg>
//       </div>

//       <h2>Manage Meetings</h2><br/>
//       <table className="meetings-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Start Time</th>
//             <th>Duration</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {meetings.map((meeting) => (
//             <tr key={meeting.id}>
//               <td>
//                 {editMeeting && editMeeting.id === meeting.id ? (
//                   <input
//                     type="text"
//                     name="title"
//                     value={editMeeting.title}
//                     onChange={handleFieldChange}
//                   />
//                 ) : (
//                   meeting.title
//                 )}
//               </td>
//               <td>
//                 {editMeeting && editMeeting.id === meeting.id ? (
//                   <input
//                     type="time"
//                     name="startTime"
//                     value={editMeeting.startTime}
//                     onChange={handleFieldChange}
//                   />
//                 ) : (
//                   meeting.startTime
//                 )}
//               </td>
//               <td>
//                 {editMeeting && editMeeting.id === meeting.id ? (
//                   <input
//                     type="number"
//                     name="duration"
//                     value={editMeeting.duration}
//                     onChange={handleFieldChange}
//                   />
//                 ) : (
//                   meeting.duration
//                 )}
//               </td>
//               <td>{new Date(meeting.date).toLocaleDateString()}</td>
//               <td>
//                 {editMeeting && editMeeting.id === meeting.id ? (
//                   <>
//                     <button onClick={handleUpdate}>Save</button>
//                     <button onClick={() => setEditMeeting(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => startEdit(meeting)}>Edit</button>
//                     <button style={{ backgroundColor: "#800000" }} onClick={() => handleDelete(meeting.id)}>Delete</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageMeetingsPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ManageMeetings.css';

const ManageMeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [editMeeting, setEditMeeting] = useState(null); // To handle the edit mode
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch meetings from db.json
  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/meetings');
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  // Delete a meeting by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/meetings/${id}`);
      setMeetings(meetings.filter((meeting) => meeting.id !== id));
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  // Start editing a meeting
  const startEdit = (meeting) => {
    setEditMeeting({ ...meeting }); // Set the selected meeting as the one being edited
  };

  // Handle field changes while editing
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditMeeting({ ...editMeeting, [name]: value });
  };

  // Update a meeting
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/meetings/${editMeeting.id}`, editMeeting);
      fetchMeetings(); // Refresh the list after update
      setEditMeeting(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };

  // Go back to Dashboard
  const goBack = () => {
    navigate('/dashboard'); // Navigate to Dashboard
  };

  return (
    <div className="manage-meetings-container">
      {/* Back arrow section */}
      <div className="back-arrow" onClick={goBack} style={{ cursor: 'pointer', marginBottom: '20px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6v12z" />
        </svg>
      </div>

      <h2>Manage Meetings</h2><br/>
      <table className="meetings-table">
        <thead>
          <tr>
            <th>Meeting Code</th> {/* New column for Meeting Code */}
            <th>Title</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.id}</td> {/* Display Meeting Code */}
              <td>
                {editMeeting && editMeeting.id === meeting.id ? (
                  <input
                    type="text"
                    name="title"
                    value={editMeeting.title}
                    onChange={handleFieldChange}
                  />
                ) : (
                  meeting.title
                )}
              </td>
              <td>
                {editMeeting && editMeeting.id === meeting.id ? (
                  <input
                    type="time"
                    name="startTime"
                    value={editMeeting.startTime}
                    onChange={handleFieldChange}
                  />
                ) : (
                  meeting.startTime
                )}
              </td>
              <td>
                {editMeeting && editMeeting.id === meeting.id ? (
                  <input
                    type="number"
                    name="duration"
                    value={editMeeting.duration}
                    onChange={handleFieldChange}
                  />
                ) : (
                  meeting.duration
                )}
              </td>
              <td>{new Date(meeting.date).toLocaleDateString()}</td>
              <td>
                {editMeeting && editMeeting.id === meeting.id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditMeeting(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(meeting)}>Edit</button>
                    <button style={{backgroundColor:"#800000"}}onClick={() => handleDelete(meeting.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMeetingsPage;
