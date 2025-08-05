import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    app.delete("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const deleted = await modulesDao.deleteModule(moduleId);
        if (!deleted) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.sendStatus(200);
    });


    app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const updated = await modulesDao.updateModule(moduleId, moduleUpdates);
        if (!updated) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.json(updated);
    });
}
