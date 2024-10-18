import React, { useState } from "react";
import axios from "axios";
import "./MainComponent.css";
import SearchField from "./SearchField";
import ProfileCard from "./ProfileCard";
import PrivateSection from "./PrivateSection";
import PublicSection from "./PublicSection";
import data from "../user.json";

const MainComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState({});
  const [searching, setSearching] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showInsights, setShowInsights] = useState(true);
  const [insights, setInsights] = useState(null);
  const [showPublicOrInsights, setShowPublicOrInsights] = useState(true);
  const userdata = {
    full_name: "John Doe",
    username: "johndoe",
    follower_count: 150,
    following_count: 200,
    media_count: 30,
    biography: "Just another Instagram user",
    is_verified: false,
    is_private: false,
    profile_pic_url_hd:
      "https://scontent-atl3-3.xx.fbcdn.net/v/t51.2885-15/416405315_1113530156450574_2266432776457939841_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9a7156&_nc_ohc=lcto9Y7Vt1cQ7kNvgFek954&_nc_zt=23&_nc_ht=scontent-atl3-3.xx&oh=00_AYCDgQ6U30HyfuJ6yzTcboa5OalMiaAUpyNSNiIPMk6TMw&oe=67179843",
  };

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
        "x-rapidapi-key": "e605739e0emsh407eab8a403ca91p1e3829jsna8a556a56efe",
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
        "x-rapidapi-key": "e605739e0emsh407eab8a403ca91p1e3829jsna8a556a56efe",
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
        url: "https://instagram-scraper-api2.p.rapidapi.com/v1/info",
        params: { username_or_id_or_url: searchTerm },
        headers: {
          "x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com",
          "x-rapidapi-key":
            "e605739e0emsh407eab8a403ca91p1e3829jsna8a556a56efe",
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
          profile_pic_url_hd,
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
          profile_pic_url_hd,
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
  const handleInsights = () => {
    setShowPublicOrInsights(false);
  };
  const handlePublicSec = () => {
    setShowPublicOrInsights(true);
  };
  return (
    <div className="mainContainer">
      <h1>Instagram Insights</h1>
      <SearchField
        term={searchTerm}
        change={setSearchTerm}
        submit={handleSearch}
      />

      {/* <ProfileCard
        data={userData}
        loading={searching}
        handleInsights={handleInsights}
      /> */}
      <ProfileCard data={userdata} handleInsights={handleInsights} />

      {showPublicOrInsights ? (
        userdata?.is_private === false && (
          <PublicSection
            username={userData.username}
            followers={followers}
            following={following}
            getFollowers={showFollowers}
            getFollowing={showFollowing}
          />
        )
      ) : (
        <div>
          insights
          <button onClick={handlePublicSec}>Back</button>
        </div>
      )}

      {userData?.is_private && <PrivateSection />}
    </div>
  );
};

export default MainComponent;
