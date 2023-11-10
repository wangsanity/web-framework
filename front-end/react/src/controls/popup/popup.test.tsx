import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Popup } from './popup';

describe('Popup', () => {
  const defaultProps = {
    visible: true,
    position: 'top-left',
    children: <button>Click me</button>,
    popupContent: <div>Popup content</div>,
  };

  it('should render the popup with the correct content', () => {
    const { getByText } = render(<Popup {...defaultProps} />);
    const popupContent = getByText('Popup content');
    expect(popupContent).toBeInTheDocument();
  });

  it('should show the popup when visible prop is true', () => {
    const { getByTestId } = render(<Popup {...defaultProps} />);
    const popup = getByTestId('popup');
    expect(popup).toBeVisible();
  });

  it('should hide the popup when visible prop is false', () => {
    const { queryByTestId } = render(<Popup {...defaultProps} visible={false} />);
    const popup = queryByTestId('popup-content');
    expect(popup).toBeNull();
  });
});