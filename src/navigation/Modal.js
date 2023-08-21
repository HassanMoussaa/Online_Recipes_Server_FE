import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

function Modal({ onClose }) {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [review, setReview] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const jwtToken = localStorage.getItem("jwt_token");

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("review", review);

    axios
      .post("http://localhost:8000/books/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setIsUploaded(true);

        setTimeout(() => {
          setIsUploaded(false);
          onClose();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <input type="file" onChange={handleImageChange} />
        <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
        <input type="text" placeholder="Author" value={author} onChange={handleAuthorChange} />
        <textarea placeholder="Review" value={review} onChange={handleReviewChange} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={onClose}>Close</button>
        {isUploaded && <p className="success-message">Post uploaded successfully!</p>}
      </div>
    </div>
  );
}

export default Modal;
