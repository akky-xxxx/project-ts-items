const Child = (props: { value: { id: number } }) => <div>{props.value.id}</div>

export const Parent = () => <Child value={{ id: 1 }} />
