import React, { useState, useEffect } from 'react';
import "./Timeline.css"
import Sugesstions from './Sugesstions'
import Post from './posts/Post'
import axios from "axios";

function Timeline({ posts, fetchPosts }) {
  useEffect(() => {
    fetchPosts();
  }, []);

  

  return (
    <div className='timeline'>
      <div className='timeline__left'>
        {posts.recipes ? (
          posts.recipes.map(post => (
            <Post key={post.id} post={post} /> 
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* <div className='timeline__right'>
        <Sugesstions />
      </div> */}
    </div>
  );
}

export default Timeline;
