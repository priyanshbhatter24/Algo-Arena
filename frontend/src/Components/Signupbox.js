// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Signupbox = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/register?email=${email}&password=${password}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
        
//       });

//       if (response.ok) {
//         sessionStorage.setItem('email', email);
//         navigate('/findbattle');
//       } else {
//         console.error('Registration failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Network error:', error.message);
//     }
//   };

//   return (
//     <div className="m-5 bg-white shadow-xl w-96 flex flex-col items-center p-6 rounded-lg space-y-2.5">
//       <h1 className="text-3xl font-bold">Sign up</h1>
//       <div className="relative w-full">
//         <input
//           name="signup-email"
//           required
//           className="mt-4 w-full rounded-lg h-11 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-2.5"
//           type="email"
//           placeholder="Enter your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="relative w-full">
//         <input
//           name="signup-password"
//           required
//           className="mt-4 w-full rounded-lg h-11 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-2.5"
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <a href="/forgot-password" className="text-blue-500 hover:text-blue-700">Forgot your password?</a>
//       <button
//         type="button"
//         className="mt-8 h-14 bg-gradient-to-b from-gray-900 to-black rounded-lg border-0 text-white text-lg font-bold w-full hover:shadow-lg transition-all duration-300 cursor-pointer"
//         onClick={handleSignUp}
//       >
//         Sign Up
//       </button>
//     </div>
//   );
// };

// export default Signupbox;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

const Signupbox = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/register?email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        sessionStorage.setItem('email', email);
        navigate('/findbattle');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Registration failed');
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Network error:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#09080F' }}>
      <div className="w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl" style={{ backgroundColor: '#11121B' }}>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">Create Account</h2>
          <p className="mt-2 text-sm text-gray-400">Sign up to get started</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="signup-email" className="sr-only">Email address</label>
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="signup-email"
                name="signup-email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="signup-password" className="sr-only">Password</label>
              <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="signup-password"
                name="signup-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <button
              type="button"
              onClick={handleSignUp}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          <a href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default Signupbox;