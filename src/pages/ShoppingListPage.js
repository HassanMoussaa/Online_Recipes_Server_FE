import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShoppingListPage.css';
import { useNavigate } from 'react-router-dom';
import CalendarPopup from './components/CalendarPopup';

function ShoppingListPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwt_token');
  const handleBackToHomepage = () => {
  navigate('/homepage'); 
  };
  useEffect(() => {
    fetchShoppingListRecipes();
  }, []);

  const fetchShoppingListRecipes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/shopping-list/recipes', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching shopping list recipes:', error);
    }
  };

  const handleRemoveRecipe = async (recipeId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/shopping-list/remove`,
        {
          recipe_id: recipeId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      
      fetchShoppingListRecipes();
    } catch (error) {
      console.error('Error removing recipe from shopping list:', error);
    }
  };


   const handleOpenCalendarPopup = (recipeId) => {
    setSelectedRecipe(recipeId);
  };

  const handleCloseCalendarPopup = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="shopping-list">

      <div className="back-button-container">
        <button className="back-button-list" onClick={handleBackToHomepage}>
          Back to Homepage
        </button>
      </div>

      <h2 className="shopping-list__header">Shopping List</h2>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipe-item">
            <div className="recipe-image">
              <img src={recipe.image_url} alt={recipe.name} />
            </div>
            <div className="recipe-details">
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-cuisine">Cuisine: {recipe.cuisine}</p>
            </div>
            <div className="recipe-actions">
              <button
                className="remove-button"
                onClick={() => handleRemoveRecipe(recipe.id)}
              >
                Remove
              </button>
                <button
                className="calendar-button"
                onClick={() => handleOpenCalendarPopup(recipe.id)}
              >
                Add to Calendar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedRecipe !== null && (
        <CalendarPopup
          onClose={handleCloseCalendarPopup}
          recipeId={selectedRecipe}
          jwtToken={jwtToken}
        />
      )}
    </div>
  );
}

export default ShoppingListPage;
