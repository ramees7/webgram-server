require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./Connections/db");
const router = require("./Routes/router");

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001",""];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // If using cookies or authentication
};

const webgramServer = express();
webgramServer.use(cors(corsOptions));
webgramServer.use(cors());
webgramServer.use(express.json());
webgramServer.use(router);

const PORT = 4000 || process.env.PORT;

webgramServer.use("/upload", express.static("./uploads"));

webgramServer.listen(PORT, () => {
  console.log("Ekart server started " + PORT);
});

webgramServer.get("/", (req, res) => {
  res.send(
    "<h1>Daily WebGram Started... Waiting for Client requests...!!</h1>"
  );
});
