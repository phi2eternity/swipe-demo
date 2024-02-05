import { ReactNode } from 'react';
import ErrorPage from '.';
import { render } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('ErrorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
