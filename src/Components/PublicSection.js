import React, { useState } from "react";
import axios from "axios";
import "./PublicSection.css";
const PublicSection = ({ data }) => {
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [active, setActive] = useState("posts");
  const showPosts = async () => {
    if (data.is_private) {
      return;
    }

    const options = {
      method: "GET",
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts",
      params: { username_or_id_or_url: data.username },
      headers: {
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
        "x-rapidapi-key": "2c0dd3e342mshc34c0e9867a1fd5p156a16jsn25eebd420dd8",
      },
    };

    try {
      const response = await axios.request(options);
      const { items } = response.data.data;

      setPosts(items);
    } catch (err) {
      console.log(err.message);
    }
  };
  const showReels = async () => {
    if (data.is_private) {
      return;
    }

    const options = {
      method: "GET",
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1.2/reels",
      params: { username_or_id_or_url: data.username },
      headers: {
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
        "x-rapidapi-key": "2c0dd3e342mshc34c0e9867a1fd5p156a16jsn25eebd420dd8",
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
    setActive("reels");
    showReels();
  };
  const handlePosts = () => {
    setActive("posts");
    showPosts();
  };
  return (
    <div>
      <div className="nav-container">
        <ul className="nav">
          <li
            className={`nav-item ${active === "posts" ? "nav-item-click" : ""}`}
            onClick={handlePosts}
          >
            Posts
          </li>
          <li
            className={`nav-item ${active === "reels" ? "nav-item-click" : ""}`}
            onClick={handleReels}
          >
            Reels
          </li>
        </ul>
      </div>

      <div>
        {active === "posts" && (
          <div>
            {posts.length ? (
              posts.map((post) => (
                <div key={post.id}>
                  `Like : ${post.like_count} and Comment : ${post.comment_count}{" "}
                  `
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        )}

        {active === "reels" && (
          <div>
            {reels.length ? (
              reels.map((reel) => (
                <div key={reel.id}>
                  `Like : ${reel.like_count} and Comment : ${reel.comment_count}{" "}
                  `
                </div>
              ))
            ) : (
              <p>No reels available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicSection;
