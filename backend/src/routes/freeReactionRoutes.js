import express from 'express';
import { FreeReactionController } from '../controllers/freeReactionController.js';

const router = express.Router();
const controller = new FreeReactionController();

// フリーモードで選ばれた2つの物質から、DB登録済み反応またはAI補完結果を返す。
router.post('/reactions/evaluate', (req, res) => controller.evaluateReaction(req, res));

export default router;
