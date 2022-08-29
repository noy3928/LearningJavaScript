import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PageHeader, Button } from 'Components';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <PageHeader />
    </Container>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
