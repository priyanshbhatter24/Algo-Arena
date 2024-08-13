import React from 'react';
import './winloss.css';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useLocation

const WinLoss = () => {
    const navigate = useNavigate();
    const location = useLocation();  // Get location object
    const number = location.state?.number;  // Access 'number' from the state
    const absNumber = Math.abs(number);

    console.log(number);
    
    return (
      <div>
        <div className="big-box">
            <div className="info">
                {number > 0 ? (
                  <h1 className="info__title">Congratulations you won!</h1>
                ) : (
                  <h1 className="info__title">Sorry, you lost</h1>
                )}
            </div>
            <div className="info">
                <div className="info__title">You passed {absNumber} test cases</div>
            </div>
            <button className='winloss-btn' onClick={() => navigate('/findbattle')}>Dashboard</button>
        </div>
      </div>
    )
}

export default WinLoss;
