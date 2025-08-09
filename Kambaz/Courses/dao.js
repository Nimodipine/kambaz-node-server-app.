import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
    return model.find();
}

export async function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    console.log('DAO: Creating course with _id:', newCourse._id); // Debug log

    const createdCourse = await model.create(newCourse);
    console.log('DAO: Course created successfully:', createdCourse); // Debug log

    return createdCourse;

}

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

export function findCoursesByIds(ids) {
    return model.find({ _id: { $in: ids } });
}
