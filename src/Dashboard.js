// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Header from './Header';
import './Dashboard.css';

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [meetings, setMeetings] = useState([]); // State to hold meetings
  const [meetingsPerDay, setMeetingsPerDay] = useState({ labels: [], data: [] }); // State for chart data

  // Fetch meetings when component mounts
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/meetings');
        const sortedMeetings = response.data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort meetings by date
        setMeetings(sortedMeetings.slice(0, 4)); // Get the first four upcoming meetings

        // Process data for chart
        const meetingsCount = {};
        sortedMeetings.forEach(meeting => {
          const date = new Date(meeting.date).toLocaleDateString(); // Get date in local format
          meetingsCount[date] = (meetingsCount[date] || 0) + 1; // Count meetings per date
        });

        // Prepare data for chart
        setMeetingsPerDay({
          labels: Object.keys(meetingsCount), // Dates
          data: Object.values(meetingsCount) // Meeting counts
        });
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <h2>Welcome, {user ? `${user.firstName} ${user.lastName}` : 'User'}!</h2>
        <div className="profile-section">
          <img
            src={user?.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9-k2oaC6nf_xEvaecfUzE1gFu4D09FJm3Hw&s"} 
            alt="Profile"
            className="profile-photo"
          />
          <div className="user-info">
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone}</p>
          </div>
        </div>
        
        <div className="upcoming-meetings">
          <h3>Upcoming Meetings</h3>
          <ul>
            {meetings.map(meeting => (
              <li key={meeting.id}>
                <strong>{meeting.title}</strong><br />
                {new Date(meeting.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} - Duration: {meeting.duration} mins
              </li>
            ))}
          </ul>
        </div>
        
        <br /><br />
        
        <div className="meetings-chart">
          <h3>Meetings Scheduled Per Day</h3>
          <Line
            data={{
              labels: meetingsPerDay.labels,
              datasets: [
                {
                  label: 'Number of Meetings',
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: 'rgba(75,192,192,1)',
                  data: meetingsPerDay.data,
                  fill: false,
                  tension: 0.2
                }
              ]
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Count of Meetings'
                  },
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
