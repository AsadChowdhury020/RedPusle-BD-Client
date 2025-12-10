import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";

const itemsPerPage = 5;

const DonationRequests = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donation-requests", "pending"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/donation-requests/status?status=pending"
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load donation requests.
      </div>
    );

  // Pagination calculations
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const currentData = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
 <Container>
     <div className="p-4 mt-16 bg-base-200">
      <h2 className="text-3xl text-primary font-bold mb-6 text-center">
        Pending Blood Donation Requests
      </h2>

      {/* Table */}
      <div className="overflow-x-auto border border-secondary rounded-md">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Hospital</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No pending donation requests found.
                </td>
              </tr>
            ) : (
              currentData.map((req, index) => (
                <tr key={req._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{req.recipientName}</td>

                  <td>
                    {req.recipientUpazila}, {req.recipientDistrict}
                  </td>

                  <td>{req.donationDate}</td>

                  <td>
                    {new Date(`1970-01-01T${req.donationTime}`).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit", hour12: true }
                    )}
                  </td>

                  <td className="font-bold text-primary">{req.bloodGroup}</td>

                  <td>
                    {req.hospitalName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {req.fullAddress}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-xs btn-outline btn-primary"
                      onClick={() => navigate(`/dashboard/request-details/${req._id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
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
 </Container>
  );
};

export default DonationRequests;
