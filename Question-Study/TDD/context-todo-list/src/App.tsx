import React, { useState } from "react"
import styled from "styled-components"

import { InputContainer, ToDoList } from "Components"
import { ToDoListProvider } from "Contexts"

function App() {
  return (
    <ToDoListProvider>
      <Container>
        <Contents>
          <ToDoList />
          <InputContainer />
        </Contents>
      </Container>
    </ToDoListProvider>
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
