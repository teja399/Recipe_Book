import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import RecipeMap from './pages/RecipeMap';
import CuisineMap from './pages/CuisineMap';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/map" element={<RecipeMap />} />
          <Route path="/cuisine/:cuisine" element={<CuisineMap />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
