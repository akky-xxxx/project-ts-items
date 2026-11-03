export const run = (call: (callback: () => void) => void) => {
  call(() => {
    call(() => {
      call(() => "depth 3")
    })
  })
}
