import { useNavigate } from "react-router";
import { Droplet, ArrowLeftCircle, House } from "lucide-react";
import Button from "./Button/Button";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-red-50 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-md">
        {/* Blood Drop Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-red-100 rounded-full shadow-md">
            <Droplet className="w-10 h-10 text-red-600 animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-red-700">
          Oops! Something Went Wrong 💔
        </h1>

        <p className="mt-3 text-gray-600">
          It looks like this page lost too much blood. But don’t worry — you can
          get back on track!
        </p>

        {/* Helpful Links */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border text-red-700 bg-white hover:bg-red-100 transition-colors"
          >
            <ArrowLeftCircle className="w-5 h-5 text-red-600" />
            Go Back
          </button>

          <button className="btn btn-primary w-full" onClick={() => navigate("/")}>
             
            {" "}
            <House className="h-4 w-4" /> Return to Home
          </button>
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-xs text-gray-500">
          Need help? Contact our support team — we’re here to save lives ❤️
        </p>
      </div>
    </section>
  );
};

export default ErrorPage;
