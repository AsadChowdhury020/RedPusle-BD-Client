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
      <p className="text-center text-error py-10">
        Failed to load donation requests.
      </p>
    );

  // Pagination
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const currentData = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <div className="mt-16 p-6 bg-base-200 rounded-xl">

        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Pending Blood Donation Requests
        </h2>

        {/* Table */}
        <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Hospital</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-base-content/60"
                  >
                    No pending donation requests found.
                  </td>
                </tr>
              ) : (
                currentData.map((req, index) => (
                  <tr key={req._id} className="text-base-content">
                    <td>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td>{req.recipientName}</td>

                    <td>
                      {req.recipientUpazila}, {req.recipientDistrict}
                    </td>

                    <td>{req.donationDate}</td>

                    <td>
                      {new Date(
                        `1970-01-01T${req.donationTime}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    <td className="font-semibold text-primary">
                      {req.bloodGroup}
                    </td>

                    <td>
                      {req.hospitalName}
                      <br />
                      <span className="text-xs text-base-content/60">
                        {req.fullAddress}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/request-details/${req._id}`
                          )
                        }
                        className="btn btn-sm btn-outline"
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
    </Container>
  );
};

export default DonationRequests;
