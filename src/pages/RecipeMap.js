import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeMap.css';

// This is a simplified version. In a real app, you would use a proper mapping library like Leaflet or Google Maps
const RecipeMap = () => {
  const [cuisines, setCuisines] = useState([
    { 
      id: 1, 
      name: 'North Indian', 
      path: 'north-indian',
      position: { top: '30%', left: '65%' },
      recipes: ['Butter Chicken', 'Naan', 'Paneer Tikka']
    },
    { 
      id: 2, 
      name: 'South Indian', 
      path: 'south-indian',
      position: { top: '60%', left: '70%' },
      recipes: ['Dosa', 'Idli', 'Sambhar']
    },
    { 
      id: 3, 
      name: 'Italian', 
      path: 'italian',
      position: { top: '25%', left: '40%' },
      recipes: ['Pasta Carbonara', 'Pizza Margherita', 'Tiramisu']
    },
    { 
      id: 4, 
      name: 'Chinese', 
      path: 'chinese',
      position: { top: '40%', left: '80%' },
      recipes: ['Fried Rice', 'Dumplings', 'Kung Pao Chicken']
    },
  ]);

  const [selectedCuisine, setSelectedCuisine] = useState(null);

  return (
    <div className="recipe-map">
      <h1>Explore Recipes by Cuisine</h1>
      <div className="map-container">
        <div className="world-map">
          <div className="map-image">
            <img src="/images/world-map.png" alt="World Map" />
            {cuisines.map((cuisine) => (
              <div 
                key={cuisine.id}
                className={`map-marker ${selectedCuisine?.id === cuisine.id ? 'active' : ''}`}
                style={cuisine.position}
                onClick={() => setSelectedCuisine(cuisine)}
              >
                <div className="marker-dot"></div>
                <div className="marker-label">{cuisine.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cuisine-details">
          {selectedCuisine ? (
            <div className="cuisine-card">
              <h2>{selectedCuisine.name} Cuisine</h2>
              <h3>Popular Recipes:</h3>
              <ul className="recipe-list">
                {selectedCuisine.recipes.map((recipe, index) => (
                  <li key={index}>
                    <Link to={`/recipe/${recipe.toLowerCase().replace(/\s+/g, '-')}`}>
                      {recipe}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to={`/cuisine/${selectedCuisine.path}`} className="view-all-link">
                View All {selectedCuisine.name} Recipes →
              </Link>
            </div>
          ) : (
            <div className="no-selection">
              <p>Click on a cuisine marker to see popular recipes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeMap;
