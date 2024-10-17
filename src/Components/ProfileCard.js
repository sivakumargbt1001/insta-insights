import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <img
          src="https://scontent-waw2-2.cdninstagram.com/v/t51.2885-19/405773563_7354985751202960_9181943990999907074_n.jpg?stp=dst-jpg_s640x640"
          alt="Profile"
        />
        <div className="profileName">
          <div>
            <p>Rashmika Mandanna</p>
            <div className="verified-badge">Verified</div>
          </div>
          <p className="username">@rashmika_mandanna</p>
        </div>
      </div>

      <div className="profileStats">
        <div className="stat-item">
          <p>700</p>
          <p>Posts</p>
        </div>
        <div className="stat-item">
          <p>44.2M</p>
          <p>Followers</p>
        </div>
        <div className="stat-item">
          <p>313</p>
          <p>Following</p>
        </div>
      </div>

      <div>
        <p>Kindness before all </p>
      </div>
    </div>
  );
};

export default ProfileCard;
