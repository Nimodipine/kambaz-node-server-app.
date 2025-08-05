import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/assignments", (req, res) => {
        const assignments = assignmentsDao.findAllAssignments();
        res.json(assignments);
    });

    app.get("/api/assignments/course/:cid", (req, res) => {
        const { cid } = req.params;
        const courseAssignments = assignmentsDao.findAssignmentsForCourse(cid);
        res.json(courseAssignments);
    });

    app.post("/api/assignments", (req, res) => {
        const assignment = assignmentsDao.createAssignment(req.body);
        res.json(assignment);
    });

    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = assignmentsDao.findAssignmentById(aid);
        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    });

    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const updates = req.body;
        const updated = assignmentsDao.updateAssignment(aid, updates);
        res.json(updated);
    });

    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const status = assignmentsDao.deleteAssignment(aid);
        res.send(status);
    });
}
