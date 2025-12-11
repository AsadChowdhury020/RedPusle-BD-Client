import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const FundingForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      amount: "",
    },
  });

  const onSubmit = async (data) => {
    const amount = parseFloat(data.amount);

    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        amount,
        email: data.email,
      });

      window.location.href = res.data.url; // Redirect to Stripe Checkout

    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment initialization failed", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 border p-8 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        Give Funding
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            value={user?.displayName}
            disabled
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
            disabled // ← If you want editable email, remove this line
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="label">Amount (USD)</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="input input-bordered w-full"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Minimum amount is $1" },
            })}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Go to Payment
        </button>
      </form>
    </div>
  );
};

export default FundingForm;
