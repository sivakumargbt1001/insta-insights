import React, { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import PostCard from "../../PostCard";
import FilterDropdown from "../../../helper/FilterDropdown";
import axios from "axios";
import InsightModal from "./InsightModal";

const PostInsights = ({ toggle, username }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const filterOptions = [
    {
      text: "Last 3 days",
      id: 3,
    },
    {
      text: "Last 7 days",
      id: 7,
    },
  ];

  const handleFilterChange = (days) => {
    setLoading(true);
    const currentTime = Date.now();
    const thresholdTime = currentTime - days * 24 * 60 * 60 * 1000;

    const filtered = posts.filter((post) => post.taken_at * 1000 >= thresholdTime);

    setFilteredPosts(filtered);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://instagram-scraper-api3.p.rapidapi.com/user_posts",
        params: { username_or_id: username },
        headers: {
          "x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API,
        },
      };
      try {
        const response = await axios.request(options);
        setPosts(response.data.data.items);
        setLoading(false);
        handleFilterChange(3);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="insights-container">
      <div className="insights-header">
        <span>
          <FaArrowLeft size={14} onClick={toggle} />
        </span>
        <p className="heading">Views</p>
      </div>

      <FilterDropdown
        options={filterOptions}
        onFilterChange={handleFilterChange}
      />

      {!loading && (
        <div className="post-container">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.code}
              like_count={post.like_count}
              comment_count={post.comment_count}
              product_type={post.product_type}
              click={() => setSelectedPost(post.code)}
            />
          ))}
        </div>
      )}

      {loading && <div style={{ color: "white" }}>Loading...</div>}
      {selectedPost && (
        <InsightModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default PostInsights;
