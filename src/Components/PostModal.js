import React from "react";
import "./PostModal.css";

const PostModal = ({ post, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="post-media"></div>

        <div className="post-details">
          <p>{post.caption.text}</p>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
