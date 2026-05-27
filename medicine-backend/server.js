const dotenv = require("dotenv");

// LOAD ENV VARIABLES FIRST
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");
const morgan = require("morgan");

// DATABASE
const connectDB = require("./config/db");

// PASSPORT CONFIG
require("./config/passport");

// SOCKET
const {
  initializeSocket,
} = require("./sockets/videoSocket");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// MIDDLEWARE
const errorMiddleware = require(
  "./middleware/errorMiddleware"
);

// CONNECT DATABASE
connectDB();

const app = express();

const server =
  http.createServer(app);

// INITIALIZE SOCKET
initializeSocket(server);

// SECURITY
app.use(helmet());

// CORS
app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "*",

    credentials: true,
  })
);

// LOGGER
app.use(morgan("dev"));

// BODY PARSER
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// SESSION
app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "supersecret",

    resave: false,

    saveUninitialized: false,
  })
);

// PASSPORT
app.use(passport.initialize());

app.use(passport.session());

// STATIC FILES
app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    message:
      "🚀 Telemedicine Backend Running Successfully",
  });
});

// API ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/doctors",
  doctorRoutes
);

app.use(
  "/api/patients",
  patientRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/prescriptions",
  prescriptionRoutes
);

app.use(
  "/api/medical-records",
  medicalRecordRoutes
);

app.use(
  "/api/uploads",
  uploadRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

// ERROR HANDLER
app.use(errorMiddleware);

// PORT
const PORT =
  process.env.PORT || 5000;

// START SERVER
server.listen(PORT, () => {
  console.log(
    `✅ Server running on port ${PORT}`
  );
});