import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { CheckCircle, Edit, Eye, Trash2, XCircle } from "lucide-react";

const statusOptions = ["all", "pending", "inprogress", "done", "canceled"];

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/email?email=${user.email}`
      );
      return res.data;
    },
  });

  // Filtered and paginated data
  const filteredData =
    filterStatus === "all"
      ? requests
      : requests.filter((item) => item.status === filterStatus);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Status Change
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

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this donation request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/donation-requests/${id}`);
          Swal.fire(
            "Deleted!",
            "Your donation request has been deleted.",
            "success"
          );
          refetch();
        } catch {
          Swal.fire("Error", "Failed to delete", "error");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl text-primary font-semibold mb-4">
        My Donation Requests
      </h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered"
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
      <div className="overflow-x-auto border border-secondary rounded-md">
        <table className="table w-full border border-secondary">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date </th>
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
                <td colSpan="8" className="text-center py-4">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              currentData.map((item, index) => (
                <tr key={item._id}>
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
                        <p>{item.donor.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.donor.email}
                        </p>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="space-x-1">
                    <div className="hidden lg:flex flex-wrap gap-1">
                      {item.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(item._id, "done")}
                            className="btn btn-sm btn-success tooltip tooltip-primary"
                            data-tip = 'Done'
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(item._id, "canceled")
                            }
                            className="btn btn-sm btn-warning tooltip tooltip-primary"
                            data-tip = 'Cancel'
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/edit-request/${item._id}`)
                        }
                        className="btn btn-sm btn-outline tooltip tooltip-primary"
                        data-tip = 'Edit'
                      >
                         <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-error text-white tooltip tooltip-primary"
                        data-tip = 'Delete'
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/request-details/${item._id}`)
                        }
                        className="btn btn-sm btn-info text-white tooltip tooltip-primary"
                        data-tip = 'View'
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    <div
                      className={`dropdown dropdown-left lg:hidden ${
                        index >= currentData.length - 2
                          ? "dropdown-top"
                          : "dropdown-bottom"
                      }`}
                    >
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-xs btn-outline m-1"
                      >
                        Actions
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                      >
                        {item.status === "inprogress" && (
                          <>
                            <li>
                              <button
                                onClick={() =>
                                  handleStatusChange(item._id, "done")
                                }
                                className="btn btn-sm btn-success tooltip tooltip-primary"
                            data-tip = 'Done'
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handleStatusChange(item._id, "canceled")
                                }
                                className="btn btn-sm btn-warning tooltip tooltip-primary"
                            data-tip = 'Cancel'
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </li>
                          </>
                        )}
                        <li>
                          {" "}
                          <button
                            onClick={() =>
                              navigate(`/dashboard/edit-request/${item._id}`)
                            }
                            className="btn btn-sm btn-outline tooltip tooltip-primary"
                        data-tip = 'Edit'
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-error text-white tooltip tooltip-primary"
                        data-tip = 'Delete'
                            >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                        <li>
                          {" "}
                          <button
                            onClick={() =>
                              navigate(`/dashboard/request-details/${item._id}`)
                            }
                            className="btn btn-sm btn-info text-white tooltip tooltip-primary"
                        data-tip = 'View'
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`btn btn-sm ${
              pageNum === currentPage ? "btn-primary" : "btn-ghost"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyDonationRequests;
