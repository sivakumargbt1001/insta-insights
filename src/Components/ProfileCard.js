import React from "react";
import "./ProfileCard.css";
import profileImg from "../assets/png-transparent-user-person-profile-instagram-ui-colored-icon.png";

const ProfileCard = ({ data, loading, getFollowers, getFollowing }) => {
  if (data.message) {
    return <div>{data.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.username) {
    return <div>Search any user</div>;
  }

  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <img
          src="https://scontent-fra5-1.cdninstagram.com/v/t51.29350-15/441396569_964681935207210_2865470393726769220_n.jpg?se=7&stp=dst-jpg_e35&_nc_ht=scontent-fra5-1.cdninstagram.com&_nc_cat=1&_nc_ohc=jYbc-d_T0MIQ7kNvgHOc_Em&_nc_gid=d11be4bed881401da98e2d6a5d248a38&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzM2MjgxNDc2OTU2MjI1NDYxNg%3D%3D.3-ccb7-5&oh=00_AYCZdLOyQmd14_ds9YhgIzOf-2QWk8Dwz4rvdGvO9yRtXQ&oe=6716AF61&_nc_sid=b41fef"
          alt="Profile"
        />
        <div className="profileName">
          <div>
            <p>{data.full_name ? data.full_name : "no username"}</p>
            {data.is_verified && <div className="verified-badge">Verified</div>}
          </div>
          <p className="username">@{data.username}</p>
        </div>
      </div>

      <div className="profileStats">
        <div className="stat-item">
          <p>{data.media_count}</p>
          <p>Posts</p>
        </div>
        <div className="stat-item" onClick={getFollowers}>
          <p>{data.follower_count}</p>
          <p>Followers</p>
        </div>
        <div className="stat-item" onClick={getFollowing}>
          <p>{data.following_count}</p>
          <p>Following</p>
        </div>
      </div>

      <div className="bio">
        <p>{data.biography}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
