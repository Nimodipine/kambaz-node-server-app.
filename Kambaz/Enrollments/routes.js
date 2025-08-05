import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export default function EnrollmentRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        res.send(Database.enrollments);
    });

    app.get("/api/users/:uid/enrollments", (req, res) => {
        const { uid } = req.params;
        const userEnrollments = Database.enrollments
            .filter((e) => e.user === uid)
            .map((e) => e.course);
        res.json(userEnrollments);
    });

    // Enroll user in a course
    app.post("/api/users/:uid/enroll/:cid", (req, res) => {
        const { uid, cid } = req.params;
        const exists = Database.enrollments.find(
            (e) => e.user === uid && e.course === cid
        );
        if (!exists) {
            Database.enrollments.push({ _id: uuidv4(), user: uid, course: cid });
        }
        res.sendStatus(200);
    });

    // Unenroll user from a course
    app.delete("/api/users/:uid/unenroll/:cid", (req, res) => {
        const { uid, cid } = req.params;
        const index = Database.enrollments.findIndex(
            (e) => e.user === uid && e.course === cid
        );
        if (index !== -1) {
            Database.enrollments.splice(index, 1);
        }
        res.sendStatus(200);
    });
}
