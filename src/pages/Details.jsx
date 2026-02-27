import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import "./Details.css";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const data = location.state;

  const [openCamera, setOpenCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // Capture image
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  // Confirm image and navigate
  const confirm = () => {
    navigate("/photo", {
      state: {
        image: capturedImage,
        employee: data,
      },
    });
  };

  // If user refreshes page and no data exists
  if (!data) {
    return (
      <div className="details-container">
        <div className="details-card">
          <h3>No Employee Data Found</h3>
          <button onClick={() => navigate("/list")}>Back to List</button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <h2>{data.name}</h2>
        <p>
          <strong>Salary:</strong> ₹{data.salary}
        </p>
        <p>
          <strong>City:</strong> {data.city}
        </p>

        <button onClick={() => setOpenCamera(true)}>
          Upload / Capture Picture
        </button>
      </div>

      {/* Camera Modal */}
      {openCamera && (
        <div className="modal">
          <div className="modal-content">
            <h3>Capture Photo</h3>

            {!capturedImage ? (
              <>
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                />

                <div className="modal-buttons">
                  <button className="capture-btn" onClick={capture}>
                    Capture
                  </button>

                  <button
                    className="retake-btn"
                    onClick={() => setOpenCamera(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={capturedImage} alt="Captured Preview" />

                <div className="modal-buttons">
                  <button
                    className="retake-btn"
                    onClick={() => setCapturedImage(null)}
                  >
                    Retake
                  </button>

                  <button className="confirm-btn" onClick={confirm}>
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
