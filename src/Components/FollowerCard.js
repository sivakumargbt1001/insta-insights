import React from "react";
import "./FollowerCard.css";
import profileImg from "../assets/png-transparent-user-person-profile-instagram-ui-colored-icon.png";

const FollowerCard = ({ data }) => {
  return (
    <div className="followerHeader">
      <img src={profileImg} alt="Profile" />
      <div className="followerName">
        <div>
          <p>{data.full_name ? data.full_name : "no username"}</p>
          {data.is_verified && <div className="verified-badge">Verified</div>}
        </div>
        <p className="username">@{data.username}</p>
      </div>
    </div>
  );
};

export default FollowerCard;
