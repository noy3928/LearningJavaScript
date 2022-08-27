import React, { useState, useContext } from "react"
import styled from "styled-components"

import { ToDoListContext } from "Contexts"

import { Button } from "Components/Button"
import { Input } from "Components/Input"

export const InputContainer = () => {
  const [toDo, setToDo] = useState("")
  const { addToDo } = useContext(ToDoListContext)

  return (
    <Container>
      <Input
        placeholder="할 일을 압력해 주세요"
        value={toDo}
        onChange={setToDo}
      />
      <Button
        label="추가"
        onClick={() => {
          addToDo(toDo)
          setToDo("")
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`
