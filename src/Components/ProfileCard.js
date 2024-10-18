import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ data, loading, handleInsights }) => {
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
      <div className="ProfileHead">
        <div className="profileHeader">
          <img src={data.profile_pic_url_hd} alt="Profile" />
          <div className="profileName">
            <div>
              <p>{data.full_name ? data.full_name : "no username"}</p>
              {data.is_verified && (
                <div className="verified-badge">Verified</div>
              )}
            </div>
            <p className="username">@{data.username}</p>
          </div>
        </div>
        <button className="insightsBtn" onClick={handleInsights}>
          Insights
        </button>
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
