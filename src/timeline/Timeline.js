import React, { useState, useEffect } from 'react';
import "./Timeline.css"
import Sugesstions from './Sugesstions'
import Post from './posts/Post'
import axios from "axios";


function Timeline({ posts, fetchPosts, posts_users, fetchPosts_users }) {
  useEffect(() => {
    fetchPosts();
    fetchPosts_users();
  }, []);

  

  return (
    <div className='timeline'>
      <div className='title_name'> <h1>My Recipies </h1></div>
      <div className='timeline__left'>
        {posts.recipes ? (
          posts.recipes.map(post => (
            <Post key={post.id} post={post} /> 
            

          ))
        ) : (
          <p>Loading...</p>
        )}
        </div>
         <div className='title_name'> <h1>Recipies </h1></div>
         <div className='timeline__left'>
         
         {posts_users.recipes ? (
          posts_users.recipes.map(post => (
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
