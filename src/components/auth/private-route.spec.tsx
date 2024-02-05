import { PrivateRoute } from '@components/auth/private-route';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'inversify-react';
import { getTestContainer } from '@utils/inversion-container-test';
import { Container } from 'inversify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import React from 'react';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { HttpClient } from '@common/http-client';
const mockedUsedNavigate = jest.fn();
const useLogoutMock = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));
jest.mock("@hooks/use-logout", () => ({
  useLogout: () => useLogoutMock
}));
describe('PrivateRoute', () => {
  let container: Container;
  const renderComponent = () => {
    return render(<Provider container={container}>
      <MemoryRouter>
          <PrivateRoute><div/></PrivateRoute>
      </MemoryRouter>
    </Provider>);
  }
  beforeAll(() => {
    container = getTestContainer();

  });
  afterEach(()=>{
    jest.clearAllMocks();
  })
  it('should render', () => {
    const wrapper = renderComponent();
    expect(wrapper).toBeTruthy();
  });
  it('should redirect to login if token is expired', () => {
    const client = container.get<HttpClient>(HttpClientSymbol);
    client.isTokenExpired = jest.fn().mockReturnValue(true);
    const wrapper = renderComponent();
    expect(mockedUsedNavigate).toBeCalledWith('/login');
  });
  it('should not redirect to login if token is not expired', () => {
    const client = container.get<HttpClient>(HttpClientSymbol);
    client.isTokenExpired = jest.fn().mockReturnValue(false);
    const wrapper = renderComponent();
    expect(mockedUsedNavigate).not.toBeCalled();
  });
  it('should call useLogout if token is expired', () => {
    const client = container.get<HttpClient>(HttpClientSymbol);
    client.isTokenExpired = jest.fn().mockReturnValue(true);
    const wrapper = renderComponent();
    expect(useLogoutMock).toBeCalled();
  });

});
