// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Loginbox = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/login?email=${email}&password=${password}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
        
//       });

//       if (response.status === 200) {
//         sessionStorage.setItem('email', email);
//         navigate('/findbattle');
//       } else {
//         const errorMessage = await response.text();
//         setError(errorMessage || 'Invalid email or password');
//         console.error('Login failed:', errorMessage);
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Network error:', error.message);
//     }
//   };

//   return (
//     <div className="m-5 bg-white shadow-2xl w-96 flex flex-col items-center p-6 rounded-lg gap-2.5">
//       <h1 className="text-3xl font-bold">Log in</h1>
//       <div className="relative w-full">
//         <input
//           name="login-email"
//           required
//           className="mt-4 w-full rounded-lg h-11 border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-2.5"
//           type="email"
//           placeholder="Enter your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="relative w-full">
//         <input
//           name="login-password"
//           required
//           className="mt-4 w-full rounded-lg h-11 border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-2.5"
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       <button
//         type="button"
//         className="mt-8 h-14 bg-gradient-to-b from-gray-900 to-black rounded-lg border-0 text-white text-lg font-bold w-full hover:shadow-lg transition-all duration-300"
//         onClick={handleLogin}
//       >
//         Log In
//       </button>
//     </div>
//   );
// };

// export default Loginbox;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

const Loginbox = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/login?email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        sessionStorage.setItem('email', email);
        navigate('/findbattle');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Invalid email or password');
        console.error('Login failed:', errorMessage);
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
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Please sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="email-address"
                name="email"
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
              <label htmlFor="password" className="sr-only">Password</label>
              <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
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
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginbox;