import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { PopupMenu } from './popup-menu';

describe('PopupMenu', () => {
  const defaultProps = {
    visible: true,
    position: 'top-left',
    children: <button>Click me</button>,
    items: [
      { name: 'Item 1', url: '/item1' },
      { name: 'Item 2', url: '/item2' },
      { name: 'Item 3', click: jest.fn() },
    ],
  };

  it('should show the popup menu when visible prop is true', () => {
    const { getByTestId } = render(<PopupMenu {...defaultProps} />);
    const popupMenu = getByTestId('popup-menu');
    expect(popupMenu).toBeVisible();
  });

  it('should hide the popup menu when visible prop is false', () => {
    const { queryByTestId } = render(<PopupMenu {...defaultProps} visible={false} />);
    const popupMenu = queryByTestId('popup-menu-content');
    expect(popupMenu).toBeNull();
  });

  it('should render the children element', () => {
    const { getByText } = render(<PopupMenu {...defaultProps} />);
    const button = getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('should render the menu items', () => {
    const { getByText } = render(<PopupMenu {...defaultProps} />);
    const item1 = getByText('Item 1');
    const item2 = getByText('Item 2');
    const item3 = getByText('Item 3');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });

  it('should call the click function when a menu item with a click function is clicked', () => {
    const { getByText } = render(<PopupMenu {...defaultProps} />);
    const item3 = getByText('Item 3');
    fireEvent.click(item3);
    expect(defaultProps.items[2].click).toHaveBeenCalledTimes(1);
  });
});