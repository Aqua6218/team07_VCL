import { describe, expect, it } from 'vitest';
import { createReactionKey } from './freeReactionService.js';

describe('createReactionKey', () => {
    it('物質名の順番が逆でも同じキーを作る', () => {
        const first = createReactionKey('塩酸', '石灰石');
        const second = createReactionKey('石灰石', '塩酸');

        expect(first).toBe(second);
    });

    it('空白や全角半角の揺れを吸収する', () => {
        const first = createReactionKey(' 食塩水 ', '硝酸銀水溶液');
        const second = createReactionKey('食 塩 水', ' 硝酸銀水溶液 ');

        expect(first).toBe(second);
    });
});
