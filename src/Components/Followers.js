import React from "react";
import "./Followers.css";
import FollowerCard from "./FollowerCard";

const Followers = ({ followers }) => {
  if (followers.length === 0) {
    return <div>No followers</div>;
  }

  return (
    <div className="followers-container">
      <p className="title">All followers</p>
      <div className="followers-list">
        {followers.map((follower) => (
          <FollowerCard key={follower.id} data={follower} />
        ))}
      </div>
    </div>
  );
};

export default Followers;
