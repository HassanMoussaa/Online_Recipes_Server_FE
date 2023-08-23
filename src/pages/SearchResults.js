import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";

function SearchResults() {
  const location = useLocation();
  const searchResults = location.state.searchResults; 
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Homepage");
  };

  return (
    <div>
      <button className="back-button" onClick={handleBack}>
        Back to Homepage
      </button>
      <h1>Search Results</h1>
      <ul className="search-results-list">
        {searchResults.recipes.map((recipe) => (
          <li key={recipe.id} className="recipe-card">
            <img
              className="recipe-image"
              src={recipe.image_url}
              alt={recipe.name}
            />
            <div className="recipe-details">
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-cuisine">Cuisine: {recipe.cuisine}</p>
              <h4>Ingredients:</h4>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
