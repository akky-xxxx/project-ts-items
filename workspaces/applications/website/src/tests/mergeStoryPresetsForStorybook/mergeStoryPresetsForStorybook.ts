import type { StoryContext } from "@storybook/nextjs-vite"

type StoryPreset = Readonly<{
  globals?: StoryContext["globals"]
  parameters?: StoryContext["parameters"]
}>
type MergedStoryPreset = {
  globals: StoryContext["globals"]
  parameters: StoryContext["parameters"]
}
type MergeStoryPresetsForStorybook = (...presets: readonly StoryPreset[]) => MergedStoryPreset

/**
 * @description
 * storybook 向けの関数。locale・viewport・theme 等の定数を、globals と parameters を消さずに組み合わせる
 * 定数をそのまま順に spread すると、後の定数の globals で前の定数の globals が上書きされるため使う
 * globals と parameters はそれぞれキー単位で浅くマージし、同じキーは後の指定を優先する
 * parameters の入れ子(nextjs.navigation 等)はマージしない。現時点で parameters を持つ定数は locale だけのため
 */
export const mergeStoryPresetsForStorybook: MergeStoryPresetsForStorybook = (...presets) => ({
  globals: Object.fromEntries(presets.flatMap((preset) => Object.entries(preset.globals ?? {}))),
  parameters: Object.fromEntries(
    presets.flatMap((preset) => Object.entries(preset.parameters ?? {})),
  ),
})
