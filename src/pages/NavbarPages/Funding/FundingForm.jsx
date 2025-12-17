import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/Shared/Container";

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

      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment initialization failed", "error");
    }
  };

  return (
    <Container>
      <div className="max-w-lg mx-auto mt-16 p-8 bg-base-100 border border-base-300 rounded-xl shadow-sm">

        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Give Funding
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Name
              </span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className="input input-bordered w-full bg-base-200 text-base-content cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Email
              </span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-200 text-base-content cursor-not-allowed"
              {...register("email", { required: "Email is required" })}
              disabled
            />
            {errors.email && (
              <p className="text-sm text-error mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Amount (USD)
              </span>
            </label>
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
              <p className="text-sm text-error mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Go to Payment
          </button>
        </form>
      </div>
    </Container>
  );
};

export default FundingForm;
