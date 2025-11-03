import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [cuisines, setCuisines] = useState([
    { name: 'North Indian', image: '/images/north-indian.jpg' },
    { name: 'South Indian', image: '/images/south-indian.jpg' },
    { name: 'Italian', image: '/images/italian.jpg' },
    { name: 'Chinese', image: '/images/chinese.jpg' },
  ]);

  // In a real app, you would fetch this data from an API
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockRecipes = [
      { id: 1, name: 'Butter Chicken', cuisine: 'North Indian', image: '/images/butter-chicken.jpg' },
      { id: 2, name: 'Dosa', cuisine: 'South Indian', image: '/images/dosa.jpg' },
      { id: 3, name: 'Pasta Carbonara', cuisine: 'Italian', image: '/images/pasta.jpg' },
    ];
    setFeaturedRecipes(mockRecipes);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Recipe Book</h1>
        <p>Discover and share delicious recipes from around the world</p>
        <Link to="/create-recipe" className="cta-button">Add Your Recipe</Link>
      </section>

      <section className="featured-recipes">
        <h2>Featured Recipes</h2>
        <div className="recipe-grid">
          {featuredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <span className="cuisine-tag">{recipe.cuisine}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cuisines">
        <h2>Explore Cuisines</h2>
        <div className="cuisine-grid">
          {cuisines.map((cuisine, index) => (
            <Link to={`/cuisine/${cuisine.name.toLowerCase().replace(' ', '-')}`} key={index} className="cuisine-card">
              <img src={cuisine.image} alt={cuisine.name} />
              <h3>{cuisine.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
