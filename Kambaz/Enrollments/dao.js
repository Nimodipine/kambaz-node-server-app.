// dao.js
import model from "./model.js";

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((e) => e.course);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((e) => e.user);
}

export async function enrollUserInCourse(user, course) {
    if (!user || !course) {
        const msg = `Missing ids for enrollment. user=${user} course=${course}`;
        const err = new Error(msg);
        err.status = 400;
        throw err;
    }
    const _id = `${user}-${course}`;
    // idempotent: won’t throw on duplicates / retries
    await model.updateOne(
        { _id },
        { $setOnInsert: { _id, user, course, createdAt: new Date() } },
        { upsert: true }
    );
    return model.findById(_id);
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

export function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
}
