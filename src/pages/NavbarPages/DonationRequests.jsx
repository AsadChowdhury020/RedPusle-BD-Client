import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";

const DonationRequests = () => {
  const axiosPublic = useAxios();
  const {loading} = useAuth()

//   const { data: requests = [], isLoading } = useQuery({
//     queryKey: ["pending-requests"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/donation-requests");
//       return res.data;
//     },
//   });

  if (loading)
    return <p className="text-center text-primary mt-10">Loading...</p>;

  return (
    <Container>
      <div className="max-w-6xl mx-auto p-6 my-10">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Pending Blood Donation Requests
        </h2>

        {requests.length === 0 && (
          <p className="text-center text-gray-500">No pending requests.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {requests.map((req) => ( */}
            <div key={req._id} className="card bg-base-100 shadow-md border">
              <div className="card-body">
                <h3 className="text-xl font-semibold text-primary">
                  {req.recipientName}
                </h3>

                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
                <p><strong>Date:</strong> {req.date}</p>
                <p><strong>Time:</strong> {req.time}</p>

                <div className="card-actions justify-end mt-3">
                  <Link
                    to={`/donation-request/${req._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          {/* ))} */}
        </div>
      </div>
    </Container>
  );
};

export default DonationRequests;
