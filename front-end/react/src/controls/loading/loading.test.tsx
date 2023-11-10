import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Loading } from './loading';

describe('Loading', () => {
  it('should render the loading image', () => {
    const { getByAltText } = render(<Loading />);
    const loadingImage = getByAltText('Loading') as HTMLImageElement;
    expect(loadingImage).toBeInTheDocument();
  });

  it('should render the loading box with the correct class', () => {
    const { getByTestId } = render(<Loading />);
    const loadingBox = getByTestId('ctr-loading');
    expect(loadingBox).toHaveClass('ctr-loading');
  });

  it('should render the loading box with the position-absolute class when absolute prop is true', () => {
    const { getByTestId } = render(<Loading absolute />);
    const loadingBox = getByTestId('ctr-loading');
    expect(loadingBox).toHaveClass('position-absolute');
  });
});