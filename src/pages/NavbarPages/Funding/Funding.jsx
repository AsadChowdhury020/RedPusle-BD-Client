import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useNavigate } from "react-router";
import Container from "../../../components/Shared/Container";

const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["funding", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/funding?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <p className="text-center text-error py-10">
        Failed to load funding history
      </p>
    );

  return (
    <Container>
      <div className="p-6 md:p-10 bg-base-200 rounded-xl mt-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-primary">
            Funding History
          </h2>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/funding/form")}
          >
            Give Fund
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Donor Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Transaction</th>
              </tr>
            </thead>

            <tbody className="text-base-content">
              {data.data?.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-base-content/60"
                  >
                    No funding records found.
                  </td>
                </tr>
              ) : (
                data.data?.map((f, index) => (
                  <tr key={f._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{f.name}</td>
                    <td>{f.email}</td>
                    <td className="font-semibold text-primary">
                      ${f.amount.toFixed(2)}
                    </td>
                    <td>
                      {new Date(f.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-xs break-all">
                      {f.transactionId}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(data.totalPages || 0).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                page === i + 1 ? "btn-primary" : "btn-ghost"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Funding;
