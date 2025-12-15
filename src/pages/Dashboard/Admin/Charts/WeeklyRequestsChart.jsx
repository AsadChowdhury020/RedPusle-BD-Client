import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const WeeklyRequestsChart = ({ data }) => {
  return (
    <div className="p-6 bg-base-100 border border-base-300 rounded-xl shadow-sm items-center gap-4">
      <h3 className="text-lg font-bold text-primary mb-4">
        Weekly Donation Requests
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#16a34a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyRequestsChart;
