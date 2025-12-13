import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useDistrictsUpazilas from "../../../hooks/useDistrictsUpozilas";
import useAuth from "../../../hooks/useAuth";
// import useAxios from "../../../hooks/useAxios";



const EditRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  // const axiosInstance = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    districts: districtsData,
    upazilas: upazilasData,
    loading: dataLoading,
  } = useDistrictsUpazilas();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const selectedDistrict = watch("recipientDistrict");


  useEffect(() => {
    setDistricts(districtsData);
    setUpazilas(upazilasData);
  }, [districtsData, upazilasData]);

  const {
    data: requestData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      reset(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    if (!selectedDistrict || !requestData) return;

    const match = districts.find((d) => d.name === selectedDistrict);
    if (!match) return

    const filtered = upazilas.filter((u) => u.district_id === match.id);
    setFilteredUpazilas(filtered);

    const previousUpazila = requestData.recipientUpazila;

    const exists = filtered.find((u) => u.name === previousUpazila);

    if (exists) {
      setValue("recipientUpazila", exists.name);
    } else if (filtered.length > 0) {
      setValue("recipientUpazila", filtered[0].name);
    }
  }, [selectedDistrict, districts, upazilas, requestData, setValue]);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const { _id, ...sanitizedData } = formData;
      return await axiosSecure.patch(`/donation-requests/${id}`, sanitizedData);
    },
    onSuccess: () => {
      Swal.fire("Updated", "Donation request updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["profile", user.email] });
      navigate(-1);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update donation request", "error");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  if (isLoading || dataLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">Failed to load data.</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-primary rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
        Edit Donation Request
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-base-200"
            value={requestData.requesterName}
            readOnly
          />
        </div>

        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-base-200"
            value={requestData.requesterEmail}
            readOnly
          />
        </div>

        <div>
          <label className="label">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Recipient District</label>
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
          <label className="label">Recipient Upazila</label>
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
          <label className="label">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="label">Full Address</label>
          <input
            type="text"
            {...register("fullAddress", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="label">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="label">Request Message</label>
          <textarea
            {...register("requestMessage", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>

        <div className="lg:col-span-2 flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Donation Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRequest;
