// import React, { useState } from 'react';
// import './FindBattlePage.css'; // Assuming CSS for the card is also in this file
// import battleImage from '../Assets/codebattle_Logo.jpg';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const FindBattlePage = () => {
//   let navigate = useNavigate();
//   const [findingOpponent, setFindingOpponent] = useState(false);
//   const [statistics, setStatistics] = useState({
//     totalGames: 10,
//     wins: 7,
//     losses: 3,
//     winRate: 70
//   });



//   useEffect(() => {
//     const fetchStats = async () => {
//       const email = sessionStorage.getItem('email');
//       if (!email) {
//         console.error("No email found in session storage");
//         return;
//       }
//       try {
//         const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/showStats?email=${encodeURIComponent(email)}`, {
//           method: 'GET'
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch statistics');
//         }
//         const data = await response.json(); // Assuming the response is in JSON format
//         setStatistics({
//           totalGames: data.wins + data.losses,
//           wins: data.wins,
//           losses: data.losses,
//           winRate: ((data.wins / (data.wins + data.losses)) * 100)
//         });
//       } catch (error) {
//         console.error('Error fetching statistics:', error);
//       }
//     };

//     fetchStats();
//   }, []);



  // const handleClick = () => {
  //   sendMessageToServerlet();
  // };

  // const sendMessageToServerlet = async () => {
  //   try {
  //     setFindingOpponent(true);
  //     const response = await fetch('http://localhost:8080/LeetcodeBattleBackend/findbattle', {
  //       method: 'POST',
  //       body: JSON.stringify({ message: 'Your message content' }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to send message to serverlet');
  //     }
      
  //     const responseData = await response.text();
  //     //console.log(responseData);
  //     console.log(JSON.stringify(responseData))
  //     if (responseData === "Starting Battle...\n") {
  //       window.location.href = '/battle?number=' + 0;
  //     }

      
  //   } catch (error) {
  //     throw new Error('Error sending message to serverlet:', error);
  //   }
  // };

  
//   return (
//     <div>
//     <div>
//     <h1>Statistics</h1>
//     </div>
    
//     <div className="container-main">
//       <div className="product-card">
//         {/* Product Card */}
//         <div className="card">
//           <div className="image_container">
//             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="image">
//               <path
//                 d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
//               />
//             </svg>
//           </div>
//           <div className="title">
//             <span>Two sum</span>
//           </div>
//           <div className="size">
//             <span>Difficulty level</span>
//             <ul className="list-size">
//               <li className="item-list"><button className="item-list-button">Easy</button></li>
//             </ul>
//           </div>
//           <div className="action">
//           {/* <button className="find-battle-btn" onClick={() => navigate('/battle')}>Find Battle</button> */}
//             <button className="cart-button find-battle-btn" onClick={() => navigate('/battle')}>
//               <svg className="cart-icon" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//                   strokeLinejoin="round"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <span>Start Game</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="product-card">
//         {/* Product Card */}
//         <div className="card">
//           <div className="image_container">
//             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="image">
//               <path
//                 d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
//               />
//             </svg>
//           </div>
//           <div className="title">
//             <span>Palindrome Number</span>
//           </div>
//           <div className="size">
//             <span>Difficulty level</span>
//             <ul className="list-size">
//               <li className="item-list"><button className="item-list-button">Hard</button></li>
//             </ul>
//           </div>
//           <div className="action">
//           {/* <button className="find-battle-btn" onClick={() => navigate('/battle')}>Find Battle</button> */}
//             <button className="cart-button find-battle-btn" onClick={() => navigate('/battle')}>
//               <svg className="cart-icon" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//                   strokeLinejoin="round"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <span>Start Game</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="product-card">
//         {/* Product Card */}
//         <div className="card">
//           <div className="image_container">
//             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="image">
//               <path
//                 d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
//               />
//             </svg>
//           </div>
//           <div className="title">
//             <span>Reverse Integer</span>
//           </div>
//           <div className="size">
//             <span>Difficulty level</span>
//             <ul className="list-size">
//               <li className="item-list"><button className="item-list-button">Medium</button></li>
//             </ul>
//           </div>
//           <div className="action">
//           {/* <button className="find-battle-btn" onClick={() => navigate('/battle')}>Find Battle</button> */}
            // <button className="cart-button find-battle-btn" onClick={() => navigate('/battle')}>
            //   <svg className="cart-icon" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            //     <path
            //       d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            //       strokeLinejoin="round"
            //       strokeLinecap="round"
            //     />
            //   </svg>
            //   <span>Start Game</span>
            // </button>
//           </div>
//         </div>
//       </div>
      
      
//     </div>
//     <div className='statistics'>
//         <h1>Statistics</h1>
//         <div className="stats">
//           <p>Total games played: {statistics.totalGames}</p>
//           <p>Total wins: {statistics.wins}</p>
//           <p>Total losses: {statistics.losses}</p>
//           <p>Win rate: {statistics.winRate}%</p>
//         </div>
//         {findingOpponent && <div style={{ fontSize: '40px' }}>Finding opponent...</div>}
        
//     </div>
//     </div>
//   );
// }

// export default FindBattlePage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './FindBattlePage.css';
import lq1 from '../Assets/lq1.png';
import lq2 from '../Assets/lq2.png';
import lq3 from '../Assets/lq3.png';

const FindBattlePage = () => {
  let navigate = useNavigate();
  const [findingOpponent, setFindingOpponent] = useState(false);
  const [statistics, setStatistics] = useState({
    totalGames: 10,
    wins: 7,
    losses: 3,
    winRate: 70
  });

  const friends = [
    { name: 'Alfredo Torres', wins: 7 },
    { name: 'Louis Fonsi', wins: 8 },
    { name: 'Kuala Bear', wins: 3 },
    { name: 'Rachin Ravindra', wins: 12 },
  ];

  const leetcodeQuestions = [
    { title: 'Two Sum', difficulty: 'Easy', image: lq1 },
    { title: 'Palindrome Number', difficulty: 'Hard', image: lq2 },
    { title: 'Reverse Integer', difficulty: 'Medium', image: lq3 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      const email = sessionStorage.getItem('email');
      if (!email) {
        console.error("No email found in session storage");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/showStats?email=${encodeURIComponent(email)}`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        setStatistics({
          totalGames: data.wins + data.losses,
          wins: data.wins,
          losses: data.losses,
          winRate: ((data.wins / (data.wins + data.losses)) * 100).toFixed(2)
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  const sendMessageToServerlet = async () => {
    try {
      setFindingOpponent(true);
      const response = await fetch('http://localhost:8080/LeetcodeBattleBackend/findbattle', {
        method: 'POST',
        body: JSON.stringify({ message: 'Your message content' }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to send message to serverlet');
      }
      
      const responseData = await response.text();
      console.log(JSON.stringify(responseData));
      if (responseData === "Starting Battle...\n") {
        navigate('/battle?number=' + 0);
      }
    } catch (error) {
      console.error('Error sending message to serverlet:', error);
    } finally {
      setFindingOpponent(false);
    }
  };

  const handleStartGame = () => {
    sendMessageToServerlet();
  };

  return (
    <div className="text-white p-6 min-h-screen" style={{ backgroundColor: '#09080F' }}>
      <div className="flex space-x-6">
        <div className="w-2/3">
          <div className="flex space-x-6 mb-6">
            <div className="w-2/3 rounded-lg p-8" style={{ backgroundColor: '#11121B' }}>
              <h2 className="text-2xl font-bold mb-4">Battle with your friends and master Leetcode together</h2>
              <p className="text-gray-400 mb-6">This is the first leetcode battleground where friends can compete and learn how to leetcode. We transform the boring cycle of leetcoding into something competitive and social.</p>
              <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full" style={{ border: 'none' }}>
                Learn More <ArrowRight className="ml-2" />
              </button>
            </div>
            <div className="w-1/3">
              <h3 className="text-xl font-bold mb-4">Friends</h3>
              <div className="rounded-lg p-4" style={{ backgroundColor: '#11121B' }}>
                {friends.map((friend, index) => (
                  <div key={index} className="flex justify-between items-center mb-3 last:mb-0">
                    <div>
                      <p>{friend.name}</p>
                      <p className="text-sm text-gray-400">{friend.wins} Wins</p>
                    </div>
                    <button 
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm" 
                      style={{ border: 'none' }}
                      onClick={() => {
                        handleStartGame();
                        navigate('/battle');
                      }}
                    >
                      Start Contest
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Leetcode Questions</h3>
            <div className="grid grid-cols-3 gap-4">
              {leetcodeQuestions.map((question, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: '#11121B' }}>
                <img src={question.image} alt={question.title} className="w-full aspect-square object-cover rounded mb-2" />
                  <h4 className="font-bold mb-2">{question.title}</h4>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${question.difficulty === 'Easy' ? 'bg-green-500' : question.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                      {question.difficulty}
                    </span>
                    <button 
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm" 
                      style={{ border: 'none' }}
                      onClick={() => {
                        handleStartGame();
                        navigate('/battle');
                      }}
                    >
                      Start Game
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Coming Soon</h3>
            <div className="grid grid-cols-4 gap-4">
              {[lq1, lq2, lq3, lq1].map((image, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: '#11121B' }}>
                  <img src={image} alt={`Coming Soon ${index + 1}`} className="w-full aspect-square object-cover rounded mb-2" style={{ opacity: 0.4 }} />
                  <h4 className="font-bold mb-2 text-sm">Coming Soon</h4>
                  <div className="flex space-x-1">
                    <button className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs" style={{ border: 'none' }}>Solution</button>
                    <button className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs" style={{ border: 'none' }}>Start</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <h3 className="text-xl font-bold mb-4">Your Stats</h3>
          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#11121B' }}>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <p>Total games played</p>
                  <p style={{ color: '#768192' }}>{statistics.totalGames}</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(statistics.totalGames / 100) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p>Total wins</p>
                  <p style={{ color: '#768192' }}>{statistics.wins}</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(statistics.wins / statistics.totalGames) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p>Total losses</p>
                  <p style={{ color: '#768192' }}>{statistics.losses}</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(statistics.losses / statistics.totalGames) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p>Win rate</p>
                  <p style={{ color: '#768192' }}>{statistics.winRate}%</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${statistics.winRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Most Played</h3>
          <div className="rounded-lg p-6" style={{ backgroundColor: '#11121B' }}>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-1 h-6 bg-green-500 mr-4"></div>
                <img src={lq1} alt="Two Sum" className="w-10 h-10 rounded mr-4" />
                <div>
                  <p className="font-bold">Two Sum</p>
                  <p className="text-sm text-gray-400">17 Times</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1 h-6 bg-orange-500 mr-4"></div>
                <img src={lq2} alt="Reverse Integer" className="w-10 h-10 rounded mr-4" />
                <div>
                  <p className="font-bold">Reverse Integer</p>
                  <p className="text-sm text-gray-400">11 Times</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {findingOpponent && <div className="text-4xl mt-6">Finding opponent...</div>}
    </div>
  );
}

export default FindBattlePage;