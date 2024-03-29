/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import App from './App';

describe('<Button/>', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('adds and deletes ToDo items', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const button = screen.getByText('추가');
    fireEvent.change(input, { target: { value: 'study react1' } });
    fireEvent.click(button);

    const todoItem = screen.getByText('study react1');
    expect(todoItem).toBeInTheDocument();
    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(1);

    fireEvent.change(input, { target: { value: 'study react2' } });
    fireEvent.click(button);

    const todoItem2 = screen.getByText('study react2');
    expect(todoItem2).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(2);

    const deleteButtons = screen.getAllByText('삭제');
    fireEvent.click(deleteButtons[0]);
    expect(todoItem).not.toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(1);
  });

  it('does not add emtpy ToDo', () => {
    render(<App />);

    const toDoList = screen.getByTestId('toDoList');
    const length = toDoList.childElementCount;

    const button = screen.getByText('추가');
    fireEvent.click(button);

    expect(toDoList.childElementCount).toBe(length);
  });
});
