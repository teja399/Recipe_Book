import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/CuisineMap.css';

const CuisineMap = () => {
  const { cuisine } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format the cuisine name for display
  const formatCuisineName = (name) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Fetch recipes for the selected cuisine
  useEffect(() => {
    // In a real app, you would fetch this from your API
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockRecipes = {
          'north-indian': [
            { id: 1, name: 'Butter Chicken', prepTime: '30 mins', cookTime: '45 mins', image: '/images/butter-chicken.jpg' },
            { id: 2, name: 'Naan', prepTime: '20 mins', cookTime: '10 mins', image: '/images/naan.jpg' },
            { id: 3, name: 'Paneer Tikka', prepTime: '20 mins', cookTime: '15 mins', image: '/images/paneer-tikka.jpg' },
          ],
          'south-indian': [
            { id: 4, name: 'Dosa', prepTime: '20 mins', cookTime: '10 mins', image: '/images/dosa.jpg' },
            { id: 5, name: 'Idli', prepTime: '15 mins', cookTime: '20 mins', image: '/images/idli.jpg' },
            { id: 6, name: 'Sambhar', prepTime: '15 mins', cookTime: '30 mins', image: '/images/sambhar.jpg' },
          ],
          'italian': [
            { id: 7, name: 'Pasta Carbonara', prepTime: '15 mins', cookTime: '15 mins', image: '/images/carbonara.jpg' },
            { id: 8, name: 'Pizza Margherita', prepTime: '30 mins', cookTime: '15 mins', image: '/images/pizza.jpg' },
            { id: 9, name: 'Tiramisu', prepTime: '30 mins', cookTime: '0 mins', image: '/images/tiramisu.jpg' },
          ],
          'chinese': [
            { id: 10, name: 'Fried Rice', prepTime: '15 mins', cookTime: '15 mins', image: '/images/fried-rice.jpg' },
            { id: 11, name: 'Dumplings', prepTime: '30 mins', cookTime: '10 mins', image: '/images/dumplings.jpg' },
            { id: 12, name: 'Kung Pao Chicken', prepTime: '20 mins', cookTime: '15 mins', image: '/images/kung-pao.jpg' },
          ],
        };

        // Simulate API delay
        setTimeout(() => {
          setRecipes(mockRecipes[cuisine] || []);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [cuisine]);

  if (isLoading) {
    return <div className="loading">Loading {formatCuisineName(cuisine)} recipes...</div>;
  }

  return (
    <div className="cuisine-page">
      <div className="cuisine-header">
        <h1>{formatCuisineName(cuisine)} Recipes</h1>
        <p>Discover delicious {formatCuisineName(cuisine).toLowerCase()} recipes to try at home</p>
      </div>

      {recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-image">
                <img src={recipe.image} alt={recipe.name} />
              </div>
              <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <div className="recipe-meta">
                  <span>Prep: {recipe.prepTime}</span>
                  <span>Cook: {recipe.cookTime}</span>
                </div>
                <Link to={`/recipe/${recipe.id}`} className="view-recipe">
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-recipes">
          <p>No recipes found for {formatCuisineName(cuisine)} cuisine.</p>
          <Link to="/create-recipe" className="create-recipe-link">
            Be the first to add a recipe!
          </Link>
        </div>
      )}

      <div className="back-link">
        <Link to="/map">← Back to Cuisine Map</Link>
      </div>
    </div>
  );
};

export default CuisineMap;
