import express from 'express';
import { ClassController } from '../controllers/classController.js';
import { requireAuth, requireTeacher } from '../middleware/authMiddleware.js';

const router = express.Router();
const controller = new ClassController();

// 通常ログインの教師アカウント用: 担当クラスと生徒の進捗確認に使う。
router.get('/mine', requireAuth, requireTeacher, (req, res) => controller.getMyClasses(req, res));
router.get('/:className/students', requireAuth, requireTeacher, (req, res) => controller.getClassStudents(req, res));

export default router;
