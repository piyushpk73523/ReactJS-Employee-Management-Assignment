import { useLocation, useNavigate } from "react-router-dom";
import "./PhotoResult.css";

export default function PhotoResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { image, employee } = location.state;

  return (
    <div className="photo-container">
      <h2>Photo Captured</h2>
      <img src={image} alt="captured" />
      <h3>{employee.name}</h3>
      <button onClick={() => navigate("/list")}>Back to List</button>
    </div>
  );
}
