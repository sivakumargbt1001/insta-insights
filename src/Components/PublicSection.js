import React, { useCallback, useEffect, useState } from "react";
import PostContainer from "./PostContainer";
import "./PublicSection.css";
import axios from "axios";
import Followers from "./Followers";
import Following from "./Following";
import ReelsContainer from "./ReelsContainer";

const PublicSection = ({
  username,
  followers,
  following,
  getFollowing,
  getFollowers,
}) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);

  const showPosts = useCallback(async () => {
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
      const { items } = response.data.data;
      setPosts(items);
    } catch (err) {
      console.log(err.message);
    }
  }, [username]);

  const showReels = async () => {
    const options = {
      method: "GET",
      url: "https://instagram-scraper-api3.p.rapidapi.com/user_reels",
      params: { username_or_id: username },
      headers: {
        "x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API,
      },
    };
    try {
      const response = await axios.request(options);
      const { items } = response.data.data;
      setReels(items);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleReels = () => {
    setActiveTab("reels");
    showReels();
  };
  const handlePosts = () => {
    setActiveTab("posts");
    showPosts();
  };

  useEffect(() => {
    showPosts();
  }, [showPosts]);

  const handleFollowing = () => {
    setActiveTab("following");
    getFollowing();
  };

  const handleFollowers = () => {
    setActiveTab("followers");
    getFollowers();
  };
  return (
    <div className="public-container">
      <div className="nav-container">
        <ul className="nav">
          <li className="nav-item" onClick={handlePosts}>
            Posts
          </li>
          <li className="nav-item" onClick={handleReels}>
            Reels
          </li>
          <li className="nav-item" onClick={handleFollowers}>
            Followers
          </li>
          <li className="nav-item" onClick={handleFollowing}>
            Following
          </li>
        </ul>
      </div>

      {activeTab === "posts" && <PostContainer posts={posts} />}
      {activeTab === "reels" && <ReelsContainer reels={reels} />}
      {activeTab === "followers" && followers.length > 0 && (
        <Followers followers={followers} />
      )}
      {activeTab === "following" && following.length > 0 && (
        <Following following={following} />
      )}
    </div>
  );
};
export default PublicSection;
