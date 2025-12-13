// import React from 'react';

// const DonorDashboardHome = () => {
//     return (
//         <div>
//             Donor Home
//         </div>
//     );
// };

// export default DonorDashboardHome;

import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const DonorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch donor's recent 3 requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosSecure.get(
          `/donation-requests/email?email=${user.email}`
        );

        // only pick 3 recent
        setRecentRequests(res.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // Delete Request Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/donation-requests/${id}`);
        if (res.data) {
          Swal.fire("Deleted!", "Your request has been deleted.", "success");

          // remove from UI
          setRecentRequests((prev) => prev.filter((req) => req._id !== id));
        }
      }
    });
  };

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="p-6">

      {/* Welcome Section */}
      <h2 className="text-3xl font-bold text-primary mb-4">
        Welcome, {user?.displayName} 👋
      </h2>

      {/* If donor has no donation requests yet */}
      {recentRequests.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You haven't created any donation requests yet.
        </p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-3">Your Recent Requests</h3>

          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {recentRequests.map((req, i) => (
                  <tr key={req._id}>
                    <td>{i + 1}</td>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td className="font-semibold capitalize">
                      {req.status}
                    </td>

                    <td className="flex gap-2">
                      {/* EDIT */}
                      <Link
                        // to={`/dashboard/edit-donation/${req._id}`}
                        to={`/dashboard/edit-request/${req._id}`}
                        className="btn btn-sm btn-outline tooltip tooltip-primary"
                        data-tip = 'Edit'
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-sm btn-error text-white tooltip tooltip-primary"
                        data-tip = 'Delete'
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* VIEW */}
                      <Link
                        to={`/dashboard/request-details/${req._id}`}
                        className="btn btn-sm btn-info text-white tooltip tooltip-primary"
                        data-tip = 'View'
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All Button */}
          <div className="flex justify-end mt-4">
            <Link
              to="/dashboard/my-donation-requests"
              className="btn btn-primary"
            >
              View My All Requests
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DonorDashboardHome;
