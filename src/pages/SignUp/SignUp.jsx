import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useDistrictsUpazilas from "../../hooks/useDistrictsUpozilas";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SignUp = () => {
  const {
    districts: districtsData,
    upazilas: upazilasData,
    loading: dataLoading,
  } = useDistrictsUpazilas();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const selectedDistrict = watch("district");

  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  useEffect(() => {
    setDistricts(districtsData);
    setUpazilas(upazilasData);
  }, [districtsData, upazilasData]);

  useEffect(() => {
    const selected = districts.find((d) => d.name === selectedDistrict);
    if (selected) {
      setFilteredUpazilas(
        upazilas.filter((u) => u.district_id === selected.id)
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, districts, upazilas]);

  const onSubmit = async (data) => {
    setLoading(true);

    /* Upload avatar */
    const image = data.avatar[0];
    const formData = new FormData();
    formData.append("image", image);

    let imageUrl = "";

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );
      imageUrl = res.data.data.url;
    } catch {
      Swal.fire("Upload Failed", "Failed to upload avatar.", "error");
      setLoading(false);
      return;
    }

    try {
      await createUser(data.email, data.password);

      const userInfo = {
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: "donor",
        status: "active",
        avatar: imageUrl,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);
      await updateUserProfile(data.name, imageUrl);

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from);
    } catch (error) {
      Swal.fire(
        "Signup Failed",
        error.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-16">
      <div className="w-full max-w-xl p-8 space-y-6 rounded-xl bg-base-100 border border-base-300 shadow-sm">
        <h2 className="text-2xl font-bold text-center text-primary">
          Sign Up to RedPulseBD
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-error">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-error">{errors.email.message}</p>
          )}

          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("avatar", { required: "Avatar is required" })}
          />
          {errors.avatar && (
            <p className="text-sm text-error">{errors.avatar.message}</p>
          )}

          <select
            className="select select-bordered w-full"
            {...register("bloodGroup", {
              required: "Blood group is required",
            })}
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="text-sm text-error">
              {errors.bloodGroup.message}
            </p>
          )}

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
          {errors.district && (
            <p className="text-sm text-error">
              {errors.district.message}
            </p>
          )}

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
          {errors.upazila && (
            <p className="text-sm text-error">
              {errors.upazila.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  "Password must contain 1 uppercase & 1 lowercase letter",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-error">
              {errors.password.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            {...register("confirm_password", {
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirm_password && (
            <p className="text-sm text-error">
              {errors.confirm_password.message}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-base-content/70">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log In
            </Link>
          </p>

          <p className="text-sm text-center text-base-content/70">
            Go back to{" "}
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
