// import React, { useEffect, useState } from 'react';
// import './BattlePage.css';
// import { useNavigate } from 'react-router-dom';

// const CodingChallenge = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [isWaiting, setIsWaiting] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = () => {
//         setIsWaiting(true);
//         sendMessageToServerlet();
//     };

//     const sendMessageToServerlet = async () => {
//         const code = encodeURIComponent(document.getElementById('code-editor').value);
//         const email = sessionStorage.getItem('email');
//         try {
//           const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/runCode?code=${code}&email=${email}`, {
//             method: 'GET',
//             headers: {'Content-Type': 'text/plain'}
//           });
    
//           if (!response.ok) {
//             throw new Error('Failed to send message to serverlet');
//           }
          
//           const responseData = await response.text().then(text => parseFloat(text.trim()));
//           console.log(JSON.stringify(responseData));
//           // Assuming responseData includes the number to pass
//           navigate('/winloss', { state: { number: responseData } });  // Use navigate to go to /winloss with number
//         } catch (error) {
//           console.error('Error sending message to serverlet:', error);
//         }
//     };

//     const number = parseInt(new URLSearchParams(window.location.search).get('number'));

//     let requestSent = false;

//     useEffect(() => {
//         if (requestSent) return;

//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", "http://localhost:8080/LeetcodeBattleBackend/runCode", true);
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     console.log('Number sent to servlet successfully');
//                 } else {
//                     console.error('Error sending number to servlet:', xhr.status);
//                 }
//             }
//         };
//         xhr.send("number=" + number);
//         requestSent = true;

//     }, []); 

//     return (
//         <div className="container-main">
//             <div className="left-panel">
//                 <div className="problem-description">
//                     <h2>Problem Description</h2>
//                     <h3>Two Sum</h3>
//                     <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
//                         You may assume that each input would have exactly one solution, and you may not use the same element twice.
//                         You can return the answer in any order.
//                     </p>
//                 </div>
//             </div>
//             <div className="right-panel">
//                 <textarea
//                     id="code-editor"
//                     style={{ width: '100%', height: '250px', fontSize: '16px', padding: '10px' }}
//                     defaultValue="solution(input, target)"
//                 ></textarea>
//                 <button style={{ width: '100px', margin: '10px', fontSize: '16px' }} onClick={handleSubmit}>Submit</button>
//             </div>
//             <div
//                 id="waiting"
//                 style={{
//                     display: isWaiting ? 'block' : 'none',
//                     position: 'fixed',
//                     bottom: 100,
//                     width: '100%',
//                     textAlign: 'center',
//                     marginLeft: 100,
//                     padding: '10px',
//                     color: 'white',
//                     fontSize: '32px',
//                     textColor: "white",
//                 }}
//             >
//             <p className='waiting'>Waiting for opponent...</p>
//             </div>
//         </div>
//     );
// };

// export default CodingChallenge;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CodingChallenge = () => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [code, setCode] = useState('solution(input, target)');
    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsWaiting(true);
        sendMessageToServerlet();
    };

    const sendMessageToServerlet = async () => {
        const encodedCode = encodeURIComponent(code);
        const email = sessionStorage.getItem('email');
        try {
            const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/runCode?code=${encodedCode}&email=${email}`, {
                method: 'GET',
                headers: {'Content-Type': 'text/plain'}
            });

            if (!response.ok) {
                throw new Error('Failed to send message to serverlet');
            }
          
            const responseData = await response.text().then(text => parseFloat(text.trim()));
            console.log(JSON.stringify(responseData));
            navigate('/winloss', { state: { number: responseData } });
        } catch (error) {
            console.error('Error sending message to serverlet:', error);
        }
    };

    const number = parseInt(new URLSearchParams(window.location.search).get('number'));

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/LeetcodeBattleBackend/runCode", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Number sent to servlet successfully');
                } else {
                    console.error('Error sending number to servlet:', xhr.status);
                }
            }
        };
        xhr.send("number=" + number);
    }, [number]);

    return (
        <div className="min-h-screen px-6" style={{ backgroundColor: '#09080F' }}>
            <div className="max-w-7xl mx-auto">
                <header className="py-4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4">
                            <button className="p-2 bg-gray-800">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                                </svg>
                            </button>
                            <button className="p-2 bg-gray-800">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                                </svg>
                            </button>
                            <button className="p-2 bg-gray-800">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 4h16v2H4zm0 6h16v2H4zm0 6h16v2H4z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <span className="text-white">Chidi Eze</span>
                            <span className="ml-2 text-sm text-gray-400">31 wins</span>
                        </div>
                    </div>
                </header>
        
                <main className="flex flex-col space-y-4 pb-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-white text-xl font-semibold">• Two Sum</h2>
                        <div className="flex space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">Player 1</button>
                            <button className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm">Player 2</button>
                            <button className="bg-green-500 text-white px-4 py-1 rounded-full text-sm" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
          
                    <div className="flex space-x-4 flex-grow">
                        <div className="w-1/2 p-4 text-white overflow-auto" style={{ backgroundColor: '#11121B', borderRadius: '8px' }}>
                            <p className="text-xs text-gray-400 mb-4">Easy Topics Companies Hint</p>
                            <p className="text-sm mb-3">Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
                            <p className="text-sm mb-3">You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
                            <p className="text-sm mb-3">You can return the answer in any order.</p>
                            <h3 className="text-md font-semibold mt-4 mb-2">Example 1:</h3>
                            <p className="text-sm mb-1">Input: nums = [2,7,11,15], target = 9</p>
                            <p className="text-sm mb-1">Output: [0,1]</p>
                            <p className="text-sm mb-3">Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                            <h3 className="text-md font-semibold mt-4 mb-2">Example 2:</h3>
                            <p className="text-sm mb-1">Input: nums = [3,2,4], target = 6</p>
                            <p className="text-sm mb-3">Output: [1,2]</p>
                            <h3 className="text-md font-semibold mt-4 mb-2">Example 3:</h3>
                            <p className="text-sm mb-1">Input: nums = [3,3], target = 6</p>
                            <p className="text-sm mb-3">Output: [0,1]</p>
                            <h3 className="text-md font-semibold mt-4 mb-2">Constraints:</h3>
                            <ul className="list-disc list-inside text-sm">
                                <li>2 &lt;= nums.length &lt;= 104</li>
                                <li>-109 &lt;= nums[i] &lt;= 109</li>
                                <li>-109 &lt;= target &lt;= 109</li>
                                <li>Only one valid answer exists.</li>
                            </ul>
                        </div>
            
                        <div className="w-1/2 flex flex-col" style={{ backgroundColor: '#11121B', borderRadius: '8px' }}>
                            <textarea 
                                className="w-full h-full bg-transparent text-white font-mono text-sm p-4 resize-none focus:outline-none"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ backgroundColor: '#11121B' }}
                            />
                        </div>
                    </div>
                </main>
            </div>
            {isWaiting && (
                <div className="fixed bottom-0 left-0 w-full text-center p-4">
                    <p className="text-white text-2xl">Waiting for opponent...</p>
                </div>
            )}
        </div>
    );
};

export default CodingChallenge;