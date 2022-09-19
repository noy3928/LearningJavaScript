import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { InputContainer } from 'Components';

export const Add = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <InputContainer onAdd={() => navigate('/')} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  align-items: center;
`;
