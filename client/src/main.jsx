import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import MyRecipeFormParent from "./components/MyRecipeFormParent.jsx";
import CategoryMenu from "./components/CategoryMenu.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/myRecipes",
        element: <MyRecipeFormParent />,
      },
      {
        path: "/recipeForm",
        element: <RecipeForm />,
      },
      {
        path: "/recipes/:id",
        element: <RecipeDetail />,
      },
      {
        path: "/categories",
        element: <CategoryMenu />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
