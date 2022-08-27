import React, { useState } from "react"
import styled from "styled-components"

import { ToDoItem, InputContainer } from "Components"

function App() {
  const [toDo, setToDo] = useState("")
  const [toDoList, setToDoList] = useState<string[]>([])

  const addToDo = (): void => {
    if (toDo) {
      setToDoList([...toDoList, toDo])
      setToDo("")
    }
  }

  const deleteToDo = (index: number): void => {
    let list = [...toDoList]
    list.splice(index, 1)
    setToDoList(list)
  }

  return (
    <Container>
      <Contents>
        <ToDoListContainer data-testid="toDoList">
          {toDoList.map((item, index) => (
            <ToDoItem
              key={item}
              label={item}
              onDelete={() => deleteToDo(index)}
            />
          ))}
        </ToDoListContainer>
        <InputContainer
          toDo={toDo}
          onChange={text => setToDo(text)}
          onAdd={addToDo}
        />
      </Contents>
    </Container>
  )
}

export default App

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Contents = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`

const ToDoListContainer = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`
