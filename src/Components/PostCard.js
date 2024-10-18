import React from "react";
import "./PostCard.css";
import formatNumber from "../helper/numberFormat";
import { FaComment, FaHeart } from "react-icons/fa";

const PostCard = (data) => {
  return (
    <div className="post-card" onClick={data.click || null}>
      <img src={data.image_url} alt="Thumbnail" />
      <div className="stats">
        <div className="count-icon">
          <p>{formatNumber(data.like_count)}</p>
          <span>
            <FaHeart size={14} />
          </span>
        </div>
        <div className="count-icon">
          <p>{formatNumber(data.comment_count)}</p>
          <span>
            <FaComment size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
