/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';
import 'jest-styled-components';

describe('<Button/>', () => {
  it('renders component correctly', () => {
    const { container } = render(<Button label="추가" />);

    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    const parent = label.parentElement;
    expect(parent).toHaveStyleRule('background-color', '#304ffe');
    expect(parent).toHaveStyleRule('background-color', '#1e40ff', { modifier: ':hover' });

    expect(parent).toHaveStyleRule('box-shadow', 'inset 5px 5px 10px rgba(0,0,0,0.2)', {
      modifier: ':active',
    });

    expect(container).toMatchSnapshot();
  });

  it('changes backgroundColor and hoverColor Props', () => {
    const backgroundColor = '#ff1744';
    const hoverColor = '#f01440';
    render(<Button label="추가" backgroundColor={backgroundColor} hoverColor={hoverColor} />);

    const parent = screen.getByText('추가').parentElement;
    expect(parent).toHaveStyleRule('background-color', backgroundColor);
    expect(parent).toHaveStyleRule('background-color', hoverColor, { modifier: ':hover' });
  });

  it('clicks the button', () => {
    const handleClick = jest.fn();
    render(<Button label="추가" onClick={handleClick} />);

    const label = screen.getByText('추가');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
