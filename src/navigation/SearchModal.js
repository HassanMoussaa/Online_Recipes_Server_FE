import React, { useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchModal({ onClose, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwt_token");

  const handleSearch = async () => {
    // if (!searchQuery) return;

   try {
    const params = searchQuery ? { keywords: searchQuery } : {};
    
    const response = await axios.get("http://127.0.0.1:8000/api/recipes/search", {
      params,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

      if (response) {
        const searchResults = response.data; 
        navigate("/SearchResults", { state: { searchResults } });
      }
    } catch (error) {
      console.error("Error searching for books:", error);
    }

    onClose();
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SearchModal;
