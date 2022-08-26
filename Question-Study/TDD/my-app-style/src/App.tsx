import React, { useState, Component } from 'react';
import styled from 'styled-components';

import { Button, Input, ToDoItem } from 'Components';

interface Props {}

interface State {
  readonly toDo: string;
  readonly toDoList: string[];
}
class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toDo: '',
      toDoList: [],
    };
  }

  private addToDo = (): void => {
    const { toDo, toDoList } = this.state;
    if (toDo) {
      this.setState({
        toDo: '',
        toDoList: [...toDoList, toDo],
      });
    }
  };

  private deleteToDo = (index: number): void => {
    let list = [...this.state.toDoList];
    list.splice(index, 1);
    this.setState({
      toDoList: list,
    });
  };

  render() {
    const { toDo, toDoList } = this.state;
    return (
      <Container>
        <Contents>
          <ToDoListContainer data-testid="toDoList">
            {toDoList.map((item, index) => (
              <ToDoItem key={item} label={item} onDelete={() => this.deleteToDo(index)} />
            ))}
          </ToDoListContainer>
          <InputContainer>
            <Input
              placeholder="할 일을 입력해 주세요"
              value={toDo}
              onChange={(text) => this.setState({ toDo: text })}
            />
            <Button label="추가" onClick={this.addToDo} />
          </InputContainer>
        </Contents>
      </Container>
    );
  }
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

const ToDoListContainer = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;
