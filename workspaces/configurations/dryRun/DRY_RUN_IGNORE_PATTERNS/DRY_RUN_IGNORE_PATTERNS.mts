import { DRY_RUN_FIXTURE_PATTERNS } from "../DRY_RUN_FIXTURE_PATTERNS/DRY_RUN_FIXTURE_PATTERNS.mts"

/**
 * @description
 * dry run の fixture(意図的に違反・未整形)と作業ディレクトリを、パッケージ自身の lint 対象から外すためのパターン
 */
export const DRY_RUN_IGNORE_PATTERNS = [".dry-run/**", ...DRY_RUN_FIXTURE_PATTERNS] as const
