// import { Link, Navigate, useLocation, useNavigate } from 'react-router'
// import toast from 'react-hot-toast'
// import LoadingSpinner from '../../components/Shared/LoadingSpinner'
// import useAuth from '../../hooks/useAuth'
// import { FcGoogle } from 'react-icons/fc'
// import { TbFidgetSpinner } from 'react-icons/tb'

// const Login = () => {
//   const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const from = location.state || '/'

//   if (loading) return <LoadingSpinner />
//   if (user) return <Navigate to={from} replace={true} />

//   // form submit handler
//   const handleSubmit = async event => {
//     event.preventDefault()
//     const form = event.target
//     const email = form.email.value
//     const password = form.password.value

//     try {
//       //User Login
//       await signIn(email, password)

//       navigate(from, { replace: true })
//       toast.success('Login Successful')
//     } catch (err) {
//       console.log(err)
//       toast.error(err?.message)
//     }
//   }

//   // Handle Google Signin
//   const handleGoogleSignIn = async () => {
//     try {
//       //User Registration using google
//       await signInWithGoogle()
//       navigate(from, { replace: true })
//       toast.success('Login Successful')
//     } catch (err) {
//       console.log(err)
//       setLoading(false)
//       toast.error(err?.message)
//     }
//   }
//   return (
//     <div className='flex justify-center items-center min-h-screen bg-white'>
//       <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
//         <div className='mb-8 text-center'>
//           <h1 className='my-3 text-4xl font-bold'>Log In</h1>
//           <p className='text-sm text-gray-400'>
//             Sign in to access your account
//           </p>
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           noValidate=''
//           action=''
//           className='space-y-6 ng-untouched ng-pristine ng-valid'
//         >
//           <div className='space-y-4'>
//             <div>
//               <label htmlFor='email' className='block mb-2 text-sm'>
//                 Email address
//               </label>
//               <input
//                 type='email'
//                 name='email'
//                 id='email'
//                 required
//                 placeholder='Enter Your Email Here'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//                 data-temp-mail-org='0'
//               />
//             </div>
//             <div>
//               <div className='flex justify-between'>
//                 <label htmlFor='password' className='text-sm mb-2'>
//                   Password
//                 </label>
//               </div>
//               <input
//                 type='password'
//                 name='password'
//                 autoComplete='current-password'
//                 id='password'
//                 required
//                 placeholder='*******'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type='submit'
//               className='bg-lime-500 w-full rounded-md py-3 text-white'
//             >
//               {loading ? (
//                 <TbFidgetSpinner className='animate-spin m-auto' />
//               ) : (
//                 'Continue'
//               )}
//             </button>
//           </div>
//         </form>
//         <div className='space-y-1'>
//           <button className='text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer'>
//             Forgot password?
//           </button>
//         </div>
//         <div className='flex items-center pt-4 space-x-1'>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//           <p className='px-3 text-sm dark:text-gray-400'>
//             Login with social accounts
//           </p>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//         </div>
//         <div
//           onClick={handleGoogleSignIn}
//           className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
//         >
//           <FcGoogle size={32} />

//           <p>Continue with Google</p>
//         </div>
//         <p className='px-6 text-sm text-center text-gray-400'>
//           Don&apos;t have an account yet?{' '}
//           <Link
//             state={from}
//             to='/signup'
//             className='hover:underline hover:text-lime-500 text-gray-600'
//           >
//             Sign up
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import saveOrUpdateUser from "../../utils/saveOrUpdateUser";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from); 
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const { user } = await signInWithGoogle();

  //     const userData = {
  //       name: user?.displayName,
  //       email: user?.email,
  //       image: user?.photoURL,
  //     };

  //     await saveOrUpdateUser(userData);

  //     Swal.fire({
  //       icon: "success",
  //       title: "Login Successful!",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });
  //     navigate(from, { replace: true });
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Google Login Failed",
  //       text: err.message,
  //     });
  //   }
  // };
  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl border border-secondary">
        <h2 className="text-2xl font-bold text-center text-primary">
          LogIn to RedPulse-BD
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters required" },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "LogIn"}
          </button>
        </form>

        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Create one
          </Link>
        </p>
        <p className="text-sm text-center">
          Do not want to create an account now?{" "}
          <Link to="/" className="text-blue-600 underline hover:text-blue-800">
            Go to Home
          </Link>
        </p>
        {/* <h3 className="text-primary text-center text-xl font-bold">OR</h3>
        <div
          onClick={handleGoogleSignIn}
          className="btn btn-primary mt-2 w-full"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
