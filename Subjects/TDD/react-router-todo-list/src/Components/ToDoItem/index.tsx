import React from 'react';
import styled from 'styled-components';
import { Button } from 'Components/Button';
import { Link } from 'react-router-dom';

interface Props {
  readonly id: number;
  readonly label: string;
  readonly onDelete?: () => void;
}

export const ToDoItem = ({ id, label, onDelete }: Props) => {
  return (
    <Container>
      <Label to={`/detail/${id}`}>{label}</Label>
      <Button label="삭제" backgroundColor="#FF1744" hoverColor="#F01440" onClick={onDelete} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const Label = styled(Link)`
  flex: 1;
  font-size: 16px;
  margin-right: 20px;
  text-decoration: none;
`;
