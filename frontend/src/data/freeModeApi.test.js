import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    evaluateFreeReaction,
    evaluateLocalReaction,
    FREE_MODE_PERIODIC_DATA_COUNT,
    FREE_MODE_PERIODIC_VERIFIED_CLASSIFICATION_COUNT,
    FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_COUNT,
    FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_UNIQUE_COUNT,
    getFreeModeCoverageSummary
} from './freeModeApi.js';
import freeModePeriodicReactionData from './freeModePeriodicReactionData.json';
import { periodicTableLayout } from './periodicTable.js';

describe('freeModeApi', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('周期表118元素の順序付き全ペア13,924件をデータとして持つ', () => {
        const coverage = getFreeModeCoverageSummary();

        expect(periodicTableLayout).toHaveLength(118);
        expect(FREE_MODE_PERIODIC_DATA_COUNT).toBe(13924);
        expect(FREE_MODE_PERIODIC_VERIFIED_CLASSIFICATION_COUNT).toBe(13924);
        expect(FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_COUNT).toBe(1168);
        expect(FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_UNIQUE_COUNT).toBe(584);
        expect(coverage.periodicOrderedPairCount).toBe(13924);
        expect(coverage.periodicDatasetCount).toBe(13924);
        expect(coverage.periodicVerifiedClassificationCount).toBe(13924);
        expect(coverage.periodicVerifiedRepresentativeCount).toBe(1168);
        expect(coverage.periodicVerifiedRepresentativeUniqueCount).toBe(584);
        expect(coverage.displayText).toContain('全件データ13,924件');
        expect(coverage.displayText).toContain('検証分類13,924件');
        expect(coverage.displayText).toContain('生成物確定1,168通り(584組)');
    });

    it('周期表118元素の全順序付きペアで観察結果と3D表示情報を返せる', () => {
        const failures = [];
        const orderedPairKeys = new Set();
        let checkedCount = 0;

        for (const testTubeElement of periodicTableLayout) {
            for (const flaskElement of periodicTableLayout) {
                checkedCount += 1;
                const result = evaluateLocalReaction(testTubeElement.name, flaskElement.name);
                const reaction = result?.reaction;

                if (result?.orderedPairKey) {
                    orderedPairKeys.add(result.orderedPairKey);
                }

                if (
                    result?.source !== 'local-periodic-dataset'
                    || !reaction?.title
                    || !reaction?.summary
                    || !reaction?.visualEffect
                    || !reaction?.visualDetail?.requiredCondition
                    || !reaction?.visualDetail?.displayHint
                    || !reaction?.verificationStatus?.startsWith('verified_')
                ) {
                    failures.push(`${testTubeElement.symbol}->${flaskElement.symbol}`);
                }
            }
        }

        expect(checkedCount).toBe(13924);
        expect(orderedPairKeys.size).toBe(13924);
        expect(failures).toEqual([]);
    });

    it('検証済み代表反応は生成物と演出を返す', () => {
        const water = evaluateLocalReaction('水素', '酸素');
        const salt = evaluateLocalReaction('ナトリウム', '塩素');
        const ironSulfide = evaluateLocalReaction('鉄', '硫黄');
        const germaniumFluoride = evaluateLocalReaction('ゲルマニウム', 'フッ素');
        const ironChloride = evaluateLocalReaction('鉄', '塩素');
        const lanthanumChloride = evaluateLocalReaction('ランタン', '塩素');
        const methane = evaluateLocalReaction('炭素', '水素');

        expect(water.reaction.title).toBe('水の生成');
        expect(water.reaction.visualDetail.productName).toBe('水');
        expect(water.reaction.verificationStatus).toBe('verified_representative');
        expect(salt.reaction.title).toBe('塩化ナトリウムの生成');
        expect(salt.reaction.visualDetail.solidForm).toBe('crystal');
        expect(salt.reaction.verificationStatus).toBe('verified_representative');
        expect(ironSulfide.reaction.title).toBe('硫化鉄の生成');
        expect(ironSulfide.reaction.visualDetail.productName).toBe('硫化鉄');
        expect(germaniumFluoride.reaction.title).toBe('四フッ化ゲルマニウムの生成');
        expect(germaniumFluoride.reaction.visualEffect).toBe('bubbles');
        expect(germaniumFluoride.reaction.visualDetail.productName).toBe('四フッ化ゲルマニウム');
        expect(ironChloride.reaction.title).toBe('塩化鉄(III)の生成');
        expect(ironChloride.reaction.visualDetail.productName).toBe('塩化鉄(III)');
        expect(lanthanumChloride.reaction.title).toBe('塩化ランタン(III)の生成');
        expect(lanthanumChloride.reaction.visualDetail.productName).toBe('塩化ランタン(III)');
        expect(methane.reaction.title).toBe('メタンの生成');
        expect(methane.reaction.visualEffect).toBe('bubbles');
    });

    it('生成物確定データは生成物名・反応式・演出を必ず持つ', () => {
        const fixedProductRows = freeModePeriodicReactionData.filter(
            row => row.verificationStatus === 'verified_representative'
        );
        const failures = fixedProductRows.filter(row =>
            !row.visualDetail?.productName
            || !row.equation
            || ['no_reaction', 'unknown', 'none'].includes(row.visualEffect)
            || !row.visualDetail?.requiredCondition
        );

        expect(fixedProductRows).toHaveLength(1168);
        expect(new Set(fixedProductRows.map(row => row.reaction_key)).size).toBe(584);
        expect(failures).toEqual([]);
    });

    it('条件依存ペアは検証分類した上で生成物や結晶を断定しない', () => {
        const oxygenChlorine = evaluateLocalReaction('酸素', '塩素');

        expect(oxygenChlorine.reaction.title).toBe('酸化は条件依存');
        expect(oxygenChlorine.reaction.visualEffect).toBe('none');
        expect(oxygenChlorine.reaction.visualDetail.productName).toBeNull();
        expect(oxygenChlorine.reaction.visualDetail.solidForm).toBe('none');
        expect(oxygenChlorine.reaction.verificationStatus).toBe('verified_condition_dependent_no_single_product');
    });

    it('APIが落ちていても周期表の元素ペアをローカルデータで返せる', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

        const result = await evaluateFreeReaction('金', 'オガネソン');

        expect(result.source).toBe('local-periodic-dataset');
        expect(result.reaction.title).toBe('希ガスの安定性');
        expect(result.reaction.visualEffect).toBe('none');
        expect(result.reaction.verificationStatus).toBe('verified_no_obvious_reaction');
    });

    it('APIが低信頼unknownを返した場合も周期表ペアはローカル全件データへ切り替える', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                source: 'ai_cache',
                reaction: {
                    title: '未確定',
                    summary: '低信頼の仮回答です。',
                    visualEffect: 'unknown',
                    confidence: 'low'
                }
            })
        }));

        const result = await evaluateFreeReaction('鉄', '硫黄');

        expect(result.source).toBe('local-periodic-dataset');
        expect(result.apiSource).toBe('ai_cache');
        expect(result.reaction.title).toBe('硫化鉄の生成');
    });
});
