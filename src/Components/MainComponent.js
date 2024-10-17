import React from "react";
import './MainComponent.css'
import SearchField from "./SearchField";
import ProfileCard from "./ProfileCard";

const MainComponent = () => {
  return (
    <div className="mainContainer">
      <h1>Instagram Insights</h1>
      <SearchField />
      <ProfileCard />
    </div>
  );
};

export default MainComponent;
