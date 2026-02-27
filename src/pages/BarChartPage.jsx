import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useLocation, useNavigate } from "react-router-dom";
import "./BarChartPage.css";

export default function BarChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || [];

  // Convert array data to proper chart format
  const chartData = data.slice(0, 10).map((emp) => {
    const fullName = emp[0]; // name
    const salaryString = emp[5]; // "$320,800"

    const salaryNumber = parseInt(
      salaryString.replace("$", "").replace(/,/g, ""),
    );

    return {
      shortName:
        fullName.length > 8 ? fullName.substring(0, 8) + "..." : fullName,
      fullName: fullName,
      salary: salaryNumber,
    };
  });

  return (
    <div className="chart-container">
      <div className="chart-card">
        <h2>Salary Chart (Top 10 Employees)</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="shortName" interval={0} />

            <YAxis />

            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Salary"]}
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.fullName
              }
            />

            <Bar dataKey="salary" fill="#4caf50" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <button onClick={() => navigate("/list")}>Back to List</button>
      </div>
    </div>
  );
}
