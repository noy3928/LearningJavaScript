import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

import { Button, Input, ToDoItem } from 'Components';

function App() {
  return (
    <Container>
      <Contents>
        <ToDoItem label="추가된 할 일" onDelete={() => alert('삭제')} />
        <InputContainer>
          <Input placeholder="할 일을 입력해 주세요" onChange={(text) => console.log(text)} />
          <Button label="추가" onClick={() => alert('추가')} />
        </InputContainer>
      </Contents>
    </Container>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Contents = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
`;
