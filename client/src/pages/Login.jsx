import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto w-full h-full p-4 bg-yellow-200">
      <Link to="/signup" className="text-blue-500 hover:underline">
        ← Go to Signup
      </Link>

      <h2 className="text-2xl font-bold mt-4 mb-2">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="my-2">
          <label htmlFor="email" className="block mb-1">
            Email address:
          </label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-stone-500"
            onChange={handleChange}
          />
        </div>
        <div className="my-2">
          <label htmlFor="pwd" className="block mb-1">
            Password:
          </label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-stone-500"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="text-red-500">
              The provided credentials are incorrect
            </p>
          </div>
        ) : null}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 rounded-md focus:outline-none bg-violet-800 text-yellow-100 hover:bg-violet-950"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
