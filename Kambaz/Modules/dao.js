import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    Database.modules = [...Database.modules, newModule];
    return newModule;
}

export function findModulesForCourse(courseId) {
    return Database.modules.filter((m) => m.course === courseId);
}

export async function deleteModule(moduleId) {

    const before = Database.modules.length;
    Database.modules = Database.modules.filter((m) => m._id !== moduleId);
    const after = Database.modules.length;

    const deleted = before !== after;
    return deleted;
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