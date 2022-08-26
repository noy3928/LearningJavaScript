import React from 'react';
import styled from 'styled-components';

interface Props {
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
}

export const Input = ({ placeholder, onChange }: Props) => {
  return (
    <InputBox
      placeholder={placeholder}
      onChange={(e) => {
        if (typeof onChange === 'function') {
          onChange(e.target.value);
        }
      }}></InputBox>
  );
};

const InputBox = styled.input`
  flex: 1;
  font-size: 16px;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;
