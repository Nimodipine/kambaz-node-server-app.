import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}

export function findEnrollmentsByUser(userId) {
    const { enrollments } = Database;
    return enrollments.filter((e) => e.user === userId);
}