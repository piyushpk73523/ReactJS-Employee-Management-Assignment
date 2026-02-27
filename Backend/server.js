const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/employees", async (req, res) => {
  try {
    const response = await axios.post(
      "https://backend.jotish.in/backend_dev/gettabledata.php",
      {
        username: "test",
        password: "123456",
      },
    );

    res.json(response.data);
  } catch (error) {
    console.error("API ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
