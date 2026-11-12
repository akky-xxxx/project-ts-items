"use client"

import { startTransition, useState, ViewTransition } from "react"

import type { FC, ReactNode } from "react"

type Item = {
  contents: ReactNode
  id: string
  tab: ReactNode
}

type Props = {
  items: Item[]
}

const FIRST_ITEM_INDEX = 0

export const Tab: FC<Props> = (props) => {
  const { items } = props
  const [visibleIndex, setVisibleIndex] = useState(FIRST_ITEM_INDEX)
  const createHandleClickTab = (index: number) => () => {
    startTransition(() => {
      setVisibleIndex(index)
    })
  }

  return (
    <div>
      <ul>
        {items.map(({ id, tab }, index) => {
          const isEnabled = index !== visibleIndex

          return (
            <li key={id}>
              <button onClick={createHandleClickTab(index)} disabled={!isEnabled} type="button">
                {tab}
              </button>
            </li>
          )
        })}
      </ul>

      <ul>
        {items.map(({ id, contents }, index) => {
          const isVisible = index === visibleIndex

          if (!isVisible) {
            return null
          }

          return (
            <ViewTransition key={id}>
              <li>{contents}</li>
            </ViewTransition>
          )
        })}
      </ul>
    </div>
  )
}
