import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RECIPE, UPDATE_RECIPE } from "../utils/mutations";
import { QUERY_USER, QUERY_CATEGORIES } from "../utils/queries";

const RecipeForm = ({ mode, recipeId, setUserRecipes, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: { _id: "", name: "" },
    ingredients: "",
    preparationTime: "",
    servings: "",
    instructions: "",
    notes: "",
  });

  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: refetchUser,
  } = useQuery(QUERY_USER);
  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery(QUERY_CATEGORIES);

  const [addRecipe] = useMutation(ADD_RECIPE);
  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categoryData.categories.find(
        (category) => category._id === value
      );

      if (selectedCategory) {
        setFormData({
          ...formData,
          category: {
            _id: selectedCategory._id,
            name: selectedCategory.name,
          },
        });
      } else {
        setFormData({
          ...formData,
          category: {
            id: "",
            name: "",
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        title,
        description,
        category,
        ingredients,
        preparationTime,
        servings,
        instructions,
        notes,
      } = formData;

      let updatedRecipe;

      if (mode === "edit") {
        const { data } = await updateRecipe({
          variables: {
            _id: recipeId,
            title,
            description,
            category,
            ingredients: ingredients
              .split(",")
              .map((ingredient) => ingredient.trim()),
            preparationTime: parseInt(preparationTime),
            servings: parseInt(servings),
            instructions,
            notes,
          },
        });

        updatedRecipe = data.updateRecipe;
      } else {
        const { data } = await addRecipe({
          variables: {
            title,
            description,
            category,
            ingredients: ingredients
              .split(",")
              .map((ingredient) => ingredient.trim()),
            preparationTime: parseInt(preparationTime),
            servings: parseInt(servings),
            instructions,
            notes,
            author: userData.userRecipes[0].author._id,
          },
        });

        updatedRecipe = data.addRecipe;
      }
      await refetchUser();
      setFormData({
        title: "",
        description: "",
        category: { _id: "", name: "" },
        ingredients: "",
        preparationTime: "",
        servings: "",
        instructions: "",
        notes: "",
      });
      onClose();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (userLoading || categoryLoading) return <div>Loading...</div>;
  if (userError || categoryError)
    return <div>Error: {userError || categoryError}</div>;

  return (
    <div className="w-full p-6 bg-yellow-200">
      <h2 className="text-2xl font-bold mb-6">
        {mode === "edit" ? "Edit Recipe" : "Add New Recipe"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500 bg-yellow-50"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500  bg-yellow-50"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block mb-2">Category:</label>
          <select
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500  bg-yellow-50"
            name="category"
            value={formData.category._id}
            onChange={handleInputChange}
          >
            <option value="">Select category...</option>
            {categoryData.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Ingredients:</label>
          <textarea
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500  bg-yellow-50"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block mb-2">Preparation Time:</label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500  bg-yellow-50"
            type="number"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block mb-2">Servings:</label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500  bg-yellow-50"
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block mb-2">Instructions:</label>
          <textarea
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500  bg-yellow-50"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block mb-2">Notes:</label>
          <textarea
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500  bg-yellow-50"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className=" bg-violet-800 text-yellow-100 hover:bg-violet-950 font-bold py-2 px-4 rounded"
            type="submit"
          >
            {mode === "edit" ? "Update" : "Submit"}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
