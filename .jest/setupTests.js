import '@testing-library/jest-dom';

window.ResizeObserver = jest.fn(() => ({
  observe: () => {},
  unobserve: () => {},
  disconnect: () => {}
}));
