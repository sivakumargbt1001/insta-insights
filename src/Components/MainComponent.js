import React, { useState } from "react";
import axios from "axios";
import "./MainComponent.css";
import SearchField from "./SearchField";
import ProfileCard from "./ProfileCard";

const MainComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState()

  const handleSearch = async (event) => {
    if (event.key === "Enter" && searchTerm.trim()) {
      setIsLoading(true);

      const options = {
        method: "GET",
        url: "https://instagram-scraper-api2.p.rapidapi.com/v1/info",
        params: { username_or_id_or_url: searchTerm },
        headers: {
          "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
          "x-rapidapi-key":
            "2c0dd3e342mshc34c0e9867a1fd5p156a16jsn25eebd420dd8",
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
        } = response.data.data;

        setIsLoading(false);

        setUserData({
          full_name,
          username,
          follower_count,
          following_count,
          media_count,
          biography,
          is_verified,
        });
      } catch (err) {
        setIsLoading(false);
        if (err.status === 404) {
          setUserData({
            message: `No user found with username "${searchTerm}"`,
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
      <ProfileCard data={userData} loading={isLoading} />
    </div>
  );
};

export default MainComponent;
