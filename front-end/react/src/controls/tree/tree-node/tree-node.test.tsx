import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { TreeNode } from './tree-node';

describe('TreeNode', () => {
  const defaultProps = {
    items: [
      { id: '1', name: 'Item 1', checked: false },
      { id: '2', name: 'Item 2', checked: true },
      { id: '3', name: 'Item 3', checked: false },
    ],
    selectItem: jest.fn(),
    showCheckbox: true,
  };

  it('should render the tree node with the correct items', () => {
    const { getByText } = render(<TreeNode {...defaultProps} />);
    const item1 = getByText('Item 1');
    const item2 = getByText('Item 2');
    const item3 = getByText('Item 3');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });

  it('should call the selectItem function when an item is clicked', () => {
    const { getByText } = render(<TreeNode {...defaultProps} />);
    const item1 = getByText('Item 1');
    fireEvent.click(item1);
    expect(defaultProps.selectItem).toHaveBeenCalledTimes(1);
    expect(defaultProps.selectItem).toHaveBeenCalledWith(defaultProps.items[0]);
  });

  it('should update the checked status of an item when its checkbox is clicked', () => {
    const { getByText } = render(<TreeNode {...defaultProps} />);
    const checkbox2 = getByText('Item 2').parentNode?.firstChild as HTMLElement;
    fireEvent.click(checkbox2);
    expect(defaultProps.items[1].checked).toBe(false);
    fireEvent.click(checkbox2);
    expect(defaultProps.items[1].checked).toBe(true);
  });
});