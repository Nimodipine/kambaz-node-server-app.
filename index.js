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
const app = express();

mongoose.connect(CONNECTION_STRING).then(() => {
    console.log("✅ Connected to MongoDB!");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

// Middleware
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        // Allow local dev
        if (!origin || origin === "http://localhost:5173") {
            return callback(null, true);
        }

        const allowedOrigins = [
            "https://a6--kambaz-react-web-app-cs5610-sm2025.netlify.app", // main prod deploy
            /^https:\/\/[a-z0-9\-]+--kambaz-react-web-app-cs5610-sm2025\.netlify\.app$/ // all deploy previews
        ];

        const isAllowed = allowedOrigins.some((entry) =>
            typeof entry === "string" ? origin === entry : entry.test(origin)
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error(`CORS error: Origin ${origin} not allowed`));
        }
    },
}));


app.use(express.json());

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        sameSite: "none"
    }
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
}
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
