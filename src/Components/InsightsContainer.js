import React, { useEffect, useState } from "react";
import "./InsightsContainer.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import InsightsItems from "./Insights/InsightsItems";
import FollowersGraph from "./Charts/FollowerGraph";
import PostInsights from "./Insights/PostInsights/PostInsights";

const InsightsContainer = ({ username, toggle }) => {
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPosts, setShowPosts] = useState(false);
  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://instagram-scraper-api3.p.rapidapi.com/follower_insights",
        params: { username_or_id: username },
        headers: {
          "x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API,
        },
      };
      try {
        const response = await axios.request(options);
        console.log(response.data.data.user);
        setInsights(response.data.data.user);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tabs-container">
      {!showPosts && (
        <div className="insights-container">
          <div className="insights-header">
            <span>
              <FaArrowLeft size={14} onClick={toggle} />
            </span>
            <p className="heading">Overview</p>
          </div>
          {insights?.business_manager ? (
            <InsightsItems insights={insights} toggle={togglePosts} />
          ) : (
            <div>Insights not enabled</div>
          )}
          <FollowersGraph />
        </div>
      )}

      {showPosts && <PostInsights toggle={togglePosts} username={username} />}
    </div>
  );
};

export default InsightsContainer;
