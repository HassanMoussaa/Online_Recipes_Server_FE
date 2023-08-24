import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

function Modal({ onClose }) {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [errors, setErrors] = useState({});

  const jwtToken = localStorage.getItem("jwt_token");

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleUpload = () => {
    const newErrors = {};

    if (!imageFile) {
      newErrors.image = "Image is required.";
    }
    if (!name) {
      newErrors.name = "Name is required.";
    }
    if (!cuisine) {
      newErrors.cuisine = "Cuisine is required.";
    }
    if (ingredients.length === 0) {
      newErrors.ingredients = "At least one ingredient is required.";
    }

   
    setErrors(newErrors);

  
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("name", name);
      formData.append("cuisine", cuisine);

      
      ingredients.forEach((ingredient) => {
        formData.append("ingredients[]", ingredient);
      });

      axios
        .post("http://localhost:8000/api/recipes/create", formData, {
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
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <input type="file" onChange={handleImageChange} />
        {errors.image && <p className="error-message">{errors.image}</p>}
         <div className="name-cuisine">
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <input type="text" placeholder="Cuisine" value={cuisine} onChange={handleCuisineChange} />
        {errors.cuisine && <p className="error-message">{errors.cuisine}</p>}
        </div>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(event) => handleIngredientChange(index, event)}
            />
            <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddIngredient}>Add Ingredient</button>
        {errors.ingredients && <p className="error-message">{errors.ingredients}</p>}
        <div className="upload-close">
        <button onClick={handleUpload}>Upload</button>
        <button onClick={onClose}>Close</button>
        </div>
        {isUploaded && <p className="success-message">Recipe uploaded successfully!</p>}
      </div>
    </div>
  );
}

export default Modal;
