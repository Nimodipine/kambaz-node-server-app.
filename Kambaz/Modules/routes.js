import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    const deleteModule = async (req, res) => {
        const { moduleId } = req.params;
        const deleted = await modulesDao.deleteModule(moduleId);
        if (!deleted) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.sendStatus(200);
    };

    const updateModule = async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const updated = await modulesDao.updateModule(moduleId, moduleUpdates);
        if (!updated) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.json(updated);
    };

    app.delete("/api/modules/:moduleId", deleteModule);
    app.put("/api/modules/:moduleId", updateModule);
}
