import { render, screen } from '@testing-library/react';
import SlideToggle from './SlideToggle';

describe('SlideToggle', () => {
  it('should render without error', () => {
    render(<SlideToggle />);
    expect(screen.getByTestId('slide-toggle')).toBeInTheDocument();
  });
});
