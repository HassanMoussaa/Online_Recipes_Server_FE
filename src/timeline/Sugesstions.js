import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import './Sugesstions.css'

function Suggestions() {
  const [allUsers, setAllUsers] = useState([]);
  const jwtToken = localStorage.getItem("jwt_token");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await axios.post(`http://localhost:8000/users/${userId}/follow`, {}, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setAllUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, is_followed: true } : user
        )
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.post(`http://localhost:8000/users/${userId}/unfollow`, {}, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setAllUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, is_followed: false } : user
        )
      );
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="suggestions">
      <div className="suggestions__title">Suggestions for you</div>
      <div className="suggestions__usernames">
        {allUsers.map(user => (
          <div key={user._id} className="suggestions__username">
            <div className="username__left">
              <span className="avatar">
                 <Avatar alt={user.first_name + ' ' + user.last_name} src={user.image} />
              </span>
              <div className="username__info">
                <span className="username">{user.first_name} {user.last_name}</span>
                <span className="relation">Liked Boooks</span>
              </div>
            </div>
            {user.is_followed ? (
              <button className="follow__button" onClick={() => handleUnfollow(user._id)}>
                Unfollow
              </button>
            ) : (
              <button className="follow__button" onClick={() => handleFollow(user._id)}>
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
