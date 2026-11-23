const Child = (props: { items: number[] }) => <div>{props.items.length}</div>

export const Parent = () => <Child items={[1]} />
