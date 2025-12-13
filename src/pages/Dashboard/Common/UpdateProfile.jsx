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

  const [dbUser, setDbUser] = useState({});
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const navigate = useNavigate()

  // ✅ Fetch user from DB
  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      const res = await axiosSecure.get(
        `/users/email?email=${user.email}`
      );
      setDbUser(res.data);

      // auto fill form
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

  // ✅ Filter upazilas when district changes
  const selectedDistrict = watch("district");

  useEffect(() => {
    const selected = districts.find((d) => d.name === selectedDistrict);
    if (selected) {
      const filtered = upazilas.filter(
        (u) => u.district_id === selected.id
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, districts, upazilas]);

  const onSubmit = async (data) => {
    try {
      const updateData = {
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
      };

      const res = await axiosSecure.patch(
        `/users?email=${user.email}`,
        updateData
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Profile updated successfully", "success");
        navigate(-1)
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (locationLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="w-full max-w-xl p-8 space-y-6 rounded-xl border border-secondary">
        <h2 className="text-2xl font-bold text-center text-primary">
          Update Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          {/* Email (read only) */}
          <input
            type="email"
            readOnly
            className="input input-bordered w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            {...register("email")}
          />

          {/* Blood Group */}
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

          {/* District */}
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

          {/* Upazila */}
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

          <button type="submit" className="btn btn-primary w-full mt-2">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
