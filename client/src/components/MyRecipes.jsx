import React from "react";

const MyRecipes = ({
  userRecipes,
  onEditRecipeClick,
  onAddRecipeClick,
  onDeleteRecipeClick,
}) => {
  const handleEditClick = (recipeId) => {
    onEditRecipeClick(recipeId);
  };
  const handleAddClick = () => {
    onAddRecipeClick();
  };

  const handleDeleteClick = (recipeId) => {
    onDeleteRecipeClick(recipeId);
  };

  return (
    <div className="w-full p-4 bg-yellow-300">
      <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
      <button
        className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleAddClick}
      >
        Add New Recipe
      </button>
      <ul>
        {userRecipes.map((recipe) => (
          <li key={recipe._id} className="mb-8 p-4 bg-amber-100 rounded">
            <p className="text-lg font-bold mb-2">{recipe.title}</p>
            <p className="text-sm text-gray-700 mb-2">
              Description: {recipe.description}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Category: {recipe.category.name}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Ingredients: {recipe.ingredients.join(", ")}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Preparation Time: {recipe.preparationTime} minutes
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Servings: {recipe.servings}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Instructions: {recipe.instructions}
            </p>
            <p className="text-sm text-gray-700 mb-2">Notes: {recipe.notes}</p>
            <button
              className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleEditClick(recipe._id)}
            >
              Edit Recipe
            </button>
            <button
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDeleteClick(recipe._id)}
            >
              Delete Recipe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
