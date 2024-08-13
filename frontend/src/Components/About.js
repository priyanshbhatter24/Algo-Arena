import React from "react";
import Dashboard from "../Assets/Dashboard-leetcode.png";
import LeetcodeBattleground from "../Assets/leetcode-battleground.png";
const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-section-container">
        
        <div className="about-section-image-container">
          <img src={Dashboard} alt="" />
        </div>
        <div className="about-section-text-container">
          <h1 className="primary-heading-1">
          Timed Multiplayer Functionality
          </h1>
          <p className="about-primary-text-1">
          Players start together and code within 60 minutes
          </p>
          
        </div>
      </div>
      <div className="about-section-container">
        <div className="about-section-text-container">
          <h1 className="primary-heading-2">
          Timed Multiplayer Functionality
          </h1>
          <p className="about-primary-text-2">
          Players start together and code within 60 minutes
          </p>
          
        </div>
        <div className="about-section-image-container">
          <img src={LeetcodeBattleground} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
