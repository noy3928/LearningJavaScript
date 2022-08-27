import React, { createContext, useState } from "react"

interface Context {
  readonly toDoList: string[]
  readonly addToDo: (toDo: string) => void
  readonly deleteToDo: (index: number) => void
}

const ToDoListContext = createContext<Context>({
  toDoList: [],
  addToDo: (): void => {},
  deleteToDo: (): void => {},
})

interface Props {
  children: JSX.Element | JSX.Element[]
}
const ToDoListProvider = ({ children }: Props): JSX.Element => {
  const [toDoList, setToDoList] = useState<string[]>([])
  const addToDo = (toDo: string): void => {
    if (toDo) {
      setToDoList([...toDoList, toDo])
    }
  }

  const deleteToDo = (index: number): void => {
    let list = [...toDoList]
    list.splice(index, 1)
    setToDoList(list)
  }

  return (
    <ToDoListContext.Provider value={{ toDoList, addToDo, deleteToDo }}>
      {children}
    </ToDoListContext.Provider>
  )
}

export { ToDoListProvider, ToDoListContext }
