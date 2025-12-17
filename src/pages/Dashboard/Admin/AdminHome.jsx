import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Users, HeartHandshake, DollarSign } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DailyRequestsChart from "./Charts/DailyRequestsChart";
import WeeklyRequestsChart from "./Charts/WeeklyRequestsChart";
import MonthlyRequestsChart from "./Charts/MonthlyRequestsChart";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  /* Stats */
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalRequests: 0,
  });

  const getTotalFund = async () => {
    const res = await axiosSecure.get("/funding/total");
    return res.data.total || 0;
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axiosSecure.get("/users");
        const requestsRes = await axiosSecure.get("/donation-requests");
        const totalFunds = await getTotalFund();

        setStats({
          totalUsers: usersRes.data.length,
          totalFunds,
          totalRequests: requestsRes.data.length,
        });
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      }
    };

    fetchStats();
  }, [axiosSecure, getTotalFund]);

  /* Charts */
  const [chartData, setChartData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });

  useEffect(() => {
    const fetchChartStats = async () => {
      try {
        const res = await axiosSecure.get("/donation-requests/stats");
        setChartData(res.data);
      } catch (error) {
        console.error("Chart stats error:", error);
      }
    };

    fetchChartStats();
  }, [axiosSecure]);

  return (
    <div className="p-6">

      {/* Welcome */}
      <h2 className="text-3xl font-bold text-primary mb-6">
        Welcome, {user?.displayName} 👋
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Users */}
        <div className="p-6 bg-base-100 border border-base-300 rounded-xl shadow-sm flex items-center gap-4">
          <Users className="w-12 h-12 text-primary" />
          <div>
            <h3 className="text-2xl font-bold text-base-content">
              {stats.totalUsers}
            </h3>
            <p className="text-base-content/70">
              Total Users (Donors)
            </p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="p-6 bg-base-100 border border-base-300 rounded-xl shadow-sm flex items-center gap-4">
          <DollarSign className="w-12 h-12 text-primary" />
          <div>
            <h3 className="text-2xl font-bold text-base-content">
              ৳ {stats.totalFunds.toFixed(2)}
            </h3>
            <p className="text-base-content/70">
              Total Funding
            </p>
          </div>
        </div>

        {/* Total Requests */}
        <div className="p-6 bg-base-100 border border-base-300 rounded-xl shadow-sm flex items-center gap-4">
          <HeartHandshake className="w-12 h-12 text-primary" />
          <div>
            <h3 className="text-2xl font-bold text-base-content">
              {stats.totalRequests}
            </h3>
            <p className="text-base-content/70">
              Total Blood Donation Requests
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-8 mt-10">
        <DailyRequestsChart data={chartData.daily || []} />
        <WeeklyRequestsChart data={chartData.weekly || []} />
        <MonthlyRequestsChart data={chartData.monthly || []} />
      </div>
    </div>
  );
};

export default AdminHome;
