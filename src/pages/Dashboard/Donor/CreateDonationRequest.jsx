import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDistrictsUpazilas from "../../../hooks/useDistrictsUpozilas";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const CreateDonationRequest = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    districts,
    upazilas,
    loading: locationLoading,
  } = useDistrictsUpazilas();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const selectedDistrict = watch("recipientDistrict");

  /* Filter upazilas */
  useEffect(() => {
    const match = districts.find((d) => d.name === selectedDistrict);
    if (match) {
      setFilteredUpazilas(
        upazilas.filter((u) => u.district_id === match.id)
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, districts, upazilas]);

  /* Load user info */
  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email?email=${user.email}`);
      return res.data;
    },
  });

  const onSubmit = async (formData) => {
    try {
      if (!userInfo || userInfo.status === "blocked") {
        return Swal.fire(
          "Access Denied",
          "You are blocked from making requests.",
          "error"
        );
      }

      const donationData = {
        ...formData,
        requesterName: user.displayName,
        requesterEmail: user.email,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.post("/donation-requests", donationData);

      Swal.fire(
        "Request Created",
        "Donation request submitted successfully!",
        "success"
      );

      reset();
      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create donation request", "error");
    }
  };

  if (isLoading || authLoading || locationLoading)
    return <LoadingSpinner />;

  if (isError) {
    return (
      <p className="text-center mt-10 text-error">
        Failed to load profile.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-base-100 border border-base-300 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Create Donation Request
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* Requester Info */}
        <div>
          <label className="label text-base-content">Requester Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-base-200 text-base-content/70"
            value={user.displayName}
            readOnly
          />
        </div>

        <div>
          <label className="label text-base-content">Requester Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-base-200 text-base-content/70"
            value={user.email}
            readOnly
          />
        </div>

        {/* Recipient Info */}
        <div>
          <label className="label text-base-content">Recipient Name</label>
          <input
            {...register("recipientName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter recipient name"
          />
        </div>

        <div>
          <label className="label text-base-content">Recipient District</label>
          <select
            {...register("recipientDistrict", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label text-base-content">Recipient Upazila</label>
          <select
            {...register("recipientUpazila", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="label text-base-content">Hospital Name</label>
          <input
            {...register("hospitalName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter hospital name"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="label text-base-content">Full Address</label>
          <input
            {...register("fullAddress", { required: true })}
            className="input input-bordered w-full"
            placeholder="Example: Zahir Raihan Rd, Dhaka"
          />
        </div>

        <div>
          <label className="label text-base-content">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
              (group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="label text-base-content">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="label text-base-content">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="label text-base-content">Request Message</label>
          <textarea
            {...register("requestMessage", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Explain why blood is needed in detail..."
          />
        </div>

        <div className="lg:col-span-2 flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Requesting..." : "Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
