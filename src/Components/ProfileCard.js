import React from "react";
import "./ProfileCard.css";
import profileImg from "../assets/png-transparent-user-person-profile-instagram-ui-colored-icon.png";

const ProfileCard = ({ data, loading }) => {
  if (data.message) {
    return <div>{data.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.username) {
    return <div>Search any user</div>;
  }

  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <img src={profileImg} alt="Profile" />
        <div className="profileName">
          <div>
            <p>{data.full_name ? data.full_name : "no username"}</p>
            {data.is_verified && <div className="verified-badge">Verified</div>}
          </div>
          <p className="username">@{data.username}</p>
        </div>
      </div>

      <div className="profileStats">
        <div className="stat-item">
          <p>{data.media_count}</p>
          <p>Posts</p>
        </div>
        <div className="stat-item">
          <p>{data.follower_count}</p>
          <p>Followers</p>
        </div>
        <div className="stat-item">
          <p>{data.following_count}</p>
          <p>Following</p>
        </div>
      </div>

      <div className="bio">
        <p>{data.biography}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
