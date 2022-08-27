import React from 'react';
import styled from 'styled-components';

import { Button } from 'Components/Button';
import { Input } from 'Components/Input';

interface Props {
  readonly toDo?: string;
  readonly onChange?: (text: string) => void;
  readonly onAdd?: () => void;
}

export const InputContainer = ({ toDo, onChange, onAdd }: Props) => {
  return (
    <Container>
      <Input placeholder="할 일을 입력해 주세요" value={toDo} onChange={onChange} />
      <Button label="추가" onClick={onAdd} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
