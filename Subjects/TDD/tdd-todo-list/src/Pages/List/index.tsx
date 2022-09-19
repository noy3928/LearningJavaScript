import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'Components';

export const List = () => {
  const [toDoList, setToDoList] = useState<Array<string>>([]);

  useEffect(() => {
    const list = localStorage.getItem('ToDoList');
    if (list) {
      setToDoList(JSON.parse(list));
    }
  }, []);

  return (
    <Container>
      {toDoList.map((todo, index) => (
        <ToDoItem key={todo}>
          {todo}
          <Button
            label="삭제"
            backgroundColor="#FF1744"
            hoverColor="#F01440"
            onClick={() => {
              let list = [...toDoList];
              list.splice(index, 1);
              setToDoList(list);
              localStorage.setItem('ToDoList', JSON.stringify(list));
            }}
          />
        </ToDoItem>
      ))}
    </Container>
  );
};

const Container = styled.div``;
const ToDoItem = styled.div``;
