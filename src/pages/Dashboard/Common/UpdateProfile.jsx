import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDistrictsUpazilas from "../../../hooks/useDistrictsUpozilas";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useNavigate } from "react-router";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const UpdateProfile = () => {
  const { user } = useAuth();
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
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  /* Fetch user */
  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      const res = await axiosSecure.get(`/users/email?email=${user.email}`);
      reset({
        name: res.data.name,
        email: res.data.email,
        bloodGroup: res.data.bloodGroup,
        district: res.data.district,
        upazila: res.data.upazila,
      });
    };

    fetchUser();
  }, [user, axiosSecure, reset]);

  /* Filter upazila */
  const selectedDistrict = watch("district");

  useEffect(() => {
    const district = districts.find((d) => d.name === selectedDistrict);
    if (district) {
      setFilteredUpazilas(
        upazilas.filter((u) => u.district_id === district.id)
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, districts, upazilas]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/users?email=${user.email}`, {
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
      });

      Swal.fire("Success!", "Profile updated successfully", "success");
      navigate(-1);
    } catch {
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (locationLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="w-full max-w-xl p-8 rounded-xl bg-base-100 border border-base-300 shadow-sm">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Update Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <input
            className="input input-bordered w-full"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-error">{errors.name.message}</p>
          )}

          <input
            readOnly
            className="input input-bordered w-full bg-base-200 text-base-content/60 cursor-not-allowed"
            {...register("email")}
          />

          <select
            className="select select-bordered w-full"
            {...register("bloodGroup", { required: "Blood group is required" })}
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            {...register("district", { required: "District is required" })}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            {...register("upazila", { required: "Upazila is required" })}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <button className="btn btn-primary w-full mt-2">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
