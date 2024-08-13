// Dashboard.js
import React, { useState, useEffect } from 'react';
import './UserDashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch user statistics when component mounts
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      // Make a GET request to fetch user statistics
      const response = await fetch('http://localhost:8080/LeetcodeBattleBackend/getStats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary authentication headers
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        console.error('Failed to fetch user stats:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  return (
    <div className="dashboard">
      {stats ? (
        <>
          <div className="attribute">
            <label htmlFor="stat-id">Stat ID:</label>
            <span id="stat-id">{stats.statId}</span>
          </div>
          <div className="attribute">
            <label htmlFor="user-id">User ID:</label>
            <span id="user-id">{stats.userId}</span>
          </div>
          <div className="attribute">
            <label htmlFor="wins">Wins:</label>
            <span id="wins">{stats.wins}</span>
          </div>
          <div className="attribute">
            <label htmlFor="losses">Losses:</label>
            <span id="losses">{stats.losses}</span>
          </div>
          <div className="attribute">
            <label htmlFor="win-loss-ratio">Win/Loss Ratio:</label>
            <span id="win-loss-ratio">{stats.winLossRatio}</span>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
