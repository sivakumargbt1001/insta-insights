import React, { useState } from "react";
import axios from "axios";
import "./MainComponent.css";
import SearchField from "./SearchField";
import ProfileCard from "./ProfileCard";
import PrivateSection from "./PrivateSection";
import PublicSection from "./PublicSection";

const MainComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState({});
  const [searching, setSearching] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const showFollowers = async () => {
    if (userData.is_private) {
      return;
    }

    const options = {
      method: "GET",
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1/followers",
      params: { username_or_id_or_url: userData.username },
      headers: {
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
        "x-rapidapi-key": "f18acc8be5msh931a2482a5a68eep1f3d39jsn145d4510139b",
      },
    };

    try {
      const response = await axios.request(options);
      const { items } = response.data.data;

      setFollowers(items);
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
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1/following",
      params: { username_or_id_or_url: userData.username },
      headers: {
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
        "x-rapidapi-key": "f18acc8be5msh931a2482a5a68eep1f3d39jsn145d4510139b",
      },
    };
    try {
      const response = await axios.request(options);
      const { items } = response.data.data;
      console.log(items);
      setFollowing(items);
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
        url: "https://instagram-scraper-api2.p.rapidapi.com/v1/info",
        params: { username_or_id_or_url: searchTerm },
        headers: {
          "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
          "x-rapidapi-key": "f18acc8be5msh931a2482a5a68eep1f3d39jsn145d4510139b",
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

  return (
    <div className="mainContainer">
      <h1>Instagram Insights</h1>
      <SearchField
        term={searchTerm}
        change={setSearchTerm}
        submit={handleSearch}
      />
      <ProfileCard data={userData} loading={searching} />
      {userData?.is_private && <PrivateSection />}
      {userData?.is_private === false && (
        <PublicSection
          username={userData.username}
          followers={followers}
          following={following}
          getFollowers={showFollowers}
          getFollowing={showFollowing}
        />
      )}
    </div>
  );
};

export default MainComponent;
