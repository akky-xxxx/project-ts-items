const Child = (props: { onClick: () => void }) => <button onClick={props.onClick} type="button" />

export const Parent = () => <Child onClick={() => {}} />
