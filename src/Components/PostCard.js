import React from "react";
import "./PostCard.css";
import formatNumber from '../helper/numberFormat'

const PostCard = (data) => {
  return (
    <div className="post-card" onClick={data.click}>
      <div className="stats">
        <p>{formatNumber(data.like_count)}🤍</p>
        <p>{formatNumber(data.comment_count)}💬</p>
      </div>
    </div>
  );
};

export default PostCard;
