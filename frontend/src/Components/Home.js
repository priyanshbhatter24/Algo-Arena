// import React from "react";
// import BannerBackground from "../Assets/home-banner-background.png";
// import BannerImage from "../Assets/home-banner-image.png";
// import Navbar from "./Navbar";
// import { FiArrowRight } from "react-icons/fi";

// const Home = () => {
//   return (
//     <div className="home-container">
//       <Navbar />
//       <div className="home-banner-container">

//         <div className="home-text-section">
//           <h1 className="primary-heading">
//           Leetcode Battleground <br/> PLAY TO LEARN
//           </h1>
//           <p className="primary-text">
//             Challenge your friends to get your dream internship
//           </p>
//           <button className="secondary-button" onClick={() => window.location.href = "/signup"}>
//             Get Started <FiArrowRight />{" "}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion"; // Import framer-motion

const Home = () => {
  // Animation settings
  const textAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const buttonAnimation = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay: 0.5, duration: 0.5 }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <motion.div className="home-text-section"
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={textAnimation.transition}>
          <h1 className="primary-heading">
            Leetcode Battleground <br/> PLAY TO LEARN
          </h1>
          <p className="primary-text">
            Challenge your friends to get your dream internship
          </p>
          <motion.button className="secondary-button"
            initial={buttonAnimation.initial}
            animate={buttonAnimation.animate}
            transition={buttonAnimation.transition}
            onClick={() => window.location.href = "/signup"}>
            Get Started <FiArrowRight />{" "}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
