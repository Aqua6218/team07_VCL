import { defineConfig } from 'vitest/config';

// 現時点ではフロントエンドの自動テストが未整備のため、
// 確認コマンド自体が設定エラーで止まらないようにする。
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
    passWithNoTests: true,
  },
});
