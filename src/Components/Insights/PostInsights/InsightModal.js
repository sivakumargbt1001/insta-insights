import React, { useEffect, useState } from "react";
import "./InsightModal.css";
import {
  FaBookmark,
  FaComment,
  FaHeart,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import formatNumber from "../../../helper/numberFormat";
import axios from "axios";

const InsightModal = ({ post, onClose }) => {
  const [insightPost, setInsightPost] = useState({
    like_count: 123,
    comment_count: 123,
    save_count: 123,
    share_count: 123,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://instagram-scraper-api3.p.rapidapi.com/media_insights",
        params: { code_or_id_or_url: post },
        headers: {
          "x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API,
        },
      };
      try {
        const response = await axios.request(options);
        setInsightPost(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    };

    fetchData();
  }, [post]);

  return (
    <div className="insight-modal">
      <div className="insight-modal-content">
        <span className="close" onClick={onClose}>
          <FaTimes />
        </span>
        {!loading && (
          <div>
            <div className="insight-media"></div>
            <div className="insight-details">
              <div className="insight-count">
                <p>{formatNumber(insightPost.like_count || 0)}</p>
                <span>
                  <FaHeart size={14} />
                </span>
              </div>
              <div className="insight-count">
                <p>{formatNumber(insightPost.comment_count || 0)}</p>
                <span>
                  <FaComment size={14} />
                </span>
              </div>
              <div className="insight-count">
                <p>{formatNumber(insightPost.share_count || 0)}</p>
                <span>
                  <FaPaperPlane size={14} />
                </span>
              </div>
              <div className="insight-count">
                <p>{formatNumber(insightPost.save_count || 0)}</p>
                <span>
                  <FaBookmark size={14} />
                </span>
              </div>
            </div>
          </div>
        )}
        {loading && <div className="loading-div">Loading...</div>}
      </div>
    </div>
  );
};

export default InsightModal;
