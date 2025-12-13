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
      const res = await axiosSecure.get(`/funding?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load funding history</p>
    );

  return (
    <Container>
      <div className="p-10 bg-base-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Funding History</h2>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/funding/form")}
          >
            Give Fund
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-primary rounded-lg">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Donor Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Transaction</th>
                {/* <th>Tracking</th> */}
              </tr>
            </thead>

            <tbody>
              {data.data?.map((f, index) => (
                <tr key={f._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{f.name}</td>
                  <td>{f.email}</td>
                  <td>${f.amount.toFixed(2)}</td>
                  <td>{f.createdAt.split("T")[0]}</td>
                  <td>{f.transactionId}</td>
                  {/* <td>{f.trackingId}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(data.totalPages).keys()].map((i) => (
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
