import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Users, HeartHandshake, DollarSign } from "lucide-react";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalRequests: 0,
  });


const getTotalFund = async () => {
  const res = await axiosSecure.get("/funding/total");
  return res.data.total;
};


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axiosSecure.get("/users");
        const requestsRes = await axiosSecure.get("/donation-requests");


        setStats({
          totalUsers: usersRes.data.length,
          totalFunds: await getTotalFund(),
          totalRequests: requestsRes.data.length,
        });
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      }
    };

    fetchStats();
  }, []);

//   console.log(stats.totalFunds);
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <h2 className="text-3xl font-bold text-primary mb-6">
        Welcome, {user?.displayName} 👋
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-secondary flex items-center gap-4">
          <Users className="w-12 h-12 text-primary" />
          <div>
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            <p className="text-gray-600">Total Users (Donors)</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-secondary flex items-center gap-4">
          <DollarSign className="w-12 h-12 text-green-600" />
          <div>
            <h3 className="text-2xl font-bold">${stats?.totalFunds?.toFixed(2)}</h3>
            <p className="text-gray-600">Total Funding</p>
          </div>
        </div>

        {/* Total Donation Requests */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-secondary flex items-center gap-4">
          <HeartHandshake className="w-12 h-12 text-red-600" />
          <div>
            <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
            <p className="text-gray-600">Total Blood Donation Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
