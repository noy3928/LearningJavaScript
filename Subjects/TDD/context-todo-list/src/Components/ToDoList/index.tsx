import React, { useContext } from "react"
import styled from "styled-components"

import { ToDoListContext } from "Contexts"

import { ToDoItem } from "Components/ToDoItem"

export const ToDoList = () => {
  const { toDoList, deleteToDo } = useContext(ToDoListContext)

  return (
    <Container data-testid="toDoList">
      {toDoList.map((item, index) => (
        <ToDoItem key={item} label={item} onDelete={() => deleteToDo(index)} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`
