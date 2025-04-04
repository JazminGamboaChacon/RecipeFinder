"use client";

import { useState, useTransition, useCallback } from "react";

interface Recipe {
  idMeal: string;
  strMeal: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Usamos el tipo Recipe aquí
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>

      <input
        type="text"
        placeholder="Search for a recipe..."
        value={query}
        onChange={handleSearch}
        className="border p-2 rounded w-80"
      />

      {isPending && <p>Loading...</p>}

      <ul className="mt-4">
        {recipes.map((recipe) => (
          <li key={recipe.idMeal} className="border p-2 rounded mb-2">
            {recipe.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}
