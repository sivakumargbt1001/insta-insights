import React from "react";
import PostCard from "./PostCard";

const ReelsContainer = ({ reels }) => {
  if (reels.length === 0) {
    return;
  }

  return (
    <div className="post-container">
      {reels.map((reel) => (
        <PostCard
          key={reel.media.code}
          like_count={reel.media.like_count}
          comment_count={reel.media.comment_count}
        />
      ))}
    </div>
  );
};

export default ReelsContainer;
