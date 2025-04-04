"use client";

import { useState, useTransition, useCallback } from "react";
import InfiniteScroll from "./components/InfiniteScroll";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import Header from "./components/Header";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const fetchRecipes = useCallback(async (searchQuery: string) => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`/api/recipes?query=${searchQuery}`);
      const data: Recipe[] = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      fetchRecipes(value);
    });
  };

  const handleSelectRecipe = (idMeal: string) => {
    const recipe = recipes.find((r) => r.idMeal === idMeal) || null;
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />

      {!selectedRecipe && (
        <section
          className="w-full max-w-2xl mt-8 p-6 rounded-xl relative bg-cover bg-top"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/hand-drawn-pattern-background_23-2150829939.jpg?t=st=1743266812~exp=1743270412~hmac=d7bfd10f988bcd5527428fa3840d7c00deaaa15d5021fbb5fc328926346859d3&w=900')",
          }}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for a recipe..."
              value={query}
              onChange={handleSearch}
              className="p-3 pl-10 rounded-full w-full text-lg shadow-md focus:outline-none bg-white/70 border-none backdrop-blur-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#15BFAE]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0a8.5 8.5 0 111.42-1.42L21 21z"
              />
            </svg>
          </div>
        </section>
      )}

      <div className="w-full max-w-7xl px-4">
        {!selectedRecipe ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {recipes.map((recipe) => (
              <div className="recipe-card border-none" key={recipe.idMeal}>
                <RecipeCard
                  idMeal={recipe.idMeal}
                  strMeal={recipe.strMeal}
                  strMealThumb={recipe.strMealThumb}
                  onSelect={handleSelectRecipe}
                />
              </div>
            ))}
          </div>
        ) : (
          <RecipeDetail
            strMeal={selectedRecipe.strMeal}
            strCategory={selectedRecipe.strCategory}
            strArea={selectedRecipe.strArea}
            strInstructions={selectedRecipe.strInstructions}
            strMealThumb={selectedRecipe.strMealThumb}
            strYoutube={selectedRecipe.strYoutube}
            onBack={handleBack}
          />
        )}
      </div>

      {!selectedRecipe && <InfiniteScroll fetchMore={() => fetchRecipes(query)} />}
    </div>
  );
}
