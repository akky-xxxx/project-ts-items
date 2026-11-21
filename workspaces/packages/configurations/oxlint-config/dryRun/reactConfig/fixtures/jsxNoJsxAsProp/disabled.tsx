import type { ReactNode } from "react"

const Child = (props: { icon: ReactNode }) => <div>{props.icon}</div>

export const Parent = () => <Child icon={<span />} />
