import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./Post.css";
import axios from 'axios'; 

function Post({ post }) {
  
  const [isCommenting, setIsCommenting] = useState(false); 
  const [commentsVisible, setCommentsVisible] = useState(false); 
   const [newComment, setNewComment] = useState('');
  const [updatedPost, setUpdatedPost] = useState(post);
  const [comments, setComments] = useState([]);

  // Get initial liked status directly from the post object
  const initialLikedStatus = post.is_liked;

  // Use local state to manage the liked status
  const [isLiked, setIsLiked] = useState(initialLikedStatus);

  const jwtToken = localStorage.getItem("jwt_token");

  
  useEffect(() => {
    checkIsLiked();
  }, []);

  const checkIsLiked = () => {
    // Get liked status from localStorage if available, otherwise use initial value
    const storedLikedStatus = localStorage.getItem(`post_${post.id}_liked`);
    const likedStatus = storedLikedStatus === 'true';
    setIsLiked(likedStatus);
  };

  const handleLikeClick = async () => {
    try {
      // Update liked status on the server
      if (isLiked) {
        await axios.post(
          `http://127.0.0.1:8000/api/recipes/${post.id}/unlike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
      } else {
        await axios.post(
          `http://127.0.0.1:8000/api/recipes/${post.id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
      }

      // Update local state and localStorage
      setIsLiked(!isLiked);
      localStorage.setItem(`post_${post.id}_liked`, JSON.stringify(!isLiked));
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };
   const handleCommentClick = () => {
    setIsCommenting(true);
  };



  const handleCloseCommentPopup = () => {
    setIsCommenting(false);
    setNewComment('');
  };
  
const handleCommentSubmit = async () => {
  try {
    await axios.post(
      `http://127.0.0.1:8000/api/recipes/${post.id}/comments`,
      { comment: newComment },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    setNewComment('');
    setIsCommenting(false);
    
   handleViewCommentsClick();
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};


  const handleViewCommentsClick = async () => {
  try {
    if (!commentsVisible) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/recipes/${post.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setComments(response.data.comments);
    }
    setCommentsVisible(!commentsVisible);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};


  
  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__headerAuthor'>
            <Avatar alt={post.user.name} src={post.image} />
          {post.user.name} 
          {/* <span>{new Date(post.created_at).toLocaleTimeString()}</span> */}
        </div>
        <MoreHorizIcon />
      </div>
      <div className='post__image'>
        <img src={post.image_url} alt='post' />
      </div>
      <div className="post__footer">
        <div className="post__footerIcons">
          <div className="post__iconsMain">
              {isLiked ? (
                  <FavoriteBorderIcon className="postIcon postIconLiked" onClick={handleLikeClick} />
                ) : (
                  <FavoriteBorderIcon className="postIcon" onClick={handleLikeClick} />
                )}
            <ChatBubbleOutlineIcon className="postIcon" onClick={handleCommentClick} />
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post__iconSave">
            <BookmarkBorderIcon className="postIcon" />
          </div>
        </div>
        <div className="post__details">
          <p className="post__author"> Name: {post.name}</p>
          <p className="post__review"> Cuisine: {post.cuisine}</p>
        </div>
        {/* Liked by {post.liked_by.length} people. */}
       </div>

          <div className="post__comments">
        <button onClick={handleViewCommentsClick}>
          {commentsVisible ? "Hide Comments" : "View Comments..."}
        </button>
        {commentsVisible && (
          <div className="commentList">
             {comments.length > 0 ? (
      comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.user.name}</p>
          <p>{comment.comment_text}</p>
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        )}
      </div>

       
      {isCommenting  && (
        
          <>
          <div className="overlay" onClick={handleCloseCommentPopup} />
          <div className="commentPopup">
            <textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Add Comment</button>
            <button onClick={handleCloseCommentPopup}>Cancel</button>
          </div>
        </>
      )}


      </div>
  );
}

export default Post;
