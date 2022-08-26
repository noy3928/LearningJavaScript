import React from 'react';
import styled from 'styled-components';

interface Props {
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
  readonly value?: string;
}

export const Input = ({ placeholder, onChange, value }: Props) => {
  return (
    <InputBox
      value={value}
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
