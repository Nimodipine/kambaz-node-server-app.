import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import "dotenv/config";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParamenters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const isProd = process.env.NODE_ENV === "production";
const app = express();

mongoose.connect(CONNECTION_STRING).then(() => {
    console.log("✅ Connected to MongoDB!");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

app.set("trust proxy", 1);

const allowedOrigins = [
    "http://localhost:5173",
];
const originRegexes = [/\.netlify\.app$/];

// Middleware
app.use(cors({
    credentials: true,
    origin: (origin, cb) => {
        if (!origin) return cb(null, true); // health checks, curl
        if (allowedOrigins.includes(origin) || originRegexes.some(rx => rx.test(origin))) {
            return cb(null, true);
        }
        return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
}));


app.use(express.json());

const sessionOptions = {
    name: "sid",
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    }
};

app.use(session(sessionOptions));


// Routes (after middleware!)
AssignmentRoutes(app);
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
Lab5(app);
Hello(app);
PathParamenters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithArrays(app);
ModuleRoutes(app);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
