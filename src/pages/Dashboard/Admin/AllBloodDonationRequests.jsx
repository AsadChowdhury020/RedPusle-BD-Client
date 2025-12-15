import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  CheckCircle,
  Edit,
  Eye,
  Trash2,
  XCircle,
} from "lucide-react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";

const statusOptions = ["all", "pending", "inprogress", "done", "canceled"];

const AllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role, roleLoading } = useUserRole();

  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDonationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  /* Filter + Pagination */
  const filteredData =
    filterStatus === "all"
      ? requests
      : requests.filter((item) => item.status === filterStatus);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* Update Status */
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, {
        status: newStatus,
      });
      Swal.fire("Updated", "Donation status updated", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  /* Delete */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this donation request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/donation-requests/${id}`);
          Swal.fire("Deleted!", "Donation request removed.", "success");
          refetch();
        } catch {
          Swal.fire("Error", "Failed to delete request", "error");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-base-100 border border-base-300 rounded-xl">
      <h2 className="text-xl font-semibold text-primary text-center mb-6">
        All Blood Donation Requests
      </h2>

      {/* Filter */}
      <div className="mb-4 flex justify-between items-center">
        <select
          className="select select-bordered bg-base-100 text-base-content"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status[0].toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-base-300 rounded-md">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-base-content/60">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              currentData.map((item, index) => (
                <tr key={item._id} className="text-base-content">
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.recipientName}</td>
                  <td>
                    {item.recipientDistrict}, {item.recipientUpazila}
                  </td>
                  <td>{item.donationDate}</td>
                  <td>{item.donationTime}</td>
                  <td>{item.bloodGroup}</td>
                  <td className="capitalize">{item.status}</td>

                  <td>
                    {item.status === "inprogress" ? (
                      <>
                        <p>{item.donor?.name}</p>
                        <p className="text-sm text-base-content/60">
                          {item.donor?.email}
                        </p>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="flex flex-wrap gap-1">
                    {item.status === "inprogress" &&
                      !roleLoading &&
                      (role === "admin" || role === "volunteer") && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(item._id, "done")
                            }
                            className="btn btn-sm btn-success tooltip"
                            data-tip="Done"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(item._id, "canceled")
                            }
                            className="btn btn-sm btn-warning tooltip"
                            data-tip="Cancel"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                    {!roleLoading && role === "admin" && (
                      <>
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/edit-request/${item._id}`
                            )
                          }
                          className="btn btn-sm btn-outline tooltip"
                          data-tip="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-error tooltip"
                          data-tip="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/request-details/${item._id}`
                            )
                          }
                          className="btn btn-sm btn-info tooltip"
                          data-tip="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`btn btn-sm ${
                pageNum === currentPage
                  ? "btn-primary"
                  : "btn-ghost"
              }`}
            >
              {pageNum}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllBloodDonationRequests;
