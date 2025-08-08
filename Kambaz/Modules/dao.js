import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
}

export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
}

export async function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
}

// Make this function async to match the route expectation  
export async function updateModule(moduleId, moduleUpdates) {
    const index = Database.modules.findIndex((m) => m._id === moduleId);

    if (index === -1) {
        console.log("Module not found");
        return null;
    }

    Database.modules[index] = {
        ...Database.modules[index],
        ...moduleUpdates,
    };

    return Database.modules[index];
}