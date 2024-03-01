import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../utils/queries";
import { Link } from "react-router-dom";

const RecipeList = ({ categoryId }) => {
  const { loading, error, data } = useQuery(QUERY_RECIPES);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter recipes based on the categoryId if provided
  const recipes = categoryId
    ? data.recipes.filter((recipe) => recipe.category._id === categoryId)
    : data.recipes;

  return (
    <div className="w-full h-full p-4 bg-yellow-100">
      <h3 className="text-3xl font-bold mb-4">Recipes List</h3>
      <ul className="divide-y divide-gray-200">
        {recipes.map((recipe) => (
          <li className="py-4" key={recipe._id}>
            <p className="text-lg font-semibold">{recipe.title}</p>
            <p className="text-sm text-gray-500 mb-2">
              Description: {recipe.description}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Category: {recipe.category.name}
            </p>
            <Link
              to={`/recipes/${recipe._id}`}
              className="text-violet-800 hover:underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
