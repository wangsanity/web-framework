import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Toolbar } from './toolbar';
import { TextService } from '@/utils';

describe('Toolbar', () => {
  it('should render the new button when buttons.new is true', () => {
    const { getByText } = render(<Toolbar buttons={{ new: true }} />);
    expect(getByText(TextService.controls.new)).toBeInTheDocument();
  });

  it('should not render the new button when buttons.new is false', () => {
    const { queryByText } = render(<Toolbar buttons={{ new: false }} />);
    expect(queryByText(TextService.controls.new)).toBeNull();
  });

  it('should call the clickEvent function when a button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Toolbar buttons={{ new: true }} clickEvent={handleClick} />);
    const newButton = getByText(TextService.controls.new);
    fireEvent.click(newButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('new');
  });

  it('should render the settings button when buttons.settings is true', () => {
    const { getByText } = render(<Toolbar buttons={{ settings: true }} />);
    expect(getByText(TextService.controls.settings)).toBeInTheDocument();
  });

  it('should not render the settings button when buttons.settings is false', () => {
    const { queryByText } = render(<Toolbar buttons={{ settings: false }} />);
    expect(queryByText(TextService.controls.settings)).toBeNull();
  });
});