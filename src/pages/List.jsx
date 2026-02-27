import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./List.css";

export default function List() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/employees")
      .then((res) => {
        console.log("API RESPONSE:", res.data);

        const employeesArray = res.data?.TABLE_DATA?.data || [];

        setEmployees(employeesArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="list-container">
      <h1>Employee List</h1>

      {loading && <p>Loading employees...</p>}

      {!loading && (
        <>
          <div className="top-buttons">
            <button
              className="chart-btn"
              onClick={() => navigate("/chart", { state: employees })}
            >
              View Chart
            </button>

            <button
              className="map-btn"
              onClick={() => navigate("/map", { state: employees })}
            >
              View Map
            </button>
          </div>

          {employees.length === 0 && <p>No employees found.</p>}

          {employees.map((emp, index) => (
            <div
              key={index}
              className="employee-card"
              onClick={() =>
                navigate(`/details/${index}`, {
                  state: {
                    name: emp[0],
                    position: emp[1],
                    city: emp[2],
                    salary: emp[5],
                  },
                })
              }
            >
              <span className="emp-name">{emp[0]}</span>

              <span className="emp-salary">{emp[5]}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
