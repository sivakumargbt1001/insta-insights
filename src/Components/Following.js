import React from "react";
import "./Followers.css";
import FollowerCard from "./FollowerCard";
const Following = ({ following }) => {
  if (following.length === 0) {
    return <div>No following</div>;
  }

  return (
    <div className="followers-container">
      <p className="title">All following</p>
      <div className="followers-list">
        {following.map((follow) => (
          <FollowerCard key={follow.id} data={follow} />
        ))}
      </div>
    </div>
  );
};

export default Following;
