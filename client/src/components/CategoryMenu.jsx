import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";

const CategoryMenu = ({ onSelectCategory }) => {
  const { loading, error, data } = useQuery(QUERY_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const categories = data.categories;

  const handleClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="bg-amber-500 p-4">
      <h2 className="text-3xl font-bold mb-2">Categories</h2>
      <button
        className={`mr-4 font-semibold ${
          selectedCategory === "" ? "text-black" : "text-gray-600"
        }`}
        onClick={() => handleClick("")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          className={`mr-4 font-semibold ${
            selectedCategory === category._id ? "text-black" : "text-gray-600"
          }`}
          onClick={() => handleClick(category._id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
