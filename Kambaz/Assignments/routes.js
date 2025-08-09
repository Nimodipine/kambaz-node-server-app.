import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    const createAssignment = async (req, res) => {
        const assignment = await dao.createAssignment(req.body);
        res.json(assignment);
    };

    const findAllAssignments = async (req, res) => {
        const assignments = await dao.findAllAssignments();
        res.json(assignments);
    };

    const findAssignmentById = async (req, res) => {
        const assignment = await dao.findAssignmentById(req.params.assignmentId);
        res.json(assignment);
    };

    const updateAssignment = async (req, res) => {
        const status = await dao.updateAssignment(
            req.params.assignmentId,
            req.body
        );
        res.json(status);
    };

    const deleteAssignment = async (req, res) => {
        const status = await dao.deleteAssignment(req.params.assignmentId);
        res.json(status);
    };

    app.post("/api/assignments", createAssignment);
    app.get("/api/assignments", findAllAssignments);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
