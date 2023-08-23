import React, { useState, useEffect } from "react";
import Sidenav from './navigation/Sidenav';
import Timeline from './timeline/Timeline';
import "./Homepage.css";
import axios from "axios";

function Homepage() {
  const jwtToken = localStorage.getItem("jwt_token");

  const [posts, setPosts] = useState([]);
  const [posts_users, setPosts_users] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/recipes/user', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const postsWithLikeStatus = response.data.recipes.map(post => {
        const likedStatus = post.is_liked === true; 
        localStorage.setItem(`post_${post.id}_liked`, JSON.stringify(likedStatus));
        return { ...post, is_liked: likedStatus };
      });

      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

const fetchPosts_users = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/recipes', {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    const postsWithLikeStatus = response.data.recipes.map(post => {
      const likedStatus = post.is_liked === true; 
      localStorage.setItem(`post_${post.id}_liked`, JSON.stringify(likedStatus));
      return { ...post, is_liked: likedStatus };
    });

    setPosts_users(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
  useEffect(() => {
    fetchPosts();
    fetchPosts_users();
  }, []);

  return (
    <div className='homepage'>
      <div className='homepage__nav'>
        <Sidenav fetchPosts={fetchPosts} fetchPosts_users={fetchPosts_users} />
      </div>
      <div className='homepage__timeline'>
        <Timeline posts={posts} fetchPosts={fetchPosts} posts_users={posts_users} fetchPosts_users={fetchPosts_users} />
      </div>
    </div>
  )
}

export default Homepage;
