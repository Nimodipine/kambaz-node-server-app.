import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

let { assignments } = db;

export const findAllAssignments = () => assignments;

export const findAssignmentsForCourse = (cid) =>
    assignments.filter((a) => a.courses.includes(cid));

export const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, id: uuidv4() };
    assignments = [...assignments, newAssignment];
    return newAssignment;
};

export const deleteAssignment = (assignmentId) => {
    assignments = assignments.filter((a) => a.id !== assignmentId);
    return assignments;
};

export const updateAssignment = (assignmentId, updated) => {
    assignments = assignments.map((a) =>
        a.id === assignmentId ? { ...a, ...updated } : a
    );
    return assignments.find((a) => a.id === assignmentId);
};

export const findAssignmentById = (assignmentId) =>
    assignments.find((a) => a.id === assignmentId);
