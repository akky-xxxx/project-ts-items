/**
 * @description
 * dry run の fixture(意図的に違反・未整形)を、パッケージ自身の lint 対象から外すためのパターン
 */
export const DRY_RUN_FIXTURE_PATTERNS = ["dryRun/**/fixtures/**"] as const
