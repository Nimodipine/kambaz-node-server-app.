import { v4 as uuidv4 } from "uuid";
import AssignmentModel from "./model.js";

/**
 * Optional: normalize incoming payload so dates cast cleanly
 * and ensure we always have a string _id.
 */
const normalize = (a) => {
    const out = { ...a };
    if (!out._id) out._id = uuidv4(); // generate string id if missing
    // If dates arrive as "YYYY-MM-DD", Mongoose will cast them to Date automatically.
    return out;
};

export const findAllAssignments = async () => {
    return AssignmentModel.find().lean();
};

export const findAssignmentsForCourse = async (cid) => {
    // matches docs where the array 'courses' contains cid
    return AssignmentModel.find({ courses: cid }).lean();
};

export const findAssignmentById = async (assignmentId) => {
    return AssignmentModel.findById(assignmentId).lean();
};

export const createAssignment = async (assignment) => {
    const doc = normalize(assignment);
    return AssignmentModel.create(doc);
};

export const updateAssignment = async (assignmentId, updated) => {
    return AssignmentModel.findByIdAndUpdate(assignmentId, updated, {
        new: true,
        runValidators: true,
    }).lean();
};

export const deleteAssignment = async (assignmentId) => {
    const res = await AssignmentModel.deleteOne({ _id: assignmentId });
    return { deletedCount: res.deletedCount };
};
