import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true }, // a1, a2, q1, etc.
        title: { type: String, required: true },
        category: { type: String, required: true }, // ASSIGNMENTS, QUIZZES, etc.
        points: { type: Number, required: true },
        available: String,         // "May 1 at 12:00am" (kept as string for display)
        availableDate: { type: Date }, // parsed date
        due: String,               // "May 8 at 11:59pm"
        dueDate: { type: Date },
        untilDate: { type: Date },
        description: String,
        context: String,
        percent: String,           // e.g., "40%"
        link: String,               // a1, q1, midterm, etc.
        courses: [String],          // array of course IDs
    },
    { collection: "assignments" }
);

export default AssignmentSchema;
