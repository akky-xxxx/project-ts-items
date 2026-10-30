export const runSequentially = async (tasks: (() => Promise<void>)[]) => {
  for (const task of tasks) {
    await task()
  }
}
