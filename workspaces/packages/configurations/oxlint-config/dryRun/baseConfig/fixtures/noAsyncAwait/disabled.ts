export const run = async (task: () => Promise<void>) => {
  await task()
}
