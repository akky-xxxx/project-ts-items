const isFilled = (value: string) => value.length > 0
export const filterFilled = (values: string[]) => values.filter(isFilled)
