import React, { useState } from "react";
import "./PostContainer.css";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import axios from "axios";

const PostContainer = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = async (code) => {
    const options = {
      method: "GET",
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1/post_info",
      params: { code_or_id_or_url: code },
      headers: {
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
        "x-rapidapi-key": "f18acc8be5msh931a2482a5a68eep1f3d39jsn145d4510139b",
      },
    };

    try {
      const response = await axios.request(options);

      setSelectedPost(response.data.data);
    } catch (err) {
      console.log(err.message);
    }
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
          click={() => handlePostClick(post.code)}
        />
      ))}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default PostContainer;
