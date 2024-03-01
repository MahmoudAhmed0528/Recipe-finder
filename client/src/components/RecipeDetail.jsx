import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_RECIPES } from "../utils/queries";

const RecipeDetail = () => {
  // Get the recipeId from the URL parameter
  const { id } = useParams();

  // Use the useQuery hook to fetch recipe data
  const { loading, error, data } = useQuery(QUERY_RECIPES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Find the recipe with the specified ID from the data
  const recipe = data.recipes.find((recipe) => recipe._id === id);

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="w-full h-full px-4 py-8 bg-yellow-100">
      <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>
      <p className="text-lg mb-2">Description: {recipe.description}</p>
      <p className="text-lg mb-2">Category: {recipe.category.name}</p>
      <p className="text-lg mb-2">
        Ingredients: {recipe.ingredients.join(", ")}
      </p>
      <p className="text-lg mb-2">
        Preparation Time: {recipe.preparationTime} minutes
      </p>
      <p className="text-lg mb-2">Servings: {recipe.servings}</p>
      <p className="text-lg mb-2">Instructions: {recipe.instructions}</p>
      <p className="text-lg mb-2">Notes: {recipe.notes}</p>
      <p className="text-lg mb-2">
        Author: {recipe.author.firstName} {recipe.author.lastName}
      </p>
    </div>
  );
};

export default RecipeDetail;
