import React, { useState } from "react";
import axios from "axios";
import "./MainComponent.css";
import SearchField from "./SearchField";
import ProfileCard from "./ProfileCard";
import PrivateSection from "./PrivateSection";
import PublicSection from "./PublicSection";
import InsightsContainer from "./InsightsContainer";

const MainComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState({});
  const [searching, setSearching] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showInsights, setShowInsights] = useState(false);
  const [showSection, setShowSection] = useState(true);

  const showFollowers = async () => {
    if (userData.is_private) {
      return;
    }

    const options = {
      method: "GET",
      url: "https://instagram-scraper-api3.p.rapidapi.com/user_followers",
      params: { username_or_id: userData.username },
      headers: {
        "x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API,
      },
    };

    try {
      const response = await axios.request(options);
      const { users } = response.data.data;

      setFollowers(users);
    } catch (err) {
      console.log(err.message);
    }
  };

  const showFollowing = async () => {
    if (userData.is_private) {
      return;
    }
    const options = {
      method: "GET",
      url: "https://instagram-scraper-api3.p.rapidapi.com/user_following",
      params: { username_or_id: userData.username },
      headers: {
        "x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API,
      },
    };
    try {
      const response = await axios.request(options);
      const { users } = response.data.data;
      setFollowing(users);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter" && searchTerm.trim()) {
      setSearching(true);
      setFollowers([]);
      setUserData({});

      const options = {
        method: "GET",
        url: "https://instagram-scraper-api3.p.rapidapi.com/user_info",
        params: { username_or_id: searchTerm },
        headers: {
          "x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API,
        },
      };

      try {
        const response = await axios.request(options);
        const {
          full_name,
          username,
          follower_count,
          following_count,
          media_count,
          biography,
          is_verified,
          is_private,
          profile_pic_url,
        } = response.data.data;

        setSearching(false);

        setUserData({
          full_name,
          username,
          follower_count,
          following_count,
          media_count,
          biography,
          is_verified,
          is_private,
          profile_pic_url,
        });
      } catch (err) {
        setSearching(false);
        if (err.status === 404) {
          setUserData({
            message: `No user found with username "${searchTerm}"`,
          });
        } else {
          setUserData({
            message: "Error in fetching user details",
          });
        }
      }

      setSearchTerm("");
    }
  };

  const toggleInsights = () => {
    setShowInsights(!showInsights);
    setShowSection(!showSection);
  };

  return (
    <div className="mainContainer">
      <h1>Instagram Insights</h1>
      <SearchField
        term={searchTerm}
        change={setSearchTerm}
        submit={handleSearch}
      />
      <ProfileCard
        data={userData}
        loading={searching}
        handleInsights={toggleInsights}
      />
      {showSection && userData?.is_private && <PrivateSection />}
      {showSection && userData?.is_private === false && (
        <PublicSection
          username={userData.username}
          followers={followers}
          following={following}
          getFollowers={showFollowers}
          getFollowing={showFollowing}
        />
      )}
      {showInsights && (
        <InsightsContainer
          username={userData.username}
          toggle={toggleInsights}
        />
      )}
    </div>
  );
};

export default MainComponent;
