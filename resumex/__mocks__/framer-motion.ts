const mockStart = jest.fn();
const mockStop = jest.fn();
const mockSet = jest.fn();

const mockControls = {
  start: mockStart,
  stop: mockStop,
  set: mockSet,
};

export const useAnimation = () => mockControls;

export const motion = {
  div: 'div',
  button: 'button',
  span: 'span',
  // Add other HTML elements as needed
};

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children; 