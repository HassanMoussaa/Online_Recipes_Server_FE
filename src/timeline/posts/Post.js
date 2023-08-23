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
  const [comments, setComments] = useState([]);
  const [isAddedToShoppingList, setIsAddedToShoppingList] = useState(false);
const [shoppingListErrorMessage, setShoppingListErrorMessage] = useState('');

 
  const initialLikedStatus = post.is_liked;

  
  const [isLiked, setIsLiked] = useState(initialLikedStatus);

  const jwtToken = localStorage.getItem("jwt_token");

  
  useEffect(() => {
    checkIsLiked();
    checkIfAddedToShoppingList();
  }, []);

    const checkIfAddedToShoppingList = () => {
    const addedToShoppingList = localStorage.getItem(`post_${post.id}_added_to_shopping_list`);
    setIsAddedToShoppingList(addedToShoppingList === 'true');
  };

  const checkIsLiked = () => {
    const storedLikedStatus = localStorage.getItem(`post_${post.id}_liked`);
    const likedStatus = storedLikedStatus === 'true';
    setIsLiked(likedStatus);
  };

  const handleLikeClick = async () => {
    try {
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
const handleAddToShoppingList = async () => {
  try {
    await axios.post(
      `http://127.0.0.1:8000/api/shopping-list/add`,
      {
        recipe_id: post.id,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    setIsAddedToShoppingList(true);
    localStorage.setItem(`post_${post.id}_added_to_shopping_list`, JSON.stringify(true));
    setShoppingListErrorMessage(''); 
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setShoppingListErrorMessage(error.response.data.message);
    } else {
      console.error("Error adding recipe to shopping list:", error);
    }
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
              {isAddedToShoppingList ? (
                  <div className="addedToShoppingList">
                    Added to shopping list!
                  </div>
                ) : (
                  <div className="addToShoppingListButton">
                    <BookmarkBorderIcon
                      className="postIcon"
                      onClick={handleAddToShoppingList}
                    />
                  </div>
                )}
                {shoppingListErrorMessage && (
                  <div className="shoppingListErrorMessage">
                    {shoppingListErrorMessage === "Recipe is already in the shopping list"
                      ? shoppingListErrorMessage
                      : "An error occurred. Please try again later."}
                  </div>
                )}
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
