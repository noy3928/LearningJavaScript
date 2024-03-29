/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Input } from './index';

describe('<Input/>', () => {
  it('renders component correctly', () => {
    const { container } = render(<Input value="default value" />);

    const input = screen.getByDisplayValue('default value');
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders placeholder correctly', () => {
    render(<Input placeholder="defalut placeholder" />);

    const input = screen.getByPlaceholderText('defalut placeholder');
    expect(input).toBeInTheDocument();
  });

  it('changes the data', () => {
    render(<Input placeholder="defalut placeholder" />);
    const input = screen.getByPlaceholderText('defalut placeholder') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'study react' } });
    expect(input.value).toBe('study react');
  });
});
