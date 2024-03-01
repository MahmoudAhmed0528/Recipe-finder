import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-full mt-auto bg-indigo-800 text-white p-4">
      <div className="container mx-auto text-center mb-5">
        {location.pathname !== "/" && (
          <button
            className="bg-yellow-100 text-indigo-800 px-4 py-2 rounded mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>&copy; {new Date().getFullYear()} - Tech Friends</h4>
      </div>
    </footer>
  );
};

export default Footer;
