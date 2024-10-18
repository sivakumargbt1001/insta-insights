import React, { useState } from "react";
import "./PostContainer.css";
import PostCard from "./PostCard";
import PostModal from "./PostModal";

const PostContainer = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  if (posts.length === 0) {
    return;
  }

  return (
    <div className="post-container">
      {posts.map((post) => (
        <PostCard
          key={post.code}
          like_count={post.like_count}
          comment_count={post.comment_count}
          product_type={post.product_type}
          click={() => handlePostClick(post)}
        />
      ))}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default PostContainer;
