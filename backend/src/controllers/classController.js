import { ClassService } from '../services/classService.js';

const classService = new ClassService();

export class ClassController {
    async getMyClasses(req, res) {
        try {
            const classes = await classService.getTeacherClasses(req.user);
            res.json(classes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getClassStudents(req, res) {
        try {
            const students = await classService.getClassStudents(req.user, req.params.className);
            res.json(students);
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    }
}
