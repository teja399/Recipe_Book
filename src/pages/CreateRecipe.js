import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateRecipe.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    cuisine: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [''],
    instructions: [''],
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe(prev => ({
      ...prev,
      instructions: newInstructions
    }));
  };

  const addInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setRecipe(prev => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0])
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Recipe submitted:', recipe);
    alert('Recipe created successfully!');
    navigate('/');
  };

  return (
    <div className="create-recipe">
      <h1>Create New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipe Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cuisine</label>
            <select
              name="cuisine"
              value={recipe.cuisine}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Cuisine</option>
              <option value="north-indian">North Indian</option>
              <option value="south-indian">South Indian</option>
              <option value="italian">Italian</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>

          <div className="form-group">
            <label>Prep Time (minutes)</label>
            <input
              type="number"
              name="prepTime"
              value={recipe.prepTime}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Cook Time (minutes)</label>
            <input
              type="number"
              name="cookTime"
              value={recipe.cookTime}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Servings</label>
            <input
              type="number"
              name="servings"
              value={recipe.servings}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Recipe Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {recipe.image && (
            <div className="image-preview">
              <img src={recipe.image} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder="e.g., 1 cup rice"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="add-button">
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Instructions</label>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="instruction-input">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder={`Step ${index + 1}...`}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addInstruction} className="add-button">
            + Add Step
          </button>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
