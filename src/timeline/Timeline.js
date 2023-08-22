import React, { useState, useEffect } from 'react';
import "./Timeline.css"
import Sugesstions from './Sugesstions'
import Post from './posts/Post'
import axios from "axios";
import PostUsers from './posts/PostUsers';

function Timeline({ posts, fetchPosts, posts_users, fetchPosts_users }) {
  useEffect(() => {
    fetchPosts();
    fetchPosts_users();
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
         <div className='timeline__users'>
         {posts_users.recipes ? (
          posts_users.recipes.map(post => (
            <PostUsers key={post.id} post={post} /> 
            

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
