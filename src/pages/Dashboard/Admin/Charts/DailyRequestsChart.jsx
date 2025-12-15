import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DailyRequestsChart = ({ data }) => {
  return (
    <div className="p-6 bg-base-100 border border-base-300 rounded-xl shadow-sm  items-center gap-4 ">
      <h3 className="text-lg font-bold text-primary mb-4">
        Daily Donation Requests (Last 7 Days)
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#dc2626"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyRequestsChart;
