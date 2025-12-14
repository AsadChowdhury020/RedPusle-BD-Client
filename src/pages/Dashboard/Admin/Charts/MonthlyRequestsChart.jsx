import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlyRequestsChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-bold text-primary mb-4">
        Monthly Donation Requests
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            fill="#93c5fd"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRequestsChart;
