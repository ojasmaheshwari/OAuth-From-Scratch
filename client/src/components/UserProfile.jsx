import React from "react";
import { SERVER_URL } from "../config";

const UserProfile = ({user}) => {
  return (
    <>
      <style>{`
        .user-profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50px;
          text-align: center;
          font-family: Arial, sans-serif;
        }

        .profile-photo {
          width: 150px;
          height: 150px;
          border-radius: 50%; /* Makes it circular */
          object-fit: cover;
          margin-bottom: 15px;
        }

        .full-name {
          margin: 5px 0;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .email {
          margin: 0;
          color: #555;
          font-size: 1rem;
        }
      `}</style>

      <div className="user-profile">
        <h1>Welcome</h1>
        <br></br>
        <img
          src={user.profile_picture}
          alt="Profile"
          className="profile-photo"
          referrerPolicy="no-referrer"
        />
        <h2 className="full-name">{user.full_name}</h2>
        <p className="email">{user.email}</p>
      </div>
    </>
  );
};

export default UserProfile;
