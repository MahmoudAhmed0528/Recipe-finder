import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
      <Link to="/login" className="text-blue-500 hover:underline">
        ← Go to Login
      </Link>

      <h2 className="text-2xl font-bold mt-4 mb-2">Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="my-2">
          <label htmlFor="firstName" className="block mb-1">
            First Name:
          </label>
          <input
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-stone-500"
            onChange={handleChange}
          />
        </div>
        <div className="my-2">
          <label htmlFor="lastName" className="block mb-1">
            Last Name:
          </label>
          <input
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-stone-500"
            onChange={handleChange}
          />
        </div>
        <div className="my-2">
          <label htmlFor="email" className="block mb-1">
            Email:
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

export default Signup;
