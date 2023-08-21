import React, { useState, useEffect } from "react";
import Sidenav from './navigation/Sidenav'
import Timeline from './timeline/Timeline'
import "./Homepage.css"
import axios from "axios";

function Homepage() {
  const jwtToken = localStorage.getItem("jwt_token");

  const [posts, setPosts] = useState([]);

   const fetchPosts = async () => {
   
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/recipes/user', {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    
    setPosts(response.data); 
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};


  return (
    <div className='homepage'>
      <div className='homepage__nav'>
        <Sidenav fetchPosts={fetchPosts}/>
        </div>    
      <div className='homepage__timeline'>
        <Timeline posts = {posts} fetchPosts={fetchPosts}/> 
        </div>    
    </div>
  )
}

export default Homepage
