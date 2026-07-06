import { FreeReactionService } from '../services/freeReactionService.js';

function createService() {
    // リクエストごとにServiceを作り、環境変数やDB接続の状態を最新で読む。
    return new FreeReactionService();
}

export class FreeReactionController {
    async evaluateReaction(req, res) {
        try {
            const { testTubeChemical, flaskChemical } = req.body;
            const result = await createService().evaluateReaction(testTubeChemical, flaskChemical);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
