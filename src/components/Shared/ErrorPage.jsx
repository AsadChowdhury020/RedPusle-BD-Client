// import Button from "./Button/Button";
// import { useNavigate } from "react-router";

// const ErrorPage = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="bg-white ">
//       <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
//         <div className="flex flex-col items-center max-w-sm mx-auto text-center">
//           <p className="p-3 text-sm font-medium text-lime-500 rounded-full bg-blue-50 ">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
//               />
//             </svg>
//           </p>
//           <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
//             Something Went Wrong!
//           </h1>
//           <p className="mt-4 text-gray-500 ">Here are some helpful links:</p>

//           <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100 "
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-5 h-5 rtl:rotate-180 text-lime-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
//                 />
//               </svg>

//               <span>Go back</span>
//             </button>

//             <Button label={"Take Me Home"} onClick={() => navigate("/")} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ErrorPage;

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

          {/* Home Button */}
          {/* <Button 
            label={"Return to Home"} 
            onClick={() => navigate("/")} 
          /> */}

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
